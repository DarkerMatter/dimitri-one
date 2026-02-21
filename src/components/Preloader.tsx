import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@nextui-org/react";

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [lights, setLights] = useState<number>(0);
    const [status, setStatus] = useState<'idle' | 'counting' | 'launched'>('idle');

    const handleStart = async () => {
        setStatus('counting');

        // Quick Countdown Sequence
        for (let i = 1; i <= 5; i++) {
            setLights(i);
            await new Promise(resolve => setTimeout(resolve, 400)); // Faster lights (0.4s each)
        }

        // Random pause for reaction time simulation (shortened)
        const randomDelay = Math.random() * 500 + 200; 
        await new Promise(resolve => setTimeout(resolve, randomDelay));

        // Lights out and launch!
        setLights(0);
        setStatus('launched');

        // Wait for car to exit screen before completing (synced with car duration)
        // Added 200ms lag here as requested
        await new Promise(resolve => setTimeout(resolve, 800));
        onComplete();
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#15151E] overflow-hidden"
            initial={{ clipPath: 'inset(0 0 0 0)' }}
            animate={status === 'launched' ? { clipPath: 'inset(0 0 0 100%)' } : { clipPath: 'inset(0 0 0 0)' }}
            transition={{ duration: 0.6, ease: "easeIn", delay: 0.2 }} // Added 200ms delay to reveal (0.1 -> 0.3)
            key="preloader"
        >
            {/* Starting Lights Container */}
            <div className="absolute top-1/4 flex gap-4 p-6 bg-black rounded-2xl border-b-4 border-gray-800 shadow-2xl z-20">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex flex-col gap-2 items-center">
                        {/* The Red Light */}
                        <div 
                            className={`w-12 h-12 rounded-full border-4 border-gray-900 transition-all duration-75 ${
                                lights >= i ? 'bg-[#FF1801] shadow-[0_0_30px_#FF1801]' : 'bg-[#3a0000]'
                            }`}
                        />
                        {/* The Lower Light */}
                        <div className="w-12 h-12 rounded-full border-4 border-gray-900 bg-[#1a1a1a]" />
                    </div>
                ))}
            </div>

            {/* Start Button */}
            <AnimatePresence>
                {status === 'idle' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                        className="absolute z-50"
                    >
                        <Button 
                            size="lg"
                            color="danger"
                            variant="shadow"
                            className="font-black italic text-2xl px-12 py-8 tracking-widest border-2 border-white/20"
                            onPress={handleStart}
                        >
                            START ENGINE
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Road Surface */}
            <div className="absolute bottom-0 w-full h-1/3 bg-[#1F1F1F] border-t-4 border-white/10 flex items-center justify-center overflow-hidden">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="h-full w-px bg-white transform skew-x-[-45deg]" />
                    ))}
                </div>
                
                {/* Starting Box */}
                <div className="absolute bottom-10 left-[10%] w-64 h-32 border-4 border-white/30 transform skew-x-[-45deg]" />
            </div>

            {/* F1 Car */}
            <motion.div
                className="absolute bottom-[15%] left-[10%] z-30"
                initial={{ x: 0 }}
                animate={status === 'launched' ? { x: '150vw' } : { x: 0 }}
                transition={{ 
                    duration: 0.8, // Much faster launch
                    ease: [0.5, 0, 0.75, 0] // Aggressive acceleration curve
                }}
            >
                <div className="relative">
                    {/* Engine Vibration */}
                    <motion.div
                        animate={status !== 'launched' ? { y: [-1, 1, -1] } : {}}
                        transition={{ repeat: Infinity, duration: 0.05 }}
                    >
                        <img 
                            src="/assets/f1.png" 
                            alt="F1 Car" 
                            className="w-96 h-auto drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Tire Smoke on Launch */}
                    <AnimatePresence>
                        {status === 'launched' && (
                            <>
                                <motion.div 
                                    className="absolute bottom-2 left-10 w-32 h-32 bg-gray-400/50 blur-2xl rounded-full"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: [0, 0.8, 0], scale: [1, 2, 3], x: -100 }}
                                    transition={{ duration: 0.5 }}
                                />
                                <motion.div 
                                    className="absolute bottom-2 left-20 w-40 h-40 bg-white/30 blur-2xl rounded-full"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: [0, 0.6, 0], scale: [1, 2.5, 3.5], x: -150 }}
                                    transition={{ duration: 0.6, delay: 0.05 }}
                                />
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Text Status */}
            <motion.div
                className="absolute bottom-10 text-f1-silver font-mono text-sm tracking-widest uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                {status === 'idle' ? "Awaiting Driver Input" : status === 'counting' ? "Race Start Sequence Initiated" : "GO GO GO!"}
            </motion.div>

        </motion.div>
    );
};

export default Preloader;