export const FALLBACK = "I don’t have verified information about that";

export type Citation = { label: string; href: string };
export type Evidence = { answer: string; citations: Citation[] };

// Only reviewed, public resume facts live here. The model never writes answer text.
const catalogue = {
  background: {
    answer:
      "Vivekananda Cherukupally is pursuing a B.Tech in Computer Science and Engineering at Symbiosis Institute of Technology, Hyderabad (2025–2029). He is currently an ML Engineer (Contract) at Handshake AI (Jul 2026–Present).",
    citations: [
      { label: "Experience and education", href: "#experience" },
    ],
  },
  role: {
    answer:
      "At Handshake AI, Vivekananda evaluates AI outputs for accuracy, relevance, consistency, and usability; iterates on prompt-based systems using feedback; builds and tests automation pipelines; troubleshoots environments; and works with Git/GitHub, Docker, and REST API integrations.",
    citations: [{ label: "Current role", href: "#experience" }],
  },
  fit: {
    answer:
      "His documented work connects three AI Generalist capabilities to examples: AI output evaluation in his Handshake AI role and AI Accountant Agent, prompt and workflow iteration in the role and automation projects, and practical AI-enabled full-stack building in the Pinterest app and other projects.",
    citations: [
      { label: "Current role", href: "#experience" },
      { label: "Project evidence", href: "#evidence" },
    ],
  },
  evaluation: {
    answer:
      "The clearest project example is the in-progress AI Accountant Agent: Vivekananda manually compares its outputs with hand calculations to evaluate accuracy and refine the workflow. His Handshake AI contract role also involves assessing output accuracy, relevance, consistency, and usability.",
    citations: [
      { label: "AI Accountant Agent", href: "#accountant" },
      { label: "Handshake AI", href: "#experience" },
    ],
  },
  iteration: {
    answer:
      "He uses feedback to improve prompt-based systems in his Handshake AI role. His in-progress AI Accountant Agent combines Python, n8n, LLM APIs, spreadsheets, and automation workflows; his built Pinterest Affiliate Automation App connects topic input to titles, descriptions, keywords, and content workflows.",
    citations: [
      { label: "Current role", href: "#experience" },
      { label: "AI Accountant Agent", href: "#accountant" },
      { label: "Pinterest app", href: "#pinterest" },
    ],
  },
  accountant: {
    answer:
      "The AI Accountant Agent is in progress (Mar 2026–Present). Vivekananda is developing an AI-powered agent for financial calculations, expense tracking, ledger understanding, and report generation. He manually compares AI outputs with hand calculations; no shipped result or measured performance is claimed.",
    citations: [{ label: "AI Accountant Agent", href: "#accountant" }],
  },
  pinterest: {
    answer:
      "Vivekananda built the Pinterest Affiliate Automation App (May–Jun 2026). It generates titles, descriptions, keywords, and content workflows from a niche or topic and checks product–niche match and relevance. The documented stack includes Python, React, Node.js, LLM APIs, and REST APIs; no performance result is asserted.",
    citations: [{ label: "Pinterest app", href: "#pinterest" }],
  },
  tutor: {
    answer:
      "AI Tutor is a prototype from Sep 2025 for personalized learning using generative AI / LLMs and learning-focused interfaces. Its listed tools are Python, React, and external APIs. No learning outcome is claimed.",
    citations: [{ label: "AI Tutor", href: "#tutor" }],
  },
  stadium: {
    answer:
      "StadiumFlow was designed in Mar 2025 as a ticket-linked crowd-navigation and stadium-experience application connecting live position, seat navigation, amenities, and food ordering. It is a design, not a claimed shipped product.",
    citations: [{ label: "StadiumFlow", href: "#stadium" }],
  },
  tractor: {
    answer:
      "Vivekananda built an automated tractor prototype for his college Project Expo. It was his first hardware project; no additional performance claim is documented.",
    citations: [{ label: "Automated Tractor Prototype", href: "#tractor" }],
  },
  skills: {
    answer:
      "His documented toolkit includes Python, C++, C, JavaScript; generative AI, LLMs, AI agents, prompt engineering, model evaluation, training workflows and output validation; Pandas, NumPy, spreadsheets and SQL fundamentals; React, HTML, CSS, Node.js and REST APIs; plus Git, GitHub, Docker, VS Code, Google AI Studio, Postman and n8n.",
    citations: [{ label: "Skills and tools", href: "#skills" }],
  },
  impact: {
    answer:
      "The verified evidence describes his methods and deliverables, not quantified business impact. For example, the AI Accountant Agent uses manual checks against hand calculations, and the Pinterest app connects generation with relevance checks. The resume does not provide accuracy percentages, revenue, adoption, or other measured outcomes.",
    citations: [
      { label: "AI Accountant Agent", href: "#accountant" },
      { label: "Pinterest app", href: "#pinterest" },
    ],
  },
  leadership: {
    answer:
      "Vivekananda volunteered at the Under 25 Summit, supporting event coordination, participants, and technical needs. He also participated in technical presentations and speaking activities, and took part in Smart India Hackathon, Open AI Virtual Hackathon, and a 24-Hour Algorand Hackathon. No formal management role is claimed.",
    citations: [{ label: "Activities and leadership", href: "#activity" }],
  },
  contact: {
    answer:
      "The public contact route on this site is Vivekananda’s LinkedIn profile. His GitHub profile is also linked for public work. Private contact details are intentionally not published.",
    citations: [{ label: "Public contact links", href: "#contact" }],
  },
} satisfies Record<string, Evidence>;

export type EvidenceId = keyof typeof catalogue;
export const evidence: Record<EvidenceId, Evidence> = catalogue;
export const evidenceIds = Object.keys(evidence) as EvidenceId[];