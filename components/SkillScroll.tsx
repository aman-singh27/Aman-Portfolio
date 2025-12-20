import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const skills = [
    "REACT", "NEXT.JS", "TYPESCRIPT", "JAVASCRIPT", "TAILWIND", "HTML", "CSS", "FIGMA",
    "NODE.JS", "EXPRESS", "FIREBASE", "MONGODB", "SQL", "REST",
    "MACHINE LEARNING", "NLP", "LLMS", "GEMINI", "MISTRAL", "EMBEDDINGS",
    "N8N", "WEBHOOKS", "APIS", "SCRAPING", "WORKFLOWS",
    "AWS", "GCP", "DOCKER", "GIT", "CI/CD",
    "RBAC", "OAUTH", "ENCRYPTION", "AUTH",
    "UX", "UI", "PROTOTYPING", "WIREFRAMING", "ACCESSIBILITY"
];

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

// Skill Ticker Component (Slot Machine Text)
const SkillTicker: React.FC<{ scrollIndex: number }> = ({ scrollIndex }) => {
    const groupRef = useRef<THREE.Group>(null);
    const lineHeight = 0.8; // Reduced line height for tighter lock

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const targetY = scrollIndex * lineHeight;

        groupRef.current.position.y = THREE.MathUtils.damp(
            groupRef.current.position.y,
            targetY,
            12,
            delta
        );

        // Update opacity for each child based on visual position
        groupRef.current.children.forEach((child, i) => {
            // Get local y position of this text (negative stack) plus the group's current y offset
            const worldY = child.position.y + groupRef.current!.position.y;

            // Distance from center (0)
            const dist = Math.abs(worldY);

            // Gentle fade: 1 at center, 0 at 1.0 distance (slightly more than 1 line height)
            const opacity = Math.max(0, 1 - dist);

            // @ts-ignore
            if (child.fillOpacity !== undefined) child.fillOpacity = opacity;
        });
    });

    return (
        <group position={[0, 0, 2]}>
            {/* Background for better visibility */}
            <RoundedBox args={[7, 1.2, 0.1]} radius={0.1} position={[0, 0, -0.1]}>
                <meshBasicMaterial color="black" transparent opacity={0.6} />
            </RoundedBox>

            {/* Static Sentence Prefix */}
            <Text
                position={[-0.4, 0, 0]} // Brought closer to center
                fontSize={0.4}
                color="white"
                anchorX="right"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                fontWeight="bold"
                letterSpacing={0.05}
            >
                MY TECH STACK
            </Text>

            {/* Ticking Skills */}
            <group ref={groupRef} position={[0.4, 0, 0]}> {/* Brought closer to center */}
                {skills.map((skill, i) => (
                    <Text
                        key={i}
                        position={[0, -i * lineHeight, 0]} // Aligned locally
                        fontSize={0.4}
                        color="white"
                        anchorX="left"
                        anchorY="middle"
                        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                        fontWeight="bold"
                        letterSpacing={0.05}
                    >
                        {skill}
                    </Text>
                ))}
            </group>
        </group>
    );
};

// Ring component with ticking animation
const ThumbnailRing: React.FC<{ images: string[]; scrollIndex: number }> = ({ images, scrollIndex }) => {
    const groupRef = useRef<THREE.Group>(null);
    const radius = 4; // Radius of the ring
    const totalImages = images.length;
    const anglePerImage = (Math.PI * 2) / totalImages;

    // Load all textures efficiently once
    const textures = useLoader(TextureLoader, images);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Calculate target rotation based on discrete index (the "tick")
        // REMOVED negative sign to invert rotation direction
        const targetRotation = scrollIndex * anglePerImage;

        // Smooth snap to the target rotation (the "jerk" that looks smooth)
        // High lerp factor = faster snap
        groupRef.current.rotation.z = THREE.MathUtils.damp(
            groupRef.current.rotation.z,
            targetRotation,
            12, // Lambda: higher = snappier
            delta
        );
    });

    return (
        <group ref={groupRef} position={[0, 0, 4]}> {/* Positioned in front of main slider */}
            {images.map((img, i) => {
                const angle = i * anglePerImage;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius; // Z-axis rotation layout

                return (
                    <group
                        key={i}
                        position={[x, y, 0]}
                        rotation={[0, 0, angle - Math.PI / 2]} // Align image to center tangent
                    >
                        {/* Border (Red Background) */}
                        <mesh position={[0, 0, 0]}>
                            <planeGeometry args={[0.26, 0.41]} /> {/* Slightly larger than image */}
                            <meshBasicMaterial color="#ff0000" />
                        </mesh>

                        {/* Image */}
                        <mesh position={[0, 0, 0.001]}> {/* Slightly in front to avoid z-fighting */}
                            <planeGeometry args={[0.25, 0.4]} />
                            <meshBasicMaterial map={textures[i]} />
                        </mesh>
                    </group>
                );
            })}
        </group>
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

    // Calculate discrete index for the ring "tick"
    const discreteScrollIndex = Math.round(scrollX / spacing);

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
            {/* Background Ring */}
            <ThumbnailRing images={images} scrollIndex={discreteScrollIndex} />

            {/* Slot Machine Skill Text */}
            <SkillTicker scrollIndex={discreteScrollIndex} />

            {/* Main Carousel */}
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
                </div>
            </div>

            {/* Explicit Close Button for Mobile/Touch */}
            <button
                className={`absolute top-8 right-8 text-white z-50 p-4 bg-black/50 backdrop-blur-md rounded-full border border-white/20 transition-all duration-300 hover:bg-red-500/20 hover:border-red-500 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsActive(false);
                }}
                aria-label="Exit Skill View"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>
        </section>
    );
};

export default SkillScroll;
