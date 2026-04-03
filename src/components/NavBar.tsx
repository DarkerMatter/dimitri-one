// src/components/NavBar.tsx
import React from 'react';

const SECTIONS = [
  { id: 'hero', label: 'HOME' },
  { id: 'tech-stack', label: 'STACK' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'playlists', label: 'PLAYLISTS' },
];

interface NavBarProps {
  activeSection: string;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection }) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[#1F1F1F] border-b-4 border-[#FF1801] flex items-center justify-between px-8 z-50 shadow-lg">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => scrollTo('hero')}
      >
        <div className="text-2xl font-black italic tracking-tighter text-white">
          DIMITRI<span className="text-[#FF1801]">.ONE</span>
        </div>
        <div className="hidden sm:block h-8 w-[1px] bg-[#A8A9AD]/30 mx-2" />
        <div className="hidden sm:block text-xs font-mono text-[#A8A9AD]">
          EST. 2006 // USN — RW3
        </div>
      </div>

      <div className="flex gap-4 sm:gap-6 font-black italic text-sm">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`transition-colors hover:text-[#FF1801] ${
              activeSection === id ? 'text-[#FF1801]' : 'text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
