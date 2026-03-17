import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, MapPin, Star, Clock, Trophy, Filter, X, LayoutGrid, Award, Disc, Target, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import './AreaPage.css';
import { venueService } from '../services/venueService';
import VenueCard from '../components/VenueCard';

// Local VenueImageSlider removed in favor of VenueCard component

const AreaPage = ({ areaName, areaDescription }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSport, setActiveSport] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [liveVenues, setLiveVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAreaVenues = async () => {
            try {
                setLoading(true);
                const data = await venueService.getVenuesByArea(areaName);
                setLiveVenues(data);
            } catch (error) {
                console.error("Failed to load area venues:", error);
                setLiveVenues([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAreaVenues();
    }, [areaName]);

    const sports = [
        { name: 'All', icon: <LayoutGrid size={18} /> },
        { name: 'Cricket', icon: <Target size={18} /> },
        { name: 'Futsal', icon: <Award size={18} /> },
        { name: 'Padel', icon: <Disc size={18} /> },
        { name: 'Tennis', icon: <Trophy size={18} /> }
    ];

    const filteredVenues = useMemo(() => {
        return liveVenues.filter(venue => {
            const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                venue.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSport = activeSport === 'All' || venue.sports.includes(activeSport);
            return matchesSearch && matchesSport;
        });
    }, [searchTerm, activeSport, liveVenues]);

    return (
        <div className="area-page">
            <Navbar />

            <section className="area-hero">
                <div className="area-hero-content">
                    <h1>Sports Venues in <span className="highlight">{areaName}</span></h1>
                    <p>{areaDescription}</p>

                    <div className="search-container">
                        <div className="search-wrapper">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search venues..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <main className="area-container">
                <div className={`filters-section ${isFilterOpen ? 'open' : ''}`}>
                    <div className="filters-header">
                        <h2>Filter by Sport</h2>
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

                <div className="area-grid-header">
                    <p className="results-count">Showing {filteredVenues.length} venues in {areaName}</p>
                    <button className="mobile-filter-btn" onClick={() => setIsFilterOpen(true)}>
                        <Filter size={18} /> Filters
                    </button>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <Loader2 className="animate-spin" size={48} />
                        <p>Loading arenas in {areaName}...</p>
                    </div>
                ) : filteredVenues.length > 0 ? (
                    <div className="area-grid">
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

export default AreaPage;
