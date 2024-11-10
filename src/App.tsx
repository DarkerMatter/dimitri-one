import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Playlists from './Playlists.tsx';

const usePageTitle = (title: string) => {
    React.useEffect(() => {
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

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/playlists" element={<PlaylistsPage />} />
            </Routes>
        </Router>
    );
};

export default App;