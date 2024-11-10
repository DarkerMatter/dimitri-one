// src/main.tsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Playlists from './Playlists.tsx';

const RedirectToDomain: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        window.location.href = 'https://dimitrishepherd.com';
    }, [navigate]);
    return null;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<RedirectToDomain />} />
                <Route path="/playlists" element={<Playlists />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
