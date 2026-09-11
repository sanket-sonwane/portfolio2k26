export interface SkillGroup {
  title: string;
  skills: { name: string; projects?: string[] }[];
}

/**
 * Skill → project links ONLY where the resume establishes the relationship.
 * RAG → municipal-copilot + tattvaquest · pgvector/PostgreSQL → municipal-copilot
 * LlamaIndex → tattvaquest · LangGraph/FastAPI → qa-forge
 * React/TS/Node/Supabase → class-node
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "AI / LLM",
    skills: [
      { name: "Agentic AI", projects: ["municipal-copilot", "tattvaquest", "qa-forge"] },
      { name: "RAG", projects: ["municipal-copilot", "tattvaquest"] },
      { name: "Multi-Agent Systems", projects: ["qa-forge"] },
      { name: "LangGraph", projects: ["qa-forge"] },
      { name: "LlamaIndex", projects: ["tattvaquest"] },
      { name: "Hugging Face" },
      { name: "LoRA" },
      { name: "QLoRA" },
      { name: "PEFT" },
      { name: "MCP" },
      { name: "Tool Calling", projects: ["tattvaquest", "qa-forge"] },
      { name: "SLM Fine-Tuning" },
      { name: "LLM Evaluation" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Python" },
      { name: "FastAPI", projects: ["qa-forge"] },
      { name: "Node.js", projects: ["class-node"] },
      { name: "REST APIs" },
      { name: "PostgreSQL", projects: ["municipal-copilot"] },
      { name: "pgvector", projects: ["municipal-copilot"] },
      { name: "Supabase", projects: ["class-node"] },
    ],
  },
  {
    title: "Cloud / DevOps",
    skills: [
      { name: "AWS Bedrock" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "CI/CD" },
      { name: "Git" },
      { name: "GitHub" },
    ],
  },
  {
    title: "Programming",
    skills: [
      { name: "Python" },
      { name: "Java" },
      { name: "C++" },
      { name: "JavaScript" },
      { name: "SQL" },
      { name: "TypeScript", projects: ["class-node"] },
      { name: "React", projects: ["class-node"] },
    ],
  },
];

export const education = [
  {
    degree: "B.E. Computer Engineering",
    school: "SPPU",
    period: "2024 — 2027",
    result: "SGPA: 9.14",
  },
  {
    degree: "Diploma in Information Technology",
    school: "AISSMS Polytechnic, Pune",
    period: "2021 — 2024",
    result: "85.13%",
  },
];

export const leadership = [
  {
    title: "Training & Placement Coordinator — Head",
    org: "PVPIT",
    description: "Led placement coordination and student engagement.",
  },
  {
    title: "HackerRank Campus Crew Lead",
    org: "HackerRank",
    description:
      "Representing and leading campus-wide coding, community, and technical initiatives.",
  },
  {
    title: "Event Host",
    org: "3+ State-level · 1 International",
    description: "Hosted 3+ state-level events and 1 international event.",
  },
];
