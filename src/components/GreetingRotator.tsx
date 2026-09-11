"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const GREETINGS = [
  { text: "Hello", fontClass: "" },
  { text: "नमस्ते", fontClass: "font-devanagari" },
  { text: "Hola", fontClass: "" },
  { text: "Bonjour", fontClass: "" },
  { text: "こんにちは", fontClass: "font-jp" },
  { text: "مرحبا", fontClass: "font-arabic" },
];

const ROTATE_MS = 2200;

/**
 * Rotating multilingual greeting. All words share a single grid cell, so the
 * cell always sizes to the widest word and "I am" never shifts.
 * Static when reduced motion is preferred.
 */
export function GreetingRotator() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setIndex((i) => (i + 1) % GREETINGS.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="inline-flex min-h-[1.75rem] items-baseline gap-2">
      <span className="sr-only">Hello, I am</span>
      <span aria-hidden className="grid overflow-hidden">
        {GREETINGS.map((g, i) => {
          const active = i === index;
          return (
            <motion.span
              key={g.text}
              dir="auto"
              initial={false}
              animate={
                active
                  ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, y: 16, scale: 0.96, filter: "blur(6px)" }
              }
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className={`col-start-1 row-start-1 text-lg font-medium tracking-normal text-primary ${g.fontClass}`}
            >
              {g.text},
            </motion.span>
          );
        })}
      </span>
      <span aria-hidden className="text-lg font-medium tracking-normal text-secondary">
        I am
      </span>
    </span>
  );
}
