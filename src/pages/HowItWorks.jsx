import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './HowItWorks.css';
import { Search, CalendarClock, Trophy, Download, UserPlus, Compass, MapPin, CheckCircle, Calendar } from 'lucide-react';

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
                                <Search size={32} color="#e8ee26" strokeWidth={2} />
                            </div>
                            <h3>Find Venue</h3>
                            <p>Discover top-rated cricket grounds, futsal courts, and padel arenas near you instantly.</p>

                        </div>
                        <div className="hiw-feature-card">
                            <div className="hiw-icon">
                                <CalendarClock size={32} color="#e8ee26" strokeWidth={2} />
                            </div>
                            <h3>Instant Booking</h3>
                            <p>Book your preferred slot in seconds with our real-time availability tracking system.</p>

                        </div>
                        <div className="hiw-feature-card">
                            <div className="hiw-icon">
                                <Trophy size={32} color="#e8ee26" strokeWidth={2} />
                            </div>
                            <h3>Challenge Mode</h3>
                            <p>Create challenges, find local squads, and level up your game with competitive matches.</p>

                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed 6-Step Process Section */}
            <section className="hiw-process-section">
                <div className="hiw-container">
                    <div className="hiw-process-header">
                        <span className="hiw-process-badge">STEP BY STEP GUIDE</span>
                        <h2 className="hiw-process-title">We Made Booking <span>Easier!</span></h2>
                        <p className="hiw-process-subtitle">Follow these simple steps to start your premium sports journey with Arena Pro.</p>
                    </div>

                    <div className="hiw-process-grid">
                        <div className="hiw-step-card">
                            <div className="hiw-step-number">01</div>
                            <div className="hiw-step-icon">
                                <Download size={32} />
                            </div>
                            <h3>Get the App</h3>
                            <p>Grab Arena Pro from your app store and put the ultimate sports booking app right in your pocket.</p>
                        </div>

                        <div className="hiw-step-card">
                            <div className="hiw-step-number">02</div>
                            <div className="hiw-step-icon">
                                <UserPlus size={32} />
                            </div>
                            <h3>Create an account</h3>
                            <p>Sign up in seconds to personalize your profile and easily manage your cricket grounds.</p>
                        </div>

                        <div className="hiw-step-card">
                            <div className="hiw-step-number">03</div>
                            <div className="hiw-step-icon">
                                <Compass size={32} />
                            </div>
                            <h3>Discover Arena Pro</h3>
                            <p>Unlock a new level of play. Find a football turf near me, book top padel courts in Lahore.</p>
                        </div>

                        <div className="hiw-step-card">
                            <div className="hiw-step-number">04</div>
                            <div className="hiw-step-icon">
                                <MapPin size={32} />
                            </div>
                            <h3>Find Venue</h3>
                            <p>Explore Lahore's best sports facilities filtering by sport, distance, and top-rated reviews.</p>
                        </div>

                        <div className="hiw-step-card">
                            <div className="hiw-step-number">05</div>
                            <div className="hiw-step-icon">
                                <Calendar size={32} />
                            </div>
                            <h3>Check Availability</h3>
                            <p>Instantly see real-time availability and select the slot that fits your schedule perfectly.</p>
                        </div>

                        <div className="hiw-step-card">
                            <div className="hiw-step-number">06</div>
                            <div className="hiw-step-icon">
                                <CheckCircle size={32} />
                            </div>
                            <h3>Booking Confirm</h3>
                            <p>Confirm your booking with secure payments and get instant confirmation for your game.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HowItWorks;
