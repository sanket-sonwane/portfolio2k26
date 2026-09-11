import { FileText, Presentation } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const results = [
  { value: "98%", label: "Accuracy" },
  { value: "<3%", label: "CPU Usage" },
  { value: "<50ms", label: "Delay" },
];

const stack = ["SDN", "5G MEC", "Python", "Mininet", "Ryu", "Network Security"];

export function ResearchSection() {
  return (
    <section id="research" aria-label="Research" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          kicker="Research"
          title={
            <>
              WHERE ENGINEERING
              <br />
              MEETS <span className="text-accent">EXPERIMENTATION.</span>
            </>
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-8 sm:p-10">
              <p className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-secondary uppercase">
                <FileText className="size-4 text-accent" /> Paper · Submitted to AEUE — Q2 Journal
              </p>
              <h3 className="mt-5 text-2xl leading-snug font-semibold text-balance sm:text-4xl">
                Lightweight Trust-Based Detection of Rogue Nodes in MEC
              </h3>
              <p className="mt-4 leading-relaxed text-secondary">
                A lightweight SDN-based rogue-node detection framework for 5G MEC,
                developed as a Research Intern at COEP Tech and validated through
                Python, Mininet, and Ryu-based simulations.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
                {results.map((r) => (
                  <div key={r.label}>
                    <dt className="order-2 mt-1 block font-mono text-[11px] text-secondary uppercase">
                      {r.label}
                    </dt>
                    <dd className="order-1 text-2xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                      {r.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="flex h-full flex-col justify-between rounded-2xl bg-primary p-8 text-background sm:p-10 dark:bg-surface dark:text-primary dark:border dark:border-border">
              <div>
                <p className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase opacity-70">
                  <Presentation className="size-4" /> NVIDIA Nemotron Workshop
                </p>
                <h3 className="mt-5 text-2xl leading-snug font-semibold text-balance sm:text-3xl">
                  Presented an AI-powered cybersecurity project
                </h3>
                <ul className="mt-5 flex flex-col gap-2 text-sm opacity-80">
                  <li>— AI Engineers</li>
                  <li>— NVIDIA Teams</li>
                  <li>— Industry Professionals</li>
                </ul>
              </div>
              <p className="mt-8 border-t border-current/20 pt-4 font-mono text-[11px] opacity-70">
                Presented at NVIDIA&apos;s Nemotron Workshop. No employment affiliation
                claimed.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
