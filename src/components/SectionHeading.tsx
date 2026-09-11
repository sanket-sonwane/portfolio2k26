import { Reveal } from "./Reveal";

export function SectionHeading({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: React.ReactNode;
  lede?: string;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-secondary uppercase">
          <span className="text-accent">■</span> {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-4xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl">
          {title}
        </h2>
      </Reveal>
      {lede ? (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
