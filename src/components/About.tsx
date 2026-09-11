import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" aria-label="About" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-secondary uppercase">
            <span className="text-accent">■</span> About
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            ABOUT
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-secondary lg:pt-10">
            <p>
              <span className="text-primary">
                I&apos;m an AI Engineer focused on building intelligent systems around
                LLMs, retrieval, agents, and backend infrastructure.
              </span>
            </p>
            <p>
              My experience spans industry engineering, AI system development,
              automation, and applied research — from Agentic AI systems working
              across large datasets to lightweight security frameworks for 5G MEC.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
