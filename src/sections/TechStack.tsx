// src/sections/TechStack.tsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import KeyCap from '../components/KeyCap';
import { KEYBOARD_ROWS } from '../data/keyboard';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop: pin section and stagger keys in as user scrolls through
    mm.add('(min-width: 768px)', () => {
      const keys = gsap.utils.toArray<HTMLElement>('.key-cap');

      gsap.set(keys, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const total = keys.length;
          const revealed = Math.floor(progress * total * 1.3); // slight overshoot so all reveal before end
          keys.forEach((key, i) => {
            if (i < revealed) {
              gsap.to(key, { opacity: 1, y: 0, duration: 0.3, overwrite: 'auto' });
            }
          });
        },
      });
    });

    // Mobile: no pin, just fade in on scroll
    mm.add('(max-width: 767px)', () => {
      const keys = gsap.utils.toArray<HTMLElement>('.key-cap');
      gsap.set(keys, { opacity: 0, y: 20 });
      gsap.to(keys, {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.4,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => mm.revert(); // scoped cleanup — does not affect other sections
  }, { scope: containerRef });

  return (
    <section
      id="tech-stack"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-[#15151E]"
    >
      {/* Section header */}
      <div className="text-center mb-4">
        <p className="text-[10px] font-mono text-[#FF1801] tracking-[4px] uppercase mb-2">
          // Sector 1
        </p>
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white">
          TOOLS OF <span className="text-[#FF1801]">THE TRADE</span>
        </h2>
        <div className="h-[3px] w-16 bg-[#FF1801] mx-auto mt-4" />
      </div>

      {/* Keyboard chassis */}
      <div className="mt-10 bg-[#111118] rounded-2xl border border-[#2a2a3a] p-6 md:p-8 shadow-2xl"
        style={{ boxShadow: '0 0 0 1px #0a0a10, 0 8px 32px rgba(0,0,0,0.6), 0 2px 0 #FF1801' }}
      >
        <div className="flex flex-col gap-2">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap gap-2 justify-center">
              {row.map((key) => (
                <KeyCap key={key.id} data={key} />
              ))}
            </div>
          ))}
        </div>

        <p className="text-center mt-5 text-[10px] text-[#2a2a3a] font-mono tracking-[6px] uppercase">
          DIMITRI<span className="text-[#FF1801]">.ONE</span> // EST. 2006
        </p>
      </div>
    </section>
  );
};

export default TechStack;
