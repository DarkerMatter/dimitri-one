import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './app.css'; // Ensure the updated styles are imported

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Simulate loading for a couple of seconds
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    if (loading) {
        return <div className="spinner"></div>;
    }

    return (
        <div>
            {/* Navigation Buttons */}
            <div className="nav-buttons">
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/playlists')}>Playlists</button>
            </div>

            {/* About Me Section */}
            <div className="home-container">
                <h1>About Me</h1>
                <p>
                    I am a <span className="yellow">18</span> year old, <span className="orange">JS</span> web developer in the US Navy,
                    with initials that placed me in tech from day 1 (<span className="red">DNS</span>).
                    <br /><br />
                    I enjoy being challenged and engaging with projects that require me to work outside my comfort and knowledge set.
                    <br /><br />
                    I also host Minecraft servers for people and a handful of <span className="cyan">Discord</span> bots.
                </p>
            </div>
        </div>
    );
};

export default Home;