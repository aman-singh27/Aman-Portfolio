

import React, { useMemo } from 'react';

// Fix: Add props interface to accept scrollProgress
interface RulerProps {
    scrollProgress: number;
}

// Fix: Update component to accept and use scrollProgress prop
const Ruler: React.FC<RulerProps> = ({ scrollProgress }) => {
    const radius = 500;
    const numTicks = 13;
    const angleStep = 180 / (numTicks + 3);
    const startAngle = -100;

    // Calculate the position of the scroll progress indicator (Dynamic)
    const totalAngleSpan = (numTicks - 1) * angleStep;
    const indicatorAngle = startAngle + scrollProgress * totalAngleSpan;

    const indicatorX1 = 525 + radius * Math.cos((indicatorAngle * Math.PI) / 180);
    const indicatorY1 = 525 + radius * Math.sin((indicatorAngle * Math.PI) / 180);
    const indicatorX2 = 525 + (radius - 25) * Math.cos((indicatorAngle * Math.PI) / 180);
    const indicatorY2 = 525 + (radius - 25) * Math.sin((indicatorAngle * Math.PI) / 180);

    // Memoize static ticks to avoid re-calculation on every render
    const staticTicks = useMemo(() => {
        return (
            <>
                <defs>
                    <path
                        id="rulerPath"
                        d={`M 25,${radius + 25} A ${radius},${radius} 0 0 1 ${radius * 2 + 25},${radius + 25}`}
                        fill="none"
                    />
                </defs>

                {Array.from({ length: numTicks * 5 }).map((_, i) => {
                    if (i % 5 !== 0) {
                        const angle = startAngle + (i * angleStep) / 5;
                        const x = 525 + radius * Math.cos((angle * Math.PI) / 180);
                        const y = 525 + radius * Math.sin((angle * Math.PI) / 180);
                        const x2 = 525 + (radius - 10) * Math.cos((angle * Math.PI) / 180);
                        const y2 = 525 + (radius - 10) * Math.sin((angle * Math.PI) / 180);
                        return <line key={`small-tick-${i}`} x1={x} y1={y} x2={x2} y2={y2} stroke="#555" strokeWidth="1" />;
                    }
                    return null;
                })}

                {Array.from({ length: numTicks }).map((_, i) => {
                    const number = i - 8;
                    const angle = startAngle + i * angleStep;
                    const x = 525 + radius * Math.cos((angle * Math.PI) / 180);
                    const y = 525 + radius * Math.sin((angle * Math.PI) / 180);
                    const x2 = 525 + (radius - 20) * Math.cos((angle * Math.PI) / 180);
                    const y2 = 525 + (radius - 10) * Math.sin((angle * Math.PI) / 180);
                    const textX = 525 + (radius - 35) * Math.cos((angle * Math.PI) / 180);
                    const textY = 525 + (radius - 35) * Math.sin((angle * Math.PI) / 180);

                    return (
                        <g key={`tick-${i}`}>
                            <line x1={x} y1={y} x2={x2} y2={y2} stroke="white" strokeWidth="1.5" />
                            <text
                                x={textX}
                                y={textY}
                                dy=".3em"
                                textAnchor="middle"
                                fill="white"
                                fontSize="12"
                                transform={`rotate(${angle + 90}, ${textX}, ${textY})`}
                            >
                                {number.toString().padStart(2, '0')}
                            </text>
                        </g>
                    );
                })}
            </>
        );
    }, []); // Empty dependency array as geometry is constant

    return (
        <svg
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1050px] h-[525px] overflow-visible"
            // change ruler posotion
            style={{ top: '9.5rem' }}
            viewBox="0 0 1050 525"
        >
            {staticTicks}

            {/* Add a moving indicator based on scroll progress */}
            <line
                x1={indicatorX1}
                y1={indicatorY1}
                x2={indicatorX2}
                y2={indicatorY2}
                stroke="#FBBF24"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ transition: 'all 100ms linear' }}
            />
        </svg>
    );
};


export default Ruler;