export interface Experience {
  period: string;
  dateRange: string;
  role: string;
  org: string;
  location: string;
  description: string;
  impact?: { value: string; label: string };
  tags: string[];
}

export const experience: Experience[] = [
  {
    period: "2026",
    dateRange: "May 2026 — July 2026",
    role: "Agentic AI Engineer Intern",
    org: "EPIC Technology Research Private Limited",
    location: "Pune",
    description:
      "Built an Agentic AI-powered Municipal Asset Intelligence Copilot using intent-aware query routing, hybrid RAG, PostgreSQL, pgvector, and on-prem LLM orchestration, enabling accurate multi-step reasoning across millions of asset records.",
    tags: ["Agentic AI", "Hybrid RAG", "PostgreSQL", "pgvector"],
  },
  {
    period: "2025–2026",
    dateRange: "December 2025 — February 2026",
    role: "Python Developer Intern",
    org: "ARAI — Automotive Research Association of India",
    location: "Pune",
    description:
      "Built and deployed a production-ready Python automation pipeline using the ZEISS INSPECT API, automating marker association, validation, and quality checks for industrial photogrammetry.",
    impact: { value: "10 hrs → 10 secs", label: "99.94% processing-time reduction" },
    tags: ["Python", "ZEISS INSPECT API", "Automation"],
  },
  {
    period: "2025",
    dateRange: "May 2025 — July 2025",
    role: "Research Intern — Network Security & 5G Systems",
    org: "COEP Tech",
    location: "Pune",
    description:
      "Developed a lightweight SDN-based rogue node detection framework for 5G MEC, validated through Python, Mininet, and Ryu-based simulations, resulting in a paper submission to AEUE (Q2 Journal).",
    impact: { value: "98%", label: "Accuracy · <3% CPU · <50 ms delay" },
    tags: ["SDN", "5G MEC", "Python", "Mininet", "Ryu"],
  },
];
