import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { getProject, projects } from "@/data/projects";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — ${site.name}`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main className="pt-28 sm:pt-32">
        <article className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-secondary uppercase hover:text-accent"
            >
              <ArrowLeft className="size-4" /> All work
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-8 font-mono text-xs tracking-[0.2em] text-secondary uppercase">
              <span className="text-accent">■</span> {project.index} · {project.category}
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
              {project.title}
            </h1>
            <p className="mt-4 text-xl text-secondary">{project.subtitle}</p>
            <p className="mt-2 font-mono text-xs text-secondary">{project.date}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <section aria-label="Overview" className="rule mt-10 pt-8">
              <h2 className="font-mono text-xs tracking-[0.2em] text-secondary uppercase">
                Overview
              </h2>
              <p className="mt-4 text-lg leading-relaxed">{project.description}</p>
            </section>
          </Reveal>

          <Reveal>
            <section aria-label="Problem" className="rule mt-10 pt-8">
              <h2 className="font-mono text-xs tracking-[0.2em] text-secondary uppercase">
                Problem
              </h2>
              <p className="mt-4 leading-relaxed text-secondary">{project.problem}</p>
            </section>
          </Reveal>

          <Reveal>
            <section aria-label="Approach" className="rule mt-10 pt-8">
              <h2 className="font-mono text-xs tracking-[0.2em] text-secondary uppercase">
                Approach
              </h2>
              <ol className="mt-4 flex flex-col gap-3">
                {project.approach.map((step, i) => (
                  <li key={step} className="flex gap-4 leading-relaxed">
                    <span className="font-mono text-sm text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-secondary">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          <Reveal>
            <section aria-label="Architecture" className="rule mt-10 pt-8">
              <h2 className="font-mono text-xs tracking-[0.2em] text-secondary uppercase">
                Architecture
              </h2>
              <div className="mt-4">
                <ArchitectureDiagram
                  nodes={project.architecture}
                  caption={project.architectureCaption}
                />
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section aria-label="Engineering" className="rule mt-10 pt-8">
              <h2 className="font-mono text-xs tracking-[0.2em] text-secondary uppercase">
                Engineering
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {project.capabilities.map((c) => (
                  <li
                    key={c}
                    className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-secondary"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section aria-label="Results" className="rule mt-10 pt-8">
              <h2 className="font-mono text-xs tracking-[0.2em] text-secondary uppercase">
                Results
              </h2>
              {project.metrics.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-8">
                  {project.metrics.map((m) => (
                    <p key={m.label}>
                      <span className="block text-4xl font-semibold">{m.value}</span>
                      <span className="font-mono text-xs text-secondary">{m.label}</span>
                    </p>
                  ))}
                </div>
              ) : project.statusLine ? (
                <p className="mt-4 inline-block rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-primary">
                  {project.statusLine}
                </p>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-secondary">
                  No standalone benchmark is claimed for this project — results are
                  documented at the system level on the homepage. Only metrics stated
                  in the source resume are published.
                </p>
              )}
            </section>
          </Reveal>

          <Reveal>
            <section aria-label="Links" className="rule mt-10 flex flex-wrap gap-3 pt-8 pb-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-primary px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-white"
              >
                View on GitHub <ArrowUpRight className="size-4" />
              </a>
            </section>
          </Reveal>

          <nav
            aria-label="More projects"
            className="flex items-center justify-between gap-4 border-t border-border py-10"
          >
            <Link
              href={`/projects/${prev.slug}`}
              className="group inline-flex min-w-0 items-center gap-2 text-sm break-words text-secondary hover:text-accent"
            >
              <ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-1" />
              <span>
                <span className="block font-mono text-[11px]">PREV</span>
                {prev.title}
              </span>
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="group inline-flex min-w-0 items-center gap-2 text-right text-sm break-words text-secondary hover:text-accent"
            >
              <span>
                <span className="block font-mono text-[11px]">NEXT</span>
                {next.title}
              </span>
              <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
