import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    const socialLinks = [
        { name: 'BEHANCE', url: '#' },
        { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/aman-singh-401a48306' },
        { name: 'INSTAGRAM', url: 'https://instagram.com/aman' },
        { name: 'GITHUB', url: 'https://github.com/aman-singh27' },
        { name: 'X', url: '#' },
    ];

    // Magnetic Contact Button Component
    const ContactButton = () => {
        const [position, setPosition] = useState({ x: 0, y: 0 });
        const buttonRef = React.useRef<HTMLDivElement>(null);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!buttonRef.current) return;

            const rect = buttonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * 0.15; // 15% of distance
            const deltaY = (e.clientY - centerY) * 0.15;

            setPosition({ x: deltaX, y: deltaY });
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
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
                    href="mailto:aman8384069981@gmail.com"
                    className="relative group"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        transition: 'transform 0.2s ease-out',
                    }}
                >
                    {/* Main Pill Button Container */}
                    <div className="relative flex items-center">
                        {/* Black Pill Background (No Border) - LARGER SIZE */}
                        <div
                            className="relative flex items-center justify-center bg-black rounded-full"
                            style={{
                                paddingLeft: '60px',
                                paddingRight: '85px',
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
                                    right: '77px',
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

                        {/* Yellow Circle Badge (Larger, Moved Right) */}
                        <div
                            className="absolute flex items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-90"
                            style={{
                                width: '85px',
                                height: '85px',
                                backgroundColor: '#FFD400',
                                border: '3px solid #000000',
                                right: '-15px',
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
            <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-8 py-20">

                {/* Top Tagline */}
                <div className="mb-8">
                    <h3
                        className="text-white text-base md:text-lg uppercase text-center"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 700,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                        }}
                    >
                        READY TO WORK?
                    </h3>
                </div>

                {/* Giant "CONTACT ME" Heading with Button Overlay */}
                <div className="relative mb-16">
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
                <div className="mb-20">
                    <nav
                        className="flex items-center justify-center gap-4 text-white text-xs md:text-sm uppercase"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                        }}
                    >
                        <a href="#home" className="hover:text-yellow-400 transition-colors">HOME</a>
                        <span className="text-yellow-400 text-lg">⚡</span>
                        <a href="#about" className="hover:text-yellow-400 transition-colors">ABOUT</a>
                        <span className="text-yellow-400 text-lg">⚡</span>
                        <a href="#projects" className="hover:text-yellow-400 transition-colors">PROJECTS</a>
                        <span className="text-yellow-400 text-lg">⚡</span>
                        <span style={{ fontWeight: 600 }}>CONTACT</span>
                    </nav>
                </div>

                {/* Two-Column Contact Information */}
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 px-4">
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
                            GOT SOME EXCITING IDEAS? LET'S CONNECT AND CREATE SOMETHING EXTRAORDINARY TOGETHER!
                        </p>
                    </div>

                    {/* Right Column - Email */}
                    <div className="flex items-center justify-start lg:justify-end">
                        <div className="flex items-center gap-4">
                            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                            <a
                                href="mailto:aman8384069981@gmail.com"
                                className="text-white hover:text-yellow-400 transition-colors"
                                style={{
                                    fontSize: 'clamp(18px, 3vw, 32px)',
                                    fontFamily: "'Oswald', sans-serif",
                                    fontWeight: 700,
                                    letterSpacing: '0px',
                                }}
                            >
                                aman8384069981@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Social Links Bar */}
                <div className="mb-16">
                    <div className="flex flex-wrap items-center justify-center gap-4">
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
                </div>

                {/* Footer Signature */}
                <div className="w-full max-w-7xl px-4">
                    <p
                        className="text-right text-sm md:text-base uppercase"
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
        </section>
    );
};

export default Contact;
