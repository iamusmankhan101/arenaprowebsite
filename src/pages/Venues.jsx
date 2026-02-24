import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import './Venues.css';
import { Search, MapPin, Star, Clock, Trophy, Filter, X, LayoutGrid, Award, Disc, Target, ChevronLeft, ChevronRight } from 'lucide-react';

const mockVenues = [
    {
        id: 7,
        name: "Super Sixes",
        location: "Nasheman Iqbal Phase 1, Lahore",
        rating: 4.8,
        reviews: 156,
        price: "1700 Pkr/Hour",
        sports: ["Cricket", "Futsal"],
        images: ["/image/app ui arena pro/1.png"],
        tags: ["Indoor", "Net Practice", "Affordable"]
    },
    {
        id: 8,
        name: "Sports Pitch Arena",
        location: "Nasheman Iqbal Phase 1, Lahore",
        rating: 4.9,
        reviews: 84,
        price: "1700 Pkr/Hour",
        sports: ["Cricket", "Futsal"],
        images: [
            "/image/sports pitch arena 1.png",
            "/image/sports pitch arena.png"
        ],
        tags: ["Premium", "Indoor", "Professional"]
    }
];

const VenueImageSlider = ({ images, venueName, sports }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="venue-image-slider">
            <div className="slider-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((img, idx) => (
                    <img key={idx} src={img} alt={`${venueName} ${idx + 1}`} className="slider-image" />
                ))}
            </div>

            {images.length > 1 && (
                <>
                    <button className="slider-nav prev" onClick={goToPrev} aria-label="Previous image">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="slider-nav next" onClick={goToNext} aria-label="Next image">
                        <ChevronRight size={20} />
                    </button>
                    <div className="slider-indicators">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(idx);
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
            <div className="venue-sport-tag">
                {sports.join(' / ')}
            </div>
        </div>
    );
};

const Venues = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSport, setActiveSport] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const sports = [
        { name: 'All', icon: <LayoutGrid size={18} /> },
        { name: 'Cricket', icon: <Target size={18} /> },
        { name: 'Futsal', icon: <Award size={18} /> },
        { name: 'Padel', icon: <Disc size={18} /> },
        { name: 'Tennis', icon: <Trophy size={18} /> }
    ];

    const filteredVenues = useMemo(() => {
        return mockVenues.filter(venue => {
            const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                venue.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSport = activeSport === 'All' || venue.sports.includes(activeSport);
            return matchesSearch && matchesSport;
        });
    }, [searchTerm, activeSport]);

    return (
        <div className="venues-page">
            <Navbar />

            {/* Page Hero */}
            <section className="venues-hero">
                <div className="venues-hero-content">
                    <h1 className="venues-h1">Find Your Perfect <span className="highlight">Arena</span></h1>
                    <p className="venues-p">Book premium padel courts, football turf, and best indoor cricket in Lahore with just a few taps.</p>

                    <div className="search-container">
                        <div className="search-wrapper">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search by venue name or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <main className="venues-container">
                {/* Filter Sidebar Desktop / Overlay Mobile */}
                <div className={`filters-section ${isFilterOpen ? 'open' : ''}`}>
                    <div className="filters-header">
                        <h2>Explore Venues</h2>
                        <button className="mobile-close-filter" onClick={() => setIsFilterOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className="sports-pills">
                        {sports.map(sport => (
                            <button
                                key={sport.name}
                                className={`pill ${activeSport === sport.name ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveSport(sport.name);
                                    setIsFilterOpen(false);
                                }}
                            >
                                <span className="pill-icon">{sport.icon}</span>
                                <span className="pill-text">{sport.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="venues-grid-header">
                    <p className="results-count">Showing {filteredVenues.length} results</p>
                    <button className="mobile-filter-btn" onClick={() => setIsFilterOpen(true)}>
                        <Filter size={18} /> Filters
                    </button>
                </div>

                {/* Venue Grid */}
                {filteredVenues.length > 0 ? (
                    <div className="venues-grid">
                        {filteredVenues.map(venue => (
                            <div className="venue-card" key={venue.id}>
                                <div className="venue-image">
                                    <VenueImageSlider images={venue.images} venueName={venue.name} sports={venue.sports} />
                                </div>
                                <div className="venue-info">
                                    <div className="venue-header">
                                        <h3>{venue.name}</h3>
                                        <div className="venue-rating">
                                            <Star size={14} fill="#e8ee26" color="#e8ee26" />
                                            <span>{venue.rating}</span>
                                        </div>
                                    </div>
                                    <div className="venue-loc">
                                        <MapPin size={14} />
                                        <span>{venue.location}</span>
                                    </div>
                                    <div className="venue-tags">
                                        {venue.tags.map(tag => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="venue-footer">
                                        <div className="venue-price">{venue.price}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <h3>No venues found</h3>
                        <p>Try adjusting your search or filters.</p>
                        <button className="reset-btn" onClick={() => { setSearchTerm(''); setActiveSport('All'); }}>Reset Filters</button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Venues;
