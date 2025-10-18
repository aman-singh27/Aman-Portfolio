
import React from 'react';

const Ruler: React.FC = () => {
    const radius = 500;
    const numTicks = 13;
    const angleStep = 180 / (numTicks + 3); 
    const startAngle = -100;

    return (
        <svg
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1050px] h-[525px] overflow-visible"
            style={{ top: '3.5rem' }}
            viewBox="0 0 1050 525"
        >
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
        </svg>
    );
};


export default Ruler;
