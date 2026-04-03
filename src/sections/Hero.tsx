// src/sections/Hero.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, CardHeader, Divider, Button, Progress } from '@nextui-org/react';
import axios from 'axios';

const Hero: React.FC = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [loadingVisits, setLoadingVisits] = useState(true);

  useEffect(() => {
    axios
      .post('https://api.dimitri.one/v1/counter/increase', {}, { headers: { Accept: 'application/json' } })
      .then(({ data }) => {
        if (data.success && typeof data.newCount === 'number') setVisitCount(data.newCount);
      })
      .catch(() => setVisitCount(null))
      .finally(() => setLoadingVisits(false));
  }, []);

  const scrollToStack = () => document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' });
  const scrollDown = () => document.getElementById('pit-lane-1')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden"
      style={{
        background: `
          repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.02) 39px, rgba(255,255,255,0.02) 40px),
          repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.02) 39px, rgba(255,255,255,0.02) 40px),
          #15151E
        `,
      }}
    >
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12">
        {/* Left: Bio */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="flex-1 space-y-6"
        >
          <p className="text-xs font-mono text-[#FF1801] tracking-[4px] uppercase">
            // Developer · Sailor · Builder
          </p>

          <h1 className="text-6xl font-black italic tracking-tighter text-white drop-shadow-lg leading-none">
            DIMITRI<br />
            <span className="text-[#FF1801]">SHEPHERD</span>
          </h1>

          <div className="h-[3px] w-16 bg-[#FF1801]" />

          <div className="text-base font-mono text-[#A8A9AD] leading-relaxed space-y-3 max-w-md">
            <p>
              When your initials are <span className="text-[#FF1801] font-bold">DNS</span>,
              you were always going to end up in tech.
            </p>
            <p>
              I'm a <span className="text-yellow-400 font-bold">19y/o</span>{' '}
              <span className="text-orange-400 font-bold">Full Stack</span> developer
              serving in the <span className="text-[#FF1801] font-bold">US Navy</span> — building
              web apps, Minecraft servers, and Discord bots in whatever time the Navy hasn't claimed.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {['Full Stack', 'Charleston, SC', '19 y/o', 'USN RW3'].map((tag) => (
              <span
                key={tag}
                className="bg-[#1F1F2E] border border-[#2a2a3a] rounded px-3 py-1 text-xs font-mono text-[#A8A9AD]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              color="danger"
              variant="shadow"
              size="lg"
              className="font-black italic uppercase tracking-wider"
              onPress={scrollToStack}
            >
              View Stack
            </Button>
            <Button
              variant="bordered"
              color="default"
              size="lg"
              className="font-black italic uppercase tracking-wider text-white border-white/30 hover:border-white"
              onPress={() => window.open('https://github.com/DarkerMatter', '_blank', 'noopener,noreferrer')}
            >
              GitHub
            </Button>
            <Button
              variant="bordered"
              color="warning"
              size="lg"
              className="font-black italic uppercase tracking-wider text-white border-white/30 hover:border-white"
              onPress={() => window.open('https://fts.gg', '_blank', 'noopener,noreferrer')}
            >
              FTS
            </Button>
          </div>
        </motion.div>

        {/* Right: Stats card */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
          <Card className="w-full max-w-sm bg-[#1F1F2E]/80 border border-[#A8A9AD]/20 backdrop-blur-md shadow-2xl">
            <CardHeader className="flex gap-3 px-6 pt-6">
              <div className="flex flex-col">
                <p className="text-sm text-[#FF1801] font-bold uppercase tracking-widest">Dimitri Shepherd</p>
                <p className="text-xs text-default-500 font-mono">Current Session Data</p>
              </div>
            </CardHeader>
            <Divider className="bg-[#A8A9AD]/20" />
            <CardBody className="px-6 py-8 gap-5 font-mono">
              <div className="flex justify-between items-center">
                <span className="text-[#A8A9AD] text-xs tracking-widest">VISITORS</span>
                {loadingVisits ? (
                  <Progress size="sm" isIndeterminate color="danger" className="max-w-[80px]" aria-label="Loading..." />
                ) : (
                  <span className="text-xl font-bold text-white">{visitCount?.toLocaleString() ?? '---'}</span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A8A9AD] text-xs tracking-widest">STATUS</span>
                <span className="text-green-500 font-bold text-xs animate-pulse">● ACTIVE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A8A9AD] text-xs tracking-widest">ROLE</span>
                <span className="text-white font-bold text-xs">DEV / USN</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A8A9AD] text-xs tracking-widest">REGION</span>
                <span className="text-white font-bold text-xs">US-EAST</span>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#A8A9AD] hover:text-[#FF1801] transition-colors cursor-pointer"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        aria-label="Scroll down"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.button>
    </section>
  );
};

export default Hero;
