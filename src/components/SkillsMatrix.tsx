"use client";

import Link from "next/link";
import { useState } from "react";
import { getProject } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { track } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function SkillsMatrix() {
  const [active, setActive] = useState<string | null>(null);

  const activeProjects = (names: string[] | undefined) =>
    (names ?? [])
      .map((slug) => getProject(slug))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section id="stack" aria-label="Technical stack" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          kicker="Technical stack"
          title={
            <>
              SKILLS WITH <span className="text-secondary">EVIDENCE.</span>
            </>
          }
          lede="Every skill below is sourced from the resume. Hover a highlighted skill to see the project that proves it — only relationships the source material supports are linked."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.05} className="bg-surface">
              <div className="p-7">
                <h3 className="font-mono text-xs tracking-[0.2em] text-secondary uppercase">
                  {g.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.skills.map((s) => {
                    const key = `${g.title}:${s.name}`;
                    const linked = (s.projects?.length ?? 0) > 0;
                    const isActive = active === key;
                    return (
                      <li key={key}>
                        <button
                          type="button"
                          onMouseEnter={() => linked && setActive(key)}
                          onMouseLeave={() => setActive(null)}
                          onFocus={() => linked && setActive(key)}
                          onBlur={() => setActive(null)}
                          onClick={() => {
                            if (linked) {
                              setActive(isActive ? null : key);
                              track("skill_explored", { skill: s.name });
                            }
                          }}
                          aria-expanded={linked ? isActive : undefined}
                          data-cursor={linked ? undefined : "muted"}
                          className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                            isActive
                              ? "border-accent bg-accent text-white"
                              : linked
                                ? "border-primary/30 bg-background text-primary hover:border-accent hover:text-accent"
                                : "cursor-default border-border bg-background text-secondary"
                          }`}
                        >
                          {s.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div aria-live="polite" className="mt-4 min-h-9">
                  {active &&
                    (() => {
                      const [gt, sn] = active.split(":");
                      const skill = skillGroups
                        .find((x) => x.title === gt)
                        ?.skills.find((x) => x.name === sn);
                      const projs = activeProjects(skill?.projects);
                      if (projs.length === 0) return null;
                      return (
                        <p className="flex flex-wrap items-center gap-2 font-mono text-xs text-secondary">
                          <span className="text-accent">{sn} →</span>
                          {projs.map((p) => (
                            <Link
                              key={p.slug}
                              href={`/projects/${p.slug}`}
                              onClick={() => track("project_opened", { project: p.slug })}
                              className="underline decoration-accent underline-offset-4 hover:text-accent"
                            >
                              {p.title}
                            </Link>
                          ))}
                        </p>
                      );
                    })()}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
