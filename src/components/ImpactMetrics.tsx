import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const metrics = [
  {
    value: <CountUp to={99.94} decimals={2} suffix="%" />,
    caption: "Processing-time reduction",
    detail: "10 hours → 10 seconds · ARAI / ZEISS INSPECT automation",
  },
  {
    value: <CountUp to={98} suffix="%" />,
    caption: "Rogue-node detection accuracy",
    detail: "COEP Tech research · <3% CPU · <50 ms delay",
  },
  {
    value: <CountUp to={100} suffix="+" />,
    caption: "Weekly users",
    detail: "Class-Node realtime quiz platform",
  },
  {
    value: <CountUp to={3} suffix="+" />,
    caption: "State-level events hosted",
    detail: "Plus 1 international",
  },
];

export function ImpactMetrics() {
  return (
    <section id="impact" aria-label="Engineering impact" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          kicker="Impact"
          title={
            <>
              ENGINEERING
              <br />
              WITH MEASURABLE <span className="text-accent">IMPACT.</span>
            </>
          }
        />
        <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.caption} delay={i * 0.06} className="bg-surface">
              <div className="flex h-full flex-col justify-between gap-6 p-7">
                <dt className="order-2 text-sm font-medium text-primary">
                  {m.caption}
                  <span className="mt-1 block text-[13px] font-normal text-secondary">
                    {m.detail}
                  </span>
                </dt>
                <dd className="order-1 text-5xl font-semibold tracking-tight tabular-nums">
                  {m.value}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
