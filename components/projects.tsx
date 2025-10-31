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
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="200" height="100" fill="url(#productGrid)" />
    <rect
      x="30"
      y="20"
      width="100"
      height="100"
      rx="10"
      fill="none"
      stroke="white"
      strokeWidth="2"
      transform="rotate(15 80 70)"
    />
    <rect
      x="50"
      y="40"
      width="100"
      height="100"
      rx="10"
      fill="none"
      stroke="rgb(250 204 21)"
      strokeWidth="2"
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
    <circle cx="100" cy="150" r="100" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
    <circle cx="100" cy="150" r="80" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
    <circle cx="100" cy="150" r="60" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="170" cy="40" r="20" fill="rgb(250 204 21)" />
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
        <rect width="10" height="10" fill="white" />
        <rect x="10" y="10" width="10" height="10" fill="white" />
      </pattern>
    </defs>
    <rect
      x="100"
      y="0"
      width="100"
      height="100"
      fill="url(#webflowChecker)"
      opacity="0.8"
    />
    <circle cx="50" cy="50" r="40" stroke="rgb(250 204 21)" strokeWidth="2" fill="none" />
    <path
      d="M 10 50 Q 50 10, 90 50 Q 50 90, 10 50 z"
      stroke="white"
      strokeWidth="1"
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
  rotation: string;
  translation: string;
  zIndex: string;
  index: number;
  isVisible: boolean;
  isExiting: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  rotation,
  translation,
  zIndex,
  index,
  isVisible,
  isExiting,
}) => {
  const [wiggle, setWiggle] = useState(0);

  useEffect(() => {
    if (!isVisible || isExiting) return;

    const wiggleInterval = setInterval(() => {
      setWiggle(Math.sin(Date.now() / 800 + index) * 2);
    }, 50);

    return () => clearInterval(wiggleInterval);
  }, [isVisible, isExiting, index]);

  const getAnimationStyle = () => {
    if (isExiting) {
      const reverseDelay = (2 - index) * 200;
      return {
        animation: `floatOut 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${reverseDelay}ms forwards`,
      };
    }
    if (isVisible) {
      const delay = index * 200;
      return {
        animation: `floatIn 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms forwards`,
      };
    }
    return { opacity: 0, transform: 'translateY(120px)' };
  };

  return (
    <div
      className={`absolute w-72 h-[480px] sm:w-80 sm:h-[500px] transition-all duration-500 ease-out transform-gpu
                  ${zIndex}
                  hover:!rotate-0 hover:!scale-105 hover:!z-50 hover:!-translate-y-4`}
      style={{
        ...getAnimationStyle(),
        transform: `${rotation} ${translation} translateY(${wiggle}px)`,
      }}
    >
      <div className="w-full h-full bg-black rounded-[40px] border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between z-10">
          <div>
            <span className="inline-block px-3 py-1 bg-gray-800 text-white text-[10px] sm:text-xs font-semibold rounded-full uppercase tracking-wider">
              {project.tag}
            </span>
            <h3 className="text-white text-2xl sm:text-3xl font-bold mt-4">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base mt-2">
              {project.description}
            </p>
          </div>

          <a
            href={project.link}
            className="group mt-6 inline-flex items-center justify-between w-full bg-yellow-400 text-black font-bold py-3 px-5 rounded-xl transition-all duration-300 hover:bg-yellow-300 transform hover:scale-105"
          >
            <span>VIEW</span>
            <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-30 z-0">
          {project.graphic}
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent rounded-[40px] z-0"></div>
      </div>
    </div>
  );
};

// --- Main App Component ---
interface ProjectsProps {
    scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const Projects: React.FC<ProjectsProps> = ({ scrollContainerRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setIsExiting(false);
        } else if (!entry.isIntersecting && isVisible) {
          setIsExiting(true);
          setTimeout(() => {
            setIsVisible(false);
            setIsExiting(false);
          }, 1800);
        }
      },
      { root: container, threshold: 0.3 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [isVisible, scrollContainerRef]);

  return (
    <>
      <style>{`
        @keyframes floatIn {
          0% {
            opacity: 0;
            transform: translateY(120px) rotate(8deg) scale(0.9);
          }
          30% {
            transform: translateY(80px) rotate(-3deg) scale(0.95);
          }
          60% {
            transform: translateY(20px) rotate(2deg) scale(1.02);
          }
          80% {
            transform: translateY(-5px) rotate(-1deg) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }

        @keyframes floatOut {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
          20% {
            transform: translateY(-10px) rotate(-2deg) scale(1.02);
          }
          50% {
            transform: translateY(30px) rotate(3deg) scale(0.98);
          }
          100% {
            opacity: 0;
            transform: translateY(150px) rotate(-5deg) scale(0.85);
          }
        }
      `}</style>
      <div
        ref={sectionRef}
        className="bg-yellow-400 text-white pt-24 pb-32 sm:pb-48 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center">

          <div className="relative w-full max-w-5xl mx-auto h-[550px] sm:h-[600px] flex items-center justify-center">
            <ProjectCard
              project={projects[0]}
              rotation="rotate(-15deg)"
              translation="translateX(-120%)"
              zIndex="z-10"
              index={0}
              isVisible={isVisible}
              isExiting={isExiting}
            />
            <ProjectCard
              project={projects[1]}
              rotation="rotate(2deg)"
              translation="scale(1.08) -translate-y-4"
              zIndex="z-20"
              index={1}
              isVisible={isVisible}
              isExiting={isExiting}
            />
            <ProjectCard
              project={projects[2]}
              rotation="rotate(15deg)"
              translation="translateX(120%)"
              zIndex="z-10"
              index={2}
              isVisible={isVisible}
              isExiting={isExiting}
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