import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
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
        emoji: '⚽',
        label: 'Futsal',
        desc: 'Premium football turf in Johar Town, DHA & Model Town',
        color: 'rgba(16, 185, 129, 0.1)',
        iconColor: '#10b981'
    },
    {
        path: '/padel-court-lahore',
        anchor: 'Find padel courts near you',
        emoji: '🎾',
        label: 'Padel',
        desc: 'International-standard padel clubs across Lahore',
        color: 'rgba(163, 230, 53, 0.15)',
        iconColor: '#84cc16'
    },
    {
        path: '/indoor-cricket-lahore',
        anchor: 'Reserve indoor cricket venues',
        emoji: '🏏',
        label: 'Indoor Cricket',
        desc: 'Air-conditioned cricket arenas with professional pitches',
        color: 'rgba(245, 158, 11, 0.1)',
        iconColor: '#f59e0b'
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
            <Hero />
            <Features />

            {/* Tier 1 — In-body sport links (SEO silo entry points) */}
            <section className="homepage-sports-section">
                <div className="homepage-sports-inner">
                    <div className="homepage-sports-header">
                        <h2 className="homepage-sports-title">Explore Sports in Lahore</h2>
                        <p className="homepage-sports-sub">
                            Arena Pro covers the top sports venues across the city. Pick your sport and book instantly.
                        </p>
                    </div>
                    <div className="homepage-sports-grid">
                        {SPORT_LINKS.map(sport => (
                            <Link key={sport.path} to={sport.path} className="homepage-sport-card" style={{ '--hover-color': sport.iconColor, '--bg-color': sport.color }}>
                                <div className="homepage-sport-icon-wrapper">
                                    <div className="homepage-sport-emoji">{sport.emoji}</div>
                                </div>
                                <h3 className="homepage-sport-label">{sport.label}</h3>
                                <p className="homepage-sport-desc">{sport.desc}</p>
                                <span className="homepage-sport-anchor">
                                    {sport.anchor} 
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </span>
                            </Link>
                        ))}
                    </div>
                    <div className="homepage-sports-footer-links">
                        <Link to="/venues" className="homepage-sport-util-link">
                            Browse all sports venues
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </Link>
                        <Link to="/how-it-works" className="homepage-sport-util-link">
                            See how Arena Pro works
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </Link>
                    </div>
                </div>
            </section>

            <Steps />
            <AppGallery />
            <VendorSection />
            <DownloadApp />
            <Footer />
        </div>
    );
}

export default HomePage;
