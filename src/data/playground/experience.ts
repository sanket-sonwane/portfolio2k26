export interface PlaygroundExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  achievements: string[];
  techStack: string[];
  lessons: string[];
}

export const playgroundExperience: PlaygroundExperience[] = [
  {
    id: "epic",
    company: "EPIC Technology Research",
    role: "Agentic AI Engineer Intern",
    period: "May – Jul 2026",
    type: "Internship · Pune",
    achievements: [
      "Built the Municipal Asset Intelligence Copilot with intent-aware routing and hybrid RAG",
      "Multi-step reasoning across millions of asset records on on-prem LLM orchestration",
    ],
    techStack: ["LangChain", "Hybrid RAG", "PostgreSQL", "pgvector", "On-prem LLM"],
    lessons: ["Route questions before retrieving", "On-prem orchestration is a real constraint"],
  },
  {
    id: "arai",
    company: "ARAI (Automotive Research Association of India)",
    role: "Python Developer Intern",
    period: "Dec 2025 – Feb 2026",
    type: "Internship · Pune",
    achievements: [
      "Deployed a production ZEISS INSPECT automation pipeline",
      "Cut processing time from 10 hours to 10 seconds (99.94%)",
    ],
    techStack: ["Python", "ZEISS INSPECT API"],
    lessons: ["Automate the whole task, not a step", "Validation pipelines earn trust"],
  },
  {
    id: "coep",
    company: "COEP Tech",
    role: "Research Intern — Network Security & 5G",
    period: "May – Jul 2025",
    type: "Research · Pune",
    achievements: [
      "Built an SDN rogue-node detection framework: 98% accuracy, <3% CPU, <50ms delay",
      "Paper submitted to AEUE (Q2 journal)",
    ],
    techStack: ["Python", "Mininet", "Ryu", "SDN", "5G MEC"],
    lessons: ["Edge research is won on efficiency", "Simulate before you claim"],
  },
  {
    id: "tpc",
    company: "PVPIT",
    role: "Training & Placement Coordinator (Head)",
    period: "2024",
    type: "Leadership",
    achievements: [
      "Led placement coordination and student engagement",
      "HackerRank Campus Crew Lead — hosted 3+ state-level and 1 international event",
    ],
    techStack: ["Leadership", "Community"],
    lessons: ["Coordination is a system too", "Communities compound"],
  },
];
