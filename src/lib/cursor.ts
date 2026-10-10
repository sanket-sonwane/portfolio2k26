/**
 * Semantic cursor target resolution.
 *
 * Rather than annotating every interactive element, this walks up from the
 * event target and infers intent from semantics: real controls get the
 * targeting rig, prose gets an I-beam reticle, and anything that explicitly
 * opts out via CSS `cursor` gets dimmed to a dot.
 */

export type CursorMode =
  /** Open canvas — full ring. */
  | "free"
  /** Prose — slim I-beam reticle. */
  | "text"
  /** A real control — HUD brackets lock onto the bounding box. */
  | "target"
  /** System diagram node — ring expands to a scan radius, HUD locks. */
  | "node"
  /** Image / video — bracket + label only, no lock dissolve. */
  | "media"
  /** Explicitly opted out (Tailwind `cursor-default`, `cursor-not-allowed`). */
  | "muted"
  /** Text field — the native caret is restored instead of being hidden. */
  | "caret";

export interface CursorHit {
  el: HTMLElement;
  mode: CursorMode;
  label: string;
}

const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "summary",
  "details",
  "label[for]",
  "[role='button']",
  "[role='link']",
  "[role='tab']",
  "[role='menuitem']",
  "[role='switch']",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

const CARET_SELECTOR = [
  "input:not([type='checkbox']):not([type='radio']):not([type='range']):not([type='button']):not([type='submit']):not([type='reset']):not([type='color'])",
  "textarea",
  "select",
  "[contenteditable]:not([contenteditable='false'])",
].join(", ");

/** `svg` is deliberately excluded — icon glyphs are everywhere and mean nothing. */
const MEDIA_SELECTOR = "img, video, canvas, picture";

/**
 * Prose-bearing tags that make an I-beam reticle the honest read.
 *
 * Note the deliberate absence of any CSS-`cursor` sniffing: the UA sheet
 * declares `cursor: default` on *every* `button` and `cursor: pointer` on
 * *every* `a`, so a computed value cannot distinguish "deliberately not a
 * hotspot" from "is a button". Opting out is explicit — `data-cursor="muted"`.
 */
const TEXT_TAGS = new Set([
  "P",
  "SPAN",
  "LI",
  "UL",
  "OL",
  "DL",
  "DT",
  "DD",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "STRONG",
  "EM",
  "B",
  "I",
  "SMALL",
  "BLOCKQUOTE",
  "FIGCAPTION",
  "TD",
  "TH",
  "CODE",
  "KBD",
]);

const EXPLICIT_MODES = new Set<CursorMode>([
  "free",
  "text",
  "target",
  "node",
  "media",
  "muted",
  "caret",
]);

function condense(text: string | null | undefined): string {
  return (text ?? "").replace(/\s+/g, " ").trim();
}

function clip(text: string, max = 26): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function controlLabel(el: HTMLElement): string {
  const explicit = el.dataset.cursorLabel?.trim();
  if (explicit) return explicit.toUpperCase();

  const aria = el.getAttribute("aria-label")?.trim();
  if (aria) return clip(aria.toUpperCase());

  const text = condense(el.textContent);
  if (text) return clip(text.toUpperCase());

  switch (el.tagName) {
    case "SUMMARY":
      return "EXPAND";
    case "DETAILS":
      return "EXPAND";
    case "SELECT":
      return "CHOOSE";
    default:
      return "SELECT";
  }
}

function mediaLabel(el: HTMLElement): string {
  const alt = el.getAttribute("alt")?.trim();
  return alt ? clip(`VIEW ${alt}`.toUpperCase()) : "VIEW MEDIA";
}

/**
 * Resolve the element under the pointer into a cursor mode + HUD label.
 * Returns `null` when there is nothing under the pointer at all.
 */
export function resolveCursorHit(node: Node | null): CursorHit | null {
  if (!node) return null;

  // `Element` is enough for everything read here (rects, dataset, text, tagName);
  // SVG hits are narrowed to `HTMLElement` because the HUD needs `dataset`.
  const el = (node instanceof Element ? node : node.parentElement) as HTMLElement | null;
  if (!el) return null;

  // 1. Text fields always win — precise caret targeting beats the effect.
  const caret = el.closest<HTMLElement>(CARET_SELECTOR);
  if (caret) return { el: caret, mode: "caret", label: "" };

  // 2. Author-declared intent beats inference.
  const explicit = el.closest<HTMLElement>("[data-cursor]");
  if (explicit) {
    const mode = explicit.dataset.cursor as CursorMode | undefined;
    if (mode && EXPLICIT_MODES.has(mode)) {
      return { el: explicit, mode, label: explicit.dataset.cursorLabel?.trim().toUpperCase() ?? "" };
    }
  }

  // 3. Real control.
  const interactive = el.closest<HTMLElement>(INTERACTIVE_SELECTOR);
  if (interactive) return { el: interactive, mode: "target", label: controlLabel(interactive) };

  // 4. Media.
  const media = el.closest<HTMLElement>(MEDIA_SELECTOR);
  if (media) return { el: media, mode: "media", label: mediaLabel(media) };

  // 5. Prose vs. open canvas.
  const texty = node.nodeType === 3 || TEXT_TAGS.has(el.tagName);
  return { el, mode: texty ? "text" : "free", label: "" };
}

/** Modes where the HUD brackets should snap onto the target's bounding box. */
export function isLocking(mode: CursorMode): boolean {
  return mode === "target" || mode === "node" || mode === "media";
}

export const CURSOR_TUNING = {
  /** Spring stiffness / damping per layer. The pool is deliberately molasses. */
  spring: {
    pool: { stiffness: 58, damping: 19 },
    hud: { stiffness: 340, damping: 30 },
  },
  /** px/sec that saturates the heat ramp. A hard flick hits ~8000, so this sits
   *  well above ordinary pointing (~600-1500) to leave the ramp room to breathe. */
  heatMax: 5200,
  /** px/sec at which the reticle aperture is fully closed. */
  fastAt: 2600,
  /** Seconds of stillness before the field dims and starts breathing. */
  idleAfter: 2.5,
  trail: {
    count: 14,
    /** Distance travelled between emissions — dot-chain when slow, ribbon when fast. */
    spawnGap: 13,
    life: 0.62,
    size: 22,
    alpha: 0.5,
    /** Extra scale accumulated over the particle's life. */
    grow: 2.4,
  },
  shock: {
    life: 0.52,
    grow: 3.4,
    alpha: 0.55,
  },
};
