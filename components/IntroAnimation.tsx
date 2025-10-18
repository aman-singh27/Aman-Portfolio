import React from 'react';

interface IntroAnimationProps {
    animationStage: number;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ animationStage }) => {
    const numberOfBars = 8;
    const isFinished = animationStage === 2;

    return (
        <div 
            className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <div className="absolute inset-0 flex" style={{ backfaceVisibility: 'hidden' }}>
                {Array.from({ length: numberOfBars }).map((_, i) => (
                    <div
                        key={i}
                        className="h-full bg-yellow-400"
                        style={{
                            width: `${100 / numberOfBars}%`,
                            transform: animationStage >= 1 ? 'translateY(-100%)' : 'translateY(0)',
                            transition: `transform 0.7s cubic-bezier(0.86, 0, 0.07, 1)`,
                            transitionDelay: `${i * 80}ms`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default IntroAnimation;
