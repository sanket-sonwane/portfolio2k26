import { leadership } from "@/data/skills";
import { Reveal } from "./Reveal";

export function Leadership() {
  return (
    <section aria-label="Leadership and community" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-secondary uppercase">
            <span className="text-accent">■</span> Leadership
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            BEYOND THE CODE.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {leadership.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.06}>
              <article className="h-full rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent">
                <h3 className="text-lg leading-snug font-semibold">{l.title}</h3>
                <p className="mt-1 font-mono text-xs text-accent">{l.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  {l.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
