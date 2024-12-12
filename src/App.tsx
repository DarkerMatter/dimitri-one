import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Playlists from './Playlists';
import HomePage from './Home.tsx'; // Renamed the "Home.tsx" component to "HomePage" for clarity.

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

// Main App Component
const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeWrapper />} /> {/* Render the home page */}
                <Route path="/playlists" element={<PlaylistsPage />} /> {/* Render the playlists page */}
                <Route path="*" element={<NotFound />} /> {/* Catch-all for undefined routes */}
            </Routes>
        </Router>
    );
};

export default App;