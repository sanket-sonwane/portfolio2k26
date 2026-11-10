"use client";

import { PhoneOff } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/site";

/** Hosted Sara voice agent (separate cross-origin app). */
const SARA_URL = "https://sarang-gateway.fly.dev/";

/**
 * Minimal "Talk to Sara" button + modal. The iframe mounts only while open, so
 * the voice session starts on click and ends the moment it unmounts. No
 * cross-origin state is available to the host page; closing the panel IS the
 * hang-up.
 */
export function TalkToSara() {
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const hangUp = useCallback(() => {
    setOpen(false);
    track("sara_hangup");
  }, []);

  // Escape closes the panel; focus returns to the launcher button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hangUp();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hangUp]);

  useEffect(() => {
    if (!open) openButtonRef.current?.focus();
  }, [open]);

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        onClick={() => {
          setOpen(true);
          track("sara_opened", { from: "hero" });
        }}
        data-cursor-label="Talk to Sara"
        className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
      >
        <span className="relative flex size-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        Talk to Sara
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Talk to Sara voice agent"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/40 p-4 backdrop-blur-sm sm:items-end sm:justify-end sm:p-6"
        >
          <div className="flex max-h-full w-full max-w-[420px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
              <span className="flex items-center gap-1.5 font-mono text-xs text-secondary">
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                SARA · VOICE AGENT
              </span>
              <button
                type="button"
                onClick={hangUp}
                aria-label="Hang up and close Sara"
                data-cursor-label="Hang up"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <PhoneOff className="size-4" />
                Hang up
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <iframe
                src={SARA_URL}
                title="Talk to Sara"
                allow="microphone; autoplay"
                className="block h-[560px] w-full border-0 bg-background sm:h-[640px]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
