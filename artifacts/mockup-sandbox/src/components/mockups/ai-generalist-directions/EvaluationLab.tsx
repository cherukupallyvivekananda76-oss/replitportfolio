import { useState } from "react";

type Project = {
  id: string;
  index: string;
  title: string;
  date: string;
  state: string;
  stateTone: "live" | "built" | "prototype" | "hardware";
  brief: string;
  contribution: string;
  evidence: string;
  tools: string[];
};

const projects: Project[] = [
  {
    id: "accountant",
    index: "01",
    title: "AI Accountant Agent",
    date: "Mar 2026 — Present",
    state: "IN PROGRESS",
    stateTone: "live",
    brief:
      "Financial calculations, expense tracking, ledger understanding, and report generation need dependable, reviewable outputs.",
    contribution:
      "Developing an AI-powered agent and refining its workflows through manual comparisons between AI outputs and hand calculations.",
    evidence:
      "The current evaluation method is a direct output-to-hand-calculation comparison. The project is in progress; no shipped result is claimed.",
    tools: ["Python", "n8n", "LLM APIs", "Spreadsheets", "Automation"],
  },
  {
    id: "pinterest",
    index: "02",
    title: "Pinterest Affiliate Automation App",
    date: "May — Jun 2026",
    state: "BUILT",
    stateTone: "built",
    brief:
      "Turning a niche or topic into Pinterest-ready content requires connected ideation and publishing-preparation steps.",
    contribution:
      "Built a tool that generates titles, descriptions, keywords, and content workflows; checked product–niche match and relevance.",
    evidence:
      "The project demonstrates a connected content workflow and relevance checks. No performance outcomes are asserted.",
    tools: ["Python", "React", "Node.js", "LLM APIs", "REST APIs"],
  },
  {
    id: "tutor",
    index: "03",
    title: "AI Tutor",
    date: "Sep 2025",
    state: "PROTOTYPE",
    stateTone: "prototype",
    brief:
      "A learning interface can adapt explanations and practice around a learner's needs.",
    contribution:
      "Built a prototype for personalized learning with generative AI / LLMs and learning-focused interfaces.",
    evidence:
      "Prototype evidence: an AI-assisted learning concept expressed through an interface. No learning outcomes are claimed.",
    tools: ["Python", "React", "External APIs"],
  },
  {
    id: "stadium",
    index: "04",
    title: "StadiumFlow",
    date: "Mar 1 — 20, 2025",
    state: "DESIGNED",
    stateTone: "prototype",
    brief:
      "Stadium visitors need a connected way to orient themselves, navigate to seats, find amenities, and order food.",
    contribution:
      "Designed a crowd-navigation and stadium-experience application using ticket details to connect live position, seat navigation, amenities, and food ordering.",
    evidence:
      "Design evidence: a ticket-linked experience spanning maps, navigation, and stadium services.",
    tools: ["React", "Node.js", "Maps APIs", "Geolocation", "REST APIs"],
  },
  {
    id: "tractor",
    index: "05",
    title: "Automated Tractor Prototype",
    date: "College Project Expo",
    state: "FIRST HARDWARE PROJECT",
    stateTone: "hardware",
    brief:
      "An early exploration of building beyond software interfaces.",
    contribution:
      "Built an automated tractor prototype for the college Project Expo.",
    evidence:
      "A first hardware project; no additional performance claims are made.",
    tools: [],
  },
];

const capabilities = [
  {
    id: "evaluation",
    code: "CAP-01",
    title: "Evaluate AI outputs",
    body: "Accuracy, relevance, consistency, and usability — with manual checks where it matters.",
    refs: ["accountant", "pinterest"],
  },
  {
    id: "iteration",
    code: "CAP-02",
    title: "Iterate systems & workflows",
    body: "Use feedback to refine prompt-based systems and connect repeatable automation steps.",
    refs: ["accountant", "pinterest"],
  },
  {
    id: "fullstack",
    code: "CAP-03",
    title: "Build practical AI tools",
    body: "Bring AI-enabled product ideas into working full-stack interfaces and API workflows.",
    refs: ["pinterest", "tutor", "stadium"],
  },
];

const skillGroups = [
  {
    label: "LANGUAGES",
    items: ["Python", "C++", "C", "JavaScript"],
  },
  {
    label: "AI SYSTEMS",
    items: [
      "Generative AI",
      "LLMs",
      "AI agents",
      "Prompt engineering",
      "Model evaluation",
      "Training workflows",
      "Output validation",
    ],
  },
  {
    label: "DATA",
    items: ["Pandas", "NumPy", "Spreadsheet workflows", "Data processing", "SQL fundamentals"],
  },
  {
    label: "PRODUCT ENGINEERING",
    items: ["React", "HTML", "CSS", "Node.js", "REST APIs"],
  },
  {
    label: "TOOLS & WORKFLOWS",
    items: ["Git", "GitHub", "Docker", "VS Code", "Google AI Studio", "Postman", "n8n"],
  },
];

const questions = [
  "Where is the clearest evidence of AI output evaluation?",
  "What has he built with automation and LLMs?",
  "Which work shows full-stack product building?",
  "What is his current role and day-to-day work?",
];

function answerFor(question: string) {
  if (question.includes("evaluation")) {
    return {
      text: "The AI Accountant Agent is the clearest example: Vivekananda is developing it and manually comparing AI outputs with hand calculations to evaluate accuracy and refine workflows. His Handshake AI contract work also includes evaluating outputs for accuracy, relevance, consistency, and usability.",
      refs: [
        { label: "AI Accountant Agent", href: "#accountant" },
        { label: "Handshake AI", href: "#experience" },
      ],
    };
  }
  if (question.includes("automation")) {
    return {
      text: "The AI Accountant Agent combines Python, n8n, LLM APIs, spreadsheet/data-processing workflows, and automation pipelines. The Pinterest Affiliate Automation App connects topic input to titles, descriptions, keywords, and content workflows.",
      refs: [
        { label: "AI Accountant Agent", href: "#accountant" },
        { label: "Pinterest app", href: "#pinterest" },
      ],
    };
  }
  if (question.includes("full-stack")) {
    return {
      text: "The Pinterest Affiliate Automation App uses Python, React, Node.js, LLM APIs, and REST APIs. The AI Tutor prototype uses Python, React, and external APIs; StadiumFlow was designed around React, Node.js, and maps/navigation integrations.",
      refs: [
        { label: "Pinterest app", href: "#pinterest" },
        { label: "AI Tutor", href: "#tutor" },
        { label: "StadiumFlow", href: "#stadium" },
      ],
    };
  }
  return {
    text: "Vivekananda is an ML Engineer (Contract) at Handshake AI, Jul 2026–Present. His work includes evaluating AI outputs, iterating prompt-based systems with feedback, building and testing automation pipelines, debugging environments, Git/GitHub collaboration, Docker workflows, and REST API integrations.",
    refs: [{ label: "Role evidence", href: "#experience" }],
  };
}

export function EvaluationLab() {
  const [openProject, setOpenProject] = useState("accountant");
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [resumeNotice, setResumeNotice] = useState(false);
  const answer = activeQuestion ? answerFor(activeQuestion) : null;

  return (
    <div className="eval-lab">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');
        .eval-lab {
          --ink: #e9f0eb;
          --muted: #9caea5;
          --dim: #64776e;
          --base: #101b1a;
          --surface: #172523;
          --surface2: #1d302c;
          --line: rgba(194, 220, 205, .15);
          --acid: #c9f36a;
          --aqua: #7dd9c2;
          --orange: #ff9c72;
          min-height: 100vh;
          color: var(--ink);
          background: var(--base);
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          line-height: 1.6;
          overflow: hidden;
        }
        .eval-lab * { box-sizing: border-box; }
        .eval-lab a { color: inherit; text-decoration: none; }
        .eval-lab button { font: inherit; }
        .eval-lab a:focus-visible, .eval-lab button:focus-visible {
          outline: 2px solid var(--acid);
          outline-offset: 4px;
        }
        .eval-lab .mono { font-family: 'DM Mono', monospace; letter-spacing: .02em; }
        .eval-lab .shell { width: min(1160px, calc(100% - 64px)); margin: 0 auto; }
        .eval-lab .topbar {
          position: sticky; top: 0; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          min-height: 64px; padding: 0 max(32px, calc((100vw - 1160px) / 2));
          border-bottom: 1px solid var(--line);
          background: rgba(16, 27, 26, .92); backdrop-filter: blur(16px);
        }
        .eval-lab .wordmark { display: flex; align-items: center; gap: 11px; font-weight: 800; letter-spacing: -.03em; }
        .eval-lab .mark { width: 22px; height: 22px; display: grid; place-items: center; color: var(--base); background: var(--acid); font: 500 12px 'DM Mono', monospace; }
        .eval-lab .top-meta { display: flex; align-items: center; gap: 25px; color: var(--muted); font: 10px 'DM Mono', monospace; letter-spacing: .1em; text-transform: uppercase; }
        .eval-lab .top-meta a { transition: color .18s; }
        .eval-lab .top-meta a:hover { color: var(--acid); }
        .eval-lab .top-contact { display: inline-flex; align-items: center; min-height: 32px; padding: 0 12px; border: 1px solid var(--acid); color: var(--acid); font: 10px 'DM Mono', monospace; white-space: nowrap; transition: background .18s, color .18s; }
        .eval-lab .top-contact:hover { background: var(--acid); color: var(--base); }
        .eval-lab .live-dot { width: 6px; height: 6px; display: inline-block; margin-right: 7px; border-radius: 50%; background: var(--acid); box-shadow: 0 0 0 4px rgba(201,243,106,.1); }
        .eval-lab .hero { position: relative; padding: 77px 0 68px; border-bottom: 1px solid var(--line); }
        .eval-lab .hero:before {
          content: ''; position: absolute; inset: 0 0 0 58%;
          background-image: linear-gradient(rgba(125,217,194,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(125,217,194,.035) 1px, transparent 1px);
          background-size: 32px 32px; mask-image: linear-gradient(90deg, transparent, black 32%, black);
          pointer-events: none;
        }
        .eval-lab .hero-grid { position: relative; display: grid; grid-template-columns: 1.15fr .85fr; align-items: center; gap: 72px; }
        .eval-lab .eyebrow { color: var(--aqua); font: 10px 'DM Mono', monospace; letter-spacing: .15em; text-transform: uppercase; }
        .eval-lab h1 { max-width: 700px; margin: 22px 0 15px; font-size: clamp(44px, 6vw, 76px); line-height: .99; letter-spacing: -.075em; font-weight: 700; }
        .eval-lab h1 span { color: var(--acid); }
        .eval-lab .intro { max-width: 590px; margin: 0; color: #bac9c1; font-size: 17px; line-height: 1.65; }
        .eval-lab .hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 29px; }
        .eval-lab .button { display: inline-flex; align-items: center; gap: 10px; min-height: 43px; padding: 0 16px; border: 1px solid var(--line); color: var(--ink); background: transparent; font-size: 12px; font-weight: 700; cursor: pointer; transition: transform .18s, background .18s, border-color .18s; }
        .eval-lab .button:hover { transform: translateY(-2px); border-color: var(--acid); }
        .eval-lab .button.primary { color: var(--base); background: var(--acid); border-color: var(--acid); }
        .eval-lab .button.primary:hover { background: #d9ff86; }
        .eval-lab .button.contact { border-color: var(--aqua); color: var(--aqua); }
        .eval-lab .button.contact:hover { background: rgba(125,217,194,.1); }
        .eval-lab .link-arrow { color: var(--base); font-size: 16px; }
        .eval-lab .contact-links { display: flex; gap: 16px; margin-left: 6px; color: var(--muted); font: 11px 'DM Mono', monospace; }
        .eval-lab .contact-links a:hover { color: var(--acid); }
        .eval-lab .resume-note { flex-basis: 100%; color: var(--acid); font-size: 11px; }
        .eval-lab .fit-map { position: relative; padding: 21px; border: 1px solid rgba(125,217,194,.27); background: rgba(23,37,35,.92); box-shadow: 10px 12px 0 rgba(0,0,0,.12); }
        .eval-lab .fit-map:before { content: ''; position: absolute; top: -1px; left: -1px; width: 35px; height: 3px; background: var(--acid); }
        .eval-lab .panel-head { display: flex; justify-content: space-between; align-items: center; padding-bottom: 15px; border-bottom: 1px solid var(--line); }
        .eval-lab .panel-title { color: var(--muted); font: 10px 'DM Mono', monospace; letter-spacing: .13em; text-transform: uppercase; }
        .eval-lab .panel-index { color: var(--dim); font: 10px 'DM Mono', monospace; }
        .eval-lab .fit-intro { margin: 16px 0 13px; color: var(--muted); font-size: 12px; }
        .eval-lab .fit-row { display: grid; grid-template-columns: 26px 1fr auto; gap: 10px; align-items: center; padding: 13px 0; border-top: 1px solid var(--line); }
        .eval-lab .fit-code { color: var(--acid); font: 10px 'DM Mono', monospace; }
        .eval-lab .fit-row strong { display: block; font-size: 12px; font-weight: 700; }
        .eval-lab .fit-row small { display: block; margin-top: 2px; color: var(--muted); font-size: 10px; }
        .eval-lab .fit-row a { color: var(--aqua); font: 10px 'DM Mono', monospace; }
        .eval-lab .fit-row a:hover { color: var(--acid); }
        .eval-lab .section { padding: 70px 0; border-bottom: 1px solid var(--line); }
        .eval-lab .section-head { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 29px; }
        .eval-lab .section-kicker { color: var(--aqua); font: 10px 'DM Mono', monospace; letter-spacing: .14em; text-transform: uppercase; }
        .eval-lab h2 { margin: 9px 0 0; font-size: clamp(28px, 4vw, 43px); line-height: 1.1; letter-spacing: -.055em; }
        .eval-lab .section-note { max-width: 345px; color: var(--muted); font-size: 12px; }
        .eval-lab .experience { display: grid; grid-template-columns: 245px 1fr; border: 1px solid var(--line); background: var(--surface); }
        .eval-lab .exp-side { padding: 22px; border-right: 1px solid var(--line); }
        .eval-lab .exp-side .mono { color: var(--aqua); font-size: 10px; text-transform: uppercase; letter-spacing: .1em; }
        .eval-lab .exp-side h3 { margin: 17px 0 6px; font-size: 19px; line-height: 1.25; letter-spacing: -.04em; }
        .eval-lab .exp-side p { margin: 0; color: var(--muted); font-size: 12px; }
        .eval-lab .exp-main { padding: 22px 25px; }
        .eval-lab .exp-main > p { max-width: 690px; margin: 0 0 18px; color: #cad5cf; font-size: 13px; }
        .eval-lab .work-list { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; margin: 0; padding: 0; list-style: none; }
        .eval-lab .work-list li { position: relative; padding-left: 16px; color: var(--muted); font-size: 11px; }
        .eval-lab .work-list li:before { content: '>'; position: absolute; left: 0; color: var(--acid); font: 11px 'DM Mono', monospace; }
        .eval-lab .education { display: flex; justify-content: space-between; gap: 20px; margin-top: 14px; padding: 15px 18px; border: 1px solid var(--line); background: rgba(23,37,35,.55); }
        .eval-lab .education strong { display: block; font-size: 12px; }
        .eval-lab .education span { color: var(--muted); font-size: 11px; }
        .eval-lab .education .mono { color: var(--aqua); font-size: 10px; white-space: nowrap; }
        .eval-lab .projects { display: grid; gap: 10px; }
        .eval-lab .project { border: 1px solid var(--line); background: var(--surface); transition: border-color .2s, transform .2s; }
        .eval-lab .project:hover { border-color: rgba(125,217,194,.42); }
        .eval-lab .project.is-open { border-color: rgba(201,243,106,.45); }
        .eval-lab .project-toggle { display: grid; width: 100%; grid-template-columns: 54px minmax(0,1fr) auto 22px; align-items: center; gap: 18px; padding: 18px 21px; color: inherit; text-align: left; background: transparent; border: 0; cursor: pointer; }
        .eval-lab .project-num { color: var(--acid); font: 12px 'DM Mono', monospace; }
        .eval-lab .project-title { display: block; font-size: 17px; font-weight: 700; letter-spacing: -.035em; }
        .eval-lab .project-date { display: block; margin-top: 3px; color: var(--muted); font: 10px 'DM Mono', monospace; }
        .eval-lab .state { display: inline-flex; align-items: center; gap: 7px; padding: 5px 8px; border: 1px solid var(--line); color: var(--muted); font: 9px 'DM Mono', monospace; letter-spacing: .08em; white-space: nowrap; }
        .eval-lab .state:before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--muted); }
        .eval-lab .state.live { color: var(--acid); border-color: rgba(201,243,106,.3); }
        .eval-lab .state.live:before { background: var(--acid); }
        .eval-lab .state.built { color: var(--aqua); border-color: rgba(125,217,194,.3); }
        .eval-lab .state.built:before { background: var(--aqua); }
        .eval-lab .state.hardware { color: var(--orange); border-color: rgba(255,156,114,.3); }
        .eval-lab .chevron { color: var(--acid); font: 17px 'DM Mono', monospace; transition: transform .2s; }
        .eval-lab .project.is-open .chevron { transform: rotate(45deg); }
        .eval-lab .project-detail { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; padding: 0 25px 23px 93px; animation: lab-in .22s ease-out; }
        .eval-lab .detail-block { padding-top: 14px; border-top: 1px solid var(--line); }
        .eval-lab .detail-block h4 { margin: 0 0 8px; color: var(--aqua); font: 9px 'DM Mono', monospace; letter-spacing: .13em; text-transform: uppercase; }
        .eval-lab .detail-block p { margin: 0; color: #b8c7bf; font-size: 11px; line-height: 1.65; }
        .eval-lab .tool-row { grid-column: 1 / -1; display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding-top: 13px; border-top: 1px solid var(--line); }
        .eval-lab .tool-row > span { color: var(--aqua); font: 9px 'DM Mono', monospace; letter-spacing: .13em; }
        .eval-lab .tool-pills { display: flex; flex-wrap: wrap; gap: 5px; }
        .eval-lab .tool-pill { padding: 4px 7px; border: 1px solid var(--line); color: var(--muted); font: 9px 'DM Mono', monospace; }
        .eval-lab .skill-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; }
        .eval-lab .skill-group { grid-column: span 2; min-height: 140px; padding: 18px; border: 1px solid var(--line); background: var(--surface); }
        .eval-lab .skill-group:nth-child(2), .eval-lab .skill-group:nth-child(5) { grid-column: span 3; }
        .eval-lab .skill-label { margin-bottom: 13px; color: var(--aqua); font: 9px 'DM Mono', monospace; letter-spacing: .13em; }
        .eval-lab .skill-items { display: flex; flex-wrap: wrap; gap: 7px; }
        .eval-lab .skill-items span { padding: 5px 8px; border: 1px solid rgba(194,220,205,.12); color: #c7d3cc; font-size: 10px; }
        .eval-lab .other-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .eval-lab .other-panel { padding: 21px; border: 1px solid var(--line); background: var(--surface); }
        .eval-lab .other-panel h3 { margin: 0 0 17px; color: var(--aqua); font: 10px 'DM Mono', monospace; letter-spacing: .12em; text-transform: uppercase; }
        .eval-lab .activity-row { display: grid; grid-template-columns: 1fr auto; gap: 12px; padding: 10px 0; border-top: 1px solid var(--line); color: #c4d0c9; font-size: 11px; }
        .eval-lab .activity-row span:last-child { color: var(--muted); font: 10px 'DM Mono', monospace; text-align: right; }
        .eval-lab .interests { display: flex; flex-wrap: wrap; gap: 8px; }
        .eval-lab .interests span { padding: 7px 9px; color: #d3ddd7; border: 1px solid var(--line); font-size: 11px; }
        .eval-lab .ambassador { position: relative; display: grid; grid-template-columns: .76fr 1.24fr; gap: 35px; padding: 30px; border: 1px solid rgba(201,243,106,.35); background: var(--surface); }
        .eval-lab .ambassador:after { content: ''; position: absolute; top: -1px; right: 36px; width: 56px; height: 3px; background: var(--acid); }
        .eval-lab .amb-copy h3 { margin: 12px 0 11px; font-size: 26px; line-height: 1.1; letter-spacing: -.05em; }
        .eval-lab .amb-copy p { color: var(--muted); font-size: 12px; }
        .eval-lab .source-note { margin-top: 23px; padding-top: 14px; border-top: 1px solid var(--line); color: var(--dim); font: 9px 'DM Mono', monospace; line-height: 1.6; }
        .eval-lab .chat { border: 1px solid var(--line); background: #101b1a; }
        .eval-lab .chat-head { display: flex; justify-content: space-between; padding: 12px 15px; border-bottom: 1px solid var(--line); color: var(--muted); font: 9px 'DM Mono', monospace; letter-spacing: .08em; }
        .eval-lab .chat-state { color: var(--acid); }
        .eval-lab .chat-body { min-height: 130px; padding: 16px; }
        .eval-lab .chat-intro { color: var(--muted); font-size: 11px; }
        .eval-lab .chat-answer { max-width: 600px; color: #d3ddd7; font-size: 12px; line-height: 1.7; }
        .eval-lab .source-links { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 12px; }
        .eval-lab .source-links a { padding: 5px 8px; border: 1px solid rgba(125,217,194,.25); color: var(--aqua); font: 9px 'DM Mono', monospace; }
        .eval-lab .source-links a:hover { border-color: var(--acid); color: var(--acid); }
        .eval-lab .question-label { padding: 0 15px 7px; color: var(--dim); font: 9px 'DM Mono', monospace; letter-spacing: .1em; text-transform: uppercase; }
        .eval-lab .question-list { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; padding: 0 15px 15px; }
        .eval-lab .question { padding: 9px 10px; border: 1px solid var(--line); color: #cad5cf; background: transparent; font-size: 10px; text-align: left; cursor: pointer; transition: border-color .18s, color .18s; }
        .eval-lab .question:hover, .eval-lab .question.selected { border-color: var(--acid); color: var(--acid); }
        .eval-lab .footer { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 28px 0 35px; color: var(--muted); font-size: 11px; }
        .eval-lab .footer-links { display: flex; gap: 18px; font: 10px 'DM Mono', monospace; }
        .eval-lab .footer-links a:hover { color: var(--acid); }
        @keyframes lab-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .eval-lab *, .eval-lab *:before, .eval-lab *:after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; } }
        @media (max-width: 780px) {
          .eval-lab .shell { width: min(100% - 36px, 600px); }
          .eval-lab .topbar { padding: 0 18px; }
          .eval-lab .top-meta { gap: 13px; }
          .eval-lab .top-meta a:nth-of-type(2) { display: none; }
          .eval-lab .hero { padding: 54px 0 48px; }
          .eval-lab .hero-grid { grid-template-columns: 1fr; gap: 35px; }
          .eval-lab .hero:before { left: 25%; }
          .eval-lab h1 { max-width: 560px; }
          .eval-lab .fit-map { max-width: 580px; }
          .eval-lab .section { padding: 52px 0; }
          .eval-lab .section-head { align-items: start; flex-direction: column; gap: 9px; }
          .eval-lab .experience { grid-template-columns: 1fr; }
          .eval-lab .exp-side { border-right: 0; border-bottom: 1px solid var(--line); }
          .eval-lab .exp-side h3 { margin-top: 10px; }
          .eval-lab .project-detail { padding-left: 25px; }
          .eval-lab .skill-group, .eval-lab .skill-group:nth-child(2), .eval-lab .skill-group:nth-child(5) { grid-column: span 3; }
          .eval-lab .ambassador { grid-template-columns: 1fr; gap: 22px; padding: 21px; }
        }
        @media (max-width: 480px) {
          .eval-lab { font-size: 13px; }
          .eval-lab .shell { width: calc(100% - 32px); }
          .eval-lab .topbar { min-height: 57px; padding: 0 16px; }
          .eval-lab .wordmark { font-size: 12px; }
          .eval-lab .top-meta { display: none; }
          .eval-lab .top-contact { min-height: 30px; padding: 0 8px; font-size: 9px; }
          .eval-lab .hero { padding: 43px 0 38px; }
          .eval-lab h1 { font-size: clamp(43px, 13vw, 59px); }
          .eval-lab .intro { font-size: 14px; }
          .eval-lab .hero-actions { gap: 10px; }
          .eval-lab .contact-links { margin: 4px 0 0; flex-basis: 100%; }
          .eval-lab .fit-map { padding: 16px; }
          .eval-lab .fit-row { grid-template-columns: 24px 1fr; }
          .eval-lab .fit-row a { grid-column: 2; }
          .eval-lab .work-list { grid-template-columns: 1fr; gap: 9px; }
          .eval-lab .exp-main { padding: 19px 17px; }
          .eval-lab .education { align-items: start; flex-direction: column; gap: 4px; }
          .eval-lab .project-toggle { grid-template-columns: 28px minmax(0,1fr) 18px; gap: 9px; padding: 15px 12px; }
          .eval-lab .project-title { font-size: 14px; }
          .eval-lab .state { grid-column: 2; grid-row: 2; width: max-content; font-size: 8px; }
          .eval-lab .chevron { grid-column: 3; grid-row: 1; }
          .eval-lab .project-detail { grid-template-columns: 1fr; gap: 12px; padding: 0 14px 17px; }
          .eval-lab .tool-row { grid-column: auto; }
          .eval-lab .skill-grid { grid-template-columns: 1fr; }
          .eval-lab .skill-group, .eval-lab .skill-group:nth-child(2), .eval-lab .skill-group:nth-child(5) { grid-column: auto; min-height: auto; }
          .eval-lab .other-grid { grid-template-columns: 1fr; }
          .eval-lab .ambassador { padding: 17px; }
          .eval-lab .question-list { grid-template-columns: 1fr; }
          .eval-lab .footer { align-items: flex-start; flex-direction: column; }
        }
      `}</style>

      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Evaluation Lab home">
          <span className="mark">V.</span>
          <span>VIVEKANANDA / SYSTEMS PROFILE</span>
        </a>
        <nav className="top-meta" aria-label="Main navigation">
          <span><i className="live-dot" /> CANDIDATE FILE</span>
          <a href="#evidence">Evidence</a>
          <a href="#skills">Capabilities</a>
          <a href="#ambassador">Ask the profile</a>
        </nav>
        <a className="top-contact" href="https://www.linkedin.com/in/vivekananda-cherukupally-396731379" target="_blank" rel="noreferrer">Contact on LinkedIn ↗</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="shell hero-grid">
            <div>
              <div className="eyebrow">AI GENERALIST <span className="mono">/</span> EVALUATION LAB</div>
              <h1>Make AI useful.<br /><span>Make its output</span><br />hold up.</h1>
              <p className="intro">
                I build practical AI tools, test whether their outputs make sense, and improve the workflows around them.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#evidence">Inspect project evidence <span className="link-arrow">↘</span></a>
                <a className="button contact" href="https://www.linkedin.com/in/vivekananda-cherukupally-396731379" target="_blank" rel="noreferrer">Contact on LinkedIn ↗</a>
                <button className="button" type="button" onClick={() => setResumeNotice(true)}>Resume package <span aria-hidden="true">↓</span></button>
                <div className="contact-links">
                  <a href="https://github.com/cherukupallyvivekananda76-oss" target="_blank" rel="noreferrer">GitHub ↗</a>
                </div>
                {resumeNotice && <div className="resume-note" role="status">A sanitized downloadable resume is planned for the finished site.</div>}
              </div>
            </div>

            <aside className="fit-map" aria-label="Role fit mapped to project evidence">
              <div className="panel-head">
                <span className="panel-title">Role fit / evidence map</span>
                <span className="panel-index">MAP 01—03</span>
              </div>
              <p className="fit-intro">Three capabilities. Each points to inspectable project evidence.</p>
              {capabilities.map((cap) => (
                <div className="fit-row" key={cap.id}>
                  <span className="fit-code">{cap.code}</span>
                  <div><strong>{cap.title}</strong><small>{cap.body}</small></div>
                  <a href={`#${cap.refs[0]}`} aria-label={`View evidence for ${cap.title}`}>EVIDENCE ↗</a>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="shell">
            <div className="section-head">
              <div><div className="section-kicker">01 / WORKING CONTEXT</div><h2>Evaluation in the loop.</h2></div>
              <p className="section-note">A current contract role grounded in output quality, prompt iteration, and hands-on delivery.</p>
            </div>
            <div className="experience">
              <div className="exp-side">
                <span className="mono">CURRENT ROLE</span>
                <h3>ML Engineer<br />(Contract)</h3>
                <p>Handshake AI</p>
                <p className="mono" style={{ marginTop: 12 }}>JUL 2026 — PRESENT</p>
              </div>
              <div className="exp-main">
                <p>Evaluate AI outputs and improve prompt-based systems with feedback, while building, testing, and troubleshooting the workflows that support them.</p>
                <ul className="work-list">
                  <li>Accuracy, relevance, consistency, and usability evaluation</li>
                  <li>Prompt-based system iteration with feedback</li>
                  <li>Building and testing automation pipelines</li>
                  <li>Environment setup and debugging</li>
                  <li>Git / GitHub collaboration</li>
                  <li>Docker workflows and REST API integrations</li>
                </ul>
              </div>
            </div>
            <div className="education">
              <div><strong>B.Tech, Computer Science &amp; Engineering</strong><span>Symbiosis Institute of Technology, Hyderabad</span></div>
              <span className="mono">2025 — 2029</span>
            </div>
          </div>
        </section>

        <section className="section" id="evidence">
          <div className="shell">
            <div className="section-head">
              <div><div className="section-kicker">02 / PROJECT EVIDENCE</div><h2>Methods before claims.</h2></div>
              <p className="section-note">Expand each record for the problem, contribution, tools, and what the evidence does — and does not — show.</p>
            </div>
            <div className="projects">
              {projects.map((project) => {
                const isOpen = openProject === project.id;
                return (
                  <article className={`project ${isOpen ? "is-open" : ""}`} id={project.id} key={project.id}>
                    <button className="project-toggle" type="button" aria-expanded={isOpen} onClick={() => setOpenProject(isOpen ? "" : project.id)}>
                      <span className="project-num">{project.index} /</span>
                      <span>
                        <span className="project-title">{project.title}</span>
                        <span className="project-date">{project.date}</span>
                      </span>
                      <span className={`state ${project.stateTone}`}>{project.state}</span>
                      <span className="chevron" aria-hidden="true">+</span>
                    </button>
                    {isOpen && (
                      <div className="project-detail">
                        <div className="detail-block"><h4>Problem space</h4><p>{project.brief}</p></div>
                        <div className="detail-block"><h4>Contribution</h4><p>{project.contribution}</p></div>
                        <div className="detail-block"><h4>Verified outcome</h4><p>{project.evidence}</p></div>
                        {project.tools.length > 0 && <div className="tool-row"><span>TOOLS /</span><div className="tool-pills">{project.tools.map((tool) => <span className="tool-pill" key={tool}>{tool}</span>)}</div></div>}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="shell">
            <div className="section-head">
              <div><div className="section-kicker">03 / CAPABILITY INVENTORY</div><h2>Tools across the stack.</h2></div>
              <p className="section-note">A working inventory, not a performance score. See project records for context.</p>
            </div>
            <div className="skill-grid">
              {skillGroups.map((group) => (
                <div className="skill-group" key={group.label}>
                  <div className="skill-label">{group.label}</div>
                  <div className="skill-items">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="activity">
          <div className="shell">
            <div className="section-head">
              <div><div className="section-kicker">04 / OUTSIDE THE PROJECT LOG</div><h2>Community &amp; curiosity.</h2></div>
            </div>
            <div className="other-grid">
              <div className="other-panel">
                <h3>Activity log</h3>
                <div className="activity-row"><span>Under 25 Summit — event coordination, participant support, technical assistance</span><span>VOLUNTEER</span></div>
                <div className="activity-row"><span>Technical presentations and speaking activities</span><span>PARTICIPANT</span></div>
                <div className="activity-row"><span>Smart India Hackathon</span><span>SEP 2026 · SEP 2025</span></div>
                <div className="activity-row"><span>Open AI Virtual Hackathon</span><span>MAR 2026</span></div>
                <div className="activity-row"><span>24-Hour Algorand Hackathon</span><span>MAY 2026</span></div>
              </div>
              <div className="other-panel">
                <h3>Areas of interest</h3>
                <div className="interests">
                  <span>AI systems</span><span>Automation</span><span>SaaS product development</span><span>Entrepreneurship</span>
                </div>
                <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 22 }}>Current curiosity sits at the meeting point of useful AI, reliable workflows, and products people can actually use.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="ambassador">
          <div className="shell">
            <div className="section-head">
              <div><div className="section-kicker">05 / GROUNDED PROFILE ASSISTANT</div><h2>Ask for the evidence.</h2></div>
            </div>
            <div className="ambassador">
              <div className="amb-copy">
                <div className="eyebrow">AMBASSADOR / CONCEPT</div>
                <h3>A research assistant, not a black box.</h3>
                <p>Explore the profile through recruiter-focused questions. Answers stay tied to the facts on this page, with section references you can open.</p>
                <div className="source-note">MOCK INTERACTION · GROUNDED TO VISIBLE PROFILE CONTENT<br />Final site concept: server-backed assistant with source-aware answers.</div>
              </div>
              <div className="chat" aria-label="Profile ambassador concept">
                <div className="chat-head"><span>PROFILE QUERY / VIVEKANANDA</span><span className="chat-state"><i className="live-dot" /> CONCEPT</span></div>
                <div className="chat-body" aria-live="polite">
                  {answer ? (
                    <>
                      <p className="chat-answer">{answer.text}</p>
                      <div className="source-links">{answer.refs.map((ref) => <a href={ref.href} key={ref.href}>SOURCE / {ref.label} ↗</a>)}</div>
                    </>
                  ) : (
                    <p className="chat-intro">Select a question to inspect a grounded summary. Each answer points to relevant evidence on this page.</p>
                  )}
                </div>
                <div className="question-label">START WITH A QUESTION</div>
                <div className="question-list">
                  {questions.map((question) => <button className={`question ${activeQuestion === question ? "selected" : ""}`} type="button" key={question} onClick={() => setActiveQuestion(question)}>{question}</button>)}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="shell footer">
        <span>Vivekananda Cherukupally <span className="mono">/ AI Generalist</span></span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/vivekananda-cherukupally-396731379" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          <a href="https://github.com/cherukupallyvivekananda76-oss" target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </div>
  );
}