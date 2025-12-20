import React, { useState, useEffect, useRef } from 'react';

// --- SVG Arrow Icon ---
const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// --- Abstract Graphic Components ---
const ProductDesignGraphic = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 200 100"
    preserveAspectRatio="xMidYMid slice"
    className="absolute bottom-0 left-0 w-full h-full"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="productGrid"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 2 2 h 16 v 16 H 2 z"
          fill="none"
          stroke="rgba(250, 204, 21, 0.15)"
          strokeWidth="1"
        />
      </pattern>
      <linearGradient id="productGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgb(250 204 21)" stopOpacity="0.3" />
        <stop offset="100%" stopColor="rgb(250 204 21)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="200" height="100" fill="url(#productGrid)" />
    <rect
      x="30"
      y="20"
      width="100"
      height="100"
      rx="15"
      fill="url(#productGlow)"
      stroke="rgb(250 204 21)"
      strokeWidth="2"
      transform="rotate(15 80 70)"
    />
    <rect
      x="50"
      y="40"
      width="100"
      height="100"
      rx="15"
      fill="none"
      stroke="rgba(250, 204, 21, 0.5)"
      strokeWidth="2"
      strokeDasharray="5,5"
      transform="rotate(5 100 90)"
    />
  </svg>
);

const WebDesignGraphic = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 200 100"
    preserveAspectRatio="xMidYMid slice"
    className="absolute bottom-0 left-0 w-full h-full"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="webGlow">
        <stop offset="0%" stopColor="rgb(250 204 21)" stopOpacity="0.4" />
        <stop offset="100%" stopColor="rgb(250 204 21)" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="150" r="100" stroke="rgba(250,204,21,0.1)" strokeWidth="2" fill="none" />
    <circle cx="100" cy="150" r="80" stroke="rgba(250,204,21,0.2)" strokeWidth="2" fill="none" />
    <circle cx="100" cy="150" r="60" stroke="rgb(250 204 21)" strokeWidth="3" fill="none" />
    <circle cx="170" cy="40" r="25" fill="url(#webGlow)" />
    <circle cx="170" cy="40" r="15" fill="rgb(250 204 21)" />
  </svg>
);

const WebflowGraphic = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 200 100"
    preserveAspectRatio="xMidYMid slice"
    className="absolute bottom-0 left-0 w-full h-full"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="webflowChecker"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <rect width="10" height="10" fill="rgba(250, 204, 21, 0.1)" />
        <rect x="10" y="10" width="10" height="10" fill="rgba(250, 204, 21, 0.1)" />
      </pattern>
    </defs>
    <rect
      x="100"
      y="0"
      width="100"
      height="100"
      fill="url(#webflowChecker)"
      opacity="0.6"
    />
    <circle cx="50" cy="50" r="40" stroke="rgb(250 204 21)" strokeWidth="3" fill="none" />
    <circle cx="50" cy="50" r="30" stroke="rgba(250 204 21, 0.5)" strokeWidth="2" fill="none" />
    <path
      d="M 10 50 Q 50 10, 90 50 Q 50 90, 10 50 z"
      stroke="rgba(250, 204, 21, 0.6)"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

// --- Project Data ---
const projects = [
  {
    tag: 'HEALTH TECH',
    title: 'MedVault',
    description:
      'A secure digital health platform featuring role-based access, consent-driven record visibility, and compliant document storage. Engineered for privacy and scalability with comprehensive frontend and backend workflows.',
    graphic: <ProductDesignGraphic />,
    link: 'https://github.com/aman-singh27/Med_Vault.git',
  },
  {
    tag: 'AI SECURITY',
    title: 'VoiceGuard',
    description:
      'AI-powered voice authentication system aimed at fraud detection. Implements biometric identity verification, anomaly detection logic, and real-time security workflows.',
    graphic: <WebDesignGraphic />,
    link: 'https://voice-ruby-eta.vercel.app/',
  },
  {
    tag: 'DATA ENGINEERING',
    title: 'Twitter (X) Content Scraper',
    description:
      'Structured extraction tool for public tweets and threads. Features scalable data ingestion, rate-limit handling, and a clean interface to organize content for analysis.',
    graphic: <WebflowGraphic />,
    link: 'https://github.com/aman-singh27/twitter-scraper.git',
  },
];

// --- Project Card Component ---
interface ProjectCardProps {
  project: (typeof projects)[0];
  isVisible: boolean;
  delay: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isVisible,
  delay,
}) => {
  return (
    <div
      className="transition-all duration-[2000ms] ease-out transform-gpu hover:scale-105 hover:z-50"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(120px) scale(0.85)',
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
      }}
    >
      <div className="w-80 h-[480px] bg-black rounded-[40px] border-2 border-gray-800 shadow-2xl overflow-hidden flex flex-col relative group">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-400/10 rounded-[40px]"></div>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col justify-between z-10 relative">
          <div>
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-gray-800 to-gray-900 text-yellow-400 text-[10px] font-bold rounded-full uppercase tracking-widest border border-gray-700">
              {project.tag}
            </span>
            <h3 className="text-white text-2xl font-bold mt-4 tracking-tight">
              {project.title}
            </h3>
            <p className="text-gray-400 text-base mt-3 leading-relaxed">
              {project.description}
            </p>
          </div>

          <a
            href={project.link}
            className="group/btn mt-6 inline-flex items-center justify-between w-full bg-yellow-400 text-black font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/50 transform hover:scale-105"
          >
            <span className="text-sm tracking-wide">VIEW PROJECT</span>
            <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
          </a>
        </div>

        {/* Background graphic */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 z-0">
          {project.graphic}
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/[0.03] via-transparent to-black/20 rounded-[40px] z-0 pointer-events-none"></div>

        {/* Border glow */}
        <div className="absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-[40px] border-2 border-yellow-400/30"></div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
interface ProjectsProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const Projects: React.FC<ProjectsProps> = ({ scrollContainerRef }) => {
  const headingSectionRef = useRef<HTMLDivElement>(null);
  const cardsSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCardsVisible, setIsCardsVisible] = useState(false);

  // Heading scroll animation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let headingTop = 0;
    let headingHeight = 0;
    let viewportHeight = 0;
    let rafId: number;

    const updateMetrics = () => {
      if (headingSectionRef.current) {
        const rect = headingSectionRef.current.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        headingTop = rect.top - containerRect.top + container.scrollTop;
        headingHeight = headingSectionRef.current.offsetHeight;
        viewportHeight = container.clientHeight;
      }
    };

    const handleScroll = () => {
      if (!headingSectionRef.current) return;

      const currentScroll = container.scrollTop;
      const start = headingTop; // When section top hits viewport top (conceptually)
      // Original logic used: start = rect.top + container.scrollTop
      // rect.top is relative to viewport. rect.top + scrollTop IS basically offsetTop relative to container (if cached).

      // Wait, original logic:
      // const rect = headingSectionRef.current.getBoundingClientRect();
      // const start = rect.top + container.scrollTop;
      // This 'start' variable in original code seems to recalculate 'offsetTop' every time.
      // It effectively meant "absolute Y position of the element in the scrollable document".

      const end = start + headingHeight - viewportHeight;

      let progress = 0;
      if (currentScroll >= start && currentScroll <= end) {
        progress = (currentScroll - start) / (end - start);
      } else if (currentScroll > end) {
        progress = 1;
      }

      // Throttling state updates with rAF
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      });
    };

    // Initialize
    updateMetrics();

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateMetrics);

    // Initial check
    handleScroll();

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateMetrics);
      cancelAnimationFrame(rafId);
    };
  }, [scrollContainerRef]);

  // Cards visibility
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCardsVisible(true);
        }
      },
      { root: container, threshold: 0.2 }
    );

    if (cardsSectionRef.current) {
      observer.observe(cardsSectionRef.current);
    }

    return () => {
      if (cardsSectionRef.current) {
        observer.unobserve(cardsSectionRef.current);
      }
    };
  }, [scrollContainerRef]);

  // Animation timing - adjusted for more cinematic feel
  const titleRevealEnd = 0.25;
  const titleExitStart = 0.30;
  const titleExitEnd = 0.50;
  const subtitleRevealStart = 0.52;
  const subtitleRevealEnd = 0.75;
  const subtitleMoveStart = 0.78;
  const titleGradientWidth = 120;
  const subtitleGradientWidth = 180;

  // Title animation
  let titleMaskGradient = 'linear-gradient(to right, black, black)';

  if (scrollProgress <= titleRevealEnd) {
    const revealProgress = scrollProgress / titleRevealEnd;
    const eased = 1 - Math.pow(1 - revealProgress, 3);
    const visibleStop = eased * (100 + titleGradientWidth) - titleGradientWidth;
    const transparentStop = eased * (100 + titleGradientWidth);
    titleMaskGradient = `linear-gradient(to right, black ${visibleStop}%, transparent ${transparentStop}%)`;
  } else if (scrollProgress >= titleExitStart && scrollProgress <= titleExitEnd) {
    const exitProgress = (scrollProgress - titleExitStart) / (titleExitEnd - titleExitStart);
    const eased = exitProgress ** 3;
    const visiblePercent = 1 - eased;
    const transparentStop = visiblePercent * (100 + titleGradientWidth);
    const blackStop = transparentStop - titleGradientWidth;
    titleMaskGradient = `linear-gradient(to right, black ${blackStop}%, transparent ${transparentStop}%)`;
  } else if (scrollProgress > titleExitEnd) {
    titleMaskGradient = `linear-gradient(to right, transparent, transparent)`;
  }

  // Subtitle animation - split into two lines
  const subtitleLine1 = 'Engineering robust solutions';
  const subtitleLine2 = 'with modern tech stacks and intelligent automation';
  let subtitleTranslateY = 0;

  const getLineMaskGradient = (lineNumber: 1 | 2) => {
    if (scrollProgress < subtitleRevealStart) {
      return 'linear-gradient(to right, transparent, transparent)';
    }

    const revealDuration = subtitleRevealEnd - subtitleRevealStart;
    const halfDuration = revealDuration / 2;

    // Line 1 animates in first half, Line 2 in second half
    const lineStartTime = lineNumber === 1
      ? subtitleRevealStart
      : subtitleRevealStart + halfDuration;
    const lineEndTime = lineNumber === 1
      ? subtitleRevealStart + halfDuration
      : subtitleRevealEnd;

    if (scrollProgress < lineStartTime) {
      return 'linear-gradient(to right, transparent, transparent)';
    } else if (scrollProgress >= lineStartTime && scrollProgress <= lineEndTime) {
      const lineProgress = (scrollProgress - lineStartTime) / halfDuration;
      const eased = 1 - Math.pow(1 - lineProgress, 3);
      const visibleStop = eased * (100 + subtitleGradientWidth) - subtitleGradientWidth;
      const transparentStop = eased * (100 + subtitleGradientWidth);
      return `linear-gradient(to right, black ${visibleStop}%, transparent ${transparentStop}%)`;
    } else {
      return 'linear-gradient(to right, black, black)';
    }
  };

  if (scrollProgress > subtitleMoveStart) {
    const moveProgress = (scrollProgress - subtitleMoveStart) / (1 - subtitleMoveStart);
    subtitleTranslateY = -Math.min(moveProgress ** 2 * 100, 100);
  }

  return (
    <>
      {/* Projects Heading Section */}
      <section ref={headingSectionRef} className="h-[600vh] relative bg-yellow-400">
        <div className="sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden">
          {/* PROJECTS title */}
          <h2
            className="font-anton text-[18vw] text-black leading-none absolute"
            style={{
              transform: 'scaleX(0.75)',
              maskImage: titleMaskGradient,
              WebkitMaskImage: titleMaskGradient,
            }}
          >
            PROJECTS
          </h2>

          {/* Subtitle */}
          <div
            className="absolute px-20 text-center max-w-6xl"
            style={{
              transform: `translateY(${subtitleTranslateY}vh)`,
            }}
          >
            <div className="text-[3.5vw] text-black leading-tight"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 300,
              }}
            >
              <p
                style={{
                  maskImage: getLineMaskGradient(1),
                  WebkitMaskImage: getLineMaskGradient(1),
                }}
              >
                {subtitleLine1}
              </p>
              <p
                style={{
                  maskImage: getLineMaskGradient(2),
                  WebkitMaskImage: getLineMaskGradient(2),
                }}
              >
                {subtitleLine2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Subtitle End + Projects Cards Section with Gradient */}
      <div className="bg-gradient-to-b from-yellow-400 via-yellow-400 via-30% to-black text-white relative overflow-hidden">
        {/* Spacer for subtitle transition */}
        <div className="h-96"></div>

        {/* Projects Cards */}
        <div ref={cardsSectionRef} className="pt-64 pb-64">
          <div className="container mx-auto px-4 text-center">
            <div className="relative w-full max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 items-center justify-center">
              <ProjectCard
                project={projects[0]}
                isVisible={isCardsVisible}
                delay={200}
              />
              <ProjectCard
                project={projects[1]}
                isVisible={isCardsVisible}
                delay={800}
              />
              <ProjectCard
                project={projects[2]}
                isVisible={isCardsVisible}
                delay={1400}
              />
            </div>
          </div>

          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 max-w-2xl bg-white/5 rounded-full blur-[120px]"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </>
  );
}

export default Projects;