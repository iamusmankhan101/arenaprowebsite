import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <div className="how-it-works-page">
            <Navbar />

            {/* Dark Hero Section */}
            <section className="hiw-hero">
                <div className="hiw-container">
                    <span className="hiw-badge">YOUR NEW SPORTS HUB</span>
                    <h1 className="hiw-title">Let's Build Your<br /><span>Sports SUCCESS Story</span></h1>
                    <p className="hiw-subtitle">
                        Experience the ultimate venue booking platform designed to connect players
                        with the best sports facilities in Lahore.
                    </p>
                    <button className="hiw-cta">Get Started Now →</button>

                    {/* Floating Dashboard Cards Snippets */}


                    {/* Main Features Grid Consolidation */}
                    <div className="hiw-grid">
                        <div className="hiw-feature-card">
                            <div className="hiw-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#004d43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 21L16.65 16.65" stroke="#004d43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Find Venue</h3>
                            <p>Discover top-rated cricket grounds, futsal courts, and padel arenas near you instantly.</p>
                            <a href="#" className="hiw-learn-more">Learn more →</a>
                        </div>
                        <div className="hiw-feature-card">
                            <div className="hiw-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#004d43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 2V6" stroke="#004d43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 2V6" stroke="#004d43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 10H21" stroke="#004d43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Instant Booking</h3>
                            <p>Book your preferred slot in seconds with our real-time availability tracking system.</p>
                            <a href="#" className="hiw-learn-more">Learn more →</a>
                        </div>
                        <div className="hiw-feature-card">
                            <div className="hiw-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 3.2A9 9 0 1 0 20.8 14M18 5L12 11M12 5V11H18" stroke="#004d43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7 11L10 14L15 9" stroke="#004d43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Challenge Mode</h3>
                            <p>Create challenges, find local squads, and level up your game with competitive matches.</p>
                            <a href="#" className="hiw-learn-more">Learn more →</a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HowItWorks;
