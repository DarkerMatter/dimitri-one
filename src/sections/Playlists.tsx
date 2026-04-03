// src/sections/Playlists.tsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Card, CardBody, CardHeader, Image, Button } from '@nextui-org/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Playlist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  spotifyUrl: string;
}

const PLAYLISTS: Playlist[] = [
  {
    id: '1',
    name: '✈️',
    description: 'Smooth beats for the midnight oil.',
    imageUrl: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c1615eb5520ca10fd5998e95b',
    spotifyUrl: 'https://open.spotify.com/playlist/6MUTaOlTtOIvE4WQcCgIwR',
  },
  {
    id: '2',
    name: 'General Aux',
    description: "Sing along and code won't break ;).",
    imageUrl: 'https://mosaic.scdn.co/300/ab67616d00001e0280c64a084164867806ea617aab67616d00001e028752a7355996e64709247c53ab67616d00001e02aab2c3c3f1f3207137d915c9ab67616d00001e02fec19a094239017e96276d3f',
    spotifyUrl: 'https://open.spotify.com/playlist/69wju7EwK6vJPsPXMWzr6P',
  },
  {
    id: '3',
    name: 'White Girl',
    description: 'White girl music special.',
    imageUrl: 'https://mosaic.scdn.co/300/ab67616d00001e021e9a057052d59004caf47e22ab67616d00001e0258b08d62231dfca8d358b876ab67616d00001e02613aaa3ae566d9f36008aed0ab67616d00001e02937af329667311f4b2831616',
    spotifyUrl: 'https://open.spotify.com/playlist/6FwEGL0JjR7ci3997Drfgl',
  },
];

const Playlists: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.playlist-card', containerRef.current);
    gsap.set(cards, { opacity: 0, y: 40 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });
  }, { scope: containerRef });

  return (
    <section
      id="playlists"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-[#15151E]"
    >
      <div className="text-center mb-12">
        <p className="text-[10px] font-mono text-[#FF1801] tracking-[4px] uppercase mb-2">// Sector 3</p>
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white">
          MY <span className="text-[#FF1801]">PLAYLISTS</span>
        </h2>
        <div className="h-[3px] w-16 bg-[#FF1801] mx-auto mt-4" />
        <p className="text-[#A8A9AD] font-mono text-sm mt-4 max-w-xl mx-auto">
          Curated collections for every mood. From coding sessions to late night drives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {PLAYLISTS.map((playlist) => (
          <Card
            key={playlist.id}
            className="playlist-card bg-[#1F1F2E]/80 border border-[#2a2a3a] backdrop-blur-md shadow-xl hover:scale-105 transition-transform duration-300 group"
          >
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <p className="text-[10px] uppercase font-bold text-[#FF1801] tracking-widest">Playlist</p>
              <h4 className="font-bold text-lg text-white italic">{playlist.name}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-4 px-4 flex flex-col gap-4">
              <Image
                alt={playlist.name}
                className="object-cover rounded-xl group-hover:opacity-80 transition-opacity w-full aspect-square"
                src={playlist.imageUrl}
                width={400}
              />
              <p className="text-[#A8A9AD] text-xs font-mono min-h-[36px]">{playlist.description}</p>
              <Button
                className="w-full font-bold italic uppercase tracking-wider bg-[#FF1801] text-white shadow-lg hover:bg-red-600"
                onPress={() => window.open(playlist.spotifyUrl, '_blank', 'noopener,noreferrer')}
              >
                Listen on Spotify
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Playlists;
