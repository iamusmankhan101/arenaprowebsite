import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Venues.css';
import { Search, MapPin, Star, Clock, Trophy, Filter, X, LayoutGrid, Award, Disc, Target, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { venueService } from '../services/venueService';
import VenueCard from '../components/VenueCard';
import useSEO from '../hooks/useSEO';

// Local VenueImageSlider removed in favor of VenueCard component

const Venues = () => {
    const [searchParams] = useSearchParams();
    
    useSEO(
        'Sports Venues in Lahore | Book Futsal, Cricket & Padel Courts',
        'Find the best sports venues across Lahore. Browse and book premium padel courts, futsal grounds, and indoor cricket facilities with Arena Pro.',
        'https://arenapropk.online/venues'
    );

    const [searchTerm, setSearchTerm] = useState('');
    const [activeSport, setActiveSport] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    // Apply URL parameters on mount
    useEffect(() => {
        const sportParam = searchParams.get('sport');
        const locationParam = searchParams.get('location');
        
        if (sportParam) {
            setActiveSport(sportParam);
        }
        
        if (locationParam) {
            setSearchTerm(locationParam);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const data = await venueService.getVenues();
                setVenues(data);
            } catch (error) {
                console.error("Failed to load venues:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, []);

    const sports = [
        { name: 'All', icon: <LayoutGrid size={18} /> },
        { name: 'Cricket', icon: <Target size={18} /> },
        { name: 'Futsal', icon: <Award size={18} /> },
        { name: 'Padel', icon: <Disc size={18} /> },
        { name: 'Tennis', icon: <Trophy size={18} /> }
    ];

    const filteredVenues = useMemo(() => {
        return venues.filter(venue => {
            const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                venue.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSport = activeSport === 'All' || venue.sports.includes(activeSport);
            return matchesSearch && matchesSport;
        });
    }, [searchTerm, activeSport, venues]);

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
                {loading ? (
                    <div className="loading-container">
                        <Loader2 className="animate-spin" size={48} />
                        <p>Loading arenas...</p>
                    </div>
                ) : filteredVenues.length > 0 ? (
                    <div className="venues-grid">
                        {filteredVenues.map(venue => (
                            <VenueCard key={venue.id} venue={venue} />
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

            <Footer />
        </div>
    );
};

export default Venues;
