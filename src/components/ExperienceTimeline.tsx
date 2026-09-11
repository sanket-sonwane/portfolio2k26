import { experience } from "@/data/experience";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function ExperienceTimeline() {
  return (
    <section id="experience" aria-label="Experience" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          kicker="Experience"
          title={
            <>
              SHIPPED WITH <span className="text-secondary">REAL TEAMS.</span>
            </>
          }
          lede="Industry engineering, automation, and applied research — three internships across AI systems, industrial automation, and network security."
        />
        <ol className="mt-12 flex flex-col">
          {experience.map((e, i) => (
            <Reveal key={e.org} delay={i * 0.05}>
              <li className="rule grid gap-4 py-10 last:border-b lg:grid-cols-[120px_1fr_1fr] lg:gap-8">
                <p className="font-mono text-sm text-accent">{e.period}</p>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">{e.role}</h3>
                  <p className="mt-1 text-secondary">
                    {e.org} · {e.location}
                  </p>
                  <p className="mt-1 font-mono text-xs text-secondary">{e.dateRange}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="leading-relaxed text-secondary">{e.description}</p>
                  {e.impact && (
                    <p className="mt-4 rounded-xl border border-border bg-surface p-4">
                      <span className="block text-2xl font-semibold text-accent">
                        {e.impact.value}
                      </span>
                      <span className="font-mono text-[11px] text-secondary">
                        {e.impact.label}
                      </span>
                    </p>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
