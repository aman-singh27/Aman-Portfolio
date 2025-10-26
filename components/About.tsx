import React from 'react';

const About: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-20 px-4">
      <div className="border-2 border-black rounded-[40px] p-8 md:p-16 relative bg-white text-black overflow-hidden">
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
              <div className="hidden md:flex items-center gap-4 whitespace-nowrap pt-4 flex-shrink-0">
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="text-sm tracking-widest font-medium">ABOUT ME</span>
              </div>
            </div>
            
            <div className="flex justify-end pr-0 md:pr-16">
                 <div 
                  className="w-48 h-8" 
                  style={{ backgroundImage: 'repeating-linear-gradient(-45deg, black, black 4px, white 4px, white 8px)', backgroundSize: '11.31px 11.31px' }}
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
            <button className="cursor-pointer inline-flex items-center gap-3 bg-black border border-black rounded-full px-5 py-3 text-white transition-colors group">
              <span className="font-medium tracking-wide">ABOUT</span>
              <div className="bg-yellow-400 rounded-full p-2">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.03125 1L11 5M11 5L7.03125 9M11 5H0" stroke="black" strokeWidth="1.5"/>
                </svg>
              </div>
            </button>
          </div>
          <div className="relative w-full max-w-xs mx-auto md:mr-0">
            <div className="relative">
              <img src="https://i.imgur.com/vJ4M4fV.png" alt="Portrait of the designer" className="w-full h-auto filter grayscale" />
              <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-8 border-l-8 border-yellow-400 rounded-bl-2xl"></div>
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-8 border-r-8 border-yellow-400 rounded-br-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;