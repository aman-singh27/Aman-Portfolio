import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    const socialLinks = [
        { name: 'GITHUB', url: 'https://github.com/aman-singh27' },
        { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/aman-singh-401a48306' },
        { name: 'INSTAGRAM', url: 'https://www.instagram.com/_singh.amannn_/' },
        { name: 'INSTAGRAM', url: 'https://www.instagram.com/_singh.amannn_/' },
    ];

    // Magnetic Contact Button Component
    const ContactButton = () => {
        const buttonRef = React.useRef<HTMLDivElement>(null);
        const linkRef = React.useRef<HTMLAnchorElement>(null);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!buttonRef.current || !linkRef.current) return;

            const rect = buttonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * 0.15; // 15% of distance
            const deltaY = (e.clientY - centerY) * 0.15;

            linkRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        };

        const handleMouseLeave = () => {
            if (linkRef.current) {
                linkRef.current.style.transform = 'translate(0px, 0px)';
            }
        };

        return (
            <div
                ref={buttonRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    width: '800px',
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <a
                    ref={linkRef}
                    href="mailto:amansingh271204@gmail.com"
                    className="relative group"
                    style={{
                        transition: 'transform 0.2s ease-out',
                    }}
                >
                    {/* Main Pill Button Container */}
                    <div className="relative flex items-center">
                        {/* Black Pill Background */}
                        <div
                            className="relative flex items-center justify-center bg-black rounded-full"
                            style={{
                                paddingLeft: '60px',
                                paddingRight: '100px',
                                paddingTop: '30px',
                                paddingBottom: '30px',
                                height: '100px',
                            }}
                        >
                            {/* White Border Around Text Only (Inset) */}
                            <div
                                className="absolute rounded-full"
                                style={{
                                    border: '3px solid #E6E6E6',
                                    top: '10px',
                                    bottom: '10px',
                                    left: '10px',
                                    right: '90px',
                                }}
                            />

                            <span
                                className="relative z-10"
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '40px',
                                    color: '#FFFFFF',
                                    letterSpacing: '0.5px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                CONTACT
                            </span>
                        </div>

                        {/* Yellow Circle Badge with Arrow */}
                        <div
                            className="absolute flex items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-90"
                            style={{
                                width: '85px',
                                height: '85px',
                                backgroundColor: '#FFD400',
                                border: '3px solid #000000',
                                right: '0px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                            }}
                        >
                            {/* Arrow Icon */}
                            <svg
                                width="38"
                                height="38"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="2.5"
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </a>
            </div>
        );
    };

    return (
        <section className="relative w-full bg-black text-white overflow-hidden">
            {/* Main Content Container */}
            <div className="relative w-full flex flex-col items-center justify-center px-8 py-4">

                {/* Top Tagline */}
                <div className="mb-6">
                    <h3
                        className="text-white text-base md:text-lg uppercase text-center"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 700,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                        }}
                    >
                        READY TO COLLABORATE?
                    </h3>
                </div>

                {/* Giant "CONTACT ME" Heading with Button Overlay */}
                <div className="relative mb-10">
                    {/* Giant Yellow Text */}
                    <h1
                        className="font-anton uppercase text-center leading-none"
                        style={{
                            fontSize: 'clamp(100px, 18vw, 280px)',
                            color: '#FFD400',
                            letterSpacing: '-0.05em',
                            transform: 'scaleY(1.2) scaleX(0.75)',
                            textShadow: '4px 4px 0 #000',
                        }}
                    >
                        CONTACT ME
                    </h1>

                    {/* Floating Contact Button */}
                    <ContactButton />
                </div>


                {/* Navigation Menu */}
                <div className="mb-12">
                    <nav
                        className="flex items-center justify-center gap-4 text-white text-xs md:text-sm uppercase"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                        }}
                    >
                        <a
                            href="#content-start"
                            className="relative group pb-1"
                            style={{ cursor: 'pointer' }}
                        >
                            HOME
                            <span
                                className="absolute bottom-0 left-1/2 h-[2px] bg-yellow-400 w-0 group-hover:w-full transition-all duration-300 ease-out"
                                style={{
                                    transform: 'translateX(-50%)',
                                }}
                            ></span>
                        </a>
                        <span className="text-yellow-400 text-lg">⚡</span>
                        <a
                            href="#about"
                            className="relative group pb-1"
                            style={{ cursor: 'pointer' }}
                        >
                            ABOUT
                            <span
                                className="absolute bottom-0 left-1/2 h-[2px] bg-yellow-400 w-0 group-hover:w-full transition-all duration-300 ease-out"
                                style={{
                                    transform: 'translateX(-50%)',
                                }}
                            ></span>
                        </a>
                        <span className="text-yellow-400 text-lg">⚡</span>
                        <a
                            href="#work"
                            className="relative group pb-1"
                            style={{ cursor: 'pointer' }}
                        >
                            PROJECTS
                            <span
                                className="absolute bottom-0 left-1/2 h-[2px] bg-yellow-400 w-0 group-hover:w-full transition-all duration-300 ease-out"
                                style={{
                                    transform: 'translateX(-50%)',
                                }}
                            ></span>
                        </a>
                        <span className="text-yellow-400 text-lg">⚡</span>
                        <a
                            href="/Aman_Singh_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group pb-1"
                            style={{ cursor: 'pointer' }}
                        >
                            RESUME
                            <span
                                className="absolute bottom-0 left-1/2 h-[2px] bg-yellow-400 w-0 group-hover:w-full transition-all duration-300 ease-out"
                                style={{
                                    transform: 'translateX(-50%)',
                                }}
                            ></span>
                        </a>
                        <span className="text-yellow-400 text-lg">⚡</span>
                        <span style={{ fontWeight: 600 }}>CONTACT</span>
                    </nav>
                </div>

                {/* Horizontal Line Above */}
                <div className="w-full max-w-7xl mb-7 px-4">
                    <div className="w-full h-[2px] bg-white"></div>
                </div>

                {/* Two-Column Contact Information */}
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 mb-7 px-4 relative">
                    {/* Left Column - Message */}
                    <div className="flex items-center">
                        <p
                            className="text-white uppercase leading-tight"
                            style={{
                                fontSize: 'clamp(14px, 2vw, 18px)',
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: 600,
                                letterSpacing: '0.5px',
                                textTransform: 'uppercase',
                            }}
                        >
                            GOT AN IDEA? LET'S BUILD SOMETHING EXTRAORDINARY.
                        </p>
                    </div>

                    {/* Vertical Line Between Columns - Hidden on mobile, visible on large screens */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-white transform -translate-x-1/2"></div>

                    {/* Right Column - Email */}
                    <div className="flex items-center justify-start lg:justify-end">
                        <div className="flex items-center gap-4">
                            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                            <a
                                href="mailto:amansingh271204@gmail.com"
                                className="text-white hover:text-yellow-400 transition-colors"
                                style={{
                                    fontSize: 'clamp(18px, 3vw, 32px)',
                                    fontFamily: "'Oswald', sans-serif",
                                    fontWeight: 700,
                                    letterSpacing: '0px',
                                }}
                            >
                                amansingh271204@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Horizontal Line Below */}
                <div className="w-full max-w-7xl mb-12 px-4">
                    <div className="w-full h-[2px] bg-white"></div>
                </div>

                {/* Social Links Bar with Footer Signature */}
                <div className="w-full max-w-7xl px-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Left Side - Eye Icon and Social Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Eye Icon */}
                            <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>

                            {/* Social Buttons */}
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setHoveredButton(link.name)}
                                    onMouseLeave={() => setHoveredButton(null)}
                                    className="px-6 py-3 border-2 border-white rounded-full text-white uppercase text-xs md:text-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black"
                                    style={{
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: 600,
                                        letterSpacing: '0.5px',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Right Side - Footer Signature */}
                        <p
                            className="text-sm md:text-base uppercase"
                            style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: 500,
                                letterSpacing: '0.5px',
                                textTransform: 'uppercase',
                            }}
                        >
                            <span className="text-white">Crafted by </span>
                            <span style={{ color: '#FFD400' }}>
                                AMAN SINGH
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
