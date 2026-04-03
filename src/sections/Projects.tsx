// src/sections/Projects.tsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Card, CardBody, CardHeader, Button, Chip, Progress } from '@nextui-org/react';
import { useGitHubPinned } from '../hooks/useGitHubPinned';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LANG_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Java: 'bg-orange-500',
  Shell: 'bg-gray-400',
  CSS: 'bg-purple-500',
  HTML: 'bg-red-400',
};

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { repos, loading, error } = useGitHubPinned();

  useGSAP(() => {
    if (loading || repos.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card', containerRef.current);
      gsap.set(cards, { opacity: 0, x: 60 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const total = cards.length;
          cards.forEach((card, i) => {
            const threshold = i / total;
            const shouldReveal = progress >= threshold;
            gsap.to(card, { opacity: shouldReveal ? 1 : 0, x: shouldReveal ? 0 : 60, duration: 0.4, overwrite: 'auto' });
          });
        },
      });
    });

    mm.add('(max-width: 767px)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card', containerRef.current);
      gsap.set(cards, { opacity: 0, y: 30 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    });

    // Recalculate all pin positions now that DOM is populated
    ScrollTrigger.refresh();

    return () => mm.revert(); // scoped cleanup — does not affect other sections
  }, { scope: containerRef, dependencies: [loading, repos.length] });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-[#15151E]"
    >
      <div className="text-center mb-12">
        <p className="text-[10px] font-mono text-[#FF1801] tracking-[4px] uppercase mb-2">// Sector 2</p>
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white">
          SELECTED <span className="text-[#FF1801]">PROJECTS</span>
        </h2>
        <div className="h-[3px] w-16 bg-[#FF1801] mx-auto mt-4" />
      </div>

      {loading && (
        <Progress size="lg" isIndeterminate color="danger" className="max-w-md" aria-label="Loading projects..." />
      )}

      {error && (
        <p className="text-[#A8A9AD] font-mono text-sm">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {repos.map((repo) => (
            <Card
              key={repo.name}
              className="project-card bg-[#1F1F2E]/80 border border-[#2a2a3a] backdrop-blur-md shadow-xl hover:scale-105 transition-transform duration-300 hover:border-[#FF1801]/40"
            >
              <CardHeader className="px-6 pt-5 pb-2 flex items-start justify-between">
                <h3 className="font-black italic uppercase text-white tracking-tight text-lg">
                  {repo.name}
                </h3>
                {repo.language && (
                  <Chip
                    size="sm"
                    className={`${LANG_COLORS[repo.language] ?? 'bg-[#333]'} text-white text-[10px] font-mono`}
                  >
                    {repo.language}
                  </Chip>
                )}
              </CardHeader>
              <CardBody className="px-6 pb-5 flex flex-col gap-4">
                <p className="text-[#A8A9AD] font-mono text-sm leading-relaxed">
                  {repo.description ?? 'No description.'}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[#555] font-mono text-xs">★ {repo.stargazers_count}</span>
                  <Button
                    size="sm"
                    className="bg-[#FF1801] text-white font-bold italic uppercase tracking-wider"
                    onPress={() => window.open(repo.html_url, '_blank', 'noopener,noreferrer')}
                  >
                    View on GitHub
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
