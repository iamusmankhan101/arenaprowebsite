import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Download, MapPin, Star, Calendar, Users, CreditCard, ChevronRight, Loader2 } from 'lucide-react';
import './IndoorCricketLahore.css'; // Reusing styles for consistency
import { venueService } from '../services/venueService';

const FutsalGroundLahore = () => {
    const [liveVenues, setLiveVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // SEO Metadata Update
        document.title = "Futsal Ground Booking in Lahore | Football Turf | Arena Pro";
        const metaDescription = document.querySelector('meta[name="description"]');
        const description = "Find and book the best futsal grounds and football turf in Lahore. Arena Pro offers instant booking for premium pitches in Johar Town, DHA, and Model Town. Join the waitlist today!";
        if (metaDescription) {
            metaDescription.setAttribute("content", description);
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = description;
            document.head.appendChild(meta);
        }

        window.scrollTo(0, 0);

        const fetchVenues = async () => {
            try {
                setLoading(true);
                const data = await venueService.getVenues();
                // Filter for Futsal
                const futsalVenues = data.filter(venue => 
                    venue.sports.includes('Futsal')
                );
                setLiveVenues(futsalVenues);
            } catch (error) {
                console.error("Failed to fetch venues:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, []);

    return (
        <div className="indoor-landing-page">
            <Navbar />

            {/* Hero Section */}
            <header className="indoor-hero futsal-hero">
                <div className="indoor-hero-content">
                    <h1>Top-Rated <span className="highlight">Futsal Ground Booking</span> in Lahore</h1>
                    <p>
                        Elevate your game on Lahore's finest football turf. Use Arena Pro to find and book 
                        <strong> premium futsal grounds</strong> instantly. No phone calls required - just tap and play.
                    </p>
                    <div className="cta-group">
                        <a href="/waitlist" className="cta-primary">
                            <Download size={20} /> Join Waitlist
                        </a>
                        <a href="/venues" className="cta-secondary">
                            View Football Turfs
                        </a>
                    </div>
                </div>
            </header>

            <main className="indoor-container">
                {/* Venues Grid */}
                <section className="section">
                    <h2 className="section-title">Best Futsal Grounds in Lahore</h2>
                    <p style={{ textAlign: 'center', marginBottom: '40px', color: '#64748b', maxWidth: '800px', margin: '0 auto 40px' }}>
                        Discover venues with international-grade synthetic turf, professional floodlights, 
                        and top-tier amenities for the ultimate football experience.
                    </p>
                    <div className="venues-grid">
                        {loading ? (
                            <div className="loading-state" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                                <Loader2 size={40} className="animate-spin" style={{ color: '#004d43', marginBottom: '16px' }} />
                                <p>Searching for futsal grounds...</p>
                            </div>
                        ) : liveVenues.length > 0 ? (
                            liveVenues.map(venue => (
                                <div className="venue-card" key={venue.id}>
                                    <div className="venue-image">
                                        <img src={venue.images[0]} alt={`${venue.name} futsal ground in ${venue.location}`} />
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
                            ))
                        ) : (
                            <div className="no-venues" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                                <p>No futsal grounds found at the moment. Please check back later!</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Why Futsal with Arena Pro */}
                <section className="section">
                    <h2 className="section-title">Why Book Futsal with Arena Pro?</h2>
                    <div className="features-list">
                        <div className="feature-box">
                            <Calendar size={32} color="#004d43" style={{ marginBottom: '20px' }} />
                            <h4>Real-Time Scheduling</h4>
                            <p>See exactly when pitches are free and book your favorite slot in seconds. No more back-and-forth calls.</p>
                        </div>
                        <div className="feature-box">
                            <Users size={32} color="#004d43" style={{ marginBottom: '20px' }} />
                            <h4>Team Management</h4>
                            <p>Easily organize matches and invite your squad. Keep track of your weekly football sessions in one place.</p>
                        </div>
                        <div className="feature-box">
                            <CreditCard size={32} color="#004d43" style={{ marginBottom: '20px' }} />
                            <h4>Secure Booking</h4>
                            <p>Protect your booking with secure payments. Focus on the game while we handle the logistics.</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="section">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="faq-container">
                        <div className="faq-item">
                            <h3>What is the average cost of booking a futsal ground in Lahore?</h3>
                            <p>Booking rates vary between Rs. 3,500 to Rs. 7,000 per hour depending on the location, time, and facilities provided.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Can I book a football turf for corporate events?</h3>
                            <p>Yes, Arena Pro supports bulk bookings and corporate event planning. Contact our team for custom tournament packages.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Are football shoes provided by the venues?</h3>
                            <p>Most venues provide basic bibs and balls, but players are expected to bring their own suitable turf shoes.</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default FutsalGroundLahore;
