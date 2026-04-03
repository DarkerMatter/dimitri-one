// src/components/KeyCap.tsx
import React from 'react';
import { KeyData } from '../data/keyboard';

interface KeyCapProps {
  data: KeyData;
  className?: string;
}

const KeyCap: React.FC<KeyCapProps> = ({ data, className = '' }) => {
  const stemColor = data.cf ? '#F6821F' : '#FF1801';
  const hoverBg = data.cf
    ? 'hover:bg-gradient-to-br hover:from-[#F6821F] hover:to-[#c96a18]'
    : 'hover:bg-gradient-to-br hover:from-[#FF1801] hover:to-[#991000]';

  return (
    <div
      className={`
        key-cap group relative flex flex-col items-center justify-center gap-1
        px-2 py-3 rounded-md cursor-default select-none
        bg-gradient-to-br from-[#2a2a3a] to-[#181820]
        border
        transition-[top,box-shadow,background] duration-[80ms] ease-linear
        top-0 hover:top-[5px]
        ${hoverBg}
        ${data.wide ? 'min-w-[100px]' : data.wider ? 'min-w-[130px]' : 'min-w-[72px]'}
        h-[72px]
        ${className}
      `}
      style={{
        boxShadow: `0 5px 0 #0a0a14, 0 6px 0 ${stemColor}, inset 0 1px 0 rgba(255,255,255,0.08)`,
        borderColor: '#3a3a50',
      }}
      onMouseEnter={(e) => {
        const element = e.currentTarget as HTMLElement;
        element.style.boxShadow =
          `0 1px 0 #0a0a14, 0 2px 0 ${stemColor}, inset 0 1px 0 rgba(255,255,255,0.04)`;
        element.style.borderColor = stemColor;
      }}
      onMouseLeave={(e) => {
        const element = e.currentTarget as HTMLElement;
        element.style.boxShadow =
          `0 5px 0 #0a0a14, 0 6px 0 ${stemColor}, inset 0 1px 0 rgba(255,255,255,0.08)`;
        element.style.borderColor = '#3a3a50';
      }}
    >
      <span className="text-[22px] leading-none group-hover:grayscale-0">{data.icon}</span>
      <span className="text-[9.5px] font-bold tracking-wide uppercase text-[#ccc] group-hover:text-white text-center leading-tight">
        {data.label}
      </span>
      {data.sub && (
        <span className="text-[8px] text-[#666] group-hover:text-white/70 text-center">
          {data.sub}
        </span>
      )}
    </div>
  );
};

export default KeyCap;
