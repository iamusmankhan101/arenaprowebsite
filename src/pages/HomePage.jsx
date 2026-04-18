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
    },
    {
        path: '/padel-court-lahore',
        anchor: 'Find padel courts near you',
        emoji: '🎾',
        label: 'Padel',
        desc: 'International-standard padel clubs across Lahore',
    },
    {
        path: '/indoor-cricket-lahore',
        anchor: 'Reserve indoor cricket venues',
        emoji: '🏏',
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
            <Hero />
            <Features />

            {/* Tier 1 — In-body sport links (SEO silo entry points) */}
            <section className="homepage-sports-section">
                <div className="homepage-sports-inner">
                    <h2 className="homepage-sports-title">Explore Sports in Lahore</h2>
                    <p className="homepage-sports-sub">
                        Arena Pro covers the top sports venues across the city. Pick your sport and book instantly.
                    </p>
                    <div className="homepage-sports-grid">
                        {SPORT_LINKS.map(sport => (
                            <Link key={sport.path} to={sport.path} className="homepage-sport-card">
                                <span className="homepage-sport-emoji">{sport.emoji}</span>
                                <h3 className="homepage-sport-label">{sport.label}</h3>
                                <p className="homepage-sport-desc">{sport.desc}</p>
                                <span className="homepage-sport-anchor">{sport.anchor} →</span>
                            </Link>
                        ))}
                    </div>
                    <div className="homepage-sports-footer-links">
                        <Link to="/venues" className="homepage-sport-util-link">Browse all sports venues →</Link>
                        <Link to="/how-it-works" className="homepage-sport-util-link">See how Arena Pro works →</Link>
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
