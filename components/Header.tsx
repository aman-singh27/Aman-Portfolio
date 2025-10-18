import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 p-8 z-10">
      <div className="flex justify-between items-center text-sm font-medium tracking-wider">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <span>Menu</span>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="1.5" x2="18" y2="1.5" stroke="white" strokeWidth="2"/>
                <line y1="10.5" x2="18" y2="10.5" stroke="white" strokeWidth="2"/>
                <line x1="8.5" y1="1.74846e-07" x2="8.5" y2="12" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <div className="border border-white rounded-full px-4 py-1 flex items-center gap-2 cursor-pointer">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <span>AVAILABLE - MAY 2025</span>
          </div>
           <div className="border border-white rounded-full p-2 cursor-pointer">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 8H4L7 1L7 15L4 8H1V8Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M12.5 4C13.5 5.5 13.5 7.5 12.5 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15.5 1C17.5 4 17.5 11 15.5 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 cursor-pointer">
             <svg width="50" height="26" viewBox="0 0 50 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M49 13C49 19.6274 38.5247 25 25 25C11.4753 25 1 19.6274 1 13C1 6.37258 11.4753 1 25 1C38.5247 1 49 6.37258 49 13Z" stroke="white" strokeWidth="2"/>
                <ellipse cx="25" cy="13" rx="13" ry="7" stroke="white" strokeWidth="2"/>
                <ellipse cx="25" cy="13" rx="4" ry="4" fill="white"/>
            </svg>
        </div>

        <div className="border border-white rounded-full px-5 py-2 flex items-center gap-3 cursor-pointer hover:bg-yellow-400 hover:text-black transition-colors">
          <span>CONTACT</span>
          <div className="bg-yellow-400 rounded-full p-1">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.03125 1L11 5M11 5L7.03125 9M11 5H0" stroke="black" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
