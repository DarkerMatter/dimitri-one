// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import HomePage from './pages/Home';

const NotFound: React.FC = () => {
  useEffect(() => { window.location.href = 'https://dimitri.one'; }, []);
  return null;
};

const PlaylistsRedirect: React.FC = () => {
  useEffect(() => { window.location.replace('/#playlists'); }, []);
  return null;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <NextUIProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/playlists" element={<PlaylistsRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </AnimatePresence>
    </NextUIProvider>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
