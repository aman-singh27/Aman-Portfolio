import React, { useEffect, useRef, useState } from 'react';

interface AboutProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const About: React.FC<AboutProps> = ({ scrollContainerRef }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on when element enters viewport
      // Animation starts when element is at bottom of viewport
      // and completes when element reaches top
      const start = windowHeight;
      const end = 0;
      const current = rect.top;
      
      let progress = 0;
      if (current <= start && current >= end) {
        progress = 1 - (current / start);
      } else if (current < end) {
        progress = 1;
      }
      
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollContainerRef]);

  // Smooth easing function
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(scrollProgress);

  // Calculate transformations
  const rotation = (1 - easedProgress) * -8; // Rotates from -8deg to 0deg
  const translateY = (1 - easedProgress) * 100; // Moves from 100px below to 0
  const scale = 0.85 + (easedProgress * 0.15); // Scales from 0.85 to 1
  const opacity = easedProgress;

  return (
    <section className="w-full" ref={sectionRef}>
      <div 
        className="relative min-h-screen flex items-center justify-center bg-white text-black overflow-hidden p-8 md:p-16"
        style={{
          transform: `translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
          opacity: opacity,
          transformOrigin: 'center center',
          transition: 'none', // Remove transition to make scroll-driven animation smooth
        }}
      >
        <div className="w-full max-w-7xl">
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8 flex-wrap">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight max-w-4xl">
                    Hello! I'm Dumeme,
                    <br />
                    a multidisciplinary digital designer
                    <br />
                    with ten years of experience
                    <br />
                    in the creative industry.
                  </h1>
                  <div 
                    className="hidden md:flex items-center gap-4 whitespace-nowrap pt-4 flex-shrink-0"
                    style={{
                      opacity: easedProgress,
                      transform: `translateX(${(1 - easedProgress) * 20}px)`,
                    }}
                  >
                    <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                    <span className="text-sm tracking-widest font-medium">ABOUT ME</span>
                  </div>
                </div>
                
                <div 
                  className="flex justify-end pr-0 md:pr-16"
                  style={{
                    opacity: easedProgress,
                    transform: `translateX(${(1 - easedProgress) * -20}px)`,
                  }}
                >
                     <div 
                      className="w-48 h-8" 
                      style={{ 
                        backgroundImage: 'repeating-linear-gradient(-45deg, black, black 4px, white 4px, white 8px)', 
                        backgroundSize: '11.31px 11.31px' 
                      }}
                    ></div>
                </div>
            </div>

            <hr 
              className="border-t border-gray-300 my-12 relative z-10"
              style={{
                opacity: easedProgress,
                transform: `scaleX(${easedProgress})`,
                transformOrigin: 'left center',
              }}
            />

            <div className="grid md:grid-cols-2 gap-12 items-end relative z-10">
              <div 
                className="space-y-8"
                style={{
                  opacity: easedProgress,
                  transform: `translateY(${(1 - easedProgress) * 30}px)`,
                }}
              >
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  With a strong background in design and development, I
                  collaborate remotely with cross-functional teams to craft
                  compelling experiences that drive meaningful engagement.
                  Want to know more about me? click the link below
                </p>
                <button className="cursor-pointer inline-flex items-center gap-3 bg-black border border-black rounded-full px-5 py-3 text-white hover:bg-gray-800 transition-colors group">
                  <span className="font-medium tracking-wide">ABOUT</span>
                  <div className="bg-yellow-400 rounded-full p-2 group-hover:scale-110 transition-transform">
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.03125 1L11 5M11 5L7.03125 9M11 5H0" stroke="black" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </button>
              </div>
              <div 
                className="relative w-full max-w-xs mx-auto md:mr-0"
                style={{
                  opacity: easedProgress,
                  transform: `translateY(${(1 - easedProgress) * 40}px) scale(${0.9 + (easedProgress * 0.1)})`,
                }}
              >
                <div className="relative">
                  <img src="https://i.imgur.com/vJ4M4fV.png" alt="Portrait of the designer" className="w-full h-auto filter grayscale" />
                  <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
                  <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-8 border-l-8 border-yellow-400 rounded-bl-2xl"></div>
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-8 border-r-8 border-yellow-400 rounded-br-2xl"></div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;