import { education } from "@/data/skills";
import { Reveal } from "./Reveal";

export function Education() {
  return (
    <section id="education" aria-label="Education" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-secondary uppercase">
            <span className="text-accent">■</span> Education
          </p>
        </Reveal>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.05} className="bg-surface">
              <div className="p-7">
                <h3 className="text-xl font-semibold tracking-tight">{e.degree}</h3>
                <p className="mt-1 text-secondary">{e.school}</p>
                <p className="mt-3 flex items-center justify-between font-mono text-xs text-secondary">
                  <span>{e.period}</span>
                  <span className="text-accent">{e.result}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
