import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, CardHeader, Divider, Button, Progress } from "@nextui-org/react";
import { motion } from "framer-motion";
import './App.css';

const Home: React.FC = () => {
    const [visitCount, setVisitCount] = useState<number | null>(null);
    const [loadingVisits, setLoadingVisits] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const increaseVisitCounter = async () => {
            try {
                const response = await axios.post(
                    'https://api.dimitri.one/v1/counter/increase',
                    {},
                    {
                        headers: {
                            Accept: 'application/json',
                        },
                    }
                );
                const { success, newCount } = response.data;
                if (success && typeof newCount === 'number') {
                    setVisitCount(newCount);
                } else {
                    setVisitCount(null);
                }
            } catch (error) {
                console.error('Error during API request:', error);
                setVisitCount(null);
            } finally {
                setLoadingVisits(false);
            }
        };
        increaseVisitCounter();
    }, []);

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 }
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5
    };

    return (
        <motion.div 
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="flex flex-col items-center justify-center min-h-[80vh] gap-12"
        >
            {/* Hero Section */}
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12">
                <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex-1 space-y-6"
                >
                    <h1 className="text-6xl font-black italic tracking-tighter text-white drop-shadow-lg">
                        DIMITRI<span className="text-f1-red"> SHEPHERD</span>
                    </h1>
                    <div className="h-1 w-24 bg-f1-red"></div>
                    <div className="text-xl text-f1-silver font-mono leading-relaxed space-y-4">
                        <p>
                            I am a <span className="text-yellow-400 font-bold">19</span> year old, <span className="text-orange-500 font-bold">Full Stack</span> web developer in the US Navy.
                        </p>
                        <p>
                            With initials that placed me in tech from day 1 (<span className="text-f1-red font-bold">DNS</span>), I enjoy being challenged and engaging with projects that require me to work outside my comfort zone.
                        </p>
                        <p>
                            I also host Minecraft servers and maintain a handful of <span className="text-cyan-400 font-bold">Discord</span> bots.
                        </p>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button 
                            color="danger" 
                            variant="shadow" 
                            size="lg" 
                            className="font-bold italic uppercase tracking-wider"
                            onPress={() => navigate('/playlists')}
                        >
                            View Playlists
                        </Button>
                        <Button 
                            variant="bordered" 
                            color="default" 
                            size="lg" 
                            className="font-bold italic uppercase tracking-wider text-white border-white/30 hover:border-white"
                            onPress={() => window.open('https://github.com/DarkerMatter', '_blank')}
                        >
                            GitHub
                        </Button>
                        <Button
                            variant="bordered"
                            color="warning"
                            size="lg"
                            className="font-bold italic uppercase tracking-wider text-white border-white/30 hover:border-white"
                            onPress={() => window.open('https://fts.gg', '_blank')}
                        >
                            FTS
                        </Button>
                    </div>
                </motion.div>

                {/* Stats Card */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                >
                    <Card className="w-full max-w-sm bg-f1-carbon/80 border border-f1-silver/20 backdrop-blur-md shadow-2xl">
                        <CardHeader className="flex gap-3 px-6 pt-6">
                            <div className="flex flex-col">
                                <p className="text-md text-f1-red font-bold uppercase tracking-widest">Dimitri Shepherd</p>
                                <p className="text-small text-default-500">Current Session Data</p>
                            </div>
                        </CardHeader>
                        <Divider className="bg-f1-silver/20"/>
                        <CardBody className="px-6 py-8 gap-6">
                            <div className="flex justify-between items-center">
                                <span className="text-f1-silver font-mono text-sm">VISITORS</span>
                                {loadingVisits ? (
                                    <Progress size="sm" isIndeterminate color="danger" className="max-w-[100px]" aria-label="Loading..." />
                                ) : (
                                    <span className="text-2xl font-bold text-white font-mono">{visitCount?.toLocaleString() || '---'}</span>
                                )}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-f1-silver font-mono text-sm">STATUS</span>
                                <span className="text-green-500 font-bold text-sm animate-pulse">● ACTIVE</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-f1-silver font-mono text-sm">ROLE</span>
                                <span className="text-white font-bold text-sm">DEV / USN</span>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Home;