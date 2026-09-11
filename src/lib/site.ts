export const site = {
  name: "Sanket Sonwane",
  role: "AI Engineer",
  tagline: "Building intelligent systems that reason, retrieve & act.",
  description:
    "Sanket Sonwane is an AI Engineer working on Agentic AI, LLM systems, RAG, multi-agent architectures, backend systems, and applied AI research.",
  location: "Pune, India",
  year: "2026",
  email: "sanketsonwane512@gmail.com",
  github: "https://github.com/sanket-sonwane",
  linkedin: "https://www.linkedin.com/in/sanket--sonwane/",
  // TODO-VERIFY: replace with the real resume PDF before publish.
  // The resume is the single source of truth — do not invent facts on the site.
  resumeHref: "/resume.pdf",
  url: "https://sanket-sonwane.dev",
} as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Research", href: "/#research" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Lightweight analytics stub — wire to a real provider later. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function track(_event: string, _data?: Record<string, string>) {
  /* no-op until a real analytics provider is wired in */
}
