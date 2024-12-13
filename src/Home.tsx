import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './app.css';

const Home: React.FC = () => {
    const [visitCount, setVisitCount] = useState<number | null>(null);
    const [loadingVisits, setLoadingVisits] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        const increaseVisitCounter = async () => {
            try {
                // Send the POST request using Axios
                const response = await axios.post(
                    'https://api.dimitri.one/v1/counter/increase',
                    {}, // Empty body (API doesn't specify a payload)
                    {
                        headers: {
                            Accept: 'application/json', // API explicitly requires this
                        },
                    }
                );

                console.log('API Response:', response.data); // Handle success
                const { success, newCount } = response.data;

                if (success && typeof newCount === 'number') {
                    setVisitCount(newCount); // Update the visit count
                } else {
                    console.error('Unexpected API response format');
                    setVisitCount(null);
                }

            } catch (error) {
                // Handle and log error
                console.error('Error during API request:', error);
                setVisitCount(null);
            } finally {
                setLoadingVisits(false); // Turn off loading spinner
            }
        };

        increaseVisitCounter();
    }, []);

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

                {/* Display Total Visits */}
                <div>
                    <h2>Total Website Visits</h2>
                    {loadingVisits ? (
                        <p>Loading visits...</p>
                    ) : visitCount !== null ? (
                        <p>{visitCount}</p>
                    ) : (
                        <p>Error fetching visit count</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;