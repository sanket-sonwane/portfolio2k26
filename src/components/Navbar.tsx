"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, site, track } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/85 backdrop-blur-md transition-all ${
        scrolled ? "border-border py-2" : "border-transparent py-4"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/#top"
          className="font-mono text-xs font-semibold tracking-[0.22em] text-primary"
          onClick={() => setOpen(false)}
        >
          SANKET SONWANE
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-secondary transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/#contact"
            onClick={() => track("contact_cta_clicked", { from: "nav" })}
            className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-white"
          >
            Let&apos;s talk <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-primary"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-primary hover:bg-surface"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contact"
                onClick={() => {
                  setOpen(false);
                  track("contact_cta_clicked", { from: "nav-mobile" });
                }}
                className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary px-5 py-3 text-base font-medium text-background"
              >
                Let&apos;s talk <ArrowUpRight className="size-4" />
              </Link>
            </li>
          </ul>
          <p className="mt-4 font-mono text-xs text-secondary">{site.email}</p>
        </div>
      )}
    </header>
  );
}
