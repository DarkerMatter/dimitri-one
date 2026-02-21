import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NextUIProvider } from "@nextui-org/react";
import { AnimatePresence } from 'framer-motion';
import Playlists from './Playlists';
import HomePage from './Home.tsx';
import Preloader from './components/Preloader';

// Custom hook to set the page title
const usePageTitle = (title: string) => {
    useEffect(() => {
        document.title = `Dimitri | ${title}`;
    }, [title]);
};

// Playlists Page Component
const PlaylistsPage: React.FC = () => {
    usePageTitle('Playlists');
    return <Playlists />;
};

// Home Page Component
const HomeWrapper: React.FC = () => {
    usePageTitle('Home');
    return <HomePage />;
};

// Not Found Component (Redirect to external URL)
const NotFound: React.FC = () => {
    useEffect(() => {
        window.location.href = 'https://dimitri.one';
    }, []);
    return null;
};

// Layout Component for consistent styling
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-[#15151E] text-white">
            {/* F1 Style Header/Nav */}
            <nav className="w-full h-16 bg-[#1F1F1F] border-b-4 border-[#FF1801] flex items-center justify-between px-8 z-50 shadow-lg">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="text-2xl font-bold italic tracking-tighter text-white">
                        DIMITRI<span className="text-[#FF1801]">.ONE</span>
                    </div>
                    <div className="h-8 w-[1px] bg-[#A8A9AD]/30 mx-2"></div>
                    <div className="text-xs font-mono text-[#A8A9AD]">
                        EST. 2006 // USN - RW3
                    </div>
                </div>
                <div className="flex gap-6 font-bold italic">
                    <button onClick={() => navigate('/')} className={`hover:text-[#FF1801] transition-colors ${location.pathname === '/' ? 'text-[#FF1801]' : 'text-white'}`}>HOME</button>
                    <button onClick={() => navigate('/playlists')} className={`hover:text-[#FF1801] transition-colors ${location.pathname === '/playlists' ? 'text-[#FF1801]' : 'text-white'}`}>PLAYLISTS</button>
                </div>
            </nav>

            {/* Main Content Area with F1 Grid Background */}
            <main className="flex-grow relative z-10 container mx-auto px-4 py-8">
                {children}
            </main>

            {/* F1 Style Footer */}
            <footer className="w-full bg-[#1F1F1F] py-6 border-t border-[#A8A9AD]/20 mt-auto z-50">
                <div className="container mx-auto px-4 flex justify-between items-center text-[#A8A9AD] text-sm font-mono">
                    <div>© {new Date().getFullYear()} DIMITRI.ONE</div>
                    <div className="flex gap-4">
                        <span>STATUS: ONLINE</span>
                        <span>|</span>
                        <span>REGION: US-EAST</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Main App Component
const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    return (
        <NextUIProvider navigate={navigate}>
            <AnimatePresence mode="wait">
                {loading ? (
                    <Preloader key="preloader" onComplete={() => setLoading(false)} />
                ) : (
                    <Layout key="layout">
                        <Routes>
                            <Route path="/" element={<HomeWrapper />} />
                            <Route path="/playlists" element={<PlaylistsPage />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Layout>
                )}
            </AnimatePresence>
        </NextUIProvider>
    );
};

// Wrap App with Router here to provide context for useNavigate inside App
const AppWrapper: React.FC = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default AppWrapper;