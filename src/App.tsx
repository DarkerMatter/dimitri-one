import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Playlists from './Playlists.tsx';

const usePageTitle = (title: string) => {
    useEffect(() => {
        document.title = `Dimitri | ${title}`;
    }, [title]);
};

const PlaylistsPage: React.FC = () => {
    usePageTitle('Playlists');
    return <Playlists />;
};

const HomePage: React.FC = () => {
    usePageTitle('Home');
    return <div>Home Content</div>;
};

const NotFound: React.FC = () => {
    useEffect(() => {
        window.location.href = 'https://dimitrishepherd.com';
    }, []);
    return null;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/playlists" element={<PlaylistsPage />} />
                {/* Catch-all route for 404 pages */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;