import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Image, Button, Progress } from "@nextui-org/react";
import { motion } from 'framer-motion';
import './Playlists.css';

interface Playlist {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    spotifyUrl: string;
}

const Playlists: React.FC = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data for now, replace with actual API call if needed
        const mockPlaylists: Playlist[] = [
            {
                id: '1',
                name: '✈️',
                description: 'Smooth beats for the midnight oil.',
                imageUrl: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c1615eb5520ca10fd5998e95b',
                spotifyUrl: 'https://open.spotify.com/playlist/6MUTaOlTtOIvE4WQcCgIwR'
            },
            {
                id: '2',
                name: 'General Aux',
                description: 'Sing along and code wont break ;).',
                imageUrl: 'https://mosaic.scdn.co/300/ab67616d00001e0280c64a084164867806ea617aab67616d00001e028752a7355996e64709247c53ab67616d00001e02aab2c3c3f1f3207137d915c9ab67616d00001e02fec19a094239017e96276d3f',
                spotifyUrl: 'https://open.spotify.com/playlist/69wju7EwK6vJPsPXMWzr6P'
            },
            {
                id: '3',
                name: 'White Girl',
                description: 'White girl music special.',
                imageUrl: 'https://mosaic.scdn.co/300/ab67616d00001e021e9a057052d59004caf47e22ab67616d00001e0258b08d62231dfca8d358b876ab67616d00001e02613aaa3ae566d9f36008aed0ab67616d00001e02937af329667311f4b2831616',
                spotifyUrl: 'https://open.spotify.com/playlist/6FwEGL0JjR7ci3997Drfgl'
            }
        ];

        // Simulate API delay
        const timer = setTimeout(() => {
            setPlaylists(mockPlaylists);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[80vh] gap-8 w-full max-w-6xl mx-auto py-12"
        >
            <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full flex flex-col items-center gap-4 mb-8"
            >
                <h1 className="text-5xl font-black italic tracking-tighter text-white drop-shadow-lg text-center">
                    MY <span className="text-f1-red">PLAYLISTS</span>
                </h1>
                <div className="h-1 w-24 bg-f1-red"></div>
                <p className="text-xl text-f1-silver font-mono text-center max-w-2xl">
                    Curated collections for every mood. From coding sessions to late night drives.
                </p>
            </motion.div>

            {loading ? (
                <div className="w-full flex justify-center py-20">
                    <Progress 
                        size="lg" 
                        isIndeterminate 
                        color="danger" 
                        className="max-w-md" 
                        aria-label="Loading playlists..." 
                    />
                </div>
            ) : (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-4"
                >
                    {playlists.map((playlist) => (
                        <motion.div key={playlist.id} variants={itemVariants}>
                            <Card 
                                className="bg-f1-carbon/80 border border-f1-silver/20 backdrop-blur-md shadow-xl hover:scale-105 transition-transform duration-300 group"
                            >
                                <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
                                    <p className="text-tiny uppercase font-bold text-f1-red tracking-widest">Playlist</p>
                                    <h4 className="font-bold text-large text-white italic">{playlist.name}</h4>
                                </CardHeader>
                                <CardBody className="overflow-visible py-4 px-4 flex flex-col gap-4">
                                    <Image
                                        alt={playlist.name}
                                        className="object-cover rounded-xl group-hover:opacity-80 transition-opacity w-full aspect-square"
                                        src={playlist.imageUrl}
                                        width={400}
                                    />
                                    <p className="text-f1-silver text-sm font-mono min-h-[40px]">{playlist.description}</p>
                                    <Button 
                                        className="w-full font-bold italic uppercase tracking-wider bg-f1-red text-white shadow-lg hover:bg-red-600"
                                        onPress={() => window.open(playlist.spotifyUrl, '_blank')}
                                    >
                                        Listen on Spotify
                                    </Button>
                                </CardBody>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default Playlists;