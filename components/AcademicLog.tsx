import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AcademicLogProps {
    scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const AcademicLog: React.FC<AcademicLogProps> = ({ scrollContainerRef }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const pulseRef = useRef<HTMLDivElement>(null);

    // Left Block Refs
    const leftBlockRef = useRef<HTMLDivElement>(null);
    const leftItemsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Right Block Refs
    const rightBlockRef = useRef<HTMLDivElement>(null);
    const rightItemsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Certs
    const certsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const scroller = scrollContainerRef.current;

        if (!section || !scroller) return;

        // 1. Optimization: Initially hide section to prevent expensive blur rendering during page load/intro
        // revealing it INSTANTLY when it comes near the viewport.
        gsap.fromTo(section,
            { autoAlpha: 0 }, // autoAlpha handles opacity:0 and visibility:hidden
            {
                autoAlpha: 1,
                duration: 0, // Instant appear
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    scroller: scroller,
                    start: "top 110%", // Trigger just before it enters view
                    toggleActions: "play none none reverse"
                }
            }
        );

        // 2. Divider Draw (Top to Bottom)
        if (dividerRef.current) {
            gsap.fromTo(dividerRef.current,
                { height: "0%" },
                {
                    height: "100%",
                    duration: 1.5,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: section,
                        scroller: scroller,
                        start: "top 70%",
                    }
                }
            );
        }

        // 3. Pulse Loop logic - Optimize to only run when in view
        if (pulseRef.current && dividerRef.current) {
            const pulseTl = gsap.timeline({
                repeat: -1,
                yoyo: true,
                paused: true // Start paused
            });
            pulseTl.fromTo(pulseRef.current,
                { opacity: 0.1 },
                { opacity: 0.5, duration: 4, ease: "sine.inOut" }
            );

            ScrollTrigger.create({
                trigger: section,
                scroller: scroller,
                start: "top bottom",
                end: "bottom top",
                onEnter: () => pulseTl.play(),
                onLeave: () => pulseTl.pause(),
                onEnterBack: () => pulseTl.play(),
                onLeaveBack: () => pulseTl.pause()
            });
        }

        // 4. Data Load Effect (Staggered Reveal with Blur)
        const animateItems = (items: (HTMLDivElement | null)[], trigger: HTMLElement | null) => {
            if (!trigger) return;
            gsap.fromTo(items.filter(Boolean),
                { opacity: 0, filter: 'blur(4px)' },
                {
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: trigger,
                        scroller: scroller,
                        start: "top 85%",
                    }
                }
            );
        };

        animateItems(leftItemsRef.current, leftBlockRef.current);
        animateItems(rightItemsRef.current, rightBlockRef.current);

        // Certs reveal
        if (certsRef.current) {
            gsap.fromTo(certsRef.current.children,
                { opacity: 0, y: 10, filter: 'blur(2px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: certsRef.current,
                        scroller: scroller,
                        start: "top 95%", // Trigger earlier (almost immediately upon entering)
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // Helper to push to refs
    const addToLeftRefs = (el: HTMLDivElement | null) => {
        if (el && !leftItemsRef.current.includes(el)) leftItemsRef.current.push(el);
    };
    const addToRightRefs = (el: HTMLDivElement | null) => {
        if (el && !rightItemsRef.current.includes(el)) rightItemsRef.current.push(el);
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#050505] text-white px-6 py-16 overflow-hidden font-sans flex flex-col items-center justify-center"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] mix-blend-screen opacity-40"></div>
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>


            {/* Content Wrapper Box */}
            <div className="w-full max-w-7xl mx-auto border-2 border-white/10 rounded-[48px] p-8 md:p-12 relative bg-white/[0.01] backdrop-blur-[2px] z-10">

                {/* Header / Top Section */}
                <div className="w-full mb-12 relative z-10">
                    <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8 relative">
                        <div className="relative">
                            <div className="h-[1px] w-0 bg-gradient-to-r from-[#FFD400] to-transparent absolute bottom-[-1px] left-0 transition-all duration-[1.5s] ease-out" style={{ width: '100%' }}></div>
                            {/* Reduced strength heading */}
                            <h2 className="text-5xl md:text-7xl font-bold tracking-wide uppercase leading-[0.85] text-white" style={{ fontFamily: 'Anton, sans-serif' }}>
                                Academic Log
                            </h2>
                        </div>
                        <div className="text-right hidden md:block text-[#FFD400] font-mono text-[10px] tracking-[0.2em] opacity-60 mix-blend-plus-lighter">
                            <p className="mb-1">SYS.CHECK: <span className="text-white">ONLINE</span></p>
                            <p>GMT+5.5 :: {new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="flex flex-col md:flex-row w-full relative h-full z-10">

                    {/* Center Divider */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 overflow-hidden h-full">
                        <div ref={dividerRef} className="w-full bg-gradient-to-b from-[#FFD400]/0 via-[#FFD400] to-[#FFD400]/0 h-full relative opacity-20">
                            {/* Pulse - Opacity Only */}
                            <div ref={pulseRef} className="absolute inset-0 bg-[#FFD400] opacity-0 blur-sm"></div>
                        </div>
                    </div>

                    {/* Left Block (College) */}
                    <div ref={leftBlockRef} className="w-full md:w-1/2 md:pr-16 md:text-right relative mb-12 md:mb-0">
                        <div ref={addToLeftRefs} className="flex flex-col md:items-end mb-8 relative">
                            {/* Micro indicator */}
                            <div className="hidden md:block absolute right-[-69px] top-2 w-[5px] h-[1px] bg-[#FFD400] shadow-[0_0_10px_#FFD400]"></div>

                            <span className="text-gray-500 font-mono text-xs tracking-[0.2em] mb-2">[01] :: COLLEGE // 2027</span>
                            <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-none mb-2 text-white/90">B.Tech <span className="text-white">CSE (AI & ML)</span></h3>
                            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Manipal University Jaipur</p>
                        </div>

                        <div className="space-y-3 md:pl-28">
                            <div ref={addToLeftRefs} className="border border-white/5 bg-white/[0.02] backdrop-blur-sm p-4 relative group transition-all duration-500 hover:border-[#FFD400]/20 hover:bg-white/[0.04]">
                                <div className="absolute top-0 right-0 w-[2px] h-[2px] bg-gray-700 group-hover:bg-[#FFD400] transition-colors shadow-[0_0_5px_#FFD400]"></div>
                                <div className="font-mono text-[10px] text-gray-600 mb-1 tracking-widest group-hover:text-[#FFD400]/60 transition-colors">&gt; STATUS</div>
                                <div className="text-lg uppercase font-medium text-white tracking-widest leading-none">Aug 2023 - Jun 2027</div>
                            </div>
                            <div ref={addToLeftRefs} className="border border-white/5 bg-white/[0.02] backdrop-blur-sm p-4 relative group transition-all duration-500 hover:border-[#FFD400]/20 hover:bg-white/[0.04]">
                                <div className="font-mono text-[10px] text-gray-600 mb-1 tracking-widest group-hover:text-[#FFD400]/60 transition-colors">&gt; GPA</div>
                                <div className="text-lg uppercase font-medium text-[#FFD400] tracking-widest leading-none text-shadow-sm">8.84 / 10</div>
                            </div>
                            <div ref={addToLeftRefs} className="border border-white/5 bg-white/[0.02] backdrop-blur-sm p-4 relative group transition-all duration-500 hover:border-[#FFD400]/20 hover:bg-white/[0.04]">
                                <div className="font-mono text-[10px] text-gray-600 mb-1 tracking-widest group-hover:text-[#FFD400]/60 transition-colors">&gt; FOCUS</div>
                                <div className="text-lg uppercase font-medium text-white tracking-widest leading-none">AI & Machine Learning</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Block (School & Certs) */}
                    <div ref={rightBlockRef} className="w-full md:w-1/2 md:pl-16 relative flex flex-col justify-between">

                        {/* School */}
                        <div className="mb-12 relative">
                            {/* Micro indicator */}
                            <div className="hidden md:block absolute left-[-69px] top-2 w-[5px] h-[1px] bg-[#FFD400] shadow-[0_0_10px_#FFD400]"></div>

                            <div ref={addToRightRefs} className="flex flex-col items-start mb-8">
                                <span className="text-gray-500 font-mono text-xs tracking-[0.2em] mb-2">[02] :: SCHOOL // 2023</span>
                                <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-none mb-2 text-white/90">Class <span className="text-white">XII (Science)</span></h3>
                                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Manav Rachna International</p>
                            </div>

                            <div className="font-mono text-[11px] space-y-3 text-gray-400 border-l border-white/10 pl-6 ml-2" ref={addToRightRefs}>
                                <div className="flex items-center gap-3 group">
                                    <span className="text-[#FFD400] opacity-50 group-hover:opacity-100 transition-opacity">&gt;</span>
                                    <span className="w-16 text-gray-600 tracking-wider group-hover:text-gray-400 transition-colors">STREAM</span>
                                    <span className="text-white tracking-wider group-hover:text-[#FFD400] transition-colors">PCM</span>
                                </div>
                                <div className="flex items-center gap-3 group">
                                    <span className="text-[#FFD400] opacity-50 group-hover:opacity-100 transition-opacity">&gt;</span>
                                    <span className="w-16 text-gray-600 tracking-wider group-hover:text-gray-400 transition-colors">GPA</span>
                                    <span className="text-[#FFD400] tracking-wider text-shadow-sm">8.88 / 10</span>
                                </div>
                            </div>
                        </div>

                        {/* Certifications Module */}
                        <div className="mt-8">
                            <div ref={addToRightRefs} className="mb-6 pt-4 border-t border-white/10 border-dashed flex items-center justify-between">
                                <h4 className="font-bold text-gray-400 uppercase tracking-widest text-sm flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#FFD400] rounded-full animate-pulse shadow-[0_0_5px_#FFD400]"></span>
                                    [CERTIFIED_UPGRADES]
                                </h4>
                                <span className="text-[9px] font-mono text-gray-600 tracking-widest">V.2025.1</span>
                            </div>

                            <div ref={certsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <CertificationBadge title="Machine Learning" sub="NPTEL (Top 2%)" icon="🤖" />
                                <CertificationBadge title="Network Ess." sub="Cisco NetAcad" icon="🌐" />
                                <CertificationBadge title="Database (SQL)" sub="Oracle" icon="💾" />
                                <CertificationBadge title="DSA" sub="CodeChef" icon="💻" />
                                <CertificationBadge title="Python" sub="Cisco NetAcad" icon="🐍" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

const CertificationBadge: React.FC<{ title: string, sub: string, icon: string }> = ({ title, sub, icon }) => (
    <div className="flex items-center gap-3 p-3 border border-white/5 bg-white/[0.03] backdrop-blur-sm hover:border-[#FFD400]/30 hover:bg-white/[0.06] transition-all duration-500 group cursor-default">
        <div className="text-lg grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 transform">{icon}</div>
        <div className="flex flex-col">
            <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider group-hover:text-[#FFD400] transition-colors duration-300">{title}</span>
            <span className="text-xs font-bold text-gray-300 tracking-wide group-hover:text-white transition-colors duration-300">{sub}</span>
        </div>
    </div>
);

export default AcademicLog;
