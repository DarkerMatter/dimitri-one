// src/sections/PitLane.tsx
import React, { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface PitLaneProps {
  id: string;
  number: number;
  nextSector: string;
  children?: React.ReactNode;
}

const PitLane: React.FC<PitLaneProps> = ({ id, number, nextSector, children }) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { ref: containerRef, isIntersecting } = useIntersectionObserver<HTMLElement>({ threshold: 0.4 });

  useEffect(() => {
    if (!isIntersecting) return;
    if (lineRef.current) lineRef.current.style.width = '100%';
    let timer: ReturnType<typeof setTimeout>;
    if (textRef.current) {
      timer = setTimeout(() => {
        if (textRef.current) textRef.current.style.opacity = '1';
      }, 600);
    }
    return () => clearTimeout(timer);
  }, [isIntersecting]);

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-[50vh] bg-[#0d0d14] px-8 py-16 overflow-hidden"
      style={{
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 20px,
          rgba(255,255,255,0.01) 20px,
          rgba(255,255,255,0.01) 21px
        )`,
      }}
    >
      <p className="text-xs font-mono text-[#333] tracking-[6px] uppercase mb-8">
        ── PIT LANE {number} ──
      </p>

      {/* Animated sweep line */}
      <div className="w-full max-w-2xl h-px bg-[#1a1a1a] relative mb-6">
        <div
          ref={lineRef}
          className="absolute top-0 left-0 h-full bg-[#FF1801] transition-[width] duration-500 ease-out"
          style={{ width: '0%' }}
        />
      </div>

      {/* Next sector text */}
      <div
        ref={textRef}
        className="text-center transition-opacity duration-500"
        style={{ opacity: 0 }}
      >
        <p className="text-[#FF1801] font-mono font-bold tracking-[4px] uppercase text-sm">
          SECTOR {number} AHEAD
        </p>
        <p className="text-[#555] font-mono text-xs tracking-[3px] uppercase mt-1">
          // {nextSector}
        </p>
      </div>

      {children && <div className="mt-10 w-full max-w-4xl">{children}</div>}
    </section>
  );
};

export default PitLane;
