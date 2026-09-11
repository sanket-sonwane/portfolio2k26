"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { site, track } from "@/lib/site";
import { GreetingRotator } from "./GreetingRotator";
import { PlaygroundChat } from "./PlaygroundChat";

export function Hero() {
  const reduce = useReducedMotion();
  const anim = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.div {...anim(0)}>
            <GreetingRotator />
          </motion.div>
          <motion.h1 {...anim(0.08)} className="mt-4 font-semibold tracking-tight">
            <span className="block text-[13vw] leading-[0.9] sm:text-8xl lg:text-[7.5rem]">
              SONWANE
            </span>
            <span className="block text-[13vw] leading-[0.9] text-secondary sm:text-8xl lg:text-[7.5rem]">
              SANKET
            </span>
          </motion.h1>
          <motion.p
            {...anim(0.16)}
            className="mt-6 inline-block rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs tracking-[0.25em] text-primary"
          >
            AI ENGINEER
          </motion.p>
          <motion.p
            {...anim(0.22)}
            className="mt-6 max-w-xl text-2xl leading-snug font-medium text-balance sm:text-3xl"
          >
            Building intelligent systems that{" "}
            <span className="text-accent">reason, retrieve &amp; act.</span>
          </motion.p>
          <motion.p {...anim(0.28)} className="mt-4 max-w-xl leading-relaxed text-secondary">
            AI Engineer focused on Agentic AI, LLM systems, RAG, multi-agent
            architectures, and applied AI research.
          </motion.p>
          <motion.div {...anim(0.34)} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-white"
            >
              Explore my work <ArrowRight className="size-4" />
            </Link>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("github_clicked", { from: "hero" })}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
            >
              GitHub <ArrowUpRight className="size-4" />
            </a>
          </motion.div>
          <motion.p
            {...anim(0.38)}
            className="mt-6 font-mono text-xs tracking-[0.25em] text-secondary"
          >
            {site.location} · {site.year}
          </motion.p>
        </div>
        <motion.div {...anim(0.3)} className="h-[460px] lg:h-[500px]">
          <PlaygroundChat />
        </motion.div>
      </div>
    </section>
  );
}
