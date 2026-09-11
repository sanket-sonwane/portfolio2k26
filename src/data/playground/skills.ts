export type SkillLevel = "expert" | "advanced" | "intermediate" | "familiar";

export interface Skill {
  name: string;
  level: SkillLevel;
  experience: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

/** 5 categories, 34 skills — user-verified source of truth. */
export const skillCategories: SkillCategory[] = [
  {
    title: "Agentic AI",
    skills: [
      {
        name: "LangGraph",
        level: "expert",
        experience: "Production (QA-Forge)",
        description:
          "Stateful multi-agent graphs with handoffs, tool execution, and verification layers.",
      },
      {
        name: "Hybrid RAG",
        level: "expert",
        experience: "Internship (EPIC)",
        description:
          "Vector + keyword search over PostgreSQL/pgvector across millions of asset records.",
      },
      {
        name: "Multi-Agent Systems",
        level: "advanced",
        experience: "Production (QA-Forge)",
        description:
          "Orchestrator-worker collaboration, task decomposition, and adversarial testing agents.",
      },
      {
        name: "LlamaIndex",
        level: "advanced",
        experience: "Projects (TattvaQuest)",
        description:
          "Agentic RAG with chunking, hybrid search, query routing, and retrieval-quality optimization.",
      },
      {
        name: "Tool Calling",
        level: "advanced",
        experience: "Projects (TattvaQuest, QA-Forge)",
        description:
          "Structured function calling so agents can query APIs, retrieve context, and act.",
      },
      {
        name: "MCP",
        level: "intermediate",
        experience: "Applied AI systems",
        description:
          "Model Context Protocol for wiring external tools and data into agent workflows.",
      },
      {
        name: "SLM Fine-tuning (LoRA / QLoRA)",
        level: "intermediate",
        experience: "Applied research",
        description:
          "Parameter-efficient fine-tuning of small language models with LoRA, QLoRA, and PEFT.",
      },
      {
        name: "LLM Evaluation",
        level: "intermediate",
        experience: "Applied AI systems",
        description:
          "Judging retrieval quality, answer faithfulness, and agent task success.",
      },
    ],
  },
  {
    title: "Backend",
    skills: [
      {
        name: "Python",
        level: "expert",
        experience: "Internships (ARAI, COEP, EPIC)",
        description:
          "Production automation pipelines, research simulations, and AI orchestration services.",
      },
      {
        name: "FastAPI",
        level: "expert",
        experience: "Production (QA-Forge)",
        description:
          "Typed, validated APIs with Pydantic v2 serving multi-agent auditing workflows.",
      },
      {
        name: "PostgreSQL",
        level: "advanced",
        experience: "Internship (EPIC)",
        description:
          "Relational + vector storage backbone for the municipal asset intelligence copilot.",
      },
      {
        name: "Node.js",
        level: "advanced",
        experience: "Projects (Class-Node)",
        description:
          "Realtime quiz and classroom interaction backend serving 100+ weekly users.",
      },
      {
        name: "Java Spring Boot",
        level: "advanced",
        experience: "Projects (Multi-Tenant SaaS)",
        description:
          "Multi-tenant SaaS backend with Spring Boot paired with a Next.js frontend.",
      },
      {
        name: "Pydantic v2",
        level: "advanced",
        experience: "Production (QA-Forge, Event Registration)",
        description:
          "Strict schema validation and settings management across FastAPI services.",
      },
      {
        name: "REST API Design",
        level: "advanced",
        experience: "Production + Projects",
        description:
          "Versioned, documented REST contracts between frontends, agents, and services.",
      },
      {
        name: "Groq",
        level: "advanced",
        experience: "Projects (ACG)",
        description:
          "Fast LLM inference driving tool-loop merchant agents with bounded autonomy.",
      },
      {
        name: "Razorpay",
        level: "advanced",
        experience: "Projects (ACG)",
        description:
          "Test-mode payments: mandates, callbacks, reconciliation, and payment-state recovery.",
      },
      {
        name: "Ed25519 Signed Auth",
        level: "intermediate",
        experience: "Projects (ACG)",
        description:
          "Signed user-intent assertions with nonce, expiry, and merchant/amount binding.",
      },
      {
        name: "SQLite",
        level: "intermediate",
        experience: "Projects (ACG)",
        description:
          "Embedded relational store for transactional state and audit trails.",
      },
      {
        name: "SSE",
        level: "intermediate",
        experience: "Projects (ACG)",
        description:
          "Server-sent events streaming live transaction and agent-trace updates.",
      },
    ],
  },
  {
    title: "Computer Vision",
    skills: [
      {
        name: "YOLOv8 (Ultralytics)",
        level: "advanced",
        experience: "Projects (VisionMitra)",
        description:
          "Real-time object detection powering a mobility-assistance app with 3 risk levels.",
      },
      {
        name: "OpenCV",
        level: "advanced",
        experience: "Projects (VisionMitra)",
        description:
          "Frame processing, annotation, and vision pipelines feeding the detection backend.",
      },
      {
        name: "Industrial Automation",
        level: "advanced",
        experience: "Internship (ARAI)",
        description:
          "ZEISS INSPECT API automation cutting photogrammetry processing from 10 hours to 10 seconds.",
      },
    ],
  },
  {
    title: "Frontend & Mobile",
    skills: [
      {
        name: "React",
        level: "advanced",
        experience: "Projects (Class-Node)",
        description:
          "Live quiz interfaces with synchronized multiplayer participation and analytics dashboards.",
      },
      {
        name: "TypeScript",
        level: "advanced",
        experience: "Projects (Class-Node)",
        description:
          "Type-safe realtime frontends and shared contracts with Node/Supabase backends.",
      },
      {
        name: "Next.js",
        level: "advanced",
        experience: "Projects (QA-Forge web)",
        description:
          "App Router frontends for agent platforms — including this portfolio.",
      },
      {
        name: "React Native (Expo)",
        level: "intermediate",
        experience: "Projects (VisionMitra)",
        description:
          "Cross-platform mobile client delivering sub-second vision alerts.",
      },
      {
        name: "Tailwind CSS",
        level: "advanced",
        experience: "Projects (QA-Forge web, Portfolio)",
        description:
          "Utility-first editorial interfaces with theme tokens and responsive layouts.",
      },
    ],
  },
  {
    title: "Edge, Cloud & DevOps",
    skills: [
      {
        name: "5G MEC / SDN",
        level: "advanced",
        experience: "Research (COEP)",
        description:
          "Lightweight trust-based rogue-node detection for 5G edge — 98% accuracy at <3% CPU.",
      },
      {
        name: "Docker",
        level: "intermediate",
        experience: "Production deployments",
        description:
          "Containerized APIs and agent services for reproducible deploys.",
      },
      {
        name: "CI/CD",
        level: "intermediate",
        experience: "Production deployments",
        description:
          "Automated build, test, and deploy pipelines for web + API services.",
      },
      {
        name: "AWS Bedrock",
        level: "familiar",
        experience: "Applied AI systems",
        description:
          "Managed foundation-model access for prototyping LLM features.",
      },
      {
        name: "Kubernetes",
        level: "familiar",
        experience: "Applied DevOps",
        description:
          "Container orchestration fundamentals for scaling services.",
      },
      {
        name: "Git & GitHub",
        level: "advanced",
        experience: "All work",
        description:
          "Branching, reviews, and CI across every internship and project.",
      },
    ],
  },
];
