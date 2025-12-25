import React, { useState, useEffect } from 'react';

const Cursor: React.FC = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Use pageX/pageY instead of clientX/clientY to account for scroll
            setPosition({
                x: e.clientX + window.scrollX,
                y: e.clientY + window.scrollY
            });
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
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${outerSize}px`,
        height: `${outerSize}px`,
        transform: `translate(-50%, -50%)`,
        marginLeft: '0',
        marginTop: '0',
    };

    const innerStyle = {
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%)`,
        marginLeft: '0',
        marginTop: '0',
    };

    return (
        <>
            <div
                className="fixed rounded-full border-2 border-white pointer-events-none transition-all duration-300 ease-out z-[100] mix-blend-difference"
                style={outerStyle}
            />
            <div
                className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
                style={innerStyle}
            />
        </>
    );
};

export default Cursor;