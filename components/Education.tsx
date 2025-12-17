import React, { useState, useEffect, useRef } from "react";

const education = [
    {
        degree: "Bachelor of Fine Arts in Graphic Design",
        institution: "University of Creative Arts",
        date: "2011 - 2015",
        id: "edu-01",
    },
    {
        degree: "Advanced Coursework in UI/UX for Digital Products",
        institution: "Online Design Institute",
        date: "2016",
        id: "edu-02",
    },
    {
        degree: "Master of Digital Experience Design",
        institution: "Design Technology Institute",
        date: "2017 - 2019",
        id: "edu-03",
    },
];

const Education: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [scrollSpeed, setScrollSpeed] = useState(1);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how much of the section is visible
            const visibleTop = Math.max(0, -rect.top);
            const visibleBottom = Math.min(rect.height, windowHeight - rect.top);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            // Reduce animation speed based on scroll position
            // Speed ranges from 1 (full speed) to 0.2 (20% speed)
            const speed = Math.max(0.2, 1 - (visibleTop / rect.height) * 0.8);
            setScrollSpeed(speed);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-48 px-4 md:px-8 overflow-hidden bg-black min-h-screen">
            {/* Cinematic Animated Gradient Background - SCROLL CONTROLLED */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Large Animated Gradient Orbs - Scroll Speed Controlled */}
                <div
                    className="absolute w-[1000px] h-[1000px] rounded-full opacity-40 blur-[150px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, rgba(255, 165, 0, 0.4) 40%, rgba(255, 140, 0, 0.2) 70%, transparent 100%)',
                        top: '5%',
                        left: '5%',
                        animation: `float1 ${20 / scrollSpeed}s ease-in-out infinite`,
                    }}
                />
                <div
                    className="absolute w-[800px] h-[800px] rounded-full opacity-35 blur-[120px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.5) 0%, rgba(255, 140, 0, 0.3) 50%, rgba(255, 100, 0, 0.15) 80%, transparent 100%)',
                        bottom: '5%',
                        right: '5%',
                        animation: `float2 ${25 / scrollSpeed}s ease-in-out infinite`,
                    }}
                />
                <div
                    className="absolute w-[700px] h-[700px] rounded-full opacity-30 blur-[100px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 200, 0.3) 0%, rgba(255, 215, 0, 0.2) 50%, transparent 100%)',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: `float3 ${30 / scrollSpeed}s ease-in-out infinite`,
                    }}
                />

                {/* More Visible Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.08]" style={{
                    backgroundImage: `
                        linear-gradient(rgba(255, 215, 0, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 215, 0, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                }} />

                {/* Radial Gradient Overlay for Depth */}
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
                }} />

                {/* More Visible Animated Light Rays - Scroll Speed Controlled */}
                <div className="absolute inset-0 opacity-15">
                    <div
                        className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-yellow-400/60 via-yellow-400/20 to-transparent"
                        style={{ animation: `shimmerRay ${8 / scrollSpeed}s ease-in-out infinite`, filter: 'blur(2px)' }}
                    />
                    <div
                        className="absolute top-0 right-1/4 w-[2px] h-full bg-gradient-to-b from-yellow-400/60 via-yellow-400/20 to-transparent"
                        style={{ animation: `shimmerRay ${8 / scrollSpeed}s ease-in-out infinite`, animationDelay: '4s', filter: 'blur(2px)' }}
                    />
                </div>

                {/* More Visible Floating Particles - Scroll Speed Controlled */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => {
                        const duration = 15 + Math.random() * 15;
                        return (
                            <div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: `${Math.random() * 6 + 3}px`,
                                    height: `${Math.random() * 6 + 3}px`,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    background: `rgba(255, 215, 0, ${0.3 + Math.random() * 0.3})`,
                                    animation: `floatParticle ${duration / scrollSpeed}s ease-in-out infinite`,
                                    animationDelay: `${Math.random() * 5}s`,
                                    filter: 'blur(1.5px)',
                                    boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
                                }}
                            />
                        );
                    })}
                </div>

                {/* Diagonal Light Streaks - Scroll Speed Controlled */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"
                        style={{
                            transform: 'rotate(-15deg) translateY(200px)',
                            animation: `slideDown ${15 / scrollSpeed}s ease-in-out infinite`,
                        }}
                    />
                    <div
                        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"
                        style={{
                            transform: 'rotate(-15deg) translateY(400px)',
                            animation: `slideDown ${20 / scrollSpeed}s ease-in-out infinite`,
                            animationDelay: '5s',
                        }}
                    />
                </div>
            </div>

            {/* Section Header - Bold & Futuristic */}
            <div className="relative text-center mb-32">
                {/* Main Title */}
                <div className="relative inline-block">
                    <h2
                        className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 relative"
                        style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 80px rgba(255, 215, 0, 0.3)',
                            letterSpacing: '0.05em',
                            animation: 'shimmer 4s ease-in-out infinite',
                        }}
                    >
                        EDUCATION
                    </h2>

                    {/* Glowing underline */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60 animate-pulse"
                        style={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)' }} />

                    {/* Corner decorations */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-yellow-400/40" />
                    <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-yellow-400/40" />
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-yellow-400/40" />
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-yellow-400/40" />
                </div>

                {/* Subtitle */}
                <p className="text-gray-400 text-lg md:text-xl mt-8 font-light tracking-wide max-w-2xl mx-auto">
                    Academic Journey & Professional Development
                </p>

                {/* Decorative line with dots */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-yellow-400/60 to-yellow-400"
                        style={{ boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }} />
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"
                            style={{ boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)' }} />
                        <div className="w-2 h-2 rounded-full bg-yellow-400/60 animate-pulse"
                            style={{ animationDelay: '0.3s' }} />
                        <div className="w-2 h-2 rounded-full bg-yellow-400/30 animate-pulse"
                            style={{ animationDelay: '0.6s' }} />
                    </div>
                    <div className="h-px w-24 bg-gradient-to-l from-transparent via-yellow-400/60 to-yellow-400"
                        style={{ boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }} />
                </div>
            </div>

            {/* Timeline Arc Container */}
            <div className="relative max-w-6xl mx-auto">
                {/* Main Curved Arc - HUD Style */}
                <svg
                    className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none"
                    width="900"
                    height="450"
                    viewBox="0 0 900 450"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Outer glow arc */}
                    <path
                        d="M 50 400 Q 450 -50, 850 400"
                        stroke="url(#arcGradient)"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.3"
                        className="animate-[pulse_4s_ease-in-out_infinite]"
                    />
                    {/* Main arc */}
                    <path
                        d="M 50 400 Q 450 -50, 850 400"
                        stroke="url(#arcGradient2)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="10 5"
                        className="animate-[dash_20s_linear_infinite]"
                    />

                    <defs>
                        <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.1" />
                            <stop offset="50%" stopColor="#FFD700" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="arcGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#666666" />
                            <stop offset="50%" stopColor="#FFD700" />
                            <stop offset="100%" stopColor="#666666" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Education Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 pt-12">
                    {education.map((edu, index) => {
                        return (
                            <div
                                key={edu.id}
                                className="relative"
                                style={{
                                    position: 'relative',
                                    ...(index === 1 ? { marginTop: '-40px' } : {}),
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Glowing Node on Arc */}
                                <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                                    {/* Vertical connector line */}
                                    <div className="w-px h-12 bg-gradient-to-b from-yellow-400/60 to-transparent" />

                                    {/* Pulsing node */}
                                    <div className="relative">
                                        <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_20px_rgba(255,255,0,0.9)] animate-pulse" />
                                        <div className="absolute inset-0 w-4 h-4 rounded-full bg-yellow-400 animate-ping opacity-75" />

                                        {/* Orbit ring around node */}
                                        <div className="absolute -inset-2 rounded-full border border-yellow-400/30 animate-[spin_3s_linear_infinite]" />
                                    </div>
                                </div>

                                {/* Glassmorphism Card */}
                                <div
                                    className="group relative p-8 rounded-3xl transition-all duration-500 cursor-pointer"
                                    style={{
                                        background: hoveredIndex === index
                                            ? 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)'
                                            : 'linear-gradient(135deg, rgba(15,15,15,0.7) 0%, rgba(5,5,5,0.9) 100%)',
                                        backdropFilter: 'blur(20px)',
                                        border: hoveredIndex === index
                                            ? '1px solid rgba(255,215,0,0.5)'
                                            : '1px solid rgba(255,255,255,0.1)',
                                        boxShadow: hoveredIndex === index
                                            ? '0 0 40px rgba(255,215,0,0.3), inset 0 0 20px rgba(255,215,0,0.05)'
                                            : '0 8px 32px rgba(0,0,0,0.4)',
                                        transform: hoveredIndex === index ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                                    }}
                                >
                                    {/* Corner accents */}
                                    <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-yellow-400/40 transition-all duration-300"
                                        style={{ opacity: hoveredIndex === index ? 1 : 0 }} />
                                    <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-yellow-400/40 transition-all duration-300"
                                        style={{ opacity: hoveredIndex === index ? 1 : 0 }} />
                                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-yellow-400/40 transition-all duration-300"
                                        style={{ opacity: hoveredIndex === index ? 1 : 0 }} />
                                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-yellow-400/40 transition-all duration-300"
                                        style={{ opacity: hoveredIndex === index ? 1 : 0 }} />

                                    {/* ID Badge */}
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 backdrop-blur-sm">
                                            <span className="text-xs font-mono text-yellow-400 tracking-wider">{edu.id}</span>
                                        </div>
                                        <div className="h-px flex-1 bg-gradient-to-r from-yellow-400/30 to-transparent" />
                                    </div>

                                    {/* Degree Title */}
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight transition-colors duration-300"
                                        style={{ color: hoveredIndex === index ? '#FFD700' : '#FFFFFF' }}>
                                        {edu.degree}
                                    </h3>

                                    {/* Institution */}
                                    <p className="text-gray-400 text-base md:text-lg mb-2 font-light">
                                        {edu.institution}
                                    </p>

                                    {/* Date with icon */}
                                    <div className="flex items-center gap-2 mt-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
                                        <p className="text-gray-500 text-sm font-mono tracking-wide">{edu.date}</p>
                                    </div>

                                    {/* Scan line effect */}
                                    <div
                                        className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
                                        style={{ opacity: hoveredIndex === index ? 0.1 : 0 }}
                                    >
                                        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-[scanLine_2s_ease-in-out_infinite]" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Custom Animations */}
            <style>{`
                @keyframes float1 {
                    0%, 100% { transform: translate(0, 0); }
                    33% { transform: translate(30px, -30px); }
                    66% { transform: translate(-20px, 20px); }
                }
                
                @keyframes float2 {
                    0%, 100% { transform: translate(0, 0); }
                    33% { transform: translate(-40px, 30px); }
                    66% { transform: translate(25px, -25px); }
                }
                
                @keyframes float3 {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.1); }
                }
                
                @keyframes floatParticle {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                    50% { transform: translateY(-50px) translateX(20px); opacity: 0.7; }
                }
                
                @keyframes shimmerRay {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.2; }
                }
                
                @keyframes slideDown {
                    0% { transform: rotate(-15deg) translateY(-100%); }
                    100% { transform: rotate(-15deg) translateY(100vh); }
                }
                
                @keyframes dash {
                    to { stroke-dashoffset: -1000; }
                }
                
                @keyframes scanLine {
                    0% { top: 0%; }
                    100% { top: 100%; }
                }
                
                @keyframes shimmer {
                    0% { background-position: 0% center; }
                    100% { background-position: 200% center; }
                }
            `}</style>
        </section>
    );
};

export default Education;
