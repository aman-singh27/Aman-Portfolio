import { useEffect, useRef, useState } from "react";
import WorkShowcase from "./components/WorkShowcase";
import ScrollChoreography from "./components/ScrollChoreography";
import KineticGlobe from "./components/KineticGlobe";
import ExperienceSection from "./components/ExperienceSection";
import {
  capabilities,
  profile,
} from "./data/portfolio";
import portrait from "./src/images/aman-profile.webp";

const navigation = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Expertise", "#expertise"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
];
const process = [
  [
    "01",
    "Find the real problem.",
    "Start with the people, the workflow, and what a useful outcome looks like.",
  ],
  [
    "02",
    "Make it tangible.",
    "Map the flow, prototype the interface, and build the smallest useful version.",
  ],
  [
    "03",
    "Build. Test. Refine.",
    "Connect the moving parts, test the edge cases, and keep improving the details.",
  ],
];
const questions = [
  [
    "What kind of work do you take on?",
    "Full-stack web applications, workflow automation, AI integrations, and product interfaces. Think dashboards, document pipelines, WhatsApp workflows, and tools that make everyday work easier.",
  ],
  [
    "What does working together look like?",
    "We start with a conversation about the problem, the people using the product, and the constraints. From there, we agree on scope, review a first working version, and refine it through feedback.",
  ],
  [
    "How long does a project take?",
    "It depends on the scope and integrations. Share your idea and any deadline by email; we can work out a realistic plan before making a commitment.",
  ],
  [
    "Can I see the code or learn more about a project?",
    "Yes. Open a project for the context, approach, and outcome. Source and demo links appear where they are available. For anything else, send me a note.",
  ],
];

function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-7-7 7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m50 0 8 29L79 9l-9 29 30-3-25 18 22 20-30-6 3 30-18-24-19 25 4-31-29 9 19-23L0 39l31-2L18 10l24 20Z" />
    </svg>
  );
}
function WireGlobe({ moving }: { moving: boolean }) {
  return (
    <div className="hero-globe" aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none">
        <defs>
          <radialGradient id="globe-light">
            <stop stopColor="#e6ff57" stopOpacity=".12" />
            <stop offset="1" stopColor="#e6ff57" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="198" fill="url(#globe-light)" />
        <g className="globe-lines" />
        <ellipse
          cx="200"
          cy="200"
          rx="193"
          ry="59"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 5"
          transform="rotate(-34 200 200)"
        />
        <circle cx="345" cy="103" r="7" fill="currentColor" />
      </svg>
      <KineticGlobe moving={moving} />
      <span className="globe-coordinate">IDEAS ↔ SYSTEMS</span>
    </div>
  );
}
function LocalTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <time dateTime={time.toISOString()}>
      {new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(time)}{" "}
      IST
    </time>
  );
}

function App() {
  const mainRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDialogElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [copyState, setCopyState] = useState("Copy email");
  const copyTimeoutRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    document.documentElement.dataset.motion = motionPaused ? "paused" : "on";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [motionPaused]);
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const length =
          document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current)
          progressRef.current.style.transform = `scaleX(${length > 0 ? window.scrollY / length : 0})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  useEffect(() => () => window.clearTimeout(copyTimeoutRef.current), []);
  const closeMenu = () => {
    const dialog = menuRef.current;
    if (!dialog?.open || dialog.dataset.closing) return;
    if (
      motionPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      dialog.close();
      return;
    }
    dialog.dataset.closing = "true";
    const animation = dialog.animate(
      [
        { transform: "translateX(0)", opacity: 1 },
        { transform: "translateX(100%)", opacity: 0.8 },
      ],
      { duration: 260, easing: "cubic-bezier(.55,0,1,.45)" },
    );
    animation.finished.finally(() => {
      delete dialog.dataset.closing;
      dialog.close();
      animation.cancel();
    });
  };
  const copyEmail = async () => {
    window.clearTimeout(copyTimeoutRef.current);
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("Email copied");
    } catch {
      setCopyState("Select email below");
    }
    copyTimeoutRef.current = window.setTimeout(
      () => setCopyState("Copy email"),
      3500,
    );
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="reading-progress" ref={progressRef} aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Aman Singh home">
          <span className="monogram">
            as<span>✳</span>
          </span>
          <span>
            AMAN SINGH
            <br />
            <small>DEVELOPER & BUILDER</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">
            Selected work <span>↗</span>
          </a>
          <a href="#about">About</a>
          <a href="#contact">
            Let’s talk <span>↗</span>
          </a>
        </nav>
        <button
          className="menu-trigger"
          ref={menuTriggerRef}
          onClick={() => {
            menuRef.current?.showModal();
            setMenuOpen(true);
          }}
          aria-haspopup="dialog"
          aria-controls="site-menu"
          aria-expanded={menuOpen}
        >
          Menu{" "}
          <span className="menu-lines" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>
      <dialog
        className="navigation-dialog"
        id="site-menu"
        ref={menuRef}
        aria-labelledby="menu-title"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          setMenuOpen(false);
          menuTriggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="menu-shell">
          <div className="menu-top">
            <p id="menu-title" className="eyebrow">
              LOOK AROUND
            </p>
            <button
              className="circle-button"
              aria-label="Close navigation"
              onClick={closeMenu}
            >
              ×
            </button>
          </div>
          <nav aria-label="Expanded navigation">
            {navigation.map(([label, href], i) => (
              <a key={href} href={href} onClick={closeMenu}>
                <small>0{i + 1}</small>
                {label}
                <Arrow diagonal />
              </a>
            ))}
          </nav>
          <div className="menu-bottom">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <button
              onClick={() => setMotionPaused((value) => !value)}
              aria-pressed={motionPaused}
            >
              {motionPaused ? "Resume" : "Pause"} motion
            </button>
          </div>
        </div>
      </dialog>
      <main id="main" ref={mainRef}>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-topline">
            <span>
              <i className="status-dot" /> INDEPENDENT MIND. HANDS-ON BUILDER.
            </span>
            <span className="hero-edition">
              PORTFOLIO — {new Date().getFullYear()}
            </span>
          </div>
          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">
                FULL-STACK DEVELOPMENT · AI · AUTOMATION
              </p>
              <h1 id="hero-title" aria-label="Ideas into real things.">
                <span className="hero-line-mask">
                  <span className="hero-line">IDEAS INTO</span>
                </span>
                <span className="hero-line-mask">
                  <span className="hero-line hero-line-accent">
                    REAL THINGS<span className="title-period">.</span>
                  </span>
                </span>
              </h1>
              <p className="hero-description">
                I’m Aman. I build thoughtful web products
                <br className="desktop-break" /> and systems that make the
                busywork disappear.
              </p>
              <a className="pill-button accent-button" href="#work">
                Explore my work <Arrow diagonal />
              </a>
            </div>
            <WireGlobe moving={!motionPaused} />
          </div>
          <div className="hero-bottom">
            <a href="#about" className="scroll-link">
              <span className="scroll-icon">↓</span> A LITTLE SCROLL. A LOT TO
              EXPLORE.
            </a>
            <div className="hero-time">
              <span>INDIA / LOCAL TIME</span>
              <LocalTime />
            </div>
            <button
              className="motion-button"
              onClick={() => setMotionPaused((value) => !value)}
              aria-pressed={motionPaused}
            >
              <span aria-hidden="true">{motionPaused ? "▷" : "Ⅱ"}</span>
              {motionPaused ? "Motion paused" : "Pause motion"}
            </button>
          </div>
          <span className="hero-side-note" aria-hidden="true">
            CURIOUS BY DEFAULT. BUILDER BY CHOICE.
          </span>
        </section>
        <div className="ticker" aria-hidden="true">
          <div>
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>
                THOUGHTFUL INTERFACES <Star /> USEFUL AUTOMATION <Star />{" "}
                REAL-WORLD PROBLEMS <Star />
              </span>
            ))}
          </div>
        </div>
        <section
          className="about section-space"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="section-label">
            <span>01 / THE PERSON BEHIND THE PIXELS</span>
            <span>( ABOUT ME )</span>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <h2 id="about-title">
                A curious mind.
                <br />A builder’s <em>instinct.</em>
              </h2>
              <p className="about-lead">
                Good software should feel simple.
                <br />
                Even when what’s behind it isn’t.
              </p>
              <p>
                I’m Aman Singh, a full-stack developer and automation engineer
                studying Computer Science with Artificial Intelligence at
                Manipal University Jaipur. I work across interfaces, backend
                systems, and AI workflows to turn messy problems into useful
                products.
              </p>
              <p>
                From indoor navigation and content workflows to camera-to-print
                experiences, I like connecting the pieces — and caring about the
                details people actually use.
              </p>
              <a
                className="text-link"
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
              >
                Get my resume <Arrow diagonal />
              </a>
            </div>
            <figure className="portrait-card">
              <div className="portrait-image">
                <img
                  src={portrait}
                  alt="Aman Singh, full-stack developer and automation engineer"
                  width="633"
                  height="836"
                  loading="lazy"
                />
                <Star className="portrait-star" />
              </div>
              <figcaption>
                <span>AMAN, AWAY FROM THE KEYBOARD.</span>
                <span>↗</span>
              </figcaption>
            </figure>
          </div>
          <div className="about-facts">
            <div>
              <span>THE FOUNDATION</span>
              <p>Computer Science, AI & ML</p>
            </div>
            <div>
              <span>THE APPROACH</span>
              <p>Think it through. Build it well.</p>
            </div>
            <div>
              <span>THE COMMON THREAD</span>
              <p>Less friction. More possibility.</p>
            </div>
          </div>
        </section>
        <section
          className="expertise section-space"
          id="expertise"
          aria-labelledby="expertise-title"
        >
          <div className="section-label">
            <span>02 / WHAT I BRING TO THE TABLE</span>
            <span>( EXPERTISE )</span>
          </div>
          <div className="section-heading">
            <h2 id="expertise-title">
              Different tools.
              <br />
              <em>One connected approach.</em>
            </h2>
            <p>
              From the first user flow to the last API call.
              <br />I connect design, development, and automation.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability, index) => (
              <article className="capability" key={capability.title}>
                <div className="capability-top">
                  <span>0{index + 1}</span>
                  <span
                    className={`capability-symbol symbol-${index}`}
                    aria-hidden="true"
                  >
                    {["↗", "⌘", "✳", "↔"][index]}
                  </span>
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <div className="tool-tags">
                  {capability.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <WorkShowcase />
        <ExperienceSection />
        <section
          className="process section-space"
          aria-labelledby="process-title"
        >
          <div className="section-label">
            <span>05 / FROM THE FIRST WHY TO THE FINAL HOW</span>
            <span>( THE PROCESS )</span>
          </div>
          <div className="section-heading">
            <h2 id="process-title">
              Less guesswork.
              <br />
              <em>More making.</em>
            </h2>
            <Star className="process-star" />
          </div>
          <div className="process-grid">
            {process.map(([number, title, description]) => (
              <article key={number}>
                <span className="process-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          className="faq section-space"
          id="faq"
          aria-labelledby="faq-title"
        >
          <div className="section-label">
            <span>06 / GOOD TO KNOW</span>
            <span>( FAQ )</span>
          </div>
          <div className="faq-grid">
            <div>
              <h2 id="faq-title">
                A few things
                <br />
                <em>you might ask.</em>
              </h2>
              <p>
                Something else on your mind?
                <br />
                <a className="text-link" href={`mailto:${profile.email}`}>
                  Let’s talk <Arrow diagonal />
                </a>
              </p>
            </div>
            <div className="faq-list">
              {questions.map(([question, answer], index) => (
                <details key={question}>
                  <summary>
                    <small>0{index + 1}</small>
                    <span>{question}</span>
                    <span className="faq-toggle" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <footer className="contact section-space" id="contact">
          <div className="section-label">
            <span>HAVE A PROBLEM WORTH SOLVING?</span>
            <span>( LET’S CONNECT )</span>
          </div>
          <a className="contact-title" href={`mailto:${profile.email}`}>
            <span>
              LET’S MAKE
              <br />
              SOMETHING <em>CLICK.</em>
            </span>
            <Arrow diagonal />
          </a>
          <div className="contact-details">
            <div>
              <p>Have an idea, a question, or a better way to do things?</p>
              <a className="email-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <button className="copy-button" onClick={copyEmail}>
                <span aria-live="polite">{copyState}</span>
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="8" y="8" width="12" height="13" rx="2" />
                  <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
                </svg>
              </button>
            </div>
            <div className="social-links">
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub <Arrow diagonal />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <Arrow diagonal />
              </a>
              <a href={profile.resume} target="_blank" rel="noreferrer">
                Resume <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} AMAN SINGH</span>
            <span>BUILT WITH INTENT. ALWAYS IN PROGRESS.</span>
            <a href="#home">BACK TO TOP ↑</a>
          </div>
        </footer>
        <ScrollChoreography enabled={!motionPaused} scope={mainRef} />
      </main>
    </>
  );
}
export default App;
