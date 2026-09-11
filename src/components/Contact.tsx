"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { site, track } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-secondary uppercase">
            <span className="text-accent">■</span> Contact
          </p>
          <h2 className="mt-4 max-w-3xl text-5xl leading-[1.0] font-semibold tracking-tight text-balance sm:text-7xl">
            LET&apos;S BUILD SOMETHING{" "}
            <span className="text-accent">INTELLIGENT.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary">
            Open to AI engineering, research, internships, and ambitious technical
            projects.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              onClick={() => track("email_clicked", { from: "contact" })}
              className="inline-flex max-w-full items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-white"
            >
              <span className="break-all">{site.email}</span> <ArrowUpRight className="size-4 shrink-0" />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("github_clicked", { from: "contact" })}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
            >
              GitHub <ArrowUpRight className="size-4" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("linkedin_clicked", { from: "contact" })}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn <ArrowUpRight className="size-4" />
            </a>
            <a
              href={site.resumeHref}
              onClick={() => track("resume_clicked", { from: "contact" })}
              className="inline-flex items-center gap-2 rounded-full border border-dashed border-primary/40 px-6 py-3 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
            >
              <Download className="size-4" /> Download Resume
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
