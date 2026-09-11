interface ViewTransition {
  readonly ready: Promise<void>;
  readonly finished: Promise<void>;
}

type StartViewTransition = (callback: () => void) => ViewTransition;

let transitioning = false;

function viewTransitionStarter(): StartViewTransition | undefined {
  if (typeof document === "undefined") return undefined;
  return (document as unknown as { startViewTransition?: StartViewTransition })
    .startViewTransition;
}

/**
 * Toggle the `.dark` class with a circular reveal spreading from `button`.
 * Falls back to an instant swap when View Transitions are unsupported,
 * reduced motion is preferred, or a transition is already running.
 * Returns the new dark state.
 */
export function toggleThemeAnimated(button: HTMLElement): boolean {
  const root = document.documentElement;
  const nextDark = !root.classList.contains("dark");

  const apply = () => {
    root.classList.toggle("dark", nextDark);
    try {
      localStorage.setItem("theme", nextDark ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const start = viewTransitionStarter();

  if (reduce || !start || transitioning) {
    apply();
    root.dataset.themeTransition = "fallback";
    return nextDark;
  }

  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const r = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
  root.style.setProperty("--reveal-x", `${x}px`);
  root.style.setProperty("--reveal-y", `${y}px`);
  root.style.setProperty("--reveal-r", `${Math.ceil(r)}px`);

  transitioning = true;
  try {
    // NOTE: must keep `document` as receiver — detached native methods
    // throw "Illegal invocation".
    const transition = start.call(document, apply);
    root.dataset.themeTransition = "animated";
    const done = () => {
      transitioning = false;
    };
    transition.finished.then(done, done);
  } catch {
    transitioning = false;
    root.dataset.themeTransition = "fallback";
    apply();
  }
  return nextDark;
}
