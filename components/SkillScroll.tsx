import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const skills = [
    "REACT", "NEXT.JS", "TYPESCRIPT", "JAVASCRIPT", "TAILWIND", "HTML", "CSS", "FIGMA",
    "NODE.JS", "EXPRESS", "FIREBASE", "MONGODB", "SQL", "REST",
    "MACHINE LEARNING", "NLP", "LLMS", "GEMINI", "EMBEDDINGS",
    "N8N", "WEBHOOKS", "APIS", "SCRAPING", "WORKFLOWS",
    "DOCKER", "GIT", "CI/CD",
    "RBAC", "OAUTH", "ENCRYPTION", "AUTH",
    "UX", "UI", "PROTOTYPING", "WIREFRAMING", "ACCESSIBILITY"
];

// Animated Image Plane that updates its own position/scale via refs
const AnimatedImagePlane: React.FC<{
    index: number;
    totalImages: number;
    spacing: number;
    imageUrl: string;
    scrollRef: React.MutableRefObject<number>;
}> = ({ index, totalImages, spacing, imageUrl, scrollRef }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useLoader(TextureLoader, imageUrl);
    const totalWidth = totalImages * spacing;
    const halfWidth = totalWidth / 2;

    useFrame(() => {
        if (!meshRef.current) return;

        // Calculate wrapped position relative to the scroll
        const baseX = index * spacing;
        let xPos = baseX - scrollRef.current;

        // Infinite scroll wrapping logic
        // Centers the result in [-halfWidth, halfWidth]
        xPos = ((xPos + halfWidth) % totalWidth + totalWidth) % totalWidth - halfWidth;

        // Scale based on distance from center
        const distanceFromCenter = Math.abs(xPos);
        const maxDistance = spacing * 2;
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
        const scale = 1.0 + (normalizedDistance * 0.5);

        meshRef.current.position.set(xPos, 0, 0);
        meshRef.current.scale.set(scale, scale, 1);
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[8, 14]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
};

// Skill Ticker Component (Slot Machine Text)
const SkillTicker: React.FC<{ scrollRef: React.MutableRefObject<number>; spacing: number }> = ({ scrollRef, spacing }) => {
    const groupRef = useRef<THREE.Group>(null);
    const lineHeight = 0.8;

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Calculate discrete scroll index
        const scrollIndex = Math.round(scrollRef.current / spacing);
        const targetY = scrollIndex * lineHeight;

        groupRef.current.position.y = THREE.MathUtils.damp(
            groupRef.current.position.y,
            targetY,
            12,
            delta
        );

        // Update opacity
        groupRef.current.children.forEach((child) => {
            const worldY = child.position.y + groupRef.current!.position.y;
            const dist = Math.abs(worldY);
            const opacity = Math.max(0, 1 - dist);

            // @ts-ignore
            if (child.fillOpacity !== undefined) child.fillOpacity = opacity;
        });
    });

    return (
        <group position={[0, 0, 2]}>
            <RoundedBox args={[7, 1.2, 0.1]} radius={0.1} position={[0, 0, -0.1]}>
                <meshBasicMaterial color="black" transparent opacity={0.6} />
            </RoundedBox>

            <Text
                position={[-0.4, 0, 0]}
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

            <group ref={groupRef} position={[0.4, 0, 0]}>
                {skills.map((skill, i) => (
                    <Text
                        key={i}
                        position={[0, -i * lineHeight, 0]}
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
const ThumbnailRing: React.FC<{ images: string[]; scrollRef: React.MutableRefObject<number>; spacing: number }> = ({ images, scrollRef, spacing }) => {
    const groupRef = useRef<THREE.Group>(null);
    const radius = 4;
    const totalImages = images.length;
    const anglePerImage = (Math.PI * 2) / totalImages;
    const textures = useLoader(TextureLoader, images);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const scrollIndex = Math.round(scrollRef.current / spacing);
        const targetRotation = scrollIndex * anglePerImage;

        groupRef.current.rotation.z = THREE.MathUtils.damp(
            groupRef.current.rotation.z,
            targetRotation,
            12,
            delta
        );
    });

    return (
        <group ref={groupRef} position={[0, 0, 4]}>
            {images.map((img, i) => {
                const angle = i * anglePerImage;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                    <group
                        key={i}
                        position={[x, y, 0]}
                        rotation={[0, 0, angle - Math.PI / 2]}
                    >
                        <mesh position={[0, 0, 0]}>
                            <planeGeometry args={[0.26, 0.41]} />
                            <meshBasicMaterial color="#ff0000" />
                        </mesh>
                        <mesh position={[0, 0, 0.001]}>
                            <planeGeometry args={[0.25, 0.4]} />
                            <meshBasicMaterial map={textures[i]} />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
};

// Main scene component - handles physics updates in useFrame
const Scene: React.FC<{
    targetScrollX: React.MutableRefObject<number>;
    images: string[];
}> = ({ targetScrollX, images }) => {
    const { camera } = useThree();
    const scrollRef = useRef(0); // Internal current scroll state (no React state)
    const spacing = 12;

    useEffect(() => {
        camera.position.z = 10;
    }, [camera]);

    // Animation physics loop
    useFrame((state, delta) => {
        const damping = 5; // Adjusted for delta time usage. Original was 0.15 per frame ~ approx 9 @ 60fps
        // Using THREE.MathUtils.damp is smoother for frame-rate independence
        scrollRef.current = THREE.MathUtils.damp(
            scrollRef.current,
            targetScrollX.current,
            damping,
            delta
        );
    });

    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={0.5} />

            <ThumbnailRing images={images} scrollRef={scrollRef} spacing={spacing} />
            <SkillTicker scrollRef={scrollRef} spacing={spacing} />

            {/* Render ALL images once. They update their own positions. */}
            {images.map((imageUrl, i) => (
                <AnimatedImagePlane
                    key={i}
                    index={i}
                    totalImages={images.length}
                    spacing={spacing}
                    imageUrl={imageUrl}
                    scrollRef={scrollRef}
                />
            ))}
        </>
    );
};

// Main SkillScroll component
const SkillScroll: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    // We use a ref for the target scroll position instead of state
    // This allows updates without re-renders of the parent component
    const targetScrollX = useRef(0);

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

    useEffect(() => {
        if (!isActive) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            // Update the ref directly - no re-render
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
    }, [isActive]);

    return (
        <section
            ref={containerRef}
            className={`relative w-full h-screen bg-black overflow-hidden cursor-pointer transition-colors duration-500 ${isActive ? 'border-4 border-white/20' : ''}`}
            id="skillscroll"
            onClick={() => setIsActive(!isActive)}
        >
            <Canvas
                className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance'
                }}
            >
                <Scene targetScrollX={targetScrollX} images={images} />
            </Canvas>

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

            {!isActive && (
                <div className="absolute inset-0 bg-black/40 z-30 pointer-events-none" />
            )}


            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-xs tracking-widest z-40 transition-opacity duration-300 ${isActive ? 'opacity-60' : 'opacity-0'}`}>
                <div className="flex items-center gap-2">
                    <span>←</span>
                    <span>SCROLL</span>
                    <span>→</span>
                </div>
            </div>

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
