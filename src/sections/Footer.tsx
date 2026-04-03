// src/sections/Footer.tsx
import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Footer: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLElement>({ threshold: 0.5 });

  return (
    <footer
      ref={ref}
      className="relative w-full bg-[#1F1F1F] py-8 z-10"
    >
      {/* Checkered flag sweep on top border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
        <div
          className="h-full transition-[width] duration-700 ease-out"
          style={{
            width: isIntersecting ? '100%' : '0%',
            backgroundImage: `repeating-linear-gradient(
              90deg,
              #fff 0px, #fff 8px,
              #000 8px, #000 16px
            )`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[#A8A9AD] text-xs font-mono">
        <div>© {new Date().getFullYear()} DIMITRI.ONE</div>

        {/* Social links */}
        <div className="flex gap-5">
          <a
            href="https://github.com/DarkerMatter"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF1801] transition-colors uppercase tracking-widest"
          >
            GitHub
          </a>
          <a
            href="https://instagram.com/one.dimitri"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF1801] transition-colors uppercase tracking-widest"
          >
            Instagram
          </a>
        </div>

        <div className="flex gap-3">
          <span>STATUS: ONLINE</span>
          <span>|</span>
          <span>REGION: US-EAST</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
