// src/components/CircuitDots.tsx
import React from 'react';

const DOTS = [
  { id: 'hero', label: 'GRID POSITION' },
  { id: 'tech-stack', label: 'SECTOR 1 — TECH STACK' },
  { id: 'projects', label: 'SECTOR 2 — PROJECTS' },
  { id: 'playlists', label: 'SECTOR 3 — PLAYLISTS' },
];

interface CircuitDotsProps {
  activeSection: string;
}

const CircuitDots: React.FC<CircuitDotsProps> = ({ activeSection }) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-0 z-50">
      {DOTS.map(({ id, label }, i) => (
        <React.Fragment key={id}>
          <div className="relative group">
            <button
              onClick={() => scrollTo(id)}
              className={`w-3 h-3 rounded-full border transition-all duration-200 cursor-pointer ${
                activeSection === id
                  ? 'bg-[#FF1801] border-[#FF1801] shadow-[0_0_8px_#FF1801]'
                  : 'bg-transparent border-[#555] hover:border-[#FF1801]'
              }`}
              aria-label={label}
            />
            {/* Tooltip */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <div className="bg-[#1F1F1F] border border-[#FF1801] text-white text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-1 rounded whitespace-nowrap">
                {label}
              </div>
            </div>
          </div>
          {i < DOTS.length - 1 && (
            <div className="w-px h-5 bg-[#2a2a2a]" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CircuitDots;
