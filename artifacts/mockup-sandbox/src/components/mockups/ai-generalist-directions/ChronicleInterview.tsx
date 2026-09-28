import { useState } from "react";

type Moment = {
  id: string;
  date: string;
  year: string;
  kind: string;
  title: string;
  role: string;
  summary: string;
  detail: string;
  proof: string;
  tools?: string[];
};

const moments: Moment[] = [
  {
    id: "tractor",
    date: "DATE NOT LISTED",
    year: "COLLEGE PROJECT EXPO",
    kind: "HARDWARE",
    title: "Automated Tractor Prototype",
    role: "Builder · first hardware project",
    summary: "An early exploration of building beyond software interfaces.",
    detail: "Built an automated tractor prototype for the college Project Expo.",
    proof: "A first hardware project; no additional performance claims are made.",
  },
  {
    id: "education",
    date: "2025 — 2029",
    year: "IN PROGRESS",
    kind: "EDUCATION",
    title: "Computer Science & Engineering",
    role: "B.Tech · Symbiosis Institute of Technology, Hyderabad",
    summary: "Building a computer science foundation alongside practical product work.",
    detail: "B.Tech, Computer Science & Engineering at Symbiosis Institute of Technology, Hyderabad.",
    proof: "Education and dates as listed in the profile.",
  },
  {
    id: "stadium",
    date: "MAR 1 — 20, 2025",
    year: "2025",
    kind: "PRODUCT DESIGN",
    title: "StadiumFlow",
    role: "Product concept · stadium experience",
    summary: "A ticket-linked experience connecting live position, seat navigation, amenities, and food ordering.",
    detail: "Designed a crowd-navigation and stadium-experience application using ticket details to connect live position, seat navigation, amenities, and food ordering.",
    proof: "Design evidence: a ticket-linked experience spanning maps, navigation, and stadium services.",
    tools: ["React", "Node.js", "Maps APIs", "Geolocation", "REST APIs"],
  },
  {
    id: "tutor",
    date: "SEP 2025",
    year: "2025",
    kind: "PROTOTYPE",
    title: "AI Tutor",
    role: "Prototype · personalized learning",
    summary: "A learning interface concept for adapting explanations and practice around a learner’s needs.",
    detail: "Built a prototype for personalized learning with generative AI / LLMs and learning-focused interfaces.",
    proof: "Prototype evidence: an AI-assisted learning concept expressed through an interface. No learning outcomes are claimed.",
    tools: ["Python", "React", "External APIs"],
  },
  {
    id: "pinterest",
    date: "MAY — JUN 2026",
    year: "2026",
    kind: "BUILT",
    title: "Pinterest Affiliate Automation App",
    role: "Full-stack build · content workflow",
    summary: "Connected topic input to Pinterest-ready titles, descriptions, keywords, and content workflows.",
    detail: "Built a tool that generates titles, descriptions, keywords, and content workflows; checked product–niche match and relevance.",
    proof: "The project demonstrates a connected content workflow and relevance checks. No performance outcomes are asserted.",
    tools: ["Python", "React", "Node.js", "LLM APIs", "REST APIs"],
  },
  {
    id: "handshake",
    date: "JUL 2026 — PRESENT",
    year: "NOW",
    kind: "CURRENT ROLE",
    title: "Handshake AI",
    role: "ML Engineer (Contract)",
    summary: "Evaluation in the loop: improve prompt-based systems with feedback and build the workflows around them.",
    detail: "Evaluate AI outputs for accuracy, relevance, consistency, and usability; iterate prompt-based systems with feedback; build and test automation pipelines; debug environments; collaborate with Git / GitHub; use Docker workflows and REST API integrations.",
    proof: "Current contract role and day-to-day work as stated in the profile.",
    tools: ["Output evaluation", "Prompt iteration", "Automation", "Git / GitHub", "Docker", "REST APIs"],
  },
  {
    id: "accountant",
    date: "MAR 2026 — PRESENT",
    year: "IN PROGRESS",
    kind: "AI AGENT",
    title: "AI Accountant Agent",
    role: "In progress · evaluation workflow",
    summary: "Financial calculations, expense tracking, ledger understanding, and report generation need dependable, reviewable outputs.",
    detail: "Developing an AI-powered agent and refining its workflows through manual comparisons between AI outputs and hand calculations.",
    proof: "The current evaluation method is a direct output-to-hand-calculation comparison. The project is in progress; no shipped result is claimed.",
    tools: ["Python", "n8n", "LLM APIs", "Spreadsheets", "Automation"],
  },
];

const questions = [
  "Where is AI output evaluation clearest?",
  "What has he built with automation and LLMs?",
  "Which work shows full-stack product building?",
  "What does his current role involve?",
];

const chronology = ["tractor", "education", "stadium", "tutor", "accountant", "pinterest", "handshake"];

function responseFor(question: string) {
  if (question.includes("evaluation")) {
    return "The AI Accountant Agent is the clearest project example: it is in progress, with AI outputs manually compared against hand calculations. The Handshake AI contract work also includes evaluating accuracy, relevance, consistency, and usability.";
  }
  if (question.includes("automation")) {
    return "The AI Accountant Agent combines Python, n8n, LLM APIs, spreadsheet/data-processing workflows, and automation pipelines. The Pinterest Affiliate Automation App connects topic input to titles, descriptions, keywords, and content workflows.";
  }
  if (question.includes("full-stack")) {
    return "The Pinterest Affiliate Automation App uses Python, React, Node.js, LLM APIs, and REST APIs. The AI Tutor prototype uses Python, React, and external APIs; StadiumFlow was designed around React, Node.js, and maps/navigation integrations.";
  }
  return "Vivekananda is an ML Engineer (Contract) at Handshake AI, Jul 2026–Present. His work includes evaluating AI outputs, iterating prompt-based systems with feedback, building and testing automation pipelines, debugging environments, Git/GitHub collaboration, Docker workflows, and REST API integrations.";
}

export function ChronicleInterview() {
  const [expanded, setExpanded] = useState("handshake");
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [resumeNotice, setResumeNotice] = useState(false);
  const activeMoment = moments.find((moment) => moment.id === expanded);

  return (
    <div className="chronicle">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap');
        .chronicle {
          --paper:#f1eee5; --paper2:#e8e4d9; --ink:#192b28; --muted:#65736c;
          --line:#c9cec1; --green:#1d5145; --orange:#bc583d; --yellow:#d7e58e;
          min-height:100vh; background:var(--paper); color:var(--ink);
          font:14px/1.65 'Manrope',sans-serif; overflow:hidden;
        }
        .chronicle *{box-sizing:border-box}.chronicle a{color:inherit;text-decoration:none}
        .chronicle button{font:inherit}.chronicle a:focus-visible,.chronicle button:focus-visible{outline:2px solid var(--orange);outline-offset:4px}
        .chronicle .mono{font:10px 'DM Mono',monospace;letter-spacing:.12em}
        .chronicle .shell{width:min(1120px,calc(100% - 56px));margin:auto}
        .chronicle .bar{height:68px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);padding:0 max(28px,calc((100vw - 1120px)/2));background:var(--paper)}
        .chronicle .brand{display:flex;align-items:center;gap:11px;font-weight:800;letter-spacing:-.04em}
        .chronicle .seal{width:27px;height:27px;display:grid;place-items:center;background:var(--green);color:var(--yellow);font:500 12px 'DM Mono',monospace}
        .chronicle .bar-links{display:flex;align-items:center;gap:26px;color:var(--muted);font:10px 'DM Mono',monospace;letter-spacing:.08em;text-transform:uppercase}
        .chronicle .bar-links a:hover,.chronicle .contact:hover{color:var(--orange)}
        .chronicle .contact{color:var(--green);border:1px solid var(--green);padding:8px 12px;white-space:nowrap}
        .chronicle .hero{padding:70px 0 62px;border-bottom:1px solid var(--line);position:relative}
        .chronicle .hero:after{content:'FIELD NOTES  /  26';position:absolute;right:4vw;top:56px;writing-mode:vertical-rl;color:#a2aa9e;font:9px 'DM Mono',monospace;letter-spacing:.2em}
        .chronicle .hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:68px;align-items:end}
        .chronicle .eyebrow,.chronicle .kicker{color:var(--green);font:10px 'DM Mono',monospace;letter-spacing:.15em;text-transform:uppercase}
        .chronicle h1{font:500 clamp(50px,7.4vw,91px)/.94 'Newsreader',serif;letter-spacing:-.055em;margin:25px 0 21px;max-width:720px}
        .chronicle h1 em{color:var(--orange);font-style:normal}
        .chronicle .intro{max-width:515px;color:#53645c;font-size:16px;line-height:1.75;margin:0}
        .chronicle .hero-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px;align-items:center}
        .chronicle .button{min-height:42px;display:inline-flex;align-items:center;gap:12px;padding:0 14px;border:1px solid var(--green);color:var(--green);font-size:11px;font-weight:700;cursor:pointer;background:transparent;transition:transform .18s,background .18s,color .18s}
        .chronicle .button:hover{transform:translateY(-2px);background:var(--green);color:var(--paper)}
        .chronicle .button.solid{background:var(--green);color:var(--paper)}
        .chronicle .button.solid:hover{background:var(--orange);border-color:var(--orange)}
        .chronicle .quick-links{display:flex;gap:14px;margin-left:6px;color:var(--muted);font:10px 'DM Mono',monospace;text-transform:uppercase}
        .chronicle .quick-links a:hover{color:var(--orange)}.chronicle .resume-note{flex-basis:100%;font-size:11px;color:var(--orange)}
        .chronicle .interview-card{background:var(--green);color:#f1eee5;padding:25px 26px 23px;position:relative;box-shadow:9px 10px 0 #d5d1c6}
        .chronicle .interview-card:before{content:'';position:absolute;left:0;top:0;width:54px;height:4px;background:var(--yellow)}
        .chronicle .card-head{display:flex;justify-content:space-between;gap:15px;padding-bottom:15px;border-bottom:1px solid #ffffff35;color:#c1d2c6}
        .chronicle .card-title{font:500 27px/1.1 'Newsreader',serif;color:#f1eee5;margin:19px 0 9px}
        .chronicle .card-copy{font-size:12px;color:#ccdad1;margin:0 0 17px}
        .chronicle .quote{padding:13px 0;border-top:1px solid #ffffff35;display:grid;grid-template-columns:35px 1fr;gap:10px}
        .chronicle .quote-num{color:var(--yellow);font:11px 'DM Mono',monospace}
        .chronicle .quote strong{display:block;font-size:12px}.chronicle .quote span{display:block;color:#c1d2c6;font-size:10px;margin-top:2px}
        .chronicle .quote button{color:var(--yellow);background:none;border:0;padding:0;cursor:pointer;font:9px 'DM Mono',monospace;letter-spacing:.08em}
        .chronicle .quote button:hover{color:#fff}
        .chronicle .section{padding:66px 0;border-bottom:1px solid var(--line)}
        .chronicle .section-heading{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:32px}
        .chronicle h2{font:500 clamp(34px,4vw,49px)/1.03 'Newsreader',serif;letter-spacing:-.04em;margin:9px 0 0}
        .chronicle .section-note{max-width:360px;color:var(--muted);font-size:12px;margin:0}
        .chronicle .timeline-layout{display:grid;grid-template-columns:minmax(0,1fr) 285px;gap:44px;align-items:start}
        .chronicle .timeline{position:relative}
        .chronicle .timeline:before{content:'';position:absolute;left:76px;top:14px;bottom:14px;width:1px;background:var(--line)}
        .chronicle .moment{display:grid;grid-template-columns:58px 36px minmax(0,1fr);gap:10px;position:relative}
        .chronicle .moment+.moment{margin-top:7px}
        .chronicle .moment-date{text-align:right;padding-top:23px;color:var(--muted);font:9px 'DM Mono',monospace;letter-spacing:.06em}
        .chronicle .node-wrap{display:flex;justify-content:center;padding-top:25px;z-index:1}
        .chronicle .node{width:9px;height:9px;background:var(--paper);border:2px solid #81948a;border-radius:50%;transition:transform .2s,background .2s}
        .chronicle .moment.active .node{transform:scale(1.35);background:var(--orange);border-color:var(--orange)}
        .chronicle .moment-button{text-align:left;width:100%;background:transparent;border:0;border-bottom:1px solid var(--line);padding:17px 16px 17px 18px;cursor:pointer;color:var(--ink);display:grid;grid-template-columns:minmax(0,1fr) auto;gap:7px 16px;transition:background .18s}
        .chronicle .moment-button:hover,.chronicle .moment.active .moment-button{background:#e8e6db}
        .chronicle .moment-button>span:first-child{display:block;min-width:0}
        .chronicle .moment-kind{color:var(--orange);font:9px 'DM Mono',monospace;letter-spacing:.13em}
        .chronicle .moment-kind,.chronicle .moment-title,.chronicle .moment-role{display:block}
        .chronicle .moment-title{font:500 23px/1.1 'Newsreader',serif;letter-spacing:-.02em;margin:5px 0 2px}
        .chronicle .moment-role{font-size:10px;color:var(--muted)}
        .chronicle .moment-summary{font-size:11px;color:#53645c;grid-column:1/-1;max-width:650px}
        .chronicle .moment-arrow{color:var(--green);font-size:17px;align-self:center}
        .chronicle .timeline-aside{position:sticky;top:24px}
        .chronicle .selected-card{padding:21px;background:#e7e4d8;border-top:3px solid var(--orange)}
        .chronicle .selected-card .stamp{color:var(--orange);font:9px 'DM Mono',monospace;letter-spacing:.12em;text-transform:uppercase}
        .chronicle .selected-card h3{font:500 26px/1.05 'Newsreader',serif;margin:14px 0 8px}
        .chronicle .selected-card .role{color:var(--muted);font-size:10px}
        .chronicle .selected-card p{font-size:11px;color:#4f6058;margin:16px 0}
        .chronicle .selected-card .proof{padding-top:13px;border-top:1px solid var(--line)}
        .chronicle .selected-card .proof b{display:block;color:var(--green);font:9px 'DM Mono',monospace;letter-spacing:.1em;margin-bottom:5px}
        .chronicle .pills{display:flex;flex-wrap:wrap;gap:5px;margin-top:14px}
        .chronicle .pill{border:1px solid #bdc8b9;padding:4px 7px;color:var(--green);font:9px 'DM Mono',monospace}
        .chronicle .side-index{margin-top:16px;padding:15px;border:1px solid var(--line)}
        .chronicle .side-index div{display:flex;justify-content:space-between;color:var(--muted);font:9px 'DM Mono',monospace;padding:5px 0}
        .chronicle .side-index b{color:var(--ink);font-weight:400}
        .chronicle .skills{display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid var(--line);border-left:1px solid var(--line)}
        .chronicle .skill{min-height:155px;padding:17px 16px;border-right:1px solid var(--line);border-bottom:1px solid var(--line)}
        .chronicle .skill-label{color:var(--orange);font:9px 'DM Mono',monospace;letter-spacing:.12em;min-height:27px}
        .chronicle .skill-items{display:flex;flex-wrap:wrap;gap:6px 11px;color:#45574e;font-size:10px}
        .chronicle .activity-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:30px}
        .chronicle .activity-card{border-top:2px solid var(--green);padding-top:16px}
        .chronicle .activity-card h3{font:500 25px 'Newsreader',serif;margin:0 0 13px}
        .chronicle .activity-row{display:grid;grid-template-columns:1fr auto;gap:15px;padding:11px 0;border-top:1px solid var(--line);font-size:11px}
        .chronicle .activity-row span:last-child{color:var(--orange);font:9px 'DM Mono',monospace;text-align:right}
        .chronicle .interest-tags{display:flex;flex-wrap:wrap;gap:7px}
        .chronicle .interest-tags span{background:var(--paper2);padding:7px 9px;color:var(--green);font-size:10px}
        .chronicle .assistant{display:grid;grid-template-columns:.8fr 1.2fr;gap:40px;background:var(--green);color:var(--paper);padding:30px}
        .chronicle .assistant .kicker{color:var(--yellow)}
        .chronicle .assistant h3{font:500 34px/1.05 'Newsreader',serif;margin:14px 0}
        .chronicle .assistant p{font-size:11px;color:#c7d7ce}
        .chronicle .concept{padding-top:14px;border-top:1px solid #ffffff38;color:#c7d7ce;font:9px/1.7 'DM Mono',monospace}
        .chronicle .query-box{border:1px solid #ffffff38}
        .chronicle .query-head{display:flex;justify-content:space-between;padding:11px 13px;border-bottom:1px solid #ffffff38;color:var(--yellow);font:9px 'DM Mono',monospace;letter-spacing:.08em}
        .chronicle .answer{min-height:108px;padding:16px 14px;color:#e4e9df;font-size:11px}
        .chronicle .question-label{padding:0 13px 8px;color:#a9c3b5;font:8px 'DM Mono',monospace;letter-spacing:.12em}
        .chronicle .questions{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#ffffff2b}
        .chronicle .questions button{border:0;background:#234f44;color:#d9e4da;text-align:left;padding:11px 12px;min-height:52px;font-size:10px;cursor:pointer}
        .chronicle .questions button:hover,.chronicle .questions button.selected{background:#2a6252;color:var(--yellow)}
        .chronicle .footer{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:28px 0 34px;color:var(--muted);font-size:11px}
        .chronicle .footer-links{display:flex;gap:20px;font:9px 'DM Mono',monospace;letter-spacing:.08em}
        .chronicle .footer a:hover{color:var(--orange)}
        @media(max-width:850px){
          .chronicle .bar{padding:0 22px}.chronicle .bar-links{gap:14px}.chronicle .hero-grid{grid-template-columns:1fr;gap:35px}.chronicle .hero{padding:55px 0}
          .chronicle .interview-card{max-width:600px}.chronicle .timeline-layout{grid-template-columns:1fr;gap:22px}.chronicle .timeline-aside{position:static}
          .chronicle .selected-card{display:grid;grid-template-columns:1fr 1fr;gap:0 18px}.chronicle .selected-card h3,.chronicle .selected-card .stamp,.chronicle .selected-card .role{grid-column:1/-1}
          .chronicle .selected-card p{margin-bottom:8px}.chronicle .selected-card .proof{margin-top:8px}
          .chronicle .skills{grid-template-columns:repeat(3,1fr)}.chronicle .assistant{grid-template-columns:1fr;gap:23px}
        }
        @media(max-width:560px){
          .chronicle .shell{width:calc(100% - 34px)}.chronicle .bar{height:58px;padding:0 17px}.chronicle .brand{font-size:11px}.chronicle .bar-links{display:none}.chronicle .contact{font-size:9px;padding:6px 8px}
          .chronicle .hero{padding:43px 0}.chronicle .hero:after{right:17px;top:30px}.chronicle h1{font-size:clamp(50px,14vw,70px);margin-top:19px}.chronicle .intro{font-size:14px}
          .chronicle .hero-actions{gap:8px}.chronicle .quick-links{flex-basis:100%;margin:4px 0 0}.chronicle .interview-card{padding:20px}
          .chronicle .section{padding:48px 0}.chronicle .section-heading{display:block;margin-bottom:22px}.chronicle .section-note{margin-top:10px}
          .chronicle .timeline:before{left:58px}.chronicle .moment{grid-template-columns:42px 32px minmax(0,1fr);gap:7px}
          .chronicle .moment-date{font-size:8px;letter-spacing:0;padding-top:22px}.chronicle .node-wrap{padding-top:24px}
          .chronicle .moment-button{padding:14px 10px}.chronicle .moment-title{font-size:20px}.chronicle .moment-summary{font-size:10px}
          .chronicle .selected-card{display:block;padding:17px}.chronicle .selected-card h3{margin:9px 0}.chronicle .selected-card p{margin:12px 0}
          .chronicle .skills{grid-template-columns:1fr 1fr}.chronicle .skill{min-height:125px;padding:14px 12px}.chronicle .skill:last-child{grid-column:1/-1}
          .chronicle .activity-grid{grid-template-columns:1fr;gap:24px}.chronicle .assistant{padding:21px 16px}.chronicle .assistant h3{font-size:29px}
          .chronicle .questions{grid-template-columns:1fr}.chronicle .questions button{min-height:42px}.chronicle .footer{align-items:flex-start;flex-direction:column}.chronicle .footer-links{gap:14px;flex-wrap:wrap}
        }
      `}</style>

      <header className="bar">
        <a className="brand" href="#top"><span className="seal">V.</span><span>VIVEKANANDA / FIELD RECORD</span></a>
        <nav className="bar-links" aria-label="Page navigation">
          <a href="#timeline">Timeline</a><a href="#capabilities">Capabilities</a><a href="#conversation">Interview</a>
        </nav>
        <a className="contact" href="https://www.linkedin.com/in/vivekananda-cherukupally-396731379" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="shell hero-grid">
            <div>
              <div className="eyebrow">AI GENERALIST <span className="mono">/</span> CHRONOLOGICAL INTERVIEW</div>
              <h1>Useful AI,<br />built <em>one proof</em><br />at a time.</h1>
              <p className="intro">A working timeline of the projects, evaluation habits, and product thinking behind my AI work. Follow the sequence; open any stop for the method and the limits of its evidence.</p>
              <div className="hero-actions">
                <a className="button solid" href="#timeline">Walk the timeline <span aria-hidden="true">↓</span></a>
                <a className="button" href="https://www.linkedin.com/in/vivekananda-cherukupally-396731379" target="_blank" rel="noreferrer">Contact on LinkedIn ↗</a>
                <button className="button" type="button" onClick={() => setResumeNotice(true)}>Resume package ↓</button>
                <div className="quick-links"><a href="https://github.com/cherukupallyvivekananda76-oss" target="_blank" rel="noreferrer">GitHub ↗</a></div>
                {resumeNotice && <div className="resume-note" role="status">A sanitized downloadable resume is planned for the finished site.</div>}
              </div>
            </div>
            <aside className="interview-card" aria-label="Profile overview">
              <div className="card-head mono"><span>OPENING NOTE / 01</span><span>PROFILE INTERVIEW</span></div>
              <h2 className="card-title">Build. Check. Refine.</h2>
              <p className="card-copy">The through-line is practical systems work: make the AI tool, inspect what it returns, and improve the workflow around it.</p>
              <div className="quote"><span className="quote-num">A</span><div><strong>Evaluation in context</strong><span>Hand calculations, relevance checks, feedback loops.</span></div><button onClick={() => setExpanded("accountant")}>OPEN ↗</button></div>
              <div className="quote"><span className="quote-num">B</span><div><strong>Product into workflow</strong><span>From topic-to-content tools to API-connected concepts.</span></div><button onClick={() => setExpanded("pinterest")}>OPEN ↗</button></div>
              <div className="quote"><span className="quote-num">C</span><div><strong>Current practice</strong><span>ML Engineer (Contract) · Handshake AI.</span></div><button onClick={() => setExpanded("handshake")}>OPEN ↗</button></div>
            </aside>
          </div>
        </section>

        <section className="section" id="timeline">
          <div className="shell">
            <div className="section-heading">
              <div><div className="kicker">01 / CHRONOLOGY</div><h2>A career told in work.</h2></div>
              <p className="section-note">Select a moment to hear the project in its own terms: what it set out to do, what was built, and what the evidence supports.</p>
            </div>
            <div className="timeline-layout">
              <div className="timeline" aria-label="Chronological interview timeline">
                {[...moments].sort((a, b) => chronology.indexOf(a.id) - chronology.indexOf(b.id)).map((moment) => (
                  <article key={moment.id} className={`moment ${expanded === moment.id ? "active" : ""}`}>
                    <div className="moment-date">{moment.date}</div><div className="node-wrap"><span className="node" /></div>
                    <button className="moment-button" type="button" aria-expanded={expanded === moment.id} onClick={() => setExpanded(moment.id)}>
                      <span><span className="moment-kind">{moment.kind} · {moment.year}</span><span className="moment-title">{moment.title}</span><span className="moment-role">{moment.role}</span></span>
                      <span className="moment-arrow" aria-hidden="true">{expanded === moment.id ? "−" : "+"}</span>
                      <span className="moment-summary">{moment.summary}</span>
                    </button>
                  </article>
                ))}
              </div>
              <aside className="timeline-aside" aria-live="polite">
                {activeMoment && <div className="selected-card">
                  <div className="stamp">Selected conversation / {activeMoment.kind}</div>
                  <h3>{activeMoment.title}</h3>
                  <div className="role">{activeMoment.date} · {activeMoment.role}</div>
                  <p>{activeMoment.detail}</p>
                  <div className="proof"><b>WHAT THE RECORD SHOWS</b>{activeMoment.proof}</div>
                  {activeMoment.tools && <div className="pills">{activeMoment.tools.map((tool) => <span className="pill" key={tool}>{tool}</span>)}</div>}
                </div>}
                <div className="side-index">
                  <div><span>VISIBLE RECORDS</span><b>07</b></div>
                  <div><span>CLAIM STANDARD</span><b>Evidence first</b></div>
                  <div><span>ACTIVE CHAPTER</span><b>{activeMoment?.year}</b></div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="section" id="capabilities">
          <div className="shell">
            <div className="section-heading">
              <div><div className="kicker">02 / WORKING INVENTORY</div><h2>Tools across the stack.</h2></div>
              <p className="section-note">A working inventory, not a performance score. Project context lives in the timeline above.</p>
            </div>
            <div className="skills">
              <div className="skill"><div className="skill-label">LANGUAGES</div><div className="skill-items">Python · C++ · C · JavaScript</div></div>
              <div className="skill"><div className="skill-label">AI SYSTEMS</div><div className="skill-items">Generative AI · LLMs · AI agents · Prompt engineering · Model evaluation · Training workflows · Output validation</div></div>
              <div className="skill"><div className="skill-label">DATA</div><div className="skill-items">Pandas · NumPy · Spreadsheet workflows · Data processing · SQL fundamentals</div></div>
              <div className="skill"><div className="skill-label">PRODUCT ENGINEERING</div><div className="skill-items">React · HTML · CSS · Node.js · REST APIs</div></div>
              <div className="skill"><div className="skill-label">TOOLS & WORKFLOWS</div><div className="skill-items">Git · GitHub · Docker · VS Code · Google AI Studio · Postman · n8n</div></div>
            </div>
          </div>
        </section>

        <section className="section" id="community">
          <div className="shell">
            <div className="section-heading"><div><div className="kicker">03 / OUTSIDE THE PROJECT LOG</div><h2>Community & curiosity.</h2></div></div>
            <div className="activity-grid">
              <div className="activity-card"><h3>Activity notes</h3>
                <div className="activity-row"><span>Under 25 Summit — event coordination, participant support, technical assistance</span><span>VOLUNTEER</span></div>
                <div className="activity-row"><span>Technical presentations and speaking activities</span><span>PARTICIPANT</span></div>
                <div className="activity-row"><span>Smart India Hackathon</span><span>SEP 2026 · SEP 2025</span></div>
                <div className="activity-row"><span>Open AI Virtual Hackathon</span><span>MAR 2026</span></div>
                <div className="activity-row"><span>24-Hour Algorand Hackathon</span><span>MAY 2026</span></div>
              </div>
              <div className="activity-card"><h3>Current curiosity</h3><div className="interest-tags"><span>AI systems</span><span>Automation</span><span>SaaS product development</span><span>Entrepreneurship</span></div><p className="section-note" style={{marginTop:18}}>Useful AI, reliable workflows, and products people can actually use.</p></div>
            </div>
          </div>
        </section>

        <section className="section" id="conversation">
          <div className="shell">
            <div className="section-heading"><div><div className="kicker">04 / GROUNDED PROFILE INTERVIEW</div><h2>Ask about the work.</h2></div></div>
            <div className="assistant">
              <div><div className="kicker">A RESEARCH ASSISTANT, NOT A BLACK BOX</div><h3>Follow a question to its context.</h3><p>Explore recruiter-focused questions. Answers stay tied to the visible profile facts.</p><div className="concept">MOCK INTERACTION · GROUNDED TO VISIBLE PROFILE CONTENT<br />Final site concept: server-backed assistant with source-aware answers.</div></div>
              <div className="query-box" aria-label="Profile interview concept">
                <div className="query-head"><span>PROFILE QUERY / VIVEKANANDA</span><span>CONCEPT</span></div>
                <div className="answer" aria-live="polite">{activeQuestion ? responseFor(activeQuestion) : "Choose a prompt to inspect a grounded summary. The project timeline is the source of record."}</div>
                <div className="question-label">START WITH A QUESTION</div>
                <div className="questions">{questions.map((question) => <button type="button" key={question} className={activeQuestion === question ? "selected" : ""} onClick={() => setActiveQuestion(question)}>{question}</button>)}</div>
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