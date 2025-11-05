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
    tag: 'MOBILE / WEB APPS',
    title: 'Product Design',
    description:
      'Focused on creating practical, user-friendly designs that prioritize functionality and deliver smooth, engaging experiences.',
    graphic: <ProductDesignGraphic />,
    link: '#',
  },
  {
    tag: 'FIGMA DESIGN',
    title: 'Web Design',
    description:
      'Skilled in designing responsive, user-friendly websites by using Figma to create pixel-perfect landing pages.',
    graphic: <WebDesignGraphic />,
    link: '#',
  },
  {
    tag: 'WEB DEVELOPMENT',
    title: 'Webflow',
    description:
      'Proficient in the use of Webflow to build functional, visually engaging websites efficiently, without-compromising quality.',
    graphic: <WebflowGraphic />,
    link: '#',
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
      className="transition-all duration-1000 ease-out transform-gpu hover:scale-105 hover:z-50"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(80px)',
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      <div className="w-96 h-[580px] bg-black rounded-[40px] border-2 border-gray-800 shadow-2xl overflow-hidden flex flex-col relative group">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-400/10 rounded-[40px]"></div>
        </div>
        
        {/* Content */}
        <div className="p-8 flex-grow flex flex-col justify-between z-10 relative">
          <div>
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-gray-800 to-gray-900 text-yellow-400 text-[10px] font-bold rounded-full uppercase tracking-widest border border-gray-700">
              {project.tag}
            </span>
            <h3 className="text-white text-3xl font-bold mt-5 tracking-tight">
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

    const handleScroll = () => {
      if (!headingSectionRef.current) return;
      const rect = headingSectionRef.current.getBoundingClientRect();
      const viewportHeight = container.clientHeight;

      const start = rect.top + container.scrollTop;
      const end = start + headingSectionRef.current.offsetHeight - viewportHeight;
      const current = container.scrollTop;

      let progress = 0;
      if (current >= start && current <= end) {
        progress = (current - start) / (end - start);
      } else if (current > end) {
        progress = 1;
      }

      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
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

  // Animation timing
  const titleRevealEnd = 0.35;
  const titleExitStart = 0.35;
  const titleExitEnd = 0.60;
  const subtitleRevealStart = 0.62;
  const subtitleRevealEnd = 0.80;
  const subtitleMoveStart = 0.80;
  const gradientWidth = 55;

  // Title animation
  let titleMaskGradient = 'linear-gradient(to right, black, black)';

  if (scrollProgress <= titleRevealEnd) {
    const revealProgress = scrollProgress / titleRevealEnd;
    const eased = 1 - Math.pow(1 - revealProgress, 3);
    const visibleStop = eased * (100 + gradientWidth) - gradientWidth;
    const transparentStop = eased * (100 + gradientWidth);
    titleMaskGradient = `linear-gradient(to right, black ${visibleStop}%, transparent ${transparentStop}%)`;
  } else if (scrollProgress >= titleExitStart && scrollProgress <= titleExitEnd) {
    const exitProgress = (scrollProgress - titleExitStart) / (titleExitEnd - titleExitStart);
    const eased = exitProgress ** 3;
    const visiblePercent = 1 - eased;
    const transparentStop = visiblePercent * (100 + gradientWidth);
    const blackStop = transparentStop - gradientWidth;
    titleMaskGradient = `linear-gradient(to right, black ${blackStop}%, transparent ${transparentStop}%)`;
  } else if (scrollProgress > titleExitEnd) {
    titleMaskGradient = `linear-gradient(to right, transparent, transparent)`;
  }

  // Subtitle animation
  const subtitle = 'A blend of creative design, strategic thinking, and technical skills';
  const words = subtitle.split(' ');
  let subtitleTranslateY = 0;

  const getWordMaskGradient = (wordIndex: number) => {
    if (scrollProgress < subtitleRevealStart) {
      return 'linear-gradient(to right, transparent, transparent)';
    }
    
    const totalWords = words.length;
    const revealDuration = subtitleRevealEnd - subtitleRevealStart;
    const timePerWord = revealDuration / totalWords;
    
    const wordStartTime = subtitleRevealStart + (wordIndex * timePerWord);
    const wordEndTime = wordStartTime + timePerWord;
    
    if (scrollProgress < wordStartTime) {
      return 'linear-gradient(to right, transparent, transparent)';
    } else if (scrollProgress >= wordStartTime && scrollProgress <= wordEndTime) {
      const wordProgress = (scrollProgress - wordStartTime) / timePerWord;
      const eased = 1 - Math.pow(1 - wordProgress, 3);
      const visibleStop = eased * (100 + gradientWidth) - gradientWidth;
      const transparentStop = eased * (100 + gradientWidth);
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
            <p
              className="text-[3.5vw] text-black leading-tight"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 300,
              }}
            >
              {words.map((word, index) => (
                <span
                  key={index}
                  style={{
                    maskImage: getWordMaskGradient(index),
                    WebkitMaskImage: getWordMaskGradient(index),
                    display: 'inline-block',
                    marginRight: '0.3em',
                  }}
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Cards Section */}
      <div
        ref={cardsSectionRef}
        className="bg-gradient-to-b from-yellow-400 via-yellow-400/70 via-yellow-400/40 via-yellow-400/20 to-black text-white pt-24 pb-32 sm:pb-48 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="relative w-full max-w-7xl mx-auto h-[650px] flex items-center justify-center gap-10">
            <ProjectCard
              project={projects[0]}
              isVisible={isCardsVisible}
              delay={0}
            />
            <ProjectCard
              project={projects[1]}
              isVisible={isCardsVisible}
              delay={1000}
            />
            <ProjectCard
              project={projects[2]}
              isVisible={isCardsVisible}
              delay={1750}
            />
          </div>
        </div>

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 max-w-2xl bg-white/5 rounded-full blur-[120px]"
          aria-hidden="true"
        ></div>
      </div>
    </>
  );
}

export default Projects;