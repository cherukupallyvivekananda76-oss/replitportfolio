export function Editorial() {
  const projects = [
    {
      id: "accountant",
      number: "01",
      title: "AI Accountant Agent",
      date: "MAR 2026 — PRESENT",
      kind: "IN PROGRESS",
      problem:
        "Financial calculations are only useful when the reasoning behind them can be trusted.",
      contribution:
        "Developing an AI-powered agent for calculations, expense tracking, ledger understanding, and report generation. I manually compare outputs with hand calculations to evaluate accuracy and refine the workflow.",
      evidence:
        "A hands-on evaluation loop: compare the agent's answer against a manual calculation, then use what I find to refine the workflow. The project is in progress.",
      tools: ["Python", "n8n", "LLM APIs", "Spreadsheets", "Automation"],
      mark: "A",
    },
    {
      id: "pinterest",
      number: "02",
      title: "Pinterest Affiliate Automation App",
      date: "MAY — JUN 2026",
      kind: "PROJECT",
      problem:
        "Turning a topic into useful Pinterest content takes more than generating a headline.",
      contribution:
        "Built a tool that turns a niche or topic into Pinterest-ready titles, descriptions, keywords, and content workflows. Checked product–niche match and content relevance.",
      evidence:
        "The workflow brings content generation and relevance checks into one practical tool.",
      tools: ["Python", "React", "Node.js", "LLM APIs", "REST APIs"],
      mark: "P",
    },
    {
      id: "tutor",
      number: "03",
      title: "AI Tutor",
      date: "SEP 2025",
      kind: "PROTOTYPE",
      problem:
        "Learning interfaces can adapt to a learner instead of presenting the same path to everyone.",
      contribution:
        "Built a prototype for personalized learning using generative AI and learning-focused interfaces.",
      evidence:
        "A prototype exploring how generative AI can support a more personalized learning experience.",
      tools: ["Python", "React", "External APIs"],
      mark: "T",
    },
    {
      id: "stadiumflow",
      number: "04",
      title: "StadiumFlow",
      date: "MAR 1 — 20, 2025",
      kind: "APPLICATION CONCEPT",
      problem:
        "Finding a seat, amenities, and food in a live venue is a series of disconnected tasks.",
      contribution:
        "Designed a crowd-navigation and stadium-experience application for live position, seat navigation, amenities, and food ordering using ticket details.",
      evidence:
        "A designed application concept connecting ticket details with navigation and venue workflows.",
      tools: ["React", "Node.js", "Maps APIs", "Geolocation", "REST APIs"],
      mark: "S",
    },
  ];

  const questions = [
    { text: "How does Vivekananda evaluate AI output?", href: "#approach" },
    { text: "What is the strongest example of applied AI?", href: "#accountant" },
    { text: "Which tools has he used in full-stack projects?", href: "#toolkit" },
    { text: "What is he currently building?", href: "#accountant" },
  ];

  return (
    <main className="ed-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');
        .ed-page {
          --paper: #f4f0e7;
          --ink: #292b24;
          --muted: #686a5e;
          --line: #d9d2c3;
          --moss: #405a43;
          --rust: #bd5c3c;
          --sun: #e8c56e;
          min-height: 100vh; background: var(--paper); color: var(--ink);
          font-family: 'DM Sans', sans-serif; overflow: hidden;
          -webkit-font-smoothing: antialiased;
        }
        .ed-page * { box-sizing: border-box; }
        .ed-page a { color: inherit; text-decoration: none; }
        .ed-page a:focus-visible, .ed-page button:focus-visible {
          outline: 3px solid var(--rust); outline-offset: 4px; border-radius: 2px;
        }
        .ed-shell { width: min(1160px, calc(100% - 72px)); margin: 0 auto; }
        .ed-mono { font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: .105em; font-size: 10px; }
        .ed-topbar { height: 68px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--line); }
        .ed-wordmark { display:flex; align-items:center; gap:11px; font-size:13px; font-weight:700; letter-spacing:-.02em; }
        .ed-seal { width:27px; height:27px; display:grid; place-items:center; border:1px solid var(--moss); border-radius:50%; color:var(--moss); font: 11px 'DM Mono',monospace; }
        .ed-nav { display:flex; gap:26px; align-items:center; color:var(--muted); }
        .ed-nav a { transition:color .2s; }
        .ed-nav a:hover { color:var(--rust); }
        .ed-contact { display:flex; gap:17px; align-items:center; font-size:12px; font-weight:600; }
        .ed-contact a { border-bottom:1px solid var(--moss); padding-bottom:3px; }
        .ed-hero { min-height: 590px; padding: 76px 0 78px; display:grid; grid-template-columns:minmax(0,1.3fr) minmax(265px,.7fr); gap:60px; align-items:center; position:relative; }
        .ed-kicker { color:var(--moss); display:flex; align-items:center; gap:10px; margin:0 0 23px; }
        .ed-kicker:before { content:''; width:26px; height:1px; background:var(--moss); }
        .ed-title { font: 500 clamp(56px, 7.8vw, 102px)/.99 'Playfair Display', Georgia, serif; letter-spacing:-.055em; margin:0; max-width:760px; }
        .ed-title em { color:var(--rust); font-weight:500; }
        .ed-intro { font-size:17px; line-height:1.65; color:#52544c; max-width:590px; margin:27px 0 0; }
        .ed-hero-actions { display:flex; gap:14px; margin-top:29px; flex-wrap:wrap; }
        .ed-button { display:inline-flex; gap:12px; align-items:center; background:var(--moss); color:#faf8f1!important; padding:14px 18px; font-size:12px; font-weight:700; transition:transform .2s,background .2s; }
        .ed-button:hover { transform:translateY(-2px); background:#314835; }
        .ed-button.secondary { background:transparent; color:var(--ink)!important; border:1px solid #9c9e8f; }
        .ed-button.secondary:hover { background:#e9e4d8; }
        .ed-button .arrow { font-size:16px; line-height:10px; }
        .ed-note { margin-top:12px; color:#77796d; font-size:11px; }
        .ed-portrait { position:relative; min-height:365px; display:flex; align-items:center; justify-content:center; }
        .ed-orbit { width:286px; height:286px; border:1px solid #b9bdab; border-radius:50%; position:relative; display:grid; place-items:center; }
        .ed-orbit:before,.ed-orbit:after { content:''; position:absolute; inset:24px; border:1px solid #d4cbb9; border-radius:50%; }
        .ed-orbit:after { inset:55px; border-color:#d5a389; }
        .ed-monogram { width:168px; height:168px; background:#dce0d0; border-radius:50%; display:grid; place-items:center; font:500 83px/.9 'Playfair Display',serif; color:var(--moss); position:relative; z-index:1; letter-spacing:-.08em; }
        .ed-orbit-label { position:absolute; background:var(--paper); padding:7px 9px; color:var(--moss); }
        .ed-orbit-label.top { top:35px; right:-38px; transform:rotate(4deg); }
        .ed-orbit-label.bottom { bottom:45px; left:-37px; transform:rotate(-4deg); }
        .ed-availability { position:absolute; bottom:4px; right:3px; color:var(--muted); }
        .ed-availability i { display:inline-block; width:7px;height:7px;background:#71916a;border-radius:50%; margin-right:7px; }
        .ed-strip { border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:18px 0; display:grid; grid-template-columns:repeat(3,1fr); }
        .ed-strip-item { padding:0 25px; border-right:1px solid var(--line); }
        .ed-strip-item:first-child { padding-left:0; }
        .ed-strip-item:last-child { border:0; }
        .ed-strip-item strong { display:block; font:500 19px 'Playfair Display',serif; margin-bottom:5px; }
        .ed-strip-item span { color:var(--muted); font-size:11px; }
        .ed-section { padding:105px 0 96px; }
        .ed-section-head { display:grid; grid-template-columns:220px 1fr; gap:34px; align-items:start; margin-bottom:53px; }
        .ed-index { color:var(--rust); padding-top:9px; }
        .ed-section h2 { font:500 clamp(39px,5vw,61px)/1.03 'Playfair Display',serif; letter-spacing:-.045em; margin:0; }
        .ed-section-deck { max-width:535px; color:var(--muted); font-size:15px; line-height:1.7; margin:15px 0 0; }
        .ed-work-intro { display:grid; grid-template-columns:1.2fr .8fr; align-items:end; gap:40px; margin:0 0 35px 254px; }
        .ed-work-intro p { margin:0; font:italic 20px/1.45 'Playfair Display',serif; color:var(--moss); }
        .ed-work-intro span { color:var(--muted); line-height:1.6; font-size:12px; }
        .ed-case { display:grid; grid-template-columns:220px 1fr; gap:34px; border-top:1px solid var(--line); padding:32px 0 39px; scroll-margin-top:24px; }
        .ed-case-meta { display:flex; flex-direction:column; align-items:flex-start; gap:9px; }
        .ed-case-no { font:12px 'DM Mono',monospace; color:var(--rust); }
        .ed-case-date { color:var(--muted); }
        .ed-case-state { margin-top:4px; border:1px solid #b9bdab; padding:5px 7px; color:var(--moss); }
        .ed-case-content { display:grid; grid-template-columns:minmax(0,1fr) 220px; gap:38px; }
        .ed-case h3 { font:500 34px/1.12 'Playfair Display',serif; letter-spacing:-.03em; margin:0 0 19px; }
        .ed-detail { margin:0 0 16px; color:#53564e; font-size:14px; line-height:1.7; }
        .ed-detail b { color:var(--ink); font-size:10px; text-transform:uppercase; letter-spacing:.09em; display:block; margin-bottom:5px; }
        .ed-tools { border-left:1px solid var(--line); padding-left:20px; align-self:stretch; }
        .ed-tools h4 { font:10px 'DM Mono',monospace; color:var(--muted); letter-spacing:.1em; text-transform:uppercase; margin:3px 0 13px; }
        .ed-tool-list { display:flex; gap:7px; flex-wrap:wrap; }
        .ed-tool { background:#e8e4d9; padding:6px 8px; color:#57594f; font-size:10px; }
        .ed-proof { font-size:12px; line-height:1.55; color:var(--moss); padding-top:15px; margin-top:16px; border-top:1px solid var(--line); }
        .ed-proof:before { content:'EVIDENCE NOTE'; display:block; font:9px 'DM Mono',monospace; color:var(--rust); letter-spacing:.09em; margin-bottom:7px; }
        .ed-aside { background:#e7e9df; padding:31px; margin-top:33px; display:grid; grid-template-columns:220px 1fr; gap:34px; }
        .ed-aside .ed-mono { color:var(--moss); }
        .ed-aside h3 { font:500 27px 'Playfair Display',serif; margin:0; }
        .ed-aside p { margin:0; color:#51564d; line-height:1.7; font-size:14px; }
        .ed-approach { background:#e8e4d9; padding:83px 0; }
        .ed-approach-inner { display:grid; grid-template-columns: .8fr 1.2fr; gap:100px; }
        .ed-approach h2 { font:500 clamp(41px,5vw,62px)/1 'Playfair Display',serif; letter-spacing:-.04em; margin:15px 0 18px; }
        .ed-approach p { color:#57594f; line-height:1.7; font-size:14px; }
        .ed-steps { border-top:1px solid #c9c4b7; }
        .ed-step { display:grid; grid-template-columns:44px 1fr; gap:18px; padding:18px 0; border-bottom:1px solid #c9c4b7; }
        .ed-step-no { font:12px 'DM Mono',monospace; color:var(--rust); padding-top:4px; }
        .ed-step strong { display:block; font:500 19px 'Playfair Display',serif; margin-bottom:5px; }
        .ed-step p { margin:0; font-size:12px; }
        .ed-facts { padding:95px 0; }
        .ed-facts-grid { display:grid; grid-template-columns:1fr 1fr; gap:90px; }
        .ed-facts h2 { font:500 43px/1.05 'Playfair Display',serif; letter-spacing:-.04em; margin:13px 0 25px; }
        .ed-fact-row { border-top:1px solid var(--line); padding:15px 0; display:grid; grid-template-columns:125px 1fr; gap:16px; }
        .ed-fact-row:last-child { border-bottom:1px solid var(--line); }
        .ed-fact-row small { color:var(--muted); font:10px 'DM Mono',monospace; text-transform:uppercase; letter-spacing:.08em; padding-top:3px; }
        .ed-fact-row p { margin:0; color:#52544c; line-height:1.65; font-size:13px; }
        .ed-skill-cloud { display:flex; flex-wrap:wrap; gap:8px; margin:20px 0 0; }
        .ed-skill { padding:8px 10px; border:1px solid #d2caba; color:#56584e; font-size:11px; }
        .ed-ambassador { background:var(--moss); color:#f4f0e7; padding:82px 0 85px; position:relative; overflow:hidden; }
        .ed-ambassador:after { content:'?'; position:absolute; right:5%; top:-145px; font:500 490px/.9 'Playfair Display',serif; color:rgba(246,241,228,.045); pointer-events:none; }
        .ed-amb-grid { position:relative; z-index:1; display:grid; grid-template-columns:.84fr 1.16fr; gap:84px; }
        .ed-ambassador .ed-mono { color:#d7c78f; }
        .ed-ambassador h2 { font:500 clamp(42px,5vw,61px)/1.02 'Playfair Display',serif; letter-spacing:-.04em; margin:16px 0; }
        .ed-ambassador .ed-copy { color:#d7ddcf; font-size:14px; line-height:1.7; max-width:390px; }
        .ed-chat { border:1px solid rgba(241,238,222,.35); padding:24px; background:rgba(29,51,34,.25); }
        .ed-chat-top { display:flex; justify-content:space-between; align-items:center; padding-bottom:16px; border-bottom:1px solid rgba(241,238,222,.2); }
        .ed-chat-top strong { font:500 19px 'Playfair Display',serif; }
        .ed-chat-status { color:#d7c78f; }
        .ed-chat-intro { color:#e1e3d9; font-size:13px; line-height:1.6; margin:18px 0; }
        .ed-question-list { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
        .ed-question { border:1px solid rgba(241,238,222,.3); padding:11px 12px; color:#f3f0e7; font:12px/1.45 'DM Sans',sans-serif; transition:background .2s,border-color .2s; }
        .ed-question:hover { background:rgba(255,255,255,.1); border-color:#e1c36d; }
        .ed-chat-input { display:flex; justify-content:space-between; align-items:center; margin-top:17px; padding:11px 13px; border:1px solid rgba(241,238,222,.25); color:#c3c9bd; font-size:11px; }
        .ed-chat-input span:last-child { color:#d7c78f; font:10px 'DM Mono',monospace; }
        .ed-chat-note { font-size:10px; color:#bbc7b6; margin:11px 0 0; line-height:1.5; }
        .ed-footer { padding:25px 0; display:flex; align-items:center; justify-content:space-between; gap:18px; color:#d9decf; border-top:1px solid rgba(241,238,222,.23); margin-top:76px; position:relative; z-index:1; }
        .ed-footer-name { font:500 18px 'Playfair Display',serif; }
        .ed-footer-links { display:flex; gap:20px; font-size:11px; }
        .ed-footer-links a { border-bottom:1px solid #a9b79e; padding-bottom:3px; }
        .ed-rise { animation:ed-rise .7s both; }
        .ed-delay { animation-delay:.12s; }
        @keyframes ed-rise { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .ed-page *, .ed-page *:before, .ed-page *:after { animation-duration:.01ms!important; transition-duration:.01ms!important; scroll-behavior:auto!important; } }
        @media (max-width: 760px) {
          .ed-shell { width:calc(100% - 40px); }
          .ed-topbar { height:60px; }
          .ed-nav { display:none; }
          .ed-contact { gap:12px; font-size:11px; }
          .ed-hero { min-height:unset; padding:58px 0 50px; grid-template-columns:1fr; gap:35px; }
          .ed-title { font-size:clamp(55px,14vw,83px); }
          .ed-intro { font-size:15px; }
          .ed-portrait { min-height:260px; }
          .ed-orbit { width:220px; height:220px; }
          .ed-monogram { width:132px;height:132px;font-size:67px; }
          .ed-orbit-label.top { right:-44px; top:20px; }
          .ed-orbit-label.bottom { left:-40px; bottom:24px; }
          .ed-availability { bottom:-4px; }
          .ed-strip { grid-template-columns:1fr; gap:0; }
          .ed-strip-item,.ed-strip-item:first-child { border-right:0; border-bottom:1px solid var(--line); padding:14px 0; }
          .ed-strip-item:last-child { border:0; }
          .ed-section { padding:72px 0; }
          .ed-section-head { grid-template-columns:1fr; gap:12px; margin-bottom:34px; }
          .ed-section h2 { font-size:45px; }
          .ed-work-intro { grid-template-columns:1fr; gap:10px; margin:0 0 24px; }
          .ed-work-intro p { font-size:19px; }
          .ed-case { grid-template-columns:1fr; gap:17px; padding:24px 0 29px; }
          .ed-case-meta { flex-direction:row; align-items:center; flex-wrap:wrap; gap:11px; }
          .ed-case-content { grid-template-columns:1fr; gap:21px; }
          .ed-case h3 { font-size:30px; margin-bottom:15px; }
          .ed-tools { border-left:0; border-top:1px solid var(--line); padding:15px 0 0; }
          .ed-aside { grid-template-columns:1fr; gap:11px; padding:24px; }
          .ed-approach { padding:65px 0; }
          .ed-approach-inner { grid-template-columns:1fr; gap:32px; }
          .ed-facts { padding:70px 0; }
          .ed-facts-grid { grid-template-columns:1fr; gap:48px; }
          .ed-facts h2 { font-size:38px; }
          .ed-fact-row { grid-template-columns:100px 1fr; }
          .ed-ambassador { padding:65px 0 25px; }
          .ed-amb-grid { grid-template-columns:1fr; gap:30px; }
          .ed-ambassador:after { font-size:300px; right:-15px; top:-40px; }
          .ed-chat { padding:18px; }
          .ed-question-list { grid-template-columns:1fr; }
          .ed-footer { margin-top:50px; align-items:flex-start; flex-direction:column; }
        }
      `}</style>

      <header className="ed-shell ed-topbar">
        <a href="#top" className="ed-wordmark" aria-label="Vivekananda Cherukupally, home">
          <span className="ed-seal">VC</span>
          <span>Vivekananda Cherukupally</span>
        </a>
        <nav className="ed-nav ed-mono" aria-label="Page navigation">
          <a href="#work">Selected work</a>
          <a href="#approach">Approach</a>
          <a href="#toolkit">Background</a>
        </nav>
        <div className="ed-contact">
          <a href="https://www.linkedin.com/in/vivekananda-cherukupally-396731379" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </header>

      <section className="ed-shell ed-hero" id="top">
        <div className="ed-rise">
          <p className="ed-kicker ed-mono">AI Generalist · AI systems & automation</p>
          <h1 className="ed-title">I make AI<br />more <em>useful.</em></h1>
          <p className="ed-intro">
            I test what AI gets right, improve how systems respond, and build practical tools that bring AI into real workflows.
          </p>
          <div className="ed-hero-actions">
            <a className="ed-button" href="#work">Read the project notes <span className="arrow">↓</span></a>
            <a className="ed-button secondary" href="https://github.com/cherukupallyvivekananda76-oss" target="_blank" rel="noreferrer">GitHub <span className="arrow">↗</span></a>
          </div>
          <p className="ed-note">A working portfolio preview. A sanitized resume will be available here.</p>
        </div>
        <div className="ed-portrait ed-rise ed-delay" aria-label="Vivekananda Cherukupally monogram artwork">
          <div className="ed-orbit">
            <span className="ed-orbit-label top ed-mono">Evaluate</span>
            <span className="ed-orbit-label bottom ed-mono">Iterate</span>
            <span className="ed-monogram" aria-hidden="true">V.</span>
          </div>
          <span className="ed-availability ed-mono"><i />Evidence over claims</span>
        </div>
      </section>

      <section className="ed-shell ed-strip" aria-label="At a glance">
        <div className="ed-strip-item"><strong>AI output evaluation</strong><span>Accuracy · relevance · consistency · usability</span></div>
        <div className="ed-strip-item"><strong>Prompt & workflow iteration</strong><span>Feedback into better system behavior</span></div>
        <div className="ed-strip-item"><strong>Practical AI tools</strong><span>Full-stack projects, APIs, automation</span></div>
      </section>

      <section className="ed-shell ed-section" id="work">
        <div className="ed-section-head">
          <div className="ed-index ed-mono">01 / Selected work</div>
          <div>
            <h2>Proof lives in<br />the process.</h2>
            <p className="ed-section-deck">A few projects spanning AI output evaluation, prompt iteration, workflow automation, and practical full-stack tools.</p>
          </div>
        </div>
        <div className="ed-work-intro">
          <p>AI work is more than a prompt: examine the output, then refine the workflow.</p>
          <span>Project notes describe the problem, my contribution, the tools, and what the current evidence actually shows.</span>
        </div>
        {projects.map((project) => (
          <article className="ed-case" id={project.id} key={project.id}>
            <div className="ed-case-meta">
              <span className="ed-case-no">{project.number} / <span aria-hidden="true">{project.mark}</span></span>
              <span className="ed-case-date ed-mono">{project.date}</span>
              <span className="ed-case-state ed-mono">{project.kind}</span>
            </div>
            <div className="ed-case-content">
              <div>
                <h3>{project.title}</h3>
                <p className="ed-detail"><b>The problem</b>{project.problem}</p>
                <p className="ed-detail"><b>My contribution</b>{project.contribution}</p>
                <p className="ed-proof">{project.evidence}</p>
              </div>
              <aside className="ed-tools">
                <h4>Tools & materials</h4>
                <div className="ed-tool-list">{project.tools.map((tool) => <span className="ed-tool" key={tool}>{tool}</span>)}</div>
              </aside>
            </div>
          </article>
        ))}
        <div className="ed-aside">
          <div><span className="ed-mono">A different kind of first</span><h3>Automated Tractor Prototype</h3></div>
          <p>My first hardware project, built for the college Project Expo.</p>
        </div>
      </section>

      <section className="ed-approach" id="approach">
        <div className="ed-shell ed-approach-inner">
          <div>
            <span className="ed-mono" style={{ color: "var(--rust)" }}>02 / How I work</span>
            <h2>Useful beats impressive.</h2>
            <p>The work spans the seams: checking an AI answer, adjusting the system around it, and making the result usable in a real workflow.</p>
          </div>
          <div className="ed-steps">
            <div className="ed-step"><span className="ed-step-no">01</span><div><strong>Check the answer</strong><p>Evaluate accuracy, relevance, consistency, and usability against the task.</p></div></div>
            <div className="ed-step"><span className="ed-step-no">02</span><div><strong>Improve the system</strong><p>Use feedback to iterate on prompts and the surrounding workflow.</p></div></div>
            <div className="ed-step"><span className="ed-step-no">03</span><div><strong>Make it practical</strong><p>Connect APIs, automation, and interfaces into a tool people can work with.</p></div></div>
          </div>
        </div>
      </section>

      <section className="ed-shell ed-facts" id="toolkit">
        <div className="ed-facts-grid">
          <div>
            <span className="ed-mono" style={{ color: "var(--rust)" }}>03 / Experience & study</span>
            <h2>Grounded in<br />building and learning.</h2>
            <div className="ed-fact-row"><small>Current role</small><p><strong>ML Engineer (Contract)</strong><br />Handshake AI<br />Jul 2026–Present</p></div>
            <div className="ed-fact-row"><small>In practice</small><p>Output evaluation, prompt-based system iteration, automation pipelines, environment setup and debugging, Git/GitHub collaboration, Docker workflows, and REST API integrations.</p></div>
            <div className="ed-fact-row"><small>Education</small><p><strong>B.Tech CSE</strong><br />Symbiosis Institute of Technology, Hyderabad<br />2025–2029</p></div>
          </div>
          <div>
            <span className="ed-mono" style={{ color: "var(--rust)" }}>04 / Working toolkit</span>
            <h2>Tools are a means.</h2>
            <p className="ed-section-deck" style={{ marginTop: "-12px" }}>A practical mix for evaluating, building, connecting, and refining AI-enabled projects.</p>
            <div className="ed-skill-cloud" aria-label="Skills and tools">
              {["Python", "C++", "C", "JavaScript", "Generative AI", "LLMs", "AI agents", "Prompt engineering", "Model evaluation", "Training workflows", "Output validation", "Pandas", "NumPy", "Spreadsheet workflows", "SQL fundamentals", "React", "HTML", "CSS", "Node.js", "REST APIs", "Git", "GitHub", "Docker", "VS Code", "Google AI Studio", "Postman", "n8n"].map((skill) => <span className="ed-skill" key={skill}>{skill}</span>)}
            </div>
            <div className="ed-fact-row" style={{ marginTop: 27 }}><small>Outside the build</small><p>Under 25 Summit volunteer: event coordination, participant support, and technical assistance. Participated in technical presentations and speaking activities.</p></div>
            <div className="ed-fact-row"><small>Hackathons</small><p>Smart India Hackathon — Sep 2026, Sep 2025<br />Open AI Virtual Hackathon — Mar 2026<br />24-Hour Algorand Hackathon — May 2026</p></div>
            <div className="ed-fact-row"><small>Interests</small><p>AI systems, automation, SaaS product development, and entrepreneurship.</p></div>
          </div>
        </div>
      </section>

      <section className="ed-ambassador" id="ambassador">
        <div className="ed-shell ed-amb-grid">
          <div>
            <span className="ed-mono">05 / Ask the work</span>
            <h2>Curiosity, meet evidence.</h2>
            <p className="ed-copy">The portfolio’s planned ambassador will answer recruiter questions from verified project and experience notes, with links back to the relevant evidence.</p>
          </div>
          <div className="ed-chat">
            <div className="ed-chat-top"><strong>Vivekananda’s portfolio guide</strong><span className="ed-chat-status ed-mono">CONCEPT</span></div>
            <p className="ed-chat-intro">A grounded conversation layer is planned for the final site. Start with a question, then follow the evidence on this page.</p>
            <div className="ed-question-list">
              {questions.map((question) => <a className="ed-question" href={question.href} key={question.text}>{question.text} <span aria-hidden="true">↗</span></a>)}
            </div>
            <div className="ed-chat-input" aria-label="Chat interface preview"><span>Ask a question about the evidence…</span><span>GROUNDED CHAT · PLANNED</span></div>
            <p className="ed-chat-note">This is a visual concept, not a live assistant. The final version will be server-backed and grounded in approved portfolio content.</p>
          </div>
        </div>
        <footer className="ed-shell ed-footer">
          <span className="ed-footer-name">Vivekananda Cherukupally</span>
          <span className="ed-mono">Build carefully. Check the answer.</span>
          <div className="ed-footer-links">
            <a href="https://www.linkedin.com/in/vivekananda-cherukupally-396731379" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/cherukupallyvivekananda76-oss" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </footer>
      </section>
    </main>
  );
}