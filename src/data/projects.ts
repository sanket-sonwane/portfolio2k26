export type LinkStatus = "verified" | "placeholder";

export interface ProjectArchitectureNode {
  label: string;
  detail?: string;
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  description: string;
  problem: string;
  approach: string[];
  technologies: string[];
  capabilities: string[];
  /** Only metrics stated in the resume — never invent. */
  metrics: { value: string; label: string }[];
  /** Optional status line shown when a project has no numeric metrics. */
  statusLine?: string;
  architecture: ProjectArchitectureNode[];
  architectureCaption: string;
  github: string;
  githubStatus: LinkStatus;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "agentic-commerce-gateway",
    index: "01",
    title: "Agentic Commerce Gateway",
    subtitle: "AI-transactable merchant infrastructure (ACG)",
    date: "2026",
    category: "Agentic Commerce / AI Payments / FastAPI",
    description:
      "Built ACG, an agentic-commerce infrastructure layer that makes merchants transactable by unknown AI buyers with deterministic money authority, cryptographic user authorization, real Razorpay test-mode payments, failure recovery, interoperability certification, and independently verifiable transaction provenance.",
    problem:
      "AI buyers cannot transact with merchants today: discovery, pricing, payment authorization, and fulfillment live behind human-shaped interfaces with no machine-readable protocol — and letting an LLM touch money directly is unsafe.",
    approach: [
      "Deterministic money-authority layer separating LLM reasoning from financial execution, with policy gating and server-authoritative pricing",
      "Cryptographic user authorization via Ed25519 UserIntentAssertion and an AP2-inspired mandate chain — LLMs never hold payment authority",
      "Unknown Buyer certification so an independent AI client transacts using only the published protocol, plus graceful failure recovery",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Groq",
      "Razorpay Test Mode",
      "Ed25519",
      "SQLite",
      "React + Vite",
    ],
    capabilities: [
      "ACP-inspired machine-readable protocol",
      "Deterministic policy engine (C-1/C-2/C-3)",
      "TOCTOU + replay protection",
      "Ed25519 signed authorization",
      "Razorpay test-mode payments",
      "Unknown Buyer interoperability",
      "Failure recovery",
      "Hash-chained audit trails",
    ],
    metrics: [],
    statusLine:
      "Built · Not deployed — Unknown Buyer certified · Buyer-B interoperable",
    architecture: [
      { label: "Discovery", detail: "Machine-readable manifest" },
      { label: "Catalog" },
      { label: "Checkout", detail: "Server-authoritative pricing" },
      { label: "User Approval", detail: "Ed25519 signed intent" },
      { label: "Razorpay Payment", detail: "Test mode + reconciliation" },
      { label: "Order", detail: "Idempotent finalizer" },
      { label: "Fulfillment", detail: "Reservation-backed" },
      { label: "Audit Trail", detail: "SHA-256 hash-chained" },
    ],
    architectureCaption:
      "Conceptual flow — illustrative example, not production data.",
    github: "https://github.com/sanket-sonwane/agentic-commerce-gateway",
    githubStatus: "verified",
    featured: true,
  },
  {
    slug: "municipal-copilot",
    index: "02",
    title: "Municipal Asset Intelligence Copilot",
    subtitle: "Agentic AI · RAG · Enterprise AI",
    date: "May 2026 — Jul 2026",
    category: "Agentic AI / RAG / PostgreSQL",
    description:
      "An Agentic AI-powered intelligence copilot designed to perform accurate multi-step reasoning across millions of municipal asset records. Built during the Agentic AI Engineer internship at EPIC Technology Research.",
    problem:
      "Municipal asset data lives across millions of records in heterogeneous formats. Keyword search cannot answer multi-step operational questions that require intent understanding, retrieval over structured + vector data, and reasoned synthesis.",
    approach: [
      "Intent-aware query routing to direct each question to the right retrieval path",
      "Hybrid RAG over PostgreSQL + pgvector combining structured filters with vector search",
      "On-prem LLM orchestration for multi-step reasoning with retrieved context",
    ],
    technologies: [
      "Intent-aware query routing",
      "Hybrid RAG",
      "PostgreSQL",
      "pgvector",
      "On-prem LLM orchestration",
    ],
    capabilities: [
      "Intent-aware routing",
      "Hybrid retrieval",
      "Multi-step reasoning",
      "Large-scale asset Q&A",
    ],
    metrics: [{ value: "Millions", label: "Asset records reasoned over" }],
    architecture: [
      { label: "User Query" },
      { label: "Intent Detection" },
      { label: "Query Router" },
      { label: "Retrieval Layer", detail: "PostgreSQL · pgvector · Hybrid Search" },
      { label: "LLM Orchestration", detail: "On-prem" },
      { label: "Multi-step Reasoning" },
      { label: "Answer" },
    ],
    architectureCaption:
      "Conceptual flow — components limited to what the resume explicitly supports.",
    // TODO-VERIFY: replace with the real repository URL before publish.
    github: "https://github.com/sanket-sonwane",
    githubStatus: "placeholder",
    featured: true,
  },
  {
    slug: "tattvaquest",
    index: "03",
    title: "TattvaQuest",
    subtitle: "Autonomous Knowledge Retrieval Agent",
    date: "April 2026",
    category: "Agentic RAG / LlamaIndex",
    description:
      "An Agentic RAG system for multi-document question answering — chunking, embedding-based retrieval, hybrid search, query routing, tool calling, contextual reasoning, and retrieval-quality optimization.",
    problem:
      "Answering questions across multiple long documents requires more than naive vector search: chunking quality, retrieval strategy, routing, and reasoning over context all determine answer quality.",
    approach: [
      "Document chunking + embedding-based retrieval pipeline",
      "Hybrid search with query routing to the best retrieval path",
      "Tool calling + contextual reasoning for multi-document synthesis",
      "Retrieval-quality optimization loop",
    ],
    technologies: [
      "LlamaIndex",
      "RAG",
      "Embeddings",
      "Hybrid Search",
      "Tool Calling",
    ],
    capabilities: [
      "Document chunking",
      "Embedding-based retrieval",
      "Hybrid search",
      "Query routing",
      "Tool calling",
      "Contextual reasoning",
      "Retrieval-quality optimization",
      "Multi-document Q&A",
    ],
    metrics: [],
    architecture: [
      { label: "Documents" },
      { label: "Chunking" },
      { label: "Embedding" },
      { label: "Retrieval" },
      { label: "Hybrid Search" },
      { label: "Query Routing" },
      { label: "Contextual Reasoning" },
      { label: "Answer" },
    ],
    architectureCaption:
      "Conceptual pipeline — illustrative example, not production data.",
    // TODO-VERIFY: replace with the real repository URL before publish.
    github: "https://github.com/sanket-sonwane",
    githubStatus: "placeholder",
    featured: true,
  },
  {
    slug: "qa-forge",
    index: "04",
    title: "QA-Forge",
    subtitle: "AI-native Multi-Agent Auditing Platform",
    date: "March 2026",
    category: "Multi-Agent AI / LangGraph / FastAPI",
    description:
      "An Agentic AI multi-agent platform supporting agent collaboration, task orchestration, tool execution, API validation, adversarial testing, and automated engineering reports.",
    problem:
      "Auditing APIs and engineering systems by hand is slow and inconsistent. A collaborative agent platform can orchestrate validation, adversarial testing, and reporting as one workflow.",
    approach: [
      "Orchestrator decomposes auditing work across collaborating agents",
      "Agents execute tools: API validation and adversarial testing",
      "Verification layer consolidates findings into automated engineering reports",
    ],
    technologies: ["LangGraph", "FastAPI", "Multi-Agent AI"],
    capabilities: [
      "Agent collaboration",
      "Task orchestration",
      "Tool execution",
      "API validation",
      "Adversarial testing",
      "Automated engineering reports",
    ],
    metrics: [],
    architecture: [
      { label: "Orchestrator" },
      { label: "Agent Collaboration", detail: "Task orchestration · Tool execution" },
      { label: "API Validation", detail: "Adversarial testing" },
      { label: "Verification" },
      { label: "Engineering Report" },
    ],
    architectureCaption:
      "Conceptual collaboration flow — agent roles kept generic; only implementation-backed roles should be named.",
    // TODO-VERIFY: replace with the real repository URL before publish.
    github: "https://github.com/sanket-sonwane",
    githubStatus: "placeholder",
    featured: true,
  },
  {
    slug: "class-node",
    index: "05",
    title: "Class-Node",
    subtitle: "Real-time Quiz & Classroom Interaction System",
    date: "January 2025",
    category: "Realtime / React / Supabase",
    description:
      "A scalable real-time quiz platform with synchronized multiplayer participation, AI-generated quizzes, live analytics dashboards, and scheduled assessments.",
    problem:
      "Classrooms need low-friction, synchronized participation at scale — live quizzes, instant analytics for instructors, and scheduled assessments that just work.",
    approach: [
      "Realtime multiplayer sync for synchronized participation",
      "AI-generated quiz content pipeline",
      "Live analytics dashboards + scheduled assessments",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Supabase"],
    capabilities: [
      "Synchronized multiplayer participation",
      "AI-generated quizzes",
      "Live analytics dashboards",
      "Scheduled assessments",
    ],
    metrics: [{ value: "100+", label: "Weekly users" }],
    architecture: [
      { label: "Host Creates Quiz", detail: "AI-generated" },
      { label: "Realtime Sync", detail: "Supabase · Node.js" },
      { label: "Multiplayer Participation", detail: "React · TypeScript" },
      { label: "Live Analytics", detail: "Dashboards · Scheduled assessments" },
    ],
    architectureCaption:
      "Conceptual flow — illustrative example, not production data.",
    // TODO-VERIFY: replace with the real repository URL before publish.
    github: "https://github.com/sanket-sonwane",
    githubStatus: "placeholder",
    featured: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
