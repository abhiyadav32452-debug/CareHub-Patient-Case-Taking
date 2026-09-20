import { Link } from "react-router-dom";
import { ArrowIcon, DoctorIcon, FileIcon, PulseIcon, ShieldIcon, UserIcon } from "../components/Icons";

const features = [
  ["Structured case intake", "Demographics, symptoms, history and medication captured in one consistent digital record.", UserIcon],
  ["Guided clinical interview", "A focused question flow helps patients provide the essentials before consultation.", PulseIcon],
  ["Doctor-ready summary", "Clinicians receive a concise case view with status, responses and documents.", FileIcon],
];

export default function Home() {
  return (
    <div className="landing">
      <header className="site-header">
        <div className="shell site-header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">✦</span>
            <span className="brand-copy"><strong>CareHub</strong><small>PEOPLE · TECHNOLOGY · BETTER CARE</small></span>
          </Link>

          <nav className="landing-nav">
            <a href="#home" className="active">Home</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
          </nav>

          <Link className="outline-btn" to="/login">Login / Sign Up</Link>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="hero-noise" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span>✦</span> STRUCTURED · MULTI-LINGUAL · SECURE</div>
            <h1>Same Care.<br /><span>A Smarter Start.</span></h1>
            <p>CareHub helps patients share their medical history through a guided digital conversation, creating a structured case that gives doctors a clearer starting point.</p>

            <div className="hero-buttons">
              <Link className="primary-btn" to="/login">Start Health Check-in <ArrowIcon /></Link>
              <a className="ghost-btn" href="#how-it-works"><span className="play">▶</span> See How It Works</a>
            </div>

            <div className="hero-mini">
              <span>◉ Voice ready</span><span>◎ 5 languages</span><span>▣ Documents</span><span>✓ Secure workflow</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hud-label hud-top">CLINICAL INTAKE SYSTEM <span>● ONLINE</span></div>
            <div className="hud-label hud-bottom">CASE ID <strong>SJ-1024</strong></div>

            <div className="holo-grid" />
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="scan-plane" />

            <div className="care-core">
              <div className="core-ring ring-one" />
              <div className="core-ring ring-two" />
              <div className="core-ring ring-three" />
              <div className="core-glow" />
              <div className="core-center">
                <PulseIcon />
                <strong>CARE</strong>
                <small>INTELLIGENCE CORE</small>
              </div>
              <span className="core-node node-one">CASE</span>
              <span className="core-node node-two">HISTORY</span>
              <span className="core-node node-three">DOCS</span>
              <span className="core-node node-four">REVIEW</span>
              <span className="core-line line-one" />
              <span className="core-line line-two" />
              <span className="core-line line-three" />
              <span className="core-line line-four" />
            </div>

            <div className="float-panel fp-left-one">
              <div className="tiny-icon"><UserIcon /></div>
              <div><b>Patient Check-in</b><small>Quick · Simple · Secure</small></div>
            </div>

            <div className="float-panel fp-left-two">
              <div className="tiny-icon"><PulseIcon /></div>
              <div><b>Guided Interview</b><small>Adaptive clinical questions</small></div>
            </div>

            <div className="float-panel fp-right">
              <div className="tiny-icon"><DoctorIcon /></div>
              <div><b>Doctor Review</b><small>Structured case at a glance</small></div>
            </div>

            <div className="ecg">
              <svg viewBox="0 0 600 80" preserveAspectRatio="none"><path d="M0 42H125l16-1 13-29 20 58 18-28h75l14 0 12-17 15 35 17-18h125l14 0 13-30 20 59 18-29h90" /></svg>
            </div>
          </div>
        </div>

        <div className="shell hero-stats">
          <div><strong>01</strong><span>Structured intake</span></div>
          <div><strong>02</strong><span>Guided interview</span></div>
          <div><strong>03</strong><span>Documents</span></div>
          <div><strong>04</strong><span>Doctor review</span></div>
          <div className="stat-message">Better information before the consultation.</div>
        </div>
      </section>

      <section id="how-it-works" className="dark-section">
        <div className="shell">
          <div className="section-head">
            <div><div className="eyebrow">THE WORKFLOW</div><h2>From patient voice to <span>clinical clarity.</span></h2></div>
            <p>CareHub creates a bridge between what the patient says and what the doctor needs to review.</p>
          </div>

          <div className="workflow-grid">
            {[
              ["01","Check-in","Create a digital patient case with basic details and the primary concern."],
              ["02","Common problem","Start quickly from a common concern such as headache, fever or cough."],
              ["03","Interview + documents","Collect guided history and attach relevant prescriptions or reports."],
              ["04","Doctor review","Submit a structured case and let the clinician review before consultation."],
            ].map(([n,t,d]) => <div className="workflow-card" key={n}><span>{n}</span><div className="workflow-dot" /><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </div>
      </section>

      <section id="features" className="light-dark-section">
        <div className="shell">
          <div className="center-head"><div className="eyebrow">BUILT AROUND THE PATIENT JOURNEY</div><h2>Simple on the surface.<br /><span>Powerful underneath.</span></h2><p>Every screen has one clear purpose so the patient never feels lost.</p></div>
          <div className="feature-grid">
            {features.map(([title, desc, Icon]) => <div className="feature-card" key={title}><div className="feature-icon"><Icon /></div><h3>{title}</h3><p>{desc}</p><Link to="/login">Explore workflow <ArrowIcon /></Link></div>)}
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="shell about-grid">
          <div className="about-radar"><div className="radar-circle r1"/><div className="radar-circle r2"/><div className="radar-circle r3"/><div className="radar-core">♥<small>CAREHUB</small></div></div>
          <div><div className="eyebrow">OUR VISION</div><h2>Technology should make <span>care feel more human.</span></h2><p>Doctors should spend less time repeatedly collecting basic history and more time understanding the person in front of them. CareHub organizes the information before the consultation.</p><div className="about-points"><div><ShieldIcon/><span>Privacy-first prototype workflow</span></div><div><FileIcon/><span>Structured digital case records</span></div><div><DoctorIcon/><span>Designed for clinician review</span></div></div></div>
        </div>
      </section>

      <footer className="footer"><div className="shell footer-inner"><div className="brand"><span className="brand-mark">✦</span><span className="brand-copy"><strong>CareHub</strong><small>BETTER CARE · BETTER START</small></span></div><span>SIH Prototype · Sample patient data</span><span className="system-ready">● SYSTEM READY</span></div></footer>
    </div>
  );
}