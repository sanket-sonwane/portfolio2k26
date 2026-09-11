"use client";

import { motion } from "framer-motion";
import type { ProjectArchitectureNode } from "@/data/projects";
import { Reveal } from "./Reveal";

export function ArchitectureDiagram({
  nodes,
  caption,
  compact = false,
}: {
  nodes: ProjectArchitectureNode[];
  caption: string;
  compact?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-background">
      <div className={`grid-bg ${compact ? "px-4 py-5" : "px-6 py-7"}`}>
        <ol className="flex flex-col items-center">
          {nodes.map((n, i) => (
            <li key={n.label} className="flex w-full flex-col items-center">
              {i > 0 && (
                <span aria-hidden className="h-4 w-px bg-border" />
              )}
              <Reveal delay={Math.min(i * 0.04, 0.3)} className="flex w-full justify-center">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  className={`max-w-full rounded-lg border border-border bg-surface px-4 py-2 text-center font-mono tracking-[0.12em] text-primary ${
                    compact ? "text-[11px]" : "text-xs"
                  }`}
                >
                  {n.label.toUpperCase()}
                  {n.detail && (
                    <span className="mt-0.5 block text-[10px] tracking-normal text-secondary">
                      {n.detail}
                    </span>
                  )}
                </motion.span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="border-t border-border px-4 py-2.5 font-mono text-[11px] text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}
