import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
    Download, 
    MapPin, 
    Star, 
    ChevronRight, 
    Loader2, 
    Trophy, 
    Target, 
    Award, 
    Users, 
    Calendar, 
    CreditCard, 
    Zap 
} from 'lucide-react';
import './SportsVenueBooking.css';
import { venueService } from '../services/venueService';

const SportsVenueBooking = () => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        // SEO Metadata Update
        document.title = "Sports Venue Booking in Lahore | Book Padel, Cricket, Futsal | Arena Pro";
        const metaDescription = document.querySelector('meta[name="description"]');
        const content = "Looking for premium sports venue booking in Lahore? Use Arena Pro to instantly book padel courts, cricket grounds, and futsal turf. Real-time availability and best rates.";
        
        if (metaDescription) {
            metaDescription.setAttribute("content", content);
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = content;
            document.head.appendChild(meta);
        }

        window.scrollTo(0, 0);

        const fetchVenues = async () => {
            try {
                setLoading(true);
                const data = await venueService.getVenues();
                setVenues(data);
            } catch (error) {
                console.error("Failed to fetch venues:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, []);

    const filteredVenues = activeFilter === 'All' 
        ? venues 
        : venues.filter(v => v.sports.includes(activeFilter));

    const categories = [
        { name: 'All', icon: <Trophy size={18} /> },
        { name: 'Cricket', icon: <Target size={18} /> },
        { name: 'Futsal', icon: <Zap size={18} /> },
        { name: 'Padel', icon: <Award size={18} /> }
    ];

    return (
        <div className="sports-landing-page">
            <Navbar />

            {/* Premium Hero Section */}
            <header className="sports-hero">
                <div className="sports-hero-content">
                    <h1>Top-Rated <span className="highlight">Sports Venue Booking</span> in Lahore</h1>
                    <p>
                        Experience the ultimate thrill of sports. Use Arena Pro to find and book premium 
                        <strong> padel courts, cricket grounds, and football turf</strong> instantly. 
                        No phone calls required - just tap and play.
                    </p>
                    <div className="cta-group">
                        <a href="/waitlist" className="cta-primary">
                            <Download size={20} /> Download App to Book
                        </a>
                        <button 
                            className="cta-secondary"
                            onClick={() => document.getElementById('browse-venues').scrollIntoView({ behavior: 'smooth' })}
                        >
                            View All Arenas
                        </button>
                    </div>
                </div>
            </header>

            <main className="sports-container">
                {/* Category Selection */}
                <div className="category-bar">
                    {categories.map(cat => (
                        <button 
                            key={cat.name}
                            className={`cat-item ${activeFilter === cat.name ? 'active' : ''}`}
                            onClick={() => setActiveFilter(cat.name)}
                        >
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </div>

                {/* Venues Grid */}
                <section id="browse-venues" className="section">
                    <h2 className="section-title">Find the Best Sports Venues in Lahore Near You</h2>
                    <p style={{ textAlign: 'center', marginBottom: '40px', color: '#64748b', maxWidth: '800px', margin: '0 auto 40px' }}>
                        Discover premium facilities with professional lighting, international-grade turf quality, and 
                        vibrant environments designed for the ultimate sporting experience.
                    </p>
                    
                    {loading ? (
                        <div className="loading-state" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                            <Loader2 size={40} className="animate-spin" style={{ color: '#004d43', marginBottom: '16px' }} />
                            <p>Loading premium arenas...</p>
                        </div>
                    ) : filteredVenues.length > 0 ? (
                        <div className="venues-grid">
                            {filteredVenues.map(venue => (
                                <div className="venue-card" key={venue.id}>
                                    <div className="venue-image">
                                        <img src={venue.images[0]} alt={`${venue.name} sports facility in ${venue.location}`} />
                                    </div>
                                    <div className="venue-details">
                                        <h3>{venue.name}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.9rem', marginBottom: '12px' }}>
                                            <MapPin size={16} /> {venue.location}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0f172a', fontWeight: '700' }}>
                                            <Star size={16} fill="#e8ee26" color="#e8ee26" /> {venue.rating}
                                        </div>
                                        <div className="venue-meta">
                                            <span className="price">{venue.price}</span>
                                            <button 
                                                className="cta-primary" 
                                                style={{ padding: '10px 20px', fontSize: '0.9rem', borderRadius: '12px' }}
                                                onClick={() => window.location.href = `/book/${venue.id}`}
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-venues" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', background: 'white', borderRadius: '30px' }}>
                            <p>No venues found for this category. Try exploring other sports!</p>
                        </div>
                    )}
                </section>

                {/* Why Choose Arena Pro (SEO Goldmine) */}
                <section className="section">
                    <h2 className="section-title">Why Book Your Arena with Arena Pro?</h2>
                    <div className="features-list">
                        <div className="feature-box">
                            <Calendar size={32} color="#004d43" style={{ marginBottom: '20px' }} />
                            <h4>Real-Time Availability</h4>
                            <p>Live calendar integration means no more double bookings or wasted trips. What you see is what you get.</p>
                        </div>
                        <div className="feature-box">
                            <Users size={32} color="#004d43" style={{ marginBottom: '20px' }} />
                            <h4>Challenge Mode</h4>
                            <p>Missing a player or want to take on a new team? Use Challenge Mode to find opponents for your next match.</p>
                        </div>
                        <div className="feature-box">
                            <CreditCard size={32} color="#004d43" style={{ marginBottom: '20px' }} />
                            <h4>Split Payments</h4>
                            <p>No more awkward cash collecting. Split the booking cost with your teammates directly through the app.</p>
                        </div>
                    </div>
                </section>

                {/* SEO Rich Content */}
                <section className="seo-rich-content">
                    <h2>The Best Sports Venue Booking Experience in Lahore</h2>
                    <p>
                        Arena Pro is revolutionizing how athletes interact with sports facilities. Our <strong>sports venue booking</strong> 
                        service provides a seamless bridge between you and the best arenas in the city. Whether you're looking for an 
                        air-conditioned <strong>indoor cricket ground</strong>, a professional <strong>futsal turf</strong>, or a 
                        premium <strong>padel court</strong>, we have you covered.
                    </p>
                    <p>
                        Our partner venues are carefully vetted for quality, lighting, and amenities. We understand that sports are more 
                        than just a hobby; they're a passion. That's why we've built a platform that respects your time and energy. 
                        Forget the hassle of manual <strong>ground booking</strong> and embrace the future of sports with Arena Pro.
                    </p>
                </section>

                {/* FAQ Section */}
                <section className="section">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="faq-container">
                        <div className="faq-item">
                            <h3>How do I make a sports venue booking on Arena Pro?</h3>
                            <p>Simply select your sport, browse available venues, pick a time slot that suits you, and confirm your booking. It's that easy!</p>
                        </div>
                        <div className="faq-item">
                            <h3>Can I book a cricket ground or futsal court for tournaments?</h3>
                            <p>Yes! Arena Pro features a vendor panel that allows for bulk bookings and corporate tournament management. Contact our support for specialized event assistance.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Do the venues provide sports equipment?</h3>
                            <p>Most venues provide basic equipment like balls and bibs. Specialized gear like padel rackets or cricket bats are often available for rent at the facility.</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SportsVenueBooking;
