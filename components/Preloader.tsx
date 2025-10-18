import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onLoaded: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(prev => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(interval);
        setTimeout(onLoaded, 500); // Wait for fade out animation
        return 100;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onLoaded]);

  const isLoaded = percentage === 100;

  return (
    <div className={`fixed inset-0 bg-black z-50 flex flex-col justify-center items-center transition-opacity duration-500 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="text-center">
        <span className="font-anton text-8xl text-white">{percentage}%</span>
        <h2 className="text-2xl font-bold tracking-widest mt-2">DUMEMEARTS</h2>
      </div>
    </div>
  );
};

export default Preloader;
