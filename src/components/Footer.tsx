"use client";

import { site, track } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs font-semibold tracking-[0.22em]">
            SANKET SONWANE
          </p>
          <p className="mt-2 font-mono text-xs tracking-[0.22em] text-secondary">
            AI ENGINEER
          </p>
          <p className="mt-3 text-sm text-secondary">
            Agentic AI · LLM Systems · RAG · Research
          </p>
        </div>
        <nav aria-label="Footer" className="flex items-center gap-5 text-sm">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("github_clicked", { from: "footer" })}
            className="text-secondary transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("linkedin_clicked", { from: "footer" })}
            className="text-secondary transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            onClick={() => track("email_clicked", { from: "footer" })}
            className="text-secondary transition-colors hover:text-accent"
          >
            Email
          </a>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 py-4 font-mono text-xs text-secondary sm:px-8">
          © 2026 Sanket Sonwane
        </p>
      </div>
    </footer>
  );
}
