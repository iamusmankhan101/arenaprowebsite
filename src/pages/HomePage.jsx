import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import Steps from '../components/Steps';
import AppGallery from '../components/AppGallery';
import VendorSection from '../components/VendorSection';
import DownloadApp from '../components/DownloadApp';
import Footer from '../components/Footer';
import useSEO from '../hooks/useSEO';
import './HomePage.css';

const SPORT_LINKS = [
    {
        path: '/futsal-ground-lahore',
        anchor: 'Book futsal grounds in Lahore',
        svgIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 12l3.5-2m-3.5 2v4.5m0-4.5l-3.5-2"></path>
                <path d="M15.5 10l2.5 1.5m-11.5-1.5L4 11.5"></path>
                <path d="M12 16.5L10 21m2-4.5l2 4.5"></path>
            </svg>
        ),
        label: 'Futsal',
        desc: 'Premium football turf in Johar Town, DHA & Model Town',
    },
    {
        path: '/padel-court-lahore',
        anchor: 'Find padel courts near you',
        svgIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M18.36 5.64a9 9 0 1 0-12.72 12.72"></path>
                <path d="M15.54 8.46a5 5 0 1 0-7.07 7.08"></path>
            </svg>
        ),
        label: 'Padel',
        desc: 'International-standard padel clubs across Lahore',
    },
    {
        path: '/indoor-cricket-lahore',
        anchor: 'Reserve indoor cricket venues',
        svgIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 4l6 6-9 9-6-6 9-9z"></path>
                <path d="M4 20l5-5"></path>
                <circle cx="17" cy="17" r="2"></circle>
            </svg>
        ),
        label: 'Indoor Cricket',
        desc: 'Air-conditioned cricket arenas with professional pitches',
    },
];

function HomePage() {
    useSEO(
        'Arena Pro - Book Futsal, Padel & Indoor Cricket Venues in Lahore',
        'Discover and book top sports venues with Arena Pro. Find a futsal court near me, padel courts near you, or indoor cricket in Lahore. Easy cricket grounds booking!',
        'https://arenapropk.online/'
    );

    return (
        <div className="home-page">
            <Navbar />
            
            {/* Hero Section - Book Your Game */}
            <section className="homepage-sports-section">
                <div className="homepage-sports-inner">
                    <div className="homepage-sports-left">
                        <span className="homepage-sports-eyebrow">Pakistan · Padel & Cricket</span>
                        <h1 className="homepage-sports-title">
                            Book Your Game<br />
                            <span className="highlight">In Seconds</span>
                        </h1>
                        <p className="homepage-sports-sub">
                            Search by city and date, explore top sports, then lock a slot and finish on WhatsApp with the venue — fast, clear, no guesswork.
                        </p>
                    </div>

                    <div className="homepage-sports-right">
                        <h3 className="homepage-sports-card-title">Plan Your Game</h3>
                        
                        {/* Search Form */}
                        <div className="homepage-search-form">
                            <div className="search-form-row">
                                <div className="search-form-field">
                                    <label className="search-form-label">When</label>
                                    <div className="search-form-input-wrapper">
                                        <input 
                                            type="text" 
                                            className="search-form-input" 
                                            placeholder="23/04/2026"
                                            readOnly
                                        />
                                        <svg className="search-form-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                    </div>
                                </div>
                                <div className="search-form-field">
                                    <label className="search-form-label">Where</label>
                                    <div className="search-form-input-wrapper">
                                        <select className="search-form-select">
                                            <option>All cities</option>
                                            <option>Lahore</option>
                                            <option>Karachi</option>
                                            <option>Islamabad</option>
                                        </select>
                                        <svg className="search-form-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="search-form-field">
                                <label className="search-form-label">Sport</label>
                                <div className="search-form-input-wrapper">
                                    <select className="search-form-select">
                                        <option>All sports</option>
                                        <option>Futsal</option>
                                        <option>Padel</option>
                                        <option>Indoor Cricket</option>
                                    </select>
                                    <svg className="search-form-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>

                            <Link to="/venues" className="search-form-button">
                                SEARCH VENUES
                            </Link>

                            <p className="search-form-hint">
                                Choose a venue next — you'll pick your session length and exact start time on the booking screen.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Features />

            <Steps />
            <AppGallery />
            <VendorSection />
            <DownloadApp />
            <Footer />
        </div>
    );
}

export default HomePage;
