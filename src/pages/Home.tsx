// src/pages/Home.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollSpy } from '../hooks/useScrollSpy';
import NavBar from '../components/NavBar';
import Hero from '../sections/Hero';
import PitLane from '../sections/PitLane';
import TechStack from '../sections/TechStack';
import Projects from '../sections/Projects';
import Playlists from '../sections/Playlists';
import Footer from '../sections/Footer';

const SECTION_IDS = ['hero', 'tech-stack', 'projects', 'playlists'];

const Home: React.FC = () => {
  const activeSection = useScrollSpy(SECTION_IDS);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen w-full bg-[#15151E] text-white"
    >
      <NavBar activeSection={activeSection} />

      <main className="pt-16"> {/* offset for fixed nav */}
        <Hero />

        <PitLane id="pit-lane-1" number={1} nextSector="TECH STACK" />

        <TechStack />

        <PitLane id="pit-lane-2" number={2} nextSector="PROJECTS">
          {/* Stats ticker */}
          <div className="flex flex-wrap justify-center gap-8 text-center font-mono">
            {[
              { label: 'Public Repos', value: '12' },
              { label: 'Years Coding', value: '5+' },
              { label: 'Discord Bots', value: '3' },
              { label: 'MC Servers', value: '2+' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-3xl font-black text-[#FF1801]">{value}</div>
                <div className="text-[10px] text-[#555] tracking-[3px] uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </PitLane>

        <Projects />

        <PitLane id="pit-lane-3" number={3} nextSector="PLAYLISTS">
          <div className="flex flex-wrap justify-center gap-6 font-mono text-center">
            <div className="bg-[#111118] border border-[#2a2a3a] rounded-lg px-6 py-4">
              <p className="text-[#FF1801] font-bold text-xs tracking-widest uppercase mb-1">Discord</p>
              <p className="text-[#A8A9AD] text-xs">3 active bots across various servers</p>
            </div>
            <div className="bg-[#111118] border border-[#2a2a3a] rounded-lg px-6 py-4">
              <p className="text-[#FF1801] font-bold text-xs tracking-widest uppercase mb-1">Minecraft</p>
              <p className="text-[#A8A9AD] text-xs">Custom Java plugins + server hosting</p>
            </div>
          </div>
        </PitLane>

        <Playlists />

        <Footer />
      </main>
    </motion.div>
  );
};

export default Home;
