import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Globe from './components/Globe';
import Ruler from './components/Ruler';
import Cursor from './components/Cursor';
import IntroAnimation from './components/IntroAnimation';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import AcademicLog from './components/AcademicLog';

import SectionDifferentiator from './components/SectionDifferentiator';
import Projects from './components/projects';
import SkillScroll from './components/SkillScroll';
import StaggeredMenu from './components/StaggeredMenu';
import Contact from './components/Contact';

const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '#content-start' },
    { label: 'About', ariaLabel: 'Learn about us', link: '#about' },
    { label: 'Projects', ariaLabel: 'View our projects', link: '#work' },
    { label: 'Experience', ariaLabel: 'View experience', link: '#experience' },
    { label: 'Education', ariaLabel: 'View education', link: '#education' },
    { label: 'Skills', ariaLabel: 'View skills', link: '#skills' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
];

const socialItems = [
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/aman-singh-401a48306' },
    { label: 'GitHub', link: 'https://github.com/aman-singh27' },
    { label: 'Instagram', link: 'https://www.instagram.com/_singh.amannn_/' }
];

// MANUAL SCROLL OFFSETS
// Adjust these values to fine-tune where each section lands.
// Negative values move the section LOWER (show more of the top).
// Positive values move the section HIGHER.
const sectionOffsets: { [key: string]: number } = {
    'content-start': -815,
    'about': 1773,
    'work': 6245,      // Projects
    'experience': 912,
    'education': 970,
    'skills': 820,
    'contact': 878
};

const App: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // State to manage the animation stages
    // 0: Initial yellow screen (bars are in place)
    // 1: Vertical bars start sliding up
    // 2: Main content appears
    const [animationStage, setAnimationStage] = useState(0);

    useEffect(() => {
        const numberOfBars = 8;

        // Stage 1: Start vertical bars sliding up after a short delay
        const barsSlideUpTimeout = setTimeout(() => {
            setAnimationStage(1);
        }, 500); // Yellow screen visible for 0.5 seconds before bars move

        // Stage 2: Main content fades in after all bars have likely moved off-screen
        const barAnimationDuration = 700; // from IntroAnimation.tsx transition
        const lastBarDelay = (numberOfBars - 1) * 80;
        const totalBarAnimationDuration = barAnimationDuration + lastBarDelay;
        const contentRevealTimeout = setTimeout(() => {
            setAnimationStage(2);
        }, 500 + totalBarAnimationDuration); // Add initial delay before bars start

        // Cleanup timeouts
        return () => {
            clearTimeout(barsSlideUpTimeout);
            clearTimeout(contentRevealTimeout);
        };
    }, []);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
            const totalScrollableHeight = scrollHeight - clientHeight;
            const currentProgress = totalScrollableHeight > 0 ? scrollTop / totalScrollableHeight : 0;
            setScrollProgress(currentProgress);

        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll, { passive: true });
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // Effect for smooth scrolling on anchor links
    useEffect(() => {
        const handleSmoothScroll = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // Find the closest anchor link with a hash href
            const anchor = target.closest('a[href^="#"]');

            if (anchor && scrollContainerRef.current) {
                event.preventDefault();
                const href = anchor.getAttribute('href');
                if (href) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        const container = scrollContainerRef.current;
                        // Get the manual offset for this section, or default to -50
                        const manualOffset = sectionOffsets[targetId] !== undefined ? sectionOffsets[targetId] : -50;
                        const targetTop = targetElement.offsetTop - container.offsetTop + manualOffset;

                        container.scrollTo({
                            top: targetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        };

        document.addEventListener('click', handleSmoothScroll);
        return () => {
            document.removeEventListener('click', handleSmoothScroll);
        };
    }, []);


    // Animate hero section based on scroll.
    const heroProgress = scrollProgress / 0.15; // Animate over first 15% of scroll
    const heroOpacity = Math.max(0, 1 - heroProgress * 2);
    const heroScale = Math.max(0.8, 1 - heroProgress * 0.15);
    const heroY = -heroProgress * 100;

    // Animate work section. Starts appearing as hero fades.
    const workProgress = Math.max(0, scrollProgress / 0.20);
    const workOpacity = Math.min(1, workProgress);
    const workY = Math.max(0, 50 - workProgress * 50);

    // Animate border. Fades out, scales up, and moves down as user starts scrolling.
    const borderProgress = Math.min(1, scrollProgress / 0.1); // Animation completes over first 10% of scroll
    const borderOpacity = 1 - borderProgress;
    const borderScale = 1 + borderProgress * 0.2; // Scales up by 20%
    const borderY = borderProgress * 50; // Moves down 50px

    return (
        <main className="h-screen w-screen bg-black text-white overflow-hidden p-8">
            <IntroAnimation animationStage={animationStage} />
            <div
                className="w-full h-full"
                style={{
                    opacity: animationStage === 2 ? 1 : 0,
                    transform: animationStage === 2 ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                    transitionDelay: animationStage === 2 ? '0.2s' : '0s',
                }}
            >
                <Cursor />


                <div className="relative w-full h-full">
                    {/* Animated Border */}
                    <div
                        className="absolute inset-0 border-2 border-yellow-400 rounded-[40px] pointer-events-none"
                        style={{
                            opacity: borderOpacity,
                            transform: `translateY(${borderY}px) scale(${borderScale})`,
                            willChange: 'transform, opacity',
                        }}
                    />

                    <div className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none">
                        <StaggeredMenu
                            position="right"
                            items={menuItems}
                            socialItems={socialItems}
                            displaySocials={true}
                            displayItemNumbering={true}
                            menuButtonColor="#fff"
                            openMenuButtonColor="#fff"
                            changeMenuColorOnOpen={true}
                            colors={['#FFD400', '#1a1a1a']}
                            logoUrl=""
                            accentColor="#FFD400"
                        />
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="relative h-full w-full rounded-[40px] overflow-y-auto overflow-x-hidden hide-scrollbar"
                    >
                        <div
                            className="absolute bottom-0 left-0 right-0 h-1/2 z-0"
                            style={{
                                backgroundImage: 'radial-gradient(circle at center, rgba(100, 100, 100, 0.2) 1px, transparent 1px)',
                                backgroundSize: '1.2rem 1.2rem',
                                maskImage: 'linear-gradient(to top, black 25%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to top, black 25%, transparent 100%)',
                            }}
                        />

                        <Header />
                        <p className="absolute top-[7rem] left-1/2 -translate-x-1/2 text-center text-xs uppercase text-gray-400 tracking-[0.2em] w-full max-w-4xl z-10 leading-relaxed">
                            BUILDING SCALABLE FULL-STACK APPLICATIONS
                            <br />
                            AND INTELLIGENT AI SOLUTIONS.
                        </p>
                        <Footer />
                        <Ruler scrollProgress={scrollProgress} />

                        <div className="relative w-full">
                            <section
                                className="h-screen sticky top-0 flex flex-col justify-center items-center"
                                style={{ opacity: heroOpacity, pointerEvents: heroOpacity > 0 ? 'auto' : 'none' }}
                            >
                                <div
                                    className="text-center transition-transform duration-300 ease-out relative"
                                    style={{
                                        transform: `translateY(${heroY}px) scale(${heroScale})`,
                                    }}
                                >
                                    <h2 className="text-4xl font-bold tracking-widest mb-2 relative z-20">AMANSINGH</h2>
                                    <h1 className="font-anton text-[230px] leading-none text-yellow-400 relative z-0" style={{ textShadow: '4px 4px 0 #000', transform: 'scaleX(0.75)' }}>
                                        AMAN SINGH
                                    </h1>
                                    {/* this is sphere positio */}
                                    <div
                                        className="absolute left-1/2 -translate-x-1/2 bottom-[-350px] translate-y-1/2 pointer-events-none z-10"
                                    >
                                        {animationStage === 2 && <Globe width={1000} height={1000} />}
                                    </div>
                                    <a
                                        href="#content-start"
                                        className="cursor-pointer absolute bottom-[-100px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white opacity-80 hover:opacity-100 transition-opacity z-20"
                                    >
                                        <span className="text-sm tracking-widest">SCROLL</span>
                                        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 1V23M8 23L1 16M8 23L15 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                            </section>

                            <section
                                id="content-start"
                                className="relative z-10"
                            >
                                <div
                                    className="w-full"
                                    style={{
                                        opacity: workOpacity,
                                        transform: `translateY(${workY}vh)`
                                    }}
                                >
                                    <div id="about">
                                        {animationStage === 2 && <About scrollContainerRef={scrollContainerRef} />}
                                    </div>
                                    <SectionDifferentiator scrollContainerRef={scrollContainerRef} />
                                    <div className="bg-white text-black">
                                        <div className="bg-yellow-400 relative" id="work">
                                            <div className="absolute top-[40px] left-[40px] right-[40px] bottom-0 border-x-[2px] border-t-[2px] border-black rounded-t-[40px] pointer-events-none z-10" />
                                            {animationStage === 2 && <Projects scrollContainerRef={scrollContainerRef} />}
                                        </div>
                                        <div id="experience">
                                            {animationStage === 2 && <Experience />}
                                        </div>
                                        {/* Removed duplicate Experience block if present - assuming previous file view showed two */}
                                        <div id="education">
                                            {animationStage === 2 && <AcademicLog scrollContainerRef={scrollContainerRef} />}
                                        </div>
                                    </div>

                                    <div id="skills">
                                        {animationStage === 2 && <SkillScroll />}
                                    </div>
                                    <SectionDifferentiator scrollContainerRef={scrollContainerRef} />

                                    <div id="contact">
                                        {animationStage === 2 && <Contact />}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default App;