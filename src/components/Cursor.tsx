"use client";

import { useEffect, useRef } from "react";
import { CURSOR_TUNING, isLocking, resolveCursorHit, type CursorHit } from "@/lib/cursor";

/**
 * Ignition cursor.
 *
 * The pointer is treated as a physical light source being carried around the
 * page: an additive bloom that lags behind, stretches with velocity, and heats
 * up the faster you move. A targeting HUD snaps onto anything interactive.
 *
 * Performance notes:
 *  - One `requestAnimationFrame` loop drives every layer, so there are no
 *    competing frameloops and no React renders after mount.
 *  - Springs are hand-rolled rather than `useSpring` for that same reason.
 *  - Only `transform`, `opacity` and a custom property are ever written.
 *  - Master alpha is applied per layer, never on `.cursor-root`: a group
 *    opacity would isolate the blended glow layers from the page backdrop.
 */

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * Ignition temperature. `heat` (0→1) is shared by every layer; the outer pool
 * reads it through a slower lerp so it stays cool while the core runs hot.
 * t=0 is the site's `--accent`, so the resting state is already in-palette.
 */
const HEAT_RAMP = [
  [0.0, 255, 92, 53],
  [0.35, 255, 61, 26],
  [0.7, 255, 30, 20],
  [1.0, 255, 106, 82],
] as const;

function heatChannels(t: number): string {
  let i = 0;
  while (i < HEAT_RAMP.length - 2 && t > HEAT_RAMP[i + 1][0]) i += 1;
  const a = HEAT_RAMP[i];
  const b = HEAT_RAMP[i + 1];
  const span = b[0] - a[0] || 1;
  const k = Math.min(1, Math.max(0, (t - a[0]) / span));
  const r = Math.round(a[1] + (b[1] - a[1]) * k);
  const g = Math.round(a[2] + (b[2] - a[2]) * k);
  const bl = Math.round(a[3] + (b[3] - a[3]) * k);
  return `${r} ${g} ${bl}`;
}

/**
 * Semi-implicit Euler with substepping, so a dropped frame (or a backgrounded
 * tab) cannot blow the integrator up.
 */
class Spring {
  velocity = 0;

  constructor(
    public value: number,
    public stiffness: number,
    public damping: number,
  ) {}

  step(target: number, dt: number) {
    const steps = Math.min(4, Math.max(1, Math.ceil(dt / 0.008)));
    const h = dt / steps;
    for (let i = 0; i < steps; i += 1) {
      const a = -this.stiffness * (this.value - target) - this.damping * this.velocity;
      this.velocity += a * h;
      this.value += this.velocity * h;
    }
  }

  /** Teleport without leaving residual velocity (used when the pointer re-enters). */
  reset(value: number) {
    this.value = value;
    this.velocity = 0;
  }
}

const lerp = (current: number, target: number, rate: number) => current + (target - current) * rate;
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

function centered(x: number, y: number, scale = ""): string {
  return `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%)${scale}`;
}

/**
 * Refs are always mounted by the time the effect runs, so assert once here
 * rather than threading `| null` through the whole loop.
 */
function el<T extends Element>(node: T | null): T {
  if (!node) throw new Error("Cursor: layer refs are not mounted");
  return node;
}

export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLDivElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const shockRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const hudFrameRef = useRef<HTMLDivElement>(null);
  const hudLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = el(rootRef.current);
    const pool = el(poolRef.current);
    const streak = el(streakRef.current);
    const trail = el(trailRef.current);
    const shock = el(shockRef.current);
    const ring = el(ringRef.current);
    const core = el(coreRef.current);
    const hud = el(hudRef.current);
    const hudFrame = el(hudFrameRef.current);
    const hudLabel = el(hudLabelRef.current);

    const T = CURSOR_TUNING;
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function activate() {
      // ── trail particles ─────────────────────────────────────────────────────
      const { count, spawnGap, life, size, alpha, grow } = T.trail;
      const nodes: HTMLDivElement[] = [];
      const px = new Float32Array(count);
      const py = new Float32Array(count);
      const age = new Float32Array(count).fill(1);

      for (let i = 0; i < count; i += 1) {
        const d = document.createElement("div");
        d.className = "cursor-spark";
        d.style.width = `${size}px`;
        d.style.height = `${size}px`;
        d.style.opacity = "0";
        trail.appendChild(d);
        nodes.push(d);
      }

      let head = 0;
      let sinceSpawn = 0;
      function emit(x: number, y: number) {
        px[head] = x;
        py[head] = y;
        age[head] = 0;
        head = (head + 1) % count;
      }

      // ── springs ─────────────────────────────────────────────────────────────
      const spawn = -400;
      const poolX = new Spring(spawn, T.spring.pool.stiffness, T.spring.pool.damping);
      const poolY = new Spring(spawn, T.spring.pool.stiffness, T.spring.pool.damping);
      const strX = new Spring(spawn, T.spring.streak.stiffness, T.spring.streak.damping);
      const strY = new Spring(spawn, T.spring.streak.stiffness, T.spring.streak.damping);
      const hudX = new Spring(spawn, T.spring.hud.stiffness, T.spring.hud.damping);
      const hudY = new Spring(spawn, T.spring.hud.stiffness, T.spring.hud.damping);

      // ── state ───────────────────────────────────────────────────────────────
      let pointerX = spawn;
      let pointerY = spawn;
      let prevX = spawn;
      let prevY = spawn;
      let inside = false;
      let pressed = false;
      let hit: CursorHit | null = null;

      let speed = 0;
      let heat = 0;
      let poolHeat = 0;
      let angle = 0;
      let stretch = 1;
      let aperture = 1;
      let ringScale = 1;
      let ringSquash = 1;
      let ringAlpha = 0;
      let fieldAlpha = 0;
      let hudAlpha = 0;
      let shockT = 1;
      let lastMoveAt = performance.now();
      let paintedCool = -1;
      let paintedHot = -1;
      let labelledEl: HTMLElement | null = null;
      let labelledText = "";

      const setHeat = (el: HTMLElement, t: number) => {
        el.style.setProperty("--cursor-heat-rgb", heatChannels(t));
      };

      document.documentElement.classList.add("has-custom-cursor");

      // ── listeners ───────────────────────────────────────────────────────────
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        if (!inside) {
          // Re-entry: don't let the lagging layers fly in from wherever they were.
          prevX = e.clientX;
          prevY = e.clientY;
          poolX.reset(e.clientX);
          poolY.reset(e.clientY);
          strX.reset(e.clientX);
          strY.reset(e.clientY);
          hudX.reset(e.clientX);
          hudY.reset(e.clientY);
          shockT = 1;
        }
        pointerX = e.clientX;
        pointerY = e.clientY;
        inside = true;
        lastMoveAt = performance.now();
        hit = resolveCursorHit(e.target as Node | null);
      };

      const onLeave = () => {
        inside = false;
        pressed = false;
      };

      const onDown = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || !inside) return;
        pressed = true;
        shockT = 0;
        setHeat(shock, 1);
      };

      const onUp = () => {
        pressed = false;
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      window.addEventListener("blur", onLeave);

      // ── loop ────────────────────────────────────────────────────────────────
      let raf = 0;
      let lastT = performance.now();

      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);

        const dt = Math.min(0.032, (now - lastT) / 1000) || 0.016;
        lastT = now;
        const reduce = reduceQuery.matches;

        // velocity, px/sec
        const dx = pointerX - prevX;
        const dy = pointerY - prevY;
        prevX = pointerX;
        prevY = pointerY;
        const travel = inside ? Math.hypot(dx, dy) : 0;
        const instant = travel / dt;
        // Asymmetric smoothing: light ignites instantly, cools fast. Cooling is
        // deliberately quicker than heating or the glow lingers ~1s after a flick.
        speed = lerp(speed, instant, instant > speed ? 0.4 : 0.11);

        if (travel > 0.4) {
          const target = (Math.atan2(dy, dx) * 180) / Math.PI;
          let diff = target - angle;
          while (diff > 180) diff -= 360;
          while (diff < -180) diff += 360;
          angle += diff * 0.22;
        }

        const mode = hit?.mode ?? "free";
        const caret = mode === "caret";
        const muted = mode === "muted";
        const locking = isLocking(mode);
        const label = hit?.label ?? "";

        // Idle is a real state: the field cools, dims and starts breathing.
        const idle = (now - lastMoveAt) / 1000 > T.idleAfter;

        // ── heat ──
        const wantHeat = pressed ? 1 : clamp01(speed / T.heatMax);
        heat = lerp(heat, wantHeat, wantHeat > heat ? 0.26 : 0.12);
        poolHeat = lerp(poolHeat, heat, 0.055);

        // ── reticle ──
        // The aperture closes with speed: the ring contracts into a slit when
        // you flick, which is what sells the field as having mass.
        aperture = lerp(aperture, 1 - 0.45 * clamp01(speed / T.fastAt), 0.12);

        const wantRingScale =
          muted ? 0.34 : mode === "node" ? 1.6 : locking && mode !== "media" ? 0.5 : 1;
        const wantSquash = mode === "text" ? 0.1 : 1;
        const wantRingAlpha = muted
          ? 0.45
          : mode === "node"
            ? 0.55
            : mode === "media"
              ? 0.5
              : locking
                ? 0
                : caret
                  ? 0
                  : 1;
        ringScale = lerp(ringScale, wantRingScale, 0.18);
        ringSquash = lerp(ringSquash, wantSquash, 0.22);
        ringAlpha = lerp(ringAlpha, wantRingAlpha, 0.18);

        // ── master alpha ──
        const wantField = inside ? (idle ? 0.5 : 1) * (caret ? 0.6 : 1) : 0;
        fieldAlpha = lerp(fieldAlpha, wantField, wantField > fieldAlpha ? 0.22 : 0.14);
        root.style.visibility = fieldAlpha < 0.008 ? "hidden" : "visible";

        const breathe = idle ? 0.82 + Math.sin(now / 520) * 0.18 : 1;
        const breatheRing = idle ? 1 + Math.sin(now / 780) * 0.06 : 1;

        poolX.step(pointerX, dt);
        poolY.step(pointerY, dt);
        strX.step(pointerX, dt);
        strY.step(pointerY, dt);

        // ── pool ──
        // Painted last-to-hottest: the cool bloom and the trail share this lerp.
        if (Math.abs(poolHeat - paintedCool) > 0.02) {
          const channels = heatChannels(poolHeat);
          pool.style.setProperty("--cursor-heat-rgb", channels);
          trail.style.setProperty("--cursor-heat-rgb", channels);
          paintedCool = poolHeat;
        }
        pool.style.opacity = (fieldAlpha * breathe * (0.82 + poolHeat * 0.5)).toFixed(3);
        pool.style.transform = centered(poolX.value, poolY.value);

        // ── streak ──
        stretch = lerp(stretch, 1 + Math.min(T.stretchMax, speed / T.stretchAt), 0.14);
        if (Math.abs(heat - paintedHot) > 0.03) {
          const channels = heatChannels(heat);
          streak.style.setProperty("--cursor-heat-rgb", channels);
          core.style.setProperty("--cursor-heat-rgb", channels);
          ring.style.setProperty("--cursor-heat-rgb", channels);
          hud.style.setProperty("--cursor-heat-rgb", channels);
          paintedHot = heat;
        }
        const streakAlpha =
          fieldAlpha * clamp01(speed / (T.stretchAt * 0.6)) * (0.5 + heat * 0.5);
        streak.style.opacity = streakAlpha.toFixed(3);
        streak.style.transform = centered(
          strX.value,
          strY.value,
          ` rotate(${angle.toFixed(1)}deg) scale(${stretch.toFixed(3)}, ${(1 / Math.sqrt(stretch)).toFixed(3)})`,
        );

        // ── core + ring ──
        // 1:1, no lag. Precision is the whole point of a cursor.
        core.style.opacity = (fieldAlpha * (0.75 + heat * 0.25)).toFixed(3);
        core.style.transform = centered(pointerX, pointerY, ` scale(${(0.8 + heat * 0.5).toFixed(3)})`);
        ring.style.opacity = (ringAlpha * fieldAlpha * breatheRing).toFixed(3);
        ring.style.transform = centered(
          pointerX,
          pointerY,
          ` scale(${(ringScale * ringSquash * aperture * breatheRing).toFixed(3)}, ${(ringScale * aperture * breatheRing).toFixed(3)})`,
        );

        // ── trail ──
        if (!reduce && travel > 0.01) {
          sinceSpawn += travel;
          if (sinceSpawn >= spawnGap) {
            sinceSpawn = 0;
            emit(pointerX, pointerY);
          }
        }
        for (let i = 0; i < count; i += 1) {
          if (age[i] >= 1) continue;
          age[i] += dt / life;
          const node = nodes[i];
          if (age[i] >= 1) {
            age[i] = 1;
            node.style.opacity = "0";
            continue;
          }
          const a = age[i];
          node.style.opacity = ((1 - a) * (1 - a) * alpha * fieldAlpha).toFixed(3);
          node.style.transform = centered(px[i], py[i], ` scale(${(1 + a * grow).toFixed(3)})`);
        }

        // ── shockwave ──
        if (!reduce && shockT < 1) {
          shockT = Math.min(1, shockT + dt / T.shock.life);
          const eased = 1 - (1 - shockT) * (1 - shockT);
          shock.style.opacity = ((1 - shockT) * T.shock.alpha * fieldAlpha).toFixed(3);
          shock.style.transform = centered(
            pointerX,
            pointerY,
            ` scale(${(0.18 + eased * T.shock.grow).toFixed(3)})`,
          );
        } else if (shock.style.opacity !== "0") {
          shock.style.opacity = "0";
        }

        // ── HUD ──
        if (locking && hit) {
          const rect = hit.el.getBoundingClientRect();
          if (rect.width > 0 || rect.height > 0) {
            hudX.step(rect.left, dt);
            hudY.step(rect.top, dt);

            const w = `${Math.round(rect.width)}px`;
            const h = `${Math.round(rect.height)}px`;
            if (hudFrame.style.width !== w) hudFrame.style.width = w;
            if (hudFrame.style.height !== h) hudFrame.style.height = h;

            // Flip the micro-label below the frame when there is no room above.
            hudLabel.classList.toggle("cursor-hud-label--below", rect.top < 34);
            if (labelledEl !== hit.el || labelledText !== label) {
              labelledEl = hit.el;
              labelledText = label;
              hudLabel.textContent = label;
            }

            hud.style.transform = `translate3d(${hudX.value.toFixed(2)}px, ${hudY.value.toFixed(2)}px, 0)`;
            hudAlpha = lerp(hudAlpha, label ? 1 : 0.6, 0.2);
          }
        } else {
          labelledEl = null;
          hudAlpha = lerp(hudAlpha, 0, 0.16);
        }
        hud.style.opacity = (reduce ? 0 : hudAlpha * fieldAlpha).toFixed(3);
      };

      raf = requestAnimationFrame(frame);

      return () => {
        cancelAnimationFrame(raf);
        document.documentElement.classList.remove("has-custom-cursor");
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("blur", onLeave);
        for (const node of nodes) node.remove();
      };
    }

    const fineQuery = window.matchMedia(FINE_POINTER);
    let dispose: (() => void) | undefined;

    const sync = () => {
      if (fineQuery.matches && !dispose) {
        dispose = activate();
      } else if (!fineQuery.matches && dispose) {
        dispose();
        dispose = undefined;
      }
    };

    sync();
    fineQuery.addEventListener("change", sync);

    return () => {
      fineQuery.removeEventListener("change", sync);
      dispose?.();
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-root" aria-hidden>
      <div ref={poolRef} className="cursor-pool" />
      <div ref={streakRef} className="cursor-streak" />
      <div ref={trailRef} className="cursor-trail" />
      <div ref={shockRef} className="cursor-shock" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={coreRef} className="cursor-core" />
      <div ref={hudRef} className="cursor-hud">
        <div ref={hudFrameRef} className="cursor-hud-frame">
          <span className="cursor-hud-bracket cursor-hud-bracket--tl" />
          <span className="cursor-hud-bracket cursor-hud-bracket--tr" />
          <span className="cursor-hud-bracket cursor-hud-bracket--bl" />
          <span className="cursor-hud-bracket cursor-hud-bracket--br" />
        </div>
        <span ref={hudLabelRef} className="cursor-hud-label" />
      </div>
    </div>
  );
}
