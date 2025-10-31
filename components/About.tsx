import React, { useRef, useEffect } from 'react';

interface AboutProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const About: React.FC<AboutProps> = ({ scrollContainerRef }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!sectionRef.current || !cardRef.current) return;

      const { top, height } = sectionRef.current.getBoundingClientRect();
      const viewportHeight = container.clientHeight;
      
      // Progress of scrolling through the section.
      // 0 = section top at viewport top. 1 = section fully scrolled through.
      const progress = Math.max(0, Math.min(1, -top / (height - viewportHeight)));

      // Animate card during the scroll
      const cardProgress = progress;
      const translateY = 150 * (1 - cardProgress);
      const opacity = cardProgress;

      if(cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) translateY(${translateY}px)`;
        cardRef.current.style.opacity = `${opacity}`;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      if(container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollContainerRef]);


  return (
    <section 
      className="w-full h-[150vh] relative" // Adjusted height for scroll animation
      ref={sectionRef}
    >
      <div 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* About Me Card */}
        <div 
          ref={cardRef}
          className="relative w-full bg-white text-black overflow-hidden z-10 border border-black"
          style={{ willChange: 'transform, opacity', opacity: 0 }}
        >
          <div className="max-w-7xl mx-auto p-12 md:p-24">
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
                >
                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                  <span className="text-sm tracking-widest font-medium">ABOUT ME</span>
                </div>
              </div>
              
              <div className="flex justify-end pr-0 md:pr-16">
                <div 
                  className="w-48 h-8" 
                  style={{ 
                    backgroundImage: 'repeating-linear-gradient(-45deg, black, black 4px, white 4px, white 8px)', 
                    backgroundSize: '11.31px 11.31px' 
                  }}
                ></div>
              </div>
            </div>

            <hr className="border-t border-gray-300 my-12 relative z-10" />

            <div className="grid md:grid-cols-2 gap-12 items-end relative z-10">
              <div className="space-y-8">
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

              <div className="relative w-full max-w-xs mx-auto md:mr-0">
                <div className="relative">
                  <img 
                    src="https://i.imgur.com/vJ4M4fV.png" 
                    alt="Portrait of the designer" 
                    className="w-full h-auto filter grayscale" 
                  />
                  <div 
                    className="absolute inset-0" 
                    style={{ 
                      backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px)', 
                      backgroundSize: '4px 4px' 
                    }}
                  ></div>
                  <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-8 border-l-8 border-yellow-400 rounded-bl-2xl"></div>
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-8 border-r-8 border-yellow-400 rounded-br-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
