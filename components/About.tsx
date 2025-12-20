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

    // Cache metrics to avoid layout thrashing
    let sectionTop = 0;
    let sectionHeight = 0;
    let viewportHeight = 0;

    const updateMetrics = () => {
      if (sectionRef.current) {
        // Calculate top relative to the scroll container
        const rect = sectionRef.current.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        sectionTop = rect.top - containerRect.top + container.scrollTop;
        sectionHeight = rect.height;
        viewportHeight = container.clientHeight;

        // Force an update after metrics change
        handleScroll();
      }
    };

    const handleScroll = () => {
      if (!sectionRef.current || !cardRef.current) return;

      const currentScroll = container.scrollTop;
      // Derived current 'top' relative to viewport
      const currentTop = sectionTop - currentScroll;

      // Progress calculation
      const progress = Math.max(0, Math.min(1, -currentTop / (sectionHeight - viewportHeight)));

      // Animate card during the scroll using requestAnimationFrame
      requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const cardProgress = Math.min(1, progress * 4);
        const translateY = 150 * (1 - cardProgress);
        const opacity = cardProgress;

        cardRef.current.style.transform = `perspective(1000px) translateY(${translateY}px)`;
        cardRef.current.style.opacity = `${opacity}`;
      });
    };

    // Initial measurement
    updateMetrics();

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateMetrics);

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', updateMetrics);
    };
  }, [scrollContainerRef]);


  return (
    <section
      className="w-full h-[200vh] relative" // Adjusted height for scroll animation
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
              <div className="flex justify-between items-stretch mb-8 flex-wrap">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight max-w-4xl">
                  Hello! I’m Aman,
                  <br />
                  a full-stack developer
                  <br />
                  and AI engineering student
                  <br />
                  building the web of tomorrow.
                </h1>

                <div className="hidden md:flex flex-col items-end justify-between gap-6 py-2">
                  <div className="flex items-center gap-4">
                    <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                    <span className="text-sm tracking-widest font-medium">ABOUT ME</span>
                  </div>
                  <div
                    className="w-48 h-8"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(-45deg, black, black 4px, white 4px, white 8px)',
                      backgroundSize: '11.31px 11.31px'
                    }}
                  ></div>
                </div>
              </div>

            </div>

            <hr className="border-t border-gray-300 my-12 relative z-10" />

            <div className="grid md:grid-cols-2 gap-12 items-end relative z-10">
              <div className="space-y-8 mb-24">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  With a strong foundation in Computer Science and modern web technologies, I specialize in building robust SaaS applications and AI-driven workflows. I combine technical depth with product thinking to create solutions that are scalable, secure, and user-centric.
                </p>
                <a
                  href="/src/Aman_s_Resume _Updated.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center gap-3 bg-black border border-black rounded-full px-5 py-3 text-white hover:bg-gray-800 transition-colors group"
                >
                  <span className="font-medium tracking-wide">RESUME</span>
                  <div className="bg-yellow-400 rounded-full p-2 group-hover:scale-110 transition-transform">
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.03125 1L11 5M11 5L7.03125 9M11 5H0" stroke="black" strokeWidth="1.5" />
                    </svg>
                  </div>
                </a>
              </div>

              <div className="relative w-full max-w-[250px] mx-auto md:mr-0">
                <div className="relative">
                  <img
                    src="/src/images/aman-profile.png"
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
