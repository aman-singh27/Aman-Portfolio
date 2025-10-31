import React, { useState, useEffect, useRef } from 'react';

interface ProjectsHeadingProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const ProjectsHeading: React.FC<ProjectsHeadingProps> = ({ scrollContainerRef }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = container.clientHeight;

      const start = rect.top + container.scrollTop;
      const end = start + sectionRef.current.offsetHeight - viewportHeight;
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

  // 🎬 Animation timing (cinematic pacing)
  const titleRevealEnd = 0.25;
  const titleExitStart = 0.40;
  const titleExitEnd = 0.60;
  const subtitleRevealStart = 0.65;
  const subtitleRevealEnd = 0.85;
  const subtitleMoveStart = 0.90;
  const gradientWidth = 55;

  // 🧠 Title animation (same)
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

  // 🧩 Subtitle animation (whole sentence reveal)
  const subtitle = 'A blend of creative design, strategic thinking, and technical skills';
  let subtitleMaskGradient = 'linear-gradient(to right, transparent, transparent)';
  let subtitleTranslateY = 0;

  if (scrollProgress >= subtitleRevealStart && scrollProgress <= subtitleRevealEnd) {
    const revealProgress = (scrollProgress - subtitleRevealStart) / (subtitleRevealEnd - subtitleRevealStart);
    const eased = 1 - Math.pow(1 - revealProgress, 3);
    const visibleStop = eased * (100 + gradientWidth) - gradientWidth;
    const transparentStop = eased * (100 + gradientWidth);
    subtitleMaskGradient = `linear-gradient(to right, black ${visibleStop}%, transparent ${transparentStop}%)`;
  } else if (scrollProgress > subtitleRevealEnd) {
    subtitleMaskGradient = 'linear-gradient(to right, black, black)';
  }

  // Subtitle scroll-up motion after reveal
  if (scrollProgress > subtitleMoveStart) {
    const moveProgress = (scrollProgress - subtitleMoveStart) / (1 - subtitleMoveStart);
    subtitleTranslateY = -Math.min(moveProgress ** 2 * 100, 100);
  }

  return (
    <section ref={sectionRef} className="h-[800vh] relative bg-yellow-400">
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
              maskImage: subtitleMaskGradient,
              WebkitMaskImage: subtitleMaskGradient,
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsHeading;
