export interface PlaygroundProject {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  status: string;
  role: string;
  stack: string[];
  links: { repo?: string; demo?: string; backend?: string; paper?: string };
  metrics: { value: string; label: string }[];
  overview: string;
  mechanism: string;
  takeaway: string;
}

export interface PlaygroundProject {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  status: string;
  role: string;
  /** Extra match keywords (acronyms, domains) for the chat brain. */
  aliases?: string[];
  stack: string[];
  links: { repo?: string; demo?: string; backend?: string; paper?: string };
  metrics: { value: string; label: string }[];
  overview: string;
  mechanism: string;
  takeaway: string;
}

/** 10 projects — user-verified source of truth. */
export const playgroundProjects: PlaygroundProject[] = [
  {
    slug: "agentic-commerce-gateway",
    title: "Agentic Commerce Gateway",
    tagline: "AI-transactable merchant infrastructure (ACG)",
    year: "2026",
    status: "Built · Not deployed — Unknown Buyer certified · Buyer-B interoperable",
    role: "Designer & Builder",
    aliases: [
      "acg",
      "agentic commerce",
      "commerce gateway",
      "razorpay",
      "checkout",
      "mandate",
      "payment",
      "money authority",
    ],
    stack: [
      "Python",
      "FastAPI",
      "Groq",
      "SQLite",
      "Razorpay Test Mode",
      "Ed25519",
      "SSE",
      "React",
      "Vite",
    ],
    links: {
      repo: "https://github.com/sanket-sonwane/agentic-commerce-gateway",
    },
    metrics: [],
    overview:
      "ACG is an agentic-commerce infrastructure layer that makes a merchant end-to-end transactable by an independent AI buyer through a machine-readable, ACP-inspired commerce protocol — covering discovery, catalog, checkout, user approval, Razorpay payment, order, fulfillment, failure recovery, and provenance.",
    mechanism:
      "A deterministic money-authority layer separates LLM reasoning from financial execution, with policy gating, server-authoritative pricing, and C-1/C-2/C-3 protections.\n\nUser authorization is cryptographically signed (Ed25519 UserIntentAssertion, AP2-inspired mandate chain) while LLMs never receive payment authority — and an unseen buyer can transact using only the published protocol.",
    takeaway:
      "Money movement must be deterministic and verifiable; the LLM proposes, the money layer disposes.",
  },
  {
    slug: "qa-forge",
    title: "QA-Forge",
    tagline: "Multi-agent code auditor",
    year: "2026",
    status: "Live",
    role: "Designer & Builder",
    stack: ["LangGraph", "FastAPI", "Next.js 15", "Supabase", "Groq", "Webhooks", "Pydantic v2"],
    links: {
      repo: "https://github.com/sanket-sonwane/QA-Agent-",
      demo: "https://qaforge-jet.vercel.app",
      backend: "https://qaforge-api.onrender.com",
    },
    metrics: [{ value: "Multi-agent", label: "Collaborative auditing" }],
    overview:
      "QA-Forge is an AI-native multi-agent auditing platform. An orchestrator decomposes auditing work across collaborating agents that validate APIs, run adversarial tests, and compile automated engineering reports.",
    mechanism:
      "A LangGraph orchestrator fans tasks out to worker agents.\n\nWorkers execute tools — API validation, adversarial probing — then a verification layer consolidates findings into a structured engineering report served through FastAPI + Next.js.",
    takeaway:
      "Stateful agent graphs with explicit handoffs beat loose prompt-chains for verifiable engineering work.",
  },
  {
    slug: "nemotron-guard",
    title: "NemotronGuard",
    tagline: "AI crisis shield for 5G",
    year: "2025",
    status: "Research prototype",
    role: "Researcher & Builder",
    stack: ["Nemotron-3", "Python", "Mininet", "Ryu", "Trust scoring"],
    links: {},
    metrics: [
      { value: "98%", label: "Detection accuracy" },
      { value: "<3%", label: "CPU usage" },
      { value: "<50ms", label: "Detection delay" },
    ],
    overview:
      "NemotronGuard is the AI-powered cybersecurity project presented at NVIDIA's Nemotron Workshop — a trust-based shield that detects rogue nodes threatening 5G edge infrastructure.",
    mechanism:
      "SDN telemetry feeds a lightweight trust-scoring layer.\n\nNodes whose behavior diverges from trust baselines are flagged in real time, validated in Mininet + Ryu simulations.",
    takeaway:
      "Security at the edge has to be light: 98% accuracy means nothing if it costs too much CPU or latency.",
  },
  {
    slug: "visionmitra",
    title: "VisionMitra",
    tagline: "YOLOv8 mobility assistant",
    year: "2025",
    status: "Working prototype",
    role: "Builder",
    stack: ["YOLOv8", "OpenCV", "FastAPI", "MongoDB", "Expo", "React Native"],
    links: {},
    metrics: [
      { value: "<1s", label: "Alert latency" },
      { value: "3", label: "Risk levels" },
    ],
    overview:
      "VisionMitra is a mobility-assistance app: a YOLOv8 vision backend detects obstacles in real time and pushes graded alerts to a React Native (Expo) client.",
    mechanism:
      "Phone camera frames stream to a FastAPI service.\n\nYOLOv8 + OpenCV detect and classify obstacles, a 3-level risk scorer grades urgency, and sub-second alerts reach the Expo app.",
    takeaway:
      "Real-time CV is a systems problem — model, transport, and UX budgets all have to fit under one second.",
  },
  {
    slug: "multi-tenant-saas",
    title: "Multi-Tenant SaaS",
    tagline: "Spring Boot + Next.js platform",
    year: "2025",
    status: "Built",
    role: "Builder",
    stack: ["Java Spring Boot", "Next.js", "PostgreSQL"],
    links: {},
    metrics: [{ value: "Multi-tenant", label: "Isolated workspaces" }],
    overview:
      "A multi-tenant SaaS starter: isolated tenant workspaces served by a Spring Boot backend with a Next.js frontend.",
    mechanism:
      "Tenant resolution happens per request against isolated schemas.\n\nSpring Boot enforces data boundaries while Next.js delivers the tenant-aware UI.",
    takeaway:
      "Tenancy is a data-boundary discipline first, a feature second.",
  },
  {
    slug: "event-registration",
    title: "Event Registration API",
    tagline: "FastAPI + Pydantic v2",
    year: "2025",
    status: "Built",
    role: "Builder",
    stack: ["FastAPI", "Pydantic v2"],
    links: {},
    metrics: [{ value: "Validated", label: "Typed registrations" }],
    overview:
      "A clean event-registration backend built on FastAPI with strict Pydantic v2 schemas for every payload.",
    mechanism:
      "Requests hit typed routes validated by Pydantic models.\n\nValidation errors return structured, client-actionable responses instead of 500s.",
    takeaway:
      "Strict schemas at the boundary eliminate entire classes of backend bugs.",
  },
  {
    slug: "class-node",
    title: "Class-Node",
    tagline: "Realtime quiz & classroom interaction",
    year: "2025",
    status: "Live with users",
    role: "Builder",
    stack: ["React", "TypeScript", "Node.js", "Supabase"],
    links: {},
    metrics: [{ value: "100+", label: "Weekly users" }],
    overview:
      "Class-Node is a scalable real-time quiz platform with synchronized multiplayer participation, AI-generated quizzes, live analytics dashboards, and scheduled assessments.",
    mechanism:
      "Hosts create AI-generated quizzes that sync to every participant in real time.\n\nSupabase realtime channels keep game state consistent while dashboards aggregate live analytics.",
    takeaway:
      "Realtime UX lives or dies on state sync — the transport is the product.",
  },
  {
    slug: "municipal-copilot",
    title: "Municipal Asset Intelligence Copilot",
    tagline: "Agentic RAG over millions of records",
    year: "2026",
    status: "Internship (EPIC)",
    role: "Agentic AI Engineer Intern",
    stack: ["LangChain", "Hybrid RAG", "pgvector", "PostgreSQL", "On-prem LLM"],
    links: {},
    metrics: [{ value: "Millions", label: "Asset records reasoned over" }],
    overview:
      "Built at EPIC Technology Research: an Agentic AI copilot performing accurate multi-step reasoning across millions of municipal asset records with on-prem LLM orchestration.",
    mechanism:
      "Intent-aware routing directs each query to the right retrieval path.\n\nHybrid RAG over PostgreSQL + pgvector grounds multi-step reasoning in retrieved asset context.",
    takeaway:
      "Routing the question correctly matters as much as retrieving correctly.",
  },
  {
    slug: "arai-photogrammetry",
    title: "ARAI Photogrammetry Automation",
    tagline: "ZEISS INSPECT pipeline",
    year: "2025–26",
    status: "Deployed (ARAI)",
    role: "Python Developer Intern",
    stack: ["Python", "ZEISS INSPECT API"],
    links: {},
    metrics: [{ value: "10h → 10s", label: "Processing time" }],
    overview:
      "A production Python pipeline at ARAI automating marker association, validation, and quality checks for industrial photogrammetry via the ZEISS INSPECT API.",
    mechanism:
      "Marker association, validation, and quality checks run as one automated pass.\n\nWhat took engineers 10 hours of manual work now completes in 10 seconds — a 99.94% cut.",
    takeaway:
      "The best automation removes the whole task, not just a step of it.",
  },
  {
    slug: "coep-rogue-node",
    title: "COEP Rogue-Node Detection",
    tagline: "SDN security for 5G MEC",
    year: "2025",
    status: "Paper submitted (AEUE Q2)",
    role: "Research Intern",
    stack: ["Python", "Mininet", "Ryu", "SDN"],
    links: {},
    metrics: [
      { value: "98%", label: "Accuracy" },
      { value: "<3%", label: "CPU" },
      { value: "<50ms", label: "Delay" },
    ],
    overview:
      "A lightweight SDN-based rogue-node detection framework for 5G MEC, validated in Mininet + Ryu simulations and submitted to AEUE (Q2 journal).",
    mechanism:
      "Trust scores accumulate from SDN-observed node behavior.\n\nLightweight detection flags rogues at 98% accuracy while staying under 3% CPU and 50ms delay.",
    takeaway:
      "Edge security research is won on efficiency metrics, not just accuracy.",
  },
];

/** Extra intent-only entry: in development, no public repo. */
export const tattvaquestInfo = {
  slug: "tattvaquest",
  title: "TattvaQuest",
  summary:
    "TattvaQuest is Sanket's autonomous knowledge retrieval agent — an Agentic RAG system with document chunking, embedding-based retrieval, hybrid search, query routing, tool calling, and contextual reasoning for multi-document Q&A.",
  detail:
    "Built with LlamaIndex, it optimizes retrieval quality end to end: chunking strategy, hybrid search over embeddings + keywords, routing each query to the best retrieval path, and reasoning over the retrieved context. Currently in development — no public repo yet.",
};
