"use client";

import { Mic, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/site";

/** Hosted Sara voice agent (separate cross-origin app). */
const SARA_URL = "https://sarang-gateway.fly.dev/";
const SARA_ORIGIN = new URL(SARA_URL).origin;

/** Minimum time the "Connecting" overlay stays up, so a fast load still reads. */
const MIN_CONNECTING_MS = 700;

type Phase = "connecting" | "live";

/**
 * The Sara app renders its minimal surface for `?embed=1` and takes the palette
 * from `?theme=`. Without them it serves the full standalone page, which is not
 * what belongs inside this panel.
 */
function saraSrc(): string {
  const url = new URL(SARA_URL);
  url.searchParams.set("embed", "1");
  url.searchParams.set("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
  return url.toString();
}

/**
 * Floating "Talk to Sara" launcher + minimal voice panel.
 *
 * The iframe is cross-origin, so model warm-up inside it is not observable.
 * We surface a "Connecting" state until the frame document loads (plus a small
 * minimum), and the Sara app posts `{ type: "sara:ready" }` when a session is
 * actually live. Its `{ type: "sara:end" }` closes this panel, so the in-frame
 * End button behaves exactly like the host's close. Closing unmounts the
 * iframe, which releases the microphone.
 */
export function TalkToSara() {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("");
  const [phase, setPhase] = useState<Phase>("connecting");
  const [slow, setSlow] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openedAt = useRef(0);
  const loadTimer = useRef<number | undefined>(undefined);
  const wasOpen = useRef(false);

  const hangUp = useCallback(() => {
    if (loadTimer.current) window.clearTimeout(loadTimer.current);
    setOpen(false);
    track("sara_hangup");
  }, []);

  const openPanel = useCallback(() => {
    setSrc(saraSrc());
    setPhase("connecting");
    setSlow(false);
    openedAt.current = performance.now();
    setAttempt((n) => n + 1);
    setOpen(true);
    track("sara_opened", { from: "fab" });
  }, []);

  const retry = useCallback(() => {
    if (loadTimer.current) window.clearTimeout(loadTimer.current);
    setPhase("connecting");
    setSlow(false);
    openedAt.current = performance.now();
    setAttempt((n) => n + 1);
  }, []);

  // Escape closes; focus moves into the panel on open and back to the FAB after.
  // Never steal focus on first mount.
  useEffect(() => {
    if (!open) {
      if (wasOpen.current) {
        wasOpen.current = false;
        launcherRef.current?.focus();
      }
      return;
    }
    wasOpen.current = true;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hangUp();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hangUp]);

  // Promote "connecting" to "live" once the frame document loads, holding the
  // connecting state for a short minimum so a fast load still reads.
  const onFrameLoad = useCallback(() => {
    const wait = Math.max(0, MIN_CONNECTING_MS - (performance.now() - openedAt.current));
    loadTimer.current = window.setTimeout(() => setPhase("live"), wait);
  }, []);

  // Traffic from the Sara app only: exact origin, known message shapes.
  useEffect(() => {
    if (!open) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== SARA_ORIGIN) return;
      const data = e.data as { type?: unknown } | null;
      if (!data) return;
      if (data.type === "sara:ready") setPhase("live");
      if (data.type === "sara:end") hangUp();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [open, hangUp]);

  // Escalate the copy if connecting drags on.
  useEffect(() => {
    if (!open || phase !== "connecting") return;
    const t = window.setTimeout(() => setSlow(true), 12_000);
    return () => window.clearTimeout(t);
  }, [open, phase]);

  return (
    <>
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={openPanel}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label="Talk to Sara, voice agent"
          data-cursor-label="Talk to Sara"
          className="group fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-[70] inline-flex size-14 items-center justify-center gap-0 rounded-full border border-border bg-primary text-background shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5 hover:bg-accent hover:text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:size-auto sm:px-5 sm:py-3.5"
        >
          <span className="relative flex size-2 shrink-0" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          <Mic className="ml-0 size-5 sm:ml-2 sm:size-4" />
          <span className="hidden text-sm font-medium whitespace-nowrap sm:ml-2 sm:inline">Talk to Sara</span>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-primary/20 p-0 backdrop-blur-sm sm:items-end sm:justify-end sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) hangUp();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Talk to Sara"
            className="relative flex h-[85dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-2xl sm:h-[min(620px,80vh)] sm:w-[380px] sm:rounded-2xl"
          >
            <iframe
              key={attempt}
              src={src}
              title="Talk to Sara"
              allow="microphone; autoplay"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={onFrameLoad}
              className="block size-full border-0"
            />

            <button
              ref={closeRef}
              type="button"
              onClick={hangUp}
              aria-label="Close and hang up"
              data-cursor-label="Close"
              className="absolute top-3 right-3 z-20 inline-flex size-8 items-center justify-center rounded-full border border-border bg-surface/80 text-secondary backdrop-blur transition-colors hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X className="size-4" />
            </button>

            {phase === "connecting" && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background">
                <span
                  aria-hidden
                  className="size-8 animate-spin rounded-full border-2 border-border border-t-accent motion-reduce:animate-none"
                />
                <div className="text-center">
                  <p className="text-sm font-medium text-primary">Connecting to Sara…</p>
                  <p className="mt-1 text-xs text-secondary">
                    {slow ? "Taking longer than usual" : "Warming up the voice model"}
                  </p>
                </div>
                {slow && (
                  <button
                    type="button"
                    onClick={retry}
                    data-cursor-label="Retry"
                    className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-primary transition-colors hover:border-accent hover:text-accent"
                  >
                    Retry
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
