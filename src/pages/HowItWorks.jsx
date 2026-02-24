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

                    {/* Central App Visual */}
                    <div className="hiw-main-visual">
                        <img
                            src="/image/Whisk_d46323c90133a6db64e49b2ab1bf60f9dr.jpeg"
                            alt="Arena Pro Platform Overview"
                            className="hiw-hero-img"
                        />
                    </div>

                    {/* Floating Dashboard Cards Snippets */}
                    <div className="hiw-floating-cards">
                        <div className="hiw-card hiw-card-left">
                            <div className="hiw-card-header">
                                <span className="hiw-card-label">BOOKINGS</span>
                                <span className="hiw-card-value">1.2k+</span>
                            </div>
                            <div className="hiw-card-graph"></div>
                        </div>
                        <div className="hiw-card hiw-card-right">
                            <div className="hiw-card-header">
                                <span className="hiw-card-label">REVENUE</span>
                                <span className="hiw-card-value">Rs. 450k</span>
                            </div>
                            <div className="hiw-card-graph secondary"></div>
                        </div>
                    </div>

                    {/* Main Features Grid Consolidation */}
                    <div className="hiw-grid">
                        <div className="hiw-feature-card">
                            <div className="hiw-icon">🔍</div>
                            <h3>Find Venue</h3>
                            <p>Discover top-rated cricket grounds, futsal courts, and padel arenas near you instantly.</p>
                            <a href="#" className="hiw-learn-more">Learn more →</a>
                        </div>
                        <div className="hiw-feature-card">
                            <div className="hiw-icon">📅</div>
                            <h3>Instant Booking</h3>
                            <p>Book your preferred slot in seconds with our real-time availability tracking system.</p>
                            <a href="#" className="hiw-learn-more">Learn more →</a>
                        </div>
                        <div className="hiw-feature-card">
                            <div className="hiw-icon">🤝</div>
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
