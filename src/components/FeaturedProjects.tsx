"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import { track } from "@/lib/site";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function FeaturedRow({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <Reveal>
      <article className="rule pt-10">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-accent">{project.index}</span>
          <p className="font-mono text-xs tracking-[0.18em] text-secondary uppercase">
            {project.category} · {project.date}
          </p>
        </div>
        <div
          className={`mt-5 grid gap-8 lg:items-start ${
            flip ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_0.9fr]"
          }`}
        >
          <div className={flip ? "lg:order-2" : ""}>
            <h3 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              {project.title}
            </h3>
            <p className="mt-2 text-lg text-secondary">{project.subtitle}</p>
            <p className="mt-5 max-w-xl leading-relaxed text-secondary">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
            {project.metrics.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-6">
                {project.metrics.map((m) => (
                  <p key={m.label}>
                    <span className="block text-2xl font-semibold">{m.value}</span>
                    <span className="font-mono text-[11px] text-secondary">{m.label}</span>
                  </p>
                ))}
              </div>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/projects/${project.slug}`}
                onClick={() => track("project_opened", { project: project.slug })}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-white"
              >
                Explore case study <ArrowRight className="size-4" />
              </Link>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("github_clicked", { from: project.slug })}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
              >
                GitHub <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
          <div className={flip ? "lg:order-1" : ""}>
            <ArchitectureDiagram
              compact
              nodes={project.architecture}
              caption={project.architectureCaption}
            />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function FeaturedProjects() {
  return (
    <section id="work" aria-label="Selected work" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          kicker="Selected work"
          title={
            <>
              SYSTEMS, <span className="text-secondary">NOT SKILL LISTS.</span>
            </>
          }
          lede="Real systems with real constraints — agentic AI, retrieval, multi-agent orchestration, and realtime infrastructure."
        />
        <div className="mt-10 flex flex-col gap-14">
          {projects
            .filter((p) => p.featured)
            .map((p, i) => (
              <FeaturedRow key={p.slug} project={p} flip={i % 2 === 1} />
            ))}
        </div>
      </div>
    </section>
  );
}
