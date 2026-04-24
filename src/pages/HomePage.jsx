import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import Steps from '../components/Steps';
import AppGallery from '../components/AppGallery';
import VendorSection from '../components/VendorSection';
import DownloadApp from '../components/DownloadApp';
import Footer from '../components/Footer';
import VenueCard from '../components/VenueCard';
import { venueService } from '../services/venueService';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        date: '',
        area: 'All areas',
        sport: 'All sports'
    });
    const [venues, setVenues] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(6); // Start at middle set
    const [loading, setLoading] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(true);

    useSEO(
        'Arena Pro - Book Futsal, Padel & Indoor Cricket Venues in Lahore',
        'Discover and book top sports venues with Arena Pro. Find a futsal court near me, padel courts near you, or indoor cricket in Lahore. Easy cricket grounds booking!',
        'https://arenapropk.online/'
    );

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const data = await venueService.getVenues();
                const venueData = data.slice(0, 6);
                // Duplicate venues for infinite scroll
                setVenues([...venueData, ...venueData, ...venueData]);
            } catch (error) {
                console.error("Failed to load venues:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, []);

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

    const nextSlide = () => {
        setIsTransitioning(true);
        setCurrentSlide((prev) => prev + 1);
    };

    const prevSlide = () => {
        setIsTransitioning(true);
        setCurrentSlide((prev) => prev - 1);
    };

    // Reset position when reaching cloned sections
    useEffect(() => {
        if (venues.length === 0) return;
        
        const originalLength = venues.length / 3;
        
        // When we reach the end of the second set, jump to the start of middle set
        if (currentSlide >= originalLength * 2) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentSlide(originalLength);
            }, 600);
            setTimeout(() => {
                setIsTransitioning(true);
            }, 650);
        } 
        // When we go before the first set, jump to the end of middle set
        else if (currentSlide < originalLength) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentSlide(originalLength * 2 - 1);
            }, 600);
            setTimeout(() => {
                setIsTransitioning(true);
            }, 650);
        }
    }, [currentSlide, venues.length]);
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
                                            type="date" 
                                            className="search-form-input" 
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

            {/* Our Venues Section */}
            <section className="our-venues-section">
                <div className="our-venues-container">
                    <div className="our-venues-header">
                        <div>
                            <h2 className="our-venues-title">Our Venues</h2>
                            <p className="our-venues-subtitle">Discover premium sports facilities across Lahore</p>
                        </div>
                        <div className="carousel-controls">
                            <button className="carousel-btn" onClick={prevSlide} aria-label="Previous">
                                <ChevronLeft size={24} />
                            </button>
                            <button className="carousel-btn" onClick={nextSlide} aria-label="Next">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="venues-loading">
                            <p>Loading venues...</p>
                        </div>
                    ) : venues.length > 0 ? (
                        <div className="venues-carousel">
                            <div 
                                className="venues-carousel-track"
                                style={{ 
                                    transform: `translateX(calc(-${currentSlide} * (33.333% + 8px)))`,
                                    transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
                                }}
                            >
                                {venues.map((venue, index) => (
                                    <div key={`${venue.id}-${index}`} className="venue-carousel-item">
                                        <VenueCard venue={venue} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="no-venues">
                            <p>No venues available at the moment.</p>
                        </div>
                    )}

                    <div className="our-venues-footer">
                        <Link to="/venues" className="view-all-btn">
                            View All Venues
                        </Link>
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
