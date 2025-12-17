import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

// Simple image plane component without effects
const ImagePlane: React.FC<{
    position: [number, number, number];
    imageUrl: string;
    scale: number;
}> = ({ position, imageUrl, scale }) => {
    const texture = useLoader(TextureLoader, imageUrl);

    return (
        <mesh position={position} scale={[scale, scale, 1]}>
            <planeGeometry args={[8, 14]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
};

// Main scene component
const Scene: React.FC<{ scrollX: number; images: string[] }> = ({
    scrollX,
    images
}) => {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.z = 10;
    }, [camera]);

    // Create infinite looping carousel
    const planes = [];
    const spacing = 12;
    const totalImages = images.length;
    const numVisiblePlanes = 5; // Number of planes visible at once

    // Calculate which images should be visible based on scroll position
    const scrollOffset = Math.floor(scrollX / spacing);

    for (let i = -numVisiblePlanes; i <= numVisiblePlanes; i++) {
        const imageIndex = ((scrollOffset + i) % totalImages + totalImages) % totalImages;
        const imageUrl = images[imageIndex];
        const xPos = (scrollOffset + i) * spacing - scrollX;

        // Calculate scale based on distance from center (0)
        // Images at center (xPos = 0) have scale 1.0
        // Images at edges have scale 1.5 (zoomed in)
        const distanceFromCenter = Math.abs(xPos);
        const maxDistance = spacing * 2; // Distance at which zoom is maximum
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
        const scale = 1.0 + (normalizedDistance * 0.5); // Scale from 1.0 to 1.5

        planes.push(
            <ImagePlane
                key={`${scrollOffset + i}`}
                position={[xPos, 0, 0]}
                imageUrl={imageUrl}
                scale={scale}
            />
        );
    }

    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={0.5} />
            {planes}
        </>
    );
};

// Main SkillScroll component
const SkillScroll: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollX, setScrollX] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const targetScrollX = useRef(0);
    const animationFrameId = useRef<number | undefined>(undefined);

    const images = [
        new URL('../src/images/Gemini_Generated_Image_1et68r1et68r1et6.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_3dt4lu3dt4lu3dt4.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_43yuo343yuo343yu.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_65mfsk65mfsk65mf.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_7skafy7skafy7ska.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_95a45h95a45h95a4.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_akcjxuakcjxuakcj.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_c883szc883szc883.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_cn5ec8cn5ec8cn5e.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_e0m314e0m314e0m3.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_e4cwn6e4cwn6e4cw.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_fdi950fdi950fdi9.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_i2wl13i2wl13i2wl.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_m7id1am7id1am7id.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_n8xge3n8xge3n8xg.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_q7mvdjq7mvdjq7mv.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_r65rhgr65rhgr65r.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_r8e24vr8e24vr8e2.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_s3c1dls3c1dls3c1.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_su0zz5su0zz5su0z.webp', import.meta.url).href,
        new URL('../src/images/Gemini_Generated_Image_vphw87vphw87vphw.webp', import.meta.url).href,
    ];

    // Simple smooth scroll
    useEffect(() => {
        if (!isActive) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            targetScrollX.current += e.deltaY * 0.01;
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, [isActive]); // Re-run when active state changes

    useEffect(() => {
        // Animation loop for smooth scrolling
        const animate = () => {
            const damping = 0.15;
            const diff = targetScrollX.current - scrollX;

            if (Math.abs(diff) > 0.001) {
                const newScrollX = scrollX + diff * damping;
                setScrollX(newScrollX);
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animationFrameId.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [scrollX]);

    return (
        <section
            ref={containerRef}
            className={`relative w-full h-screen bg-black overflow-hidden cursor-pointer transition-colors duration-500 ${isActive ? 'border-4 border-white/20' : ''}`}
            id="skillscroll"
            onClick={() => setIsActive(!isActive)}
        >
            {/* WebGL Canvas */}
            <Canvas
                className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance'
                }}
            >
                <Scene scrollX={scrollX} images={images} />
            </Canvas>

            {/* Fixed Center Text Overlay */}
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-40 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                <div className="text-center">
                    <h2 className="text-6xl font-bold text-white tracking-[0.3em] mb-4">
                        SKILL ARCHIVE
                    </h2>
                    <p className="text-sm text-gray-400 tracking-[0.5em] uppercase">
                        Click to Explore
                    </p>
                </div>
            </div>

            {/* Inactive Overlay - Visual Hint */}
            {!isActive && (
                <div className="absolute inset-0 bg-black/40 z-30 pointer-events-none" />
            )}


            {/* Scroll Hint (Only visible when active) */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-xs tracking-widest z-40 transition-opacity duration-300 ${isActive ? 'opacity-60' : 'opacity-0'}`}>
                <div className="flex items-center gap-2">
                    <span>←</span>
                    <span>SCROLL</span>
                    <span>→</span>
                    <span className="ml-4 opacity-50">(Click to Exit)</span>
                </div>
            </div>
        </section>
    );
};

export default SkillScroll;
