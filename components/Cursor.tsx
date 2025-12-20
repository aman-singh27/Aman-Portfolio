import React, { useState, useEffect } from 'react';

const Cursor: React.FC = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            const target = e.target as HTMLElement;
            if (target.closest('.cursor-pointer')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const outerSize = isHovering ? 60 : 30;
    const outerStyle = {
        transform: `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%))`,
        width: `${outerSize}px`,
        height: `${outerSize}px`,
    };

    const innerStyle = {
        transform: `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%))`
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 rounded-full border-2 border-white pointer-events-none transition-all duration-300 ease-out z-[100] mix-blend-difference"
                style={outerStyle}
            />
            <div
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
                style={innerStyle}
            />
        </>
    );
};

export default Cursor;
