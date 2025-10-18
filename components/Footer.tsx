import React from 'react';
import { useTime } from '../hooks/useTime';

const Footer: React.FC = () => {
    const timeString = useTime();
  return (
    <footer className="absolute bottom-0 left-0 right-0 p-8 z-10 text-sm font-medium tracking-wider">
      <div className="flex justify-between items-center">
        <span className="cursor-pointer">©COPYRIGHT 2025</span>
        <div className="border border-white rounded-full px-4 py-1 flex items-center gap-2 cursor-pointer">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <span>{timeString}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
