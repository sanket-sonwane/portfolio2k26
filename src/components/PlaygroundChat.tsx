"use client";

import { motion } from "framer-motion";
import { Send, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { fallbackReply, matchIntent } from "@/lib/chat-brain";
import { track } from "@/lib/site";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const SUGGESTIONS = [
  "who are you",
  "skills",
  "projects",
  "experience",
  "research",
  "achievements",
  "contact",
];

function nextIndex(ref: React.MutableRefObject<number>, len: number): number {
  const i = ref.current % len;
  ref.current += 1;
  return i;
}

const GREETING: Message = {
  role: "assistant",
  text: "Hi! I'm an AI assistant for Sanket's portfolio. Ask me anything about his work, skills, or experience.",
};

/**
 * Demo RAG-style chat over Sanket's verified profile.
 * Rule-based retrieval only — answers come from the data layer, never generated.
 */
export function PlaygroundChat() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const answerCursor = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || thinking) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setThinking(true);
    track("playground_asked", { matched: "pending" });
    setTimeout(() => {
      const result = matchIntent(text);
      const reply = result
        ? result.intent.answers[nextIndex(answerCursor, result.intent.answers.length)]
        : fallbackReply(text);
      track("playground_asked", { matched: result ? result.intent.id : "fallback" });
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
      setThinking(false);
      inputRef.current?.focus();
    }, 650);
  };

  return (
    <div
      role="region"
      aria-label="Portfolio AI chat playground"
      className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background/80 backdrop-blur"
    >
      <div className="flex items-center border-b border-border bg-surface/80 px-4 py-2.5">
        <Image
          src="/TJ.png"
          alt=""
          aria-hidden
          width={24}
          height={24}
          className="size-6 rounded-full border border-border object-cover"
        />
        <span className="ml-2 font-mono text-xs text-secondary">Ask Me</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] text-secondary">AI Assistant</span>
        </span>
      </div>

      <div
        ref={containerRef}
        aria-live="polite"
        className="flex-1 space-y-4 overflow-y-auto overscroll-contain p-3 sm:p-4"
      >
        {messages.map((m, i) => {
          const isUser = m.role === "user";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
            >
              <span
                aria-hidden
                className={`flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border ${
                  isUser ? "bg-accent text-white" : "bg-surface"
                }`}
              >
                {isUser ? (
                  <User className="size-3" />
                ) : (
                  <Image
                    src="/TJ.png"
                    alt=""
                    width={28}
                    height={28}
                    className="size-7 rounded-full object-cover"
                  />
                )}
              </span>
              <div
                className={`max-w-[80%] min-w-0 rounded-xl border px-4 py-2.5 text-sm leading-relaxed break-words ${
                  isUser
                    ? "border-accent/20 bg-accent/10 text-primary"
                    : "border-border bg-surface text-primary"
                }`}
              >
                {m.text.split("\n").map((line, j) => (
                  <p key={j} className={j > 0 ? "mt-1.5" : undefined}>
                    {line || "\u00A0"}
                  </p>
                ))}
              </div>
            </motion.div>
          );
        })}
        {thinking && (
          <div className="flex gap-2.5" aria-label="Assistant is thinking">
            <span
              aria-hidden
              className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface"
            >
              <Image
                src="/TJ.png"
                alt=""
                width={28}
                height={28}
                className="size-7 rounded-full object-cover"
              />
            </span>
            <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-3">
              <span className="typing-dot size-1.5 rounded-full bg-accent/60" />
              <span className="typing-dot size-1.5 rounded-full bg-accent/60" />
              <span className="typing-dot size-1.5 rounded-full bg-accent/60" />
            </div>
          </div>
        )}
      </div>

      {messages.length < 3 && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-md border border-border bg-surface px-3 py-2 font-mono text-[11px] text-secondary transition-colors hover:border-accent/30 hover:text-accent"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="border-t border-border p-3">
        <div className="flex gap-2">
          <label htmlFor="playground-input" className="sr-only">
            Ask about Sanket
          </label>
          <input
            id="playground-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send(input);
            }}
            placeholder="Ask about Sanket..."
            autoComplete="off"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-primary placeholder:text-secondary focus:border-accent focus:outline-none"
          />
          <button
            type="button"
            onClick={() => send(input)}
            disabled={!input.trim() || thinking}
            aria-label="Send message"
            className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-white transition-opacity disabled:opacity-40"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
