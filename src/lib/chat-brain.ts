import { playgroundAchievements } from "@/data/playground/achievements";
import { playgroundExperience } from "@/data/playground/experience";
import { profile } from "@/data/playground/profile";
import { playgroundProjects, tattvaquestInfo } from "@/data/playground/projects";
import { skillCategories } from "@/data/playground/skills";

export interface ChatIntent {
  id: string;
  keywords: string[];
  phrases: string[];
  answers: string[];
}

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "of", "for", "to", "in", "on", "at",
  "are", "is", "am", "was", "were", "be", "been", "being", "do", "does", "did",
  "done", "doing", "what", "how", "why", "which", "when", "where", "who", "whom",
  "whose", "tell", "me", "you", "your", "yours", "about", "please", "can", "could",
  "would", "should", "shall", "will", "i", "my", "mine", "with", "have", "has",
  "had", "having", "all", "more", "most", "some", "any", "want", "wants", "know",
  "knows", "just", "like", "from", "there", "their", "he", "his", "him", "her",
  "it", "its", "this", "that", "these", "those", "so", "such", "than", "then",
  "too", "very", "etc", "hey", "hi", "hello", "oh", "uh", "hmm",
]);

const SHORTCUTS: Record<string, string> = {
  u: "you",
  r: "are",
  ur: "your",
  youre: "you are",
  ure: "you are",
  wht: "what",
  wat: "what",
  whts: "what is",
  whats: "what is",
  whos: "who is",
  bout: "about",
  abt: "about",
  plz: "please",
  pls: "please",
  tnx: "thanks",
  thx: "thanks",
  ty: "thanks",
  thnx: "thanks",
  k: "ok",
  kk: "ok",
  okay: "ok",
  hvae: "have",
  dont: "do not",
  doesnt: "does not",
  didnt: "did not",
  im: "i am",
  ill: "i will",
  id: "i would",
  ive: "i have",
  sankets: "sanket",
  cv: "resume",
};

export function normalizeText(raw: string): string {
  const lowered = raw.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
  const collapsed = lowered.replace(/\s+/g, " ").trim();
  // "u r" -> "you are" (two-word shortcuts first)
  const twoWord: Record<string, string> = { "u r": "you are" };
  let out = ` ${collapsed} `;
  for (const [k, v] of Object.entries(twoWord)) {
    out = out.split(` ${k} `).join(` ${v} `);
  }
  return out
    .trim()
    .split(" ")
    .map((w) => SHORTCUTS[w] ?? w)
    .join(" ");
}

export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) => [i]);
  for (let j = 1; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[m][n];
}

function hasContiguousTokens(haystack: string[], needle: string[]): boolean {
  if (needle.length === 0 || needle.length > haystack.length) return false;
  outer: for (let i = 0; i <= haystack.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) continue outer;
    }
    return true;
  }
  return false;
}

const CONTACT_LINES = [
  `You can reach Sanket here:\nEmail: ${profile.social.email}\nGitHub: ${profile.social.github}\nLinkedIn: ${profile.social.linkedin}\nPhone: ${profile.phone}`,
  `Best way to reach him:\nEmail: ${profile.social.email}\nPhone: ${profile.phone}\nGitHub: ${profile.social.github}\nLinkedIn: ${profile.social.linkedin}`,
];

/* ---------------- derived counts ---------------- */

const skillAreaCount = skillCategories.length;
const skillCount = skillCategories.reduce((n, c) => n + c.skills.length, 0);
const projectCount = playgroundProjects.length;
const internshipCount = playgroundExperience.filter((e) => e.role.toLowerCase().includes("intern")).length;
const leadershipCount = playgroundExperience.length - internshipCount;

/* ---------------- builders ---------------- */

function buildSkillsAnswers(): string[] {
  const catLines = skillCategories
    .map((c) => `${c.title}: ${c.skills.map((s) => s.name).join(", ")}`)
    .join("\n");
  const flat = skillCategories.flatMap((c) => c.skills.map((s) => s.name)).join(", ");
  return [
    `Sanket works across ${skillAreaCount} areas and ${skillCount} skills:\n${catLines}\nAsk about any skill — try "rag", "langgraph", or "react".`,
    `His stack in one line: ${flat}.`,
  ];
}

function buildProjectsAnswers(): string[] {
  const list = playgroundProjects
    .map((p, i) => `${i + 1}. ${p.title} (${p.year}) — ${p.tagline}`)
    .join("\n");
  return [
    `${projectCount} things Sanket has built:\n${list}\nAsk for a deep-dive — e.g. "acg", "qa forge", "visionmitra", or "tattvaquest".`,
    `Flagships: ACG (agentic commerce with real Razorpay payments + interop certification), QA-Forge (live multi-agent auditor), NemotronGuard (98% 5G detection), VisionMitra (sub-second YOLOv8 alerts), and the EPIC Municipal Copilot (RAG over millions of records). Which one do you want unpacked?`,
  ];
}

function buildExperienceAnswers(): string[] {
  const lines = playgroundExperience
    .map((e) => `• ${e.role}, ${e.company} (${e.period}) — ${e.achievements[0]}`)
    .join("\n");
  return [
    `${internshipCount} internships + ${leadershipCount} leadership role:\n${lines}`,
    `From research (COEP) to industrial automation (ARAI) to Agentic AI (EPIC) — plus leading placements as TPC Head at PVPIT.`,
  ];
}

function buildAchievementsAnswers(): string[] {
  const lines = playgroundAchievements
    .map((a) => `• ${a.title} (${a.date}) — ${a.subtitle}`)
    .join("\n");
  return [`Sanket's highlights:\n${lines}`];
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildSkillDetailIntents(): ChatIntent[] {
  return skillCategories.flatMap((c) =>
    c.skills.map((s) => ({
      id: `skill-${slugify(s.name)}`,
      keywords: [s.name.toLowerCase()],
      phrases: [
        `what is ${s.name.toLowerCase()}`,
        `tell me about ${s.name.toLowerCase()}`,
        `about ${s.name.toLowerCase()}`,
        `do you know ${s.name.toLowerCase()}`,
      ],
      answers: [
        `${s.name} (${c.title}) — ${s.level}. Evidence: ${s.experience}. ${s.description}`,
      ],
    })),
  );
}

function buildProjectDetailIntents(): ChatIntent[] {
  const intents: ChatIntent[] = playgroundProjects.map((p) => {
    const firstPara = p.mechanism.split("\n\n")[0];
    const metrics =
      p.metrics.length > 0
        ? `\nMetrics: ${p.metrics.map((m) => `${m.value} ${m.label}`).join(" · ")}`
        : "";
    const links = [
      p.links.repo ? `GitHub: ${p.links.repo}` : null,
      p.links.demo ? `Live: ${p.links.demo}` : null,
      p.links.backend ? `Backend: ${p.links.backend}` : null,
      p.links.paper ? `Paper: ${p.links.paper}` : null,
    ].filter(Boolean);
    return {
      id: `project-${p.slug}`,
      keywords: [p.title.toLowerCase(), p.slug.replace(/-/g, " "), ...(p.aliases ?? [])],
      phrases: [
        `what is ${p.title.toLowerCase()}`,
        `tell me about ${p.title.toLowerCase()}`,
        `about ${p.title.toLowerCase()}`,
      ],
      answers: [
        `${p.title} (${p.year}, ${p.status}) — ${p.tagline}.\n${p.overview}\n${firstPara}${metrics}\nStack: ${p.stack.join(", ")}${links.length > 0 ? `\n${links.join("\n")}` : ""}\nTakeaway: ${p.takeaway}`,
      ],
    };
  });
  intents.push({
    id: "project-tattvaquest",
    keywords: ["tattvaquest", "tattva"],
    phrases: ["what is tattvaquest", "tell me about tattvaquest", "about tattvaquest"],
    answers: [`${tattvaquestInfo.summary}\n${tattvaquestInfo.detail}`],
  });
  return intents;
}

/* ---------------- static answers ---------------- */

const researchAnswers = [
  `Research: "Lightweight Trust-Based Detection of Rogue Nodes in MEC" — submitted to AEUE (Q2 journal). The SDN framework hit 98% accuracy at <3% CPU and <50ms delay, validated in Mininet + Ryu simulations during his COEP Tech internship.`,
  `His COEP Tech work (May–Jul 2025) became NemotronGuard thinking: trust-scored rogue-node detection for 5G MEC at 98% accuracy, <3% CPU, <50ms — presented at NVIDIA's Nemotron Workshop.`,
];

const blogAnswers = [
  `No blog yet — but every project here has a deep-dive. Ask about "qa forge", "visionmitra", or "municipal copilot" and I'll unpack mechanism, metrics, and takeaways.`,
];

const whoAnswers = [
  `${profile.name} — ${profile.role}.\n${profile.tagline}`,
  `That's ${profile.name}, an AI Engineer from ${profile.location}. ${profile.tagline}`,
];

const doAnswers = [
  `He builds Agentic AI systems (QA-Forge, Municipal Copilot), RAG pipelines (TattvaQuest, EPIC), realtime apps (Class-Node, 100+ weekly users), vision systems (VisionMitra), and 5G security research (98% detection). Plus industrial automation that cut 10 hours to 10 seconds.`,
];

const educationAnswers = [
  `Education:\n• B.E. Computer Engineering, SPPU (2024–27) — SGPA 9.14\n• Diploma in IT, AISSMS Polytechnic Pune (2021–24) — 85.13%`,
];

const timelineAnswers = [
  `Timeline:\n• 2021–24: Diploma IT, AISSMS (85.13%)\n• 2024: TPC Head (PVPIT) + HackerRank Crew Lead\n• 2024–27: B.E. Computer, SPPU (SGPA 9.14)\n• May–Jul 2025: Research Intern, COEP Tech\n• Dec 2025–Feb 2026: Python Intern, ARAI\n• 2026: Agentic AI Intern, EPIC`,
];

const locationAnswers = [
  `Based in ${profile.location}. Open to opportunities in Hyderabad and Bangalore — and remote AI engineering roles.`,
];

const hobbiesAnswers = [
  `Off the keyboard: leading tech communities (HackerRank Crew, TPC), hosting events (3+ state-level, 1 international), and presenting research — most recently at NVIDIA's Nemotron Workshop.`,
];

const botAnswers = [
  `I'm a tiny rule-based assistant living in this portfolio — no API, no model calls, just keyword + fuzzy matching over Sanket's verified notes. Ask me about skills, projects, experience, or research.`,
];

const greetingAnswers = [
  `Hey! Ask me about Sanket's skills, projects, internships, research, or achievements.`,
  `Hi there! I know Sanket's profile well — try "skills", "projects", or "experience".`,
];

const statusAnswers = [
  `All systems nominal. ${projectCount} projects indexed, ${skillCount} skills loaded, 0 hallucinations detected. What do you want to know?`,
];

const thanksAnswers = [
  `Anytime! If you want to work with Sanket: ${profile.social.email}`,
  `Glad to help! His GitHub is ${profile.social.github} if you want to dig deeper.`,
];

const byeAnswers = [
  `Bye! Sanket's inbox is open at ${profile.social.email} whenever you're ready.`,
  `See you! Don't forget — ${profile.social.github} for the code.`,
];

const resumeAnswers = [
  `Resume snapshot: 3 internships (COEP research, ARAI automation, EPIC Agentic AI), 99.94% processing-time cut, 98% detection accuracy, 100+ weekly users on Class-Node. Full PDF: /resume.pdf — or email ${profile.social.email}.`,
];

const hireAnswers = [
  `Hire him for: Agentic AI / multi-agent systems, RAG over large datasets, FastAPI backends, realtime apps, or applied research. He ships — QA-Forge is live, ARAI's pipeline is deployed. Contact: ${profile.social.email} · ${profile.phone}`,
];

const helpAnswers = [
  `I can talk about: skills (try "rag"), projects (try "qa forge"), experience, education, timeline, research, achievements, contact, resume, hiring, location. Typos welcome — I fuzzy-match.`,
];

/* ---------------- intent table ---------------- */

const baseIntents: ChatIntent[] = [
  { id: "greetings", keywords: ["hi", "hello", "hey", "ok"], phrases: ["good morning", "good afternoon", "good evening"], answers: greetingAnswers },
  { id: "status", keywords: ["status", "working", "alive", "uptime"], phrases: ["are you working", "are you there", "system status"], answers: statusAnswers },
  { id: "who", keywords: ["sanket", "who", "name", "person", "founder", "himself"], phrases: ["who are you", "who is sanket", "who is he", "about sanket", "introduce yourself"], answers: whoAnswers },
  { id: "whatdo", keywords: ["does", "build", "role", "job", "engineer"], phrases: ["what does he do", "what do you do", "what does sanket do"], answers: doAnswers },
  {
    id: "skills",
    keywords: ["skill", "skills", "skilz", "skils", "skillz", "stack", "tech", "technologies", "tools", "toolset", "expertise"],
    phrases: ["what are his skills", "tech stack", "what tools", "list skills"],
    answers: buildSkillsAnswers(),
  },
  {
    id: "projects",
    keywords: ["project", "projects", "projecs", "projekt", "porjects", "built", "builds", "portfolio", "work"],
    phrases: ["what did he build", "show projects", "list projects", "his projects"],
    answers: buildProjectsAnswers(),
  },
  { id: "experience", keywords: ["experience", "internship", "internships", "intern", "epic", "arai", "coep", "tpc", "pvpit", "career", "10 hours", "hours", "seconds"], phrases: ["work experience", "where did he intern", "his internships", "tell me about epic"], answers: buildExperienceAnswers() },
  { id: "education", keywords: ["education", "degree", "college", "university", "sppu", "diploma", "aissms", "sgpa", "marks", "study", "studied"], phrases: ["where did he study", "his education", "what did he study"], answers: educationAnswers },
  { id: "timeline", keywords: ["timeline", "journey", "history", "path", "chronology"], phrases: ["career timeline", "his journey", "walk me through"], answers: timelineAnswers },
  { id: "research", keywords: ["research", "paper", "aeue", "journal", "publication", "q2", "rogue", "mec", "5g", "sdn", "detection"], phrases: ["his research", "tell me about research", "research paper"], answers: researchAnswers },
  {
    id: "achievements",
    keywords: ["achievement", "achievements", "achivments", "acheivements", "award", "awards", "nvidia", "nemotron", "workshop", "hackerrank", "host", "events"],
    phrases: ["his achievements", "any awards", "tell me about nvidia"],
    answers: buildAchievementsAnswers(),
  },
  { id: "blog", keywords: ["blog", "blogs", "article", "articles", "writing", "posts"], phrases: ["does he blog", "his blog", "any articles"], answers: blogAnswers },
  { id: "contact", keywords: ["contact", "contect", "contatc", "email", "phone", "number", "linkedin", "github", "reach", "social"], phrases: ["how to contact", "contact him", "get in touch", "his email"], answers: CONTACT_LINES },
  { id: "resume", keywords: ["resume", "cv", "pdf", "download"], phrases: ["his resume", "download resume", "send resume"], answers: resumeAnswers },
  { id: "hire", keywords: ["hire", "hiring", "job", "jobs", "opportunity", "freelance", "employ", "recruit"], phrases: ["why hire him", "hire sanket", "open to work"], answers: hireAnswers },
  { id: "location", keywords: ["location", "based", "city", "pune", "hyderabad", "bangalore", "remote", "relocate", "live"], phrases: ["where is he based", "where does he live"], answers: locationAnswers },
  { id: "hobbies", keywords: ["hobby", "hobbies", "interests", "fun", "free", "community"], phrases: ["what are his hobbies", "outside work", "free time"], answers: hobbiesAnswers },
  { id: "bot", keywords: ["bot", "assistant", "ai", "model", "llm", "chatbot", "robot"], phrases: ["what are you", "are you ai", "how do you work"], answers: botAnswers },
  { id: "thanks", keywords: ["thanks", "thank", "great", "awesome", "nice", "cool", "helpful"], phrases: ["thank you", "thanks a lot"], answers: thanksAnswers },
  { id: "bye", keywords: ["bye", "goodbye", "later", "cya", "goodnight"], phrases: ["see you", "good bye"], answers: byeAnswers },
  { id: "help", keywords: ["help", "options", "commands", "menu", "start"], phrases: ["what can you do", "help me"], answers: helpAnswers },
];

export const chatIntents: ChatIntent[] = [
  ...baseIntents,
  ...buildSkillDetailIntents(),
  ...buildProjectDetailIntents(),
];

/* ---------------- matching ---------------- */

export interface MatchResult {
  intent: ChatIntent;
  viaFuzzy: boolean;
}

export function matchIntent(raw: string): MatchResult | null {
  const q = normalizeText(raw);
  if (!q) return null;
  const tokens = q.split(" ").filter(Boolean);
  const meaningful = tokens.filter((t) => t.length >= 3 && !STOPWORDS.has(t));
  const pool = meaningful.length > 0 ? meaningful : tokens;

  let best: ChatIntent | null = null;
  let bestScore = 0;
  let viaFuzzy = false;

  for (const intent of chatIntents) {
    let score = 0;
    let fuzzy = false;

    for (const phrase of intent.phrases) {
      const np = normalizeText(phrase);
      if (q === np) {
        score += 100;
        continue;
      }
      if (hasContiguousTokens(tokens, np.split(" "))) score += 55;
    }

    for (const kw of intent.keywords) {
      const nk = normalizeText(kw);
      if (!nk) continue;
      const kws = nk.split(" ").filter(Boolean);

      // Multi-word keyword (e.g. "qa forge", "hybrid rag")
      if (kws.length > 1) {
        if (hasContiguousTokens(tokens, kws)) {
          score += 14;
          continue;
        }
        const core = kws.filter((w) => w.length >= 3 && !STOPWORDS.has(w));
        if (core.length > 0 && core.every((w) => tokens.includes(w))) {
          score += 10;
          continue;
        }
        if (core.some((w) => tokens.includes(w))) score += 6;
        continue;
      }

      // Stopwords are usually dropped as noise, but a keyword like "hi", "who"
      // or "does" is still a real trigger. Match it exactly, at a lower weight
      // than substantive keywords so it can never beat a content match.
      const isStop = STOPWORDS.has(nk);
      if (tokens.includes(nk)) {
        score += isStop ? 6 : 14;
        continue;
      }
      if (isStop) continue;
      if (nk.length >= 4) {
        if (pool.some((t) => t.length >= 4 && (t.startsWith(nk) || nk.startsWith(t)))) score += 8;
      }
      for (const t of pool) {
        if (t.length < 3 || nk.length < 3) continue;
        if (t[0] !== nk[0]) continue;
        const maxDist = t.length <= 4 || nk.length <= 4 ? 1 : 3;
        const d = levenshtein(t, nk);
        if (d >= 1 && d <= maxDist) {
          score += d === 1 ? 8 : d === 2 ? 4 : 2;
          fuzzy = true;
          break;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = intent;
      viaFuzzy = fuzzy;
    }
  }

  if (!best || bestScore < 5) return null;
  return { intent: best, viaFuzzy };
}

const FALLBACKS = [
  (q: string) =>
    `I don't have that in my notes yet (you asked "${q}"). I can tell you about: skills, projects, experience, research, achievements, or contact.`,
  (q: string) =>
    `Hmm, nothing on "${q}". Want to try "skills", "qa forge", "experience", or "contact" instead?`,
];

export function fallbackReply(raw: string): string {
  const q = raw.trim().slice(0, 80) || "that";
  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)](q);
}
