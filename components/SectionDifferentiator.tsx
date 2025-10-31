import React, { useState, useEffect, useRef } from 'react';

interface SectionDifferentiatorProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const SectionDifferentiator: React.FC<SectionDifferentiatorProps> = ({ scrollContainerRef }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top } = sectionRef.current.getBoundingClientRect();
      const viewportHeight = container.clientHeight;
      
      const scrollDistance = viewportHeight * 4; // Slow down the animation
      const animationStartPoint = viewportHeight; // Start when top of element hits bottom of viewport
      
      const currentProgress = (animationStartPoint - top) / scrollDistance;
      
      setProgress(Math.max(0, Math.min(1, currentProgress)));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if(container) {
          container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollContainerRef]);

  // Animate background position for a seamless looping effect.
  // The pattern repeats every 48px.
  const backgroundPositionX = progress * 48 * 26; // Move 4 pattern cycles over the animation duration

  return (
    <div ref={sectionRef} className="bg-white w-full overflow-hidden">
      <div className="h-[72px] relative">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 
              `repeating-linear-gradient(to right, black 0, black 24px, white 24px, white 48px),
               repeating-linear-gradient(to right, white 0, white 24px, black 24px, black 48px)`,
            backgroundSize: '48px 24px, 48px 24px',
            backgroundRepeat: 'repeat-x, repeat-x',
            backgroundPosition: `${backgroundPositionX}px 0, ${backgroundPositionX}px 24px`,
            willChange: 'background-position',
          }}
        />
        <div className="absolute bottom-0 left-0 h-[24px] bg-yellow-400 w-full" />
      </div>
    </div>
  );
};

export default SectionDifferentiator;
