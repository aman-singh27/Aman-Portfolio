import React from 'react';

const MobileBlocker: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-8 text-center lg:hidden">
            <div className="max-w-md space-y-6">
                <h2 className="text-4xl font-bold text-yellow-400 font-anton tracking-wide">
                    DESKTOP EXPERIENCE ONLY
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                    This portfolio is designed for a cinematic immersive experience which is best viewed on a larger screen.
                </p>
                <p className="text-white text-base font-mono border border-white/20 rounded-full px-6 py-3 inline-block">
                    Please open on a Desktop or Laptop
                </p>
            </div>
        </div>
    );
};

export default MobileBlocker;
