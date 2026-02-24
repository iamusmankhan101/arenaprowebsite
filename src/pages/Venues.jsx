import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import './Venues.css';
import { Search, MapPin, Star, Clock, Trophy, Filter, X } from 'lucide-react';

const mockVenues = [
    {
        id: 1,
        name: "Model Town Sports Club",
        location: "Model Town, Lahore",
        rating: 4.8,
        reviews: 124,
        price: "Rs. 3000/hr",
        sport: "Cricket",
        image: "/image/app ui arena pro/1.png",
        tags: ["Indoor", "Premium", "Coaching"]
    },
    {
        id: 2,
        name: "Johar Town Futsal Arena",
        location: "Johar Town, Lahore",
        rating: 4.6,
        reviews: 89,
        price: "Rs. 2500/hr",
        sport: "Football",
        image: "/image/app ui arena pro/2.png",
        tags: ["Floodlights", "Cafe", "Parking"]
    },
    {
        id: 3,
        name: "Gulberg Padel Courts",
        location: "Gulberg III, Lahore",
        rating: 4.9,
        reviews: 56,
        price: "Rs. 4000/hr",
        sport: "Padel",
        image: "/image/app ui arena pro/3.png",
        tags: ["New", "A/C Stand", "Pro Gear"]
    },
    {
        id: 4,
        name: "Defense Cricket Academy",
        location: "DHA Phase 5, Lahore",
        rating: 4.7,
        reviews: 210,
        price: "Rs. 3500/hr",
        sport: "Cricket",
        image: "/image/app ui arena pro/4.png",
        tags: ["Turf", "Analysis", "Members Only"]
    },
    {
        id: 5,
        name: "Elite Tennis Club",
        location: "Garden Town, Lahore",
        rating: 4.5,
        reviews: 45,
        price: "Rs. 2000/hr",
        sport: "Tennis",
        image: "/image/app ui arena pro/5.png",
        tags: ["Clay Court", "Shower", "Lockers"]
    },
    {
        id: 6,
        name: "Arena Pro Hub",
        location: "Cavalry Ground, Lahore",
        rating: 5.0,
        reviews: 320,
        price: "Rs. 5000/hr",
        sport: "Multi-sport",
        image: "/image/app ui arena pro/6.png",
        tags: ["Ultra Premium", "Steam Room", "Valet"]
    }
];

const Venues = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSport, setActiveSport] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const sports = ['All', 'Cricket', 'Football', 'Padel', 'Tennis'];

    const filteredVenues = useMemo(() => {
        return mockVenues.filter(venue => {
            const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                venue.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSport = activeSport === 'All' || venue.sport === activeSport;
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
                    <p className="venues-p">Book premium sports venues in Lahore with just a few taps.</p>

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
                        <h2>Explore Sports</h2>
                        <button className="mobile-close-filter" onClick={() => setIsFilterOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className="sports-pills">
                        {sports.map(sport => (
                            <button
                                key={sport}
                                className={`pill ${activeSport === sport ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveSport(sport);
                                    setIsFilterOpen(false);
                                }}
                            >
                                {sport}
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
                                    <img src={venue.image} alt={venue.name} />
                                    <div className="venue-sport-tag">{venue.sport}</div>
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
                                        <button className="book-btn">View Details</button>
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
