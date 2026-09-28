import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAskAmbassador } from '@workspace/api-client-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const LINKEDIN = 'https://www.linkedin.com/in/vivekananda-cherukupally-396731379';
const GITHUB = 'https://github.com/cherukupallyvivekananda76-oss';
const RESUME_PATH = `${import.meta.env.BASE_URL}Vivekananda_Cherukupally_Public_Resume.pdf`;

type Project = {
  id: string; index: string; title: string; date: string; state: string;
  stateTone: 'live' | 'built' | 'prototype' | 'hardware';
  brief: string; contribution: string; evidence: string; tools: string[];
};

const projects: Project[] = [
  {
    id: 'accountant', index: '01', title: 'AI Accountant Agent', date: 'Mar 2026 — Present',
    state: 'IN PROGRESS', stateTone: 'live',
    brief: 'Financial calculations, expense tracking, ledger understanding, and report generation need dependable, reviewable outputs.',
    contribution: 'Developing an AI-powered agent and refining its workflows through manual comparisons between AI outputs and hand calculations.',
    evidence: 'The current evaluation method is a direct output-to-hand-calculation comparison. The project is in progress; no shipped result is claimed.',
    tools: ['Python', 'n8n', 'LLM APIs', 'Spreadsheets', 'Automation'],
  },
  {
    id: 'pinterest', index: '02', title: 'Pinterest Affiliate Automation App', date: 'May — Jun 2026',
    state: 'BUILT', stateTone: 'built',
    brief: 'Turning a niche or topic into Pinterest-ready content requires connected ideation and publishing-preparation steps.',
    contribution: 'Built a tool that generates titles, descriptions, keywords, and content workflows; checked product–niche match and relevance.',
    evidence: 'The project demonstrates a connected content workflow and relevance checks. No performance outcomes are asserted.',
    tools: ['Python', 'React', 'Node.js', 'LLM APIs', 'REST APIs'],
  },
  {
    id: 'tutor', index: '03', title: 'AI Tutor', date: 'Sep 2025',
    state: 'PROTOTYPE', stateTone: 'prototype',
    brief: 'A learning interface can adapt explanations and practice around a learner’s needs.',
    contribution: 'Built a prototype for personalized learning with generative AI / LLMs and learning-focused interfaces.',
    evidence: 'Prototype evidence: an AI-assisted learning concept expressed through an interface. No learning outcomes are claimed.',
    tools: ['Python', 'React', 'External APIs'],
  },
  {
    id: 'stadium', index: '04', title: 'StadiumFlow', date: 'Mar 1 — 20, 2025',
    state: 'DESIGNED', stateTone: 'prototype',
    brief: 'Stadium visitors need a connected way to orient themselves, navigate to seats, find amenities, and order food.',
    contribution: 'Designed a crowd-navigation and stadium-experience application using ticket details to connect live position, seat navigation, amenities, and food ordering.',
    evidence: 'Design evidence: a ticket-linked experience spanning maps, navigation, and stadium services.',
    tools: ['React', 'Node.js', 'Maps APIs', 'Geolocation', 'REST APIs'],
  },
  {
    id: 'tractor', index: '05', title: 'Automated Tractor Prototype', date: 'College Project Expo',
    state: 'FIRST HARDWARE PROJECT', stateTone: 'hardware',
    brief: 'An early exploration of building beyond software interfaces.',
    contribution: 'Built an automated tractor prototype for the college Project Expo.',
    evidence: 'A first hardware project; no additional performance claims are made.',
    tools: [],
  },
];

const capabilities = [
  { id: 'evaluation', code: 'CAP-01', title: 'Evaluate AI outputs', body: 'Accuracy, relevance, consistency, and usability — with manual checks where it matters.', refs: ['accountant', 'pinterest'] },
  { id: 'iteration', code: 'CAP-02', title: 'Iterate systems & workflows', body: 'Use feedback to refine prompt-based systems and connect repeatable automation steps.', refs: ['accountant', 'pinterest'] },
  { id: 'fullstack', code: 'CAP-03', title: 'Build practical AI tools', body: 'Bring AI-enabled product ideas into working full-stack interfaces and API workflows.', refs: ['pinterest', 'tutor', 'stadium'] },
];

const skillGroups = [
  { label: 'LANGUAGES', items: ['Python', 'C++', 'C', 'JavaScript'] },
  { label: 'AI SYSTEMS', items: ['Generative AI', 'LLMs', 'AI agents', 'Prompt engineering', 'Model evaluation', 'Training workflows', 'Output validation'] },
  { label: 'DATA', items: ['Pandas', 'NumPy', 'Spreadsheet workflows', 'Data processing', 'SQL fundamentals'] },
  { label: 'PRODUCT ENGINEERING', items: ['React', 'HTML', 'CSS', 'Node.js', 'REST APIs'] },
  { label: 'TOOLS & WORKFLOWS', items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Google AI Studio', 'Postman', 'n8n'] },
];

const prompts = [
  'Where is the clearest evidence of AI output evaluation?',
  'What has he built with automation and LLMs?',
  'Which work shows full-stack product building?',
  'What is his current role and day-to-day work?',
];

function safeCitation(href: string): { href: string; external: boolean } | null {
  try {
    if (href.startsWith('#') && /^#[a-zA-Z0-9_-]+$/.test(href)) return { href, external: false };
    const url = new URL(href, window.location.origin);
    if (url.origin === window.location.origin && (url.pathname === '/' || url.pathname.startsWith('/#'))) {
      return { href: `${url.pathname}${url.hash}`, external: false };
    }
    if (url.protocol === 'https:') return { href: url.href, external: true };
  } catch {
    return null;
  }
  return null;
}

function Ambassador() {
  const [question, setQuestion] = useState('');
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [lastQuestion, setLastQuestion] = useState('');
  const answerRef = useRef<HTMLDivElement>(null);
  const ambassador = useAskAmbassador();
  const response = ambassador.data;

  useEffect(() => {
    if (response) answerRef.current?.focus();
  }, [response]);

  const ask = async (value: string) => {
    const clean = value.trim().slice(0, 300);
    if (!clean || ambassador.isPending) return;
    setQuestion('');
    setLastQuestion(clean);
    setActivePrompt(prompts.includes(clean) ? clean : null);
    ambassador.reset();
    try {
      await ambassador.mutateAsync({ data: { question: clean } });
    } catch {
      // The visible error state below handles network, server and rate-limit failures.
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void ask(question);
  };

  const error = ambassador.error as (Error & { status?: number; response?: { status?: number } }) | null;
  const rateLimited = error?.status === 429 || error?.response?.status === 429 || /rate.?limit|too many/i.test(error?.message ?? '');

  return (
    <div className="ambassador">
      <div className="amb-copy">
        <div className="eyebrow">AMBASSADOR / SOURCE-GROUNDED</div>
        <h3>A research assistant, not a black box.</h3>
        <p>Explore the profile through recruiter-focused questions. Answers come from the verified portfolio record and point back to inspectable sources.</p>
        <div className="source-note">SERVER-BACKED PROFILE QUERY<br />No chat history is saved. Unsupported claims are identified, not guessed.</div>
      </div>
      <div className="chat" aria-label="Profile ambassador">
        <div className="chat-head">
          <span>PROFILE QUERY / VIVEKANANDA</span>
          <span className="chat-state"><i className="live-dot" /> {ambassador.isPending ? 'SEARCHING SOURCES' : response?.mode === 'direct_match' ? 'VERIFIED MATCH' : 'SOURCE-GROUNDED'}</span>
        </div>
        <div className="chat-body" aria-live="polite">
          {ambassador.isPending ? (
            <div className="chat-intro" role="status">Checking the verified profile record…</div>
          ) : response ? (
            <div ref={answerRef} tabIndex={-1} aria-label="Ambassador answer">
              <p className={`chat-answer ${response.supported ? '' : 'unsupported'}`}>{response.answer}</p>
              {response.mode === 'direct_match' && <p className="chat-intro">Model selection is limited right now. This answer was matched directly to approved profile facts.</p>}
              {!response.supported && <p className="chat-intro">The public profile does not provide enough evidence to support that claim.</p>}
              {response.citations.length > 0 && (
                <div className="source-links" aria-label="Answer sources">
                  {response.citations.map((citation, index) => {
                    const safe = safeCitation(citation.href);
                    return safe ? (
                      <a
                        key={`${citation.href}-${index}`}
                        href={safe.href}
                        target={safe.external ? '_blank' : undefined}
                        rel={safe.external ? 'noopener noreferrer' : undefined}
                        aria-label={`Open source: ${citation.label}`}
                        data-testid={`link-citation-${index}`}
                      >SOURCE / {citation.label} ↗</a>
                    ) : <span className="tool-pill" key={`${citation.label}-${index}`}>{citation.label}</span>;
                  })}
                </div>
              )}
            </div>
          ) : ambassador.error ? (
            <div className="ask-error" role="alert">
              {rateLimited
                ? 'The ambassador is receiving requests too quickly. Please wait a moment and try again.'
                : 'The profile service could not answer right now. Your question was not saved; try again.'}
              <button className="question" type="button" onClick={() => void ask(lastQuestion)} disabled={!lastQuestion}>Retry question</button>
            </div>
          ) : (
            <p className="chat-intro">Select a starter or ask a question. Answers are grounded in the public profile, with links to sources.</p>
          )}
        </div>
        <div className="question-label">RECRUITER STARTERS</div>
        <div className="question-list">
          {prompts.map((prompt) => (
            <button
              className={`question ${activePrompt === prompt ? 'selected' : ''}`}
              type="button"
              key={prompt}
              onClick={() => void ask(prompt)}
              disabled={ambassador.isPending}
              data-testid={`button-prompt-${prompts.indexOf(prompt) + 1}`}
            >{prompt}</button>
          ))}
        </div>
        <form className="ask-form" onSubmit={onSubmit}>
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value.slice(0, 300))}
            maxLength={300}
            rows={2}
            placeholder="Ask a profile question…"
            aria-label="Ask a freeform question"
            data-testid="input-ambassador-question"
            disabled={ambassador.isPending}
          />
          <button type="submit" disabled={ambassador.isPending || !question.trim()} data-testid="button-ask-ambassador">
            {ambassador.isPending ? 'CHECKING…' : 'ASK'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Portfolio() {
  const [openProject, setOpenProject] = useState('accountant');
  return (
    <div className="eval-lab">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Vivekananda profile home" data-testid="link-home">
          <span className="mark">V.</span><span>VIVEKANANDA / SYSTEMS PROFILE</span>
        </a>
        <nav className="top-meta" aria-label="Main navigation">
          <span><i className="live-dot" /> CANDIDATE FILE</span>
          <a href="#evidence">Evidence</a><a href="#skills">Capabilities</a><a href="#ambassador">Ask the profile</a>
        </nav>
        <a className="top-contact" href={LINKEDIN} target="_blank" rel="noopener noreferrer" data-testid="link-linkedin-header">Contact on LinkedIn ↗</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="shell hero-grid">
            <div>
              <div className="eyebrow">AI GENERALIST <span className="mono">/</span> EVALUATION LAB</div>
              <h1>Make AI useful.<br /><span>Make its output</span><br />hold up.</h1>
              <p className="intro">I build practical AI tools, test whether their outputs make sense, and improve the workflows around them.</p>
              <div className="hero-actions">
                <a className="button primary" href="#evidence" data-testid="link-project-evidence">Inspect project evidence <span aria-hidden="true">↘</span></a>
                <a className="button contact" href={LINKEDIN} target="_blank" rel="noopener noreferrer" data-testid="link-linkedin">Contact on LinkedIn ↗</a>
                <a className="button" href={RESUME_PATH} download="Vivekananda_Cherukupally_Public_Resume.pdf" data-testid="link-resume-download">Download public resume <span aria-hidden="true">↓</span></a>
                <div className="contact-links"><a href={GITHUB} target="_blank" rel="noopener noreferrer" data-testid="link-github">GitHub ↗</a></div>
              </div>
            </div>
            <aside className="fit-map" aria-label="Role fit mapped to project evidence">
              <div className="panel-head"><span className="panel-title">Role fit / evidence map</span><span className="panel-index">MAP 01—03</span></div>
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
                <span className="mono">CURRENT ROLE</span><h3>ML Engineer<br />(Contract)</h3><p>Handshake AI</p>
                <p className="mono" style={{ marginTop: 12 }}>JUL 2026 — PRESENT</p>
              </div>
              <div className="exp-main">
                <p>Evaluate AI outputs and improve prompt-based systems with feedback, while building, testing, and troubleshooting the workflows that support them.</p>
                <ul className="work-list">
                  <li>Accuracy, relevance, consistency, and usability evaluation</li><li>Prompt-based system iteration with feedback</li>
                  <li>Building and testing automation pipelines</li><li>Environment setup and debugging</li>
                  <li>Git / GitHub collaboration</li><li>Docker workflows and REST API integrations</li>
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
                  <article className={`project ${isOpen ? 'is-open' : ''}`} id={project.id} key={project.id}>
                    <button className="project-toggle" type="button" aria-expanded={isOpen} aria-controls={`detail-${project.id}`} onClick={() => setOpenProject(isOpen ? '' : project.id)} data-testid={`button-project-${project.id}`}>
                      <span className="project-num">{project.index} /</span>
                      <span><span className="project-title">{project.title}</span><span className="project-date">{project.date}</span></span>
                      <span className={`state ${project.stateTone}`}>{project.state}</span><span className="chevron" aria-hidden="true">+</span>
                    </button>
                    {isOpen && (
                      <div className="project-detail" id={`detail-${project.id}`}>
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
              {skillGroups.map((group) => <div className="skill-group" key={group.label}><div className="skill-label">{group.label}</div><div className="skill-items">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>)}
            </div>
          </div>
        </section>

        <section className="section" id="activity">
          <div className="shell">
            <div className="section-head"><div><div className="section-kicker">04 / OUTSIDE THE PROJECT LOG</div><h2>Community &amp; curiosity.</h2></div></div>
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
                <div className="interests"><span>AI systems</span><span>Automation</span><span>SaaS product development</span><span>Entrepreneurship</span></div>
                <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 22 }}>Current curiosity sits at the meeting point of useful AI, reliable workflows, and products people can actually use.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="ambassador">
          <div className="shell">
            <div className="section-head"><div><div className="section-kicker">05 / GROUNDED PROFILE ASSISTANT</div><h2>Ask for the evidence.</h2></div></div>
            <Ambassador />
          </div>
        </section>
      </main>
      <footer className="shell footer" id="contact">
        <span>Vivekananda Cherukupally <span className="mono">/ AI Generalist</span></span>
        <div className="footer-links">
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Portfolio} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;