import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import Steps from '../components/Steps';
import AppGallery from '../components/AppGallery';
import VendorSection from '../components/VendorSection';
import DownloadApp from '../components/DownloadApp';
import Footer from '../components/Footer';
import useSEO from '../hooks/useSEO';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        date: '23/04/2026',
        area: 'All areas',
        sport: 'All sports'
    });

    useSEO(
        'Arena Pro - Book Futsal, Padel & Indoor Cricket Venues in Lahore',
        'Discover and book top sports venues with Arena Pro. Find a futsal court near me, padel courts near you, or indoor cricket in Lahore. Easy cricket grounds booking!',
        'https://arenapropk.online/'
    );

    const handleSearch = (e) => {
        e.preventDefault();
        
        // Build query parameters
        const params = new URLSearchParams();
        
        if (searchParams.area !== 'All areas') {
            params.append('location', searchParams.area);
        }
        
        if (searchParams.sport !== 'All sports') {
            params.append('sport', searchParams.sport);
        }
        
        if (searchParams.date) {
            params.append('date', searchParams.date);
        }
        
        // Navigate to venues page with query parameters
        navigate(`/venues?${params.toString()}`);
    };

    const handleInputChange = (field, value) => {
        setSearchParams(prev => ({
            ...prev,
            [field]: value
        }));
    };
    return (
        <div className="home-page">
            <Navbar />
            
            {/* Hero Section - Book Your Game */}
            <section className="homepage-sports-section">
                <div className="homepage-sports-inner">
                    <div className="homepage-sports-left">
                        <span className="homepage-sports-eyebrow">Arena Pro</span>
                        <h1 className="homepage-sports-title">
                            Find and Book the Best Cricket & Padel Venues in Lahore.
                        </h1>
                        <p className="homepage-sports-sub">
                            Searching for <strong>padel tennis near me</strong>? Stop searching for a football turf near me or the top padel courts. Arena Pro connects you with premium facilities instantly. Find everything from <Link to="/indoor-cricket-lahore" style={{ color: '#e8ee26', textDecoration: 'underline' }}>indoor cricket</Link> arena to the best padel tennis courts in lahore.
                        </p>
                    </div>

                    <div className="homepage-sports-right">
                        <h3 className="homepage-sports-card-title">Plan Your Game</h3>
                        
                        {/* Search Form */}
                        <form className="homepage-search-form" onSubmit={handleSearch}>
                            <div className="search-form-row">
                                <div className="search-form-field">
                                    <label className="search-form-label">When</label>
                                    <div className="search-form-input-wrapper">
                                        <input 
                                            type="text" 
                                            className="search-form-input" 
                                            placeholder="23/04/2026"
                                            value={searchParams.date}
                                            onChange={(e) => handleInputChange('date', e.target.value)}
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
                                        <select 
                                            className="search-form-select"
                                            value={searchParams.area}
                                            onChange={(e) => handleInputChange('area', e.target.value)}
                                        >
                                            <option>All areas</option>
                                            <option>Johar Town</option>
                                            <option>Model Town</option>
                                            <option>DHA</option>
                                            <option>Gulberg</option>
                                            <option>Bahria Town</option>
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
                                    <select 
                                        className="search-form-select"
                                        value={searchParams.sport}
                                        onChange={(e) => handleInputChange('sport', e.target.value)}
                                    >
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

                            <button type="submit" className="search-form-button">
                                SEARCH VENUES
                            </button>
                        </form>
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
