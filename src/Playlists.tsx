import React, { useState, useEffect } from 'react';
import './Playlists.css';

const Playlists: React.FC = () => {
    const [isIframe1Loaded, setIframe1Loaded] = useState(false);
    const [isIframe2Loaded, setIframe2Loaded] = useState(false);

    useEffect(() => {
        document.title = 'Dimitri | Playlists';
    }, []);

    return (
        <div className="container">
            <h1>My Spotify Playlists</h1>
            <div className="iframe-container">
                {!isIframe1Loaded &&
                    <div className="loading-bar-container">
                        <div className="loading-bar"></div>
                    </div>}
                <iframe
                    className={`${isIframe1Loaded ? 'loaded' : ''}`}
                    style={{ borderRadius: "12px" }}
                    src="https://open.spotify.com/embed/playlist/6MUTaOlTtOIvE4WQcCgIwR?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    onLoad={() => setIframe1Loaded(true)}
                ></iframe>
            </div>
            <div className="iframe-container">
                {!isIframe2Loaded &&
                    <div className="loading-bar-container">
                        <div className="loading-bar"></div>
                    </div>}
                <iframe
                    className={`${isIframe2Loaded ? 'loaded' : ''}`}
                    style={{ borderRadius: "12px", marginTop: "20px" }}
                    src="https://open.spotify.com/embed/playlist/2pExaETorHp2zwAW3L8yrl?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    onLoad={() => setIframe2Loaded(true)}
                ></iframe>
            </div>
        </div>
    );
};

export default Playlists;