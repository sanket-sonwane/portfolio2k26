"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { toggleThemeAnimated } from "@/lib/theme-transition";

export function ThemeToggle() {
  const [dark, setDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDark(toggleThemeAnimated(e.currentTarget));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      data-cursor-label={dark ? "Light mode" : "Dark mode"}
      className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-primary transition-colors hover:border-accent hover:text-accent"
    >
      {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}
