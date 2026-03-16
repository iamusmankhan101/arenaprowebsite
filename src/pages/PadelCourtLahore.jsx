import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Download, MapPin, Star, Calendar, Users, CreditCard, ChevronRight, Loader2 } from 'lucide-react';
import './IndoorCricketLahore.css'; // Reusing styles for consistency
import { venueService } from '../services/venueService';

const PadelCourtLahore = () => {
    const [liveVenues, setLiveVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // SEO Metadata Update
        document.title = "Padel Court Booking in Lahore | Best Padel Clubs | Arena Pro";
        const metaDescription = document.querySelector('meta[name="description"]');
        const description = "Looking for the best padel courts in Lahore? Book premium padel clubs in Gulberg, DHA, and Model Town instantly through Arena Pro. Join the waitlist for exclusive access!";
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
                // Filter for Padel
                const padelVenues = data.filter(venue => 
                    venue.sports.includes('Padel')
                );
                setLiveVenues(padelVenues);
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
            <header className="indoor-hero padel-hero">
                <div className="indoor-hero-content">
                    <h1>Premium <span className="highlight">Padel Court Booking</span> in Lahore</h1>
                    <p>
                        Discover the fastest-growing sport in the world. Use Arena Pro to find and book 
                        <strong> professional padel courts</strong> in Lahore's top neighborhoods. 
                        No phone calls required - just tap and play.
                    </p>
                    <div className="cta-group">
                        <a href="/waitlist" className="cta-primary">
                            <Download size={20} /> Join Waitlist
                        </a>
                        <a href="/venues" className="cta-secondary">
                            View All Padel Clubs
                        </a>
                    </div>
                </div>
            </header>

            <main className="indoor-container">
                {/* Venues Grid */}
                <section className="section">
                    <h2 className="section-title">Top-Rated Padel Clubs in Lahore</h2>
                    <p style={{ textAlign: 'center', marginBottom: '40px', color: '#64748b', maxWidth: '800px', margin: '0 auto 40px' }}>
                        Experience padel on international-standard courts with professional lighting, 
                        panoramic glass, and vibrant community vibes.
                    </p>
                    <div className="venues-grid">
                        {loading ? (
                            <div className="loading-state" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                                <Loader2 size={40} className="animate-spin" style={{ color: '#004d43', marginBottom: '16px' }} />
                                <p>Finding premium padel courts...</p>
                            </div>
                        ) : liveVenues.length > 0 ? (
                            liveVenues.map(venue => (
                                <div className="venue-card" key={venue.id}>
                                    <div className="venue-image">
                                        <img src={venue.images[0]} alt={`${venue.name} padel court in ${venue.location}`} />
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
                                <p>No padel venues found at the moment. Please check back later!</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Why Padel with Arena Pro */}
                <section className="section">
                    <h2 className="section-title">Why Book Padel with Arena Pro?</h2>
                    <div className="features-list">
                        <div className="feature-box">
                            <Calendar size={32} color="#004d43" style={{ marginBottom: '20px' }} />
                            <h4>Instant Confirmation</h4>
                            <p>Real-time booking means your court is reserved the moment you tap click. No waiting for callbacks.</p>
                        </div>
                        <div className="feature-box">
                            <Users size={32} color="#004d43" style={{ marginBottom: '20px' }} />
                            <h4>Find Partners</h4>
                            <p>New to the city or missing a player? Connect with other padel enthusiasts through our community features.</p>
                        </div>
                        <div className="feature-box">
                            <CreditCard size={32} color="#004d43" style={{ marginBottom: '20px' }} />
                            <h4>Seamless Payments</h4>
                            <p>Secure online payments and split-bill options make organizing your weekly padel match a breeze.</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="section">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="faq-container">
                        <div className="faq-item">
                            <h3>How do I find a padel court near me in Lahore?</h3>
                            <p>Arena Pro allows you to filter by location, including DHA, Gulberg, and Johar Town, to find the closest available padel court.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Do padel clubs provide rackets and balls?</h3>
                            <p>Yes, most premium padel clubs in Lahore offer racket rentals and sell professional balls at the venue.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Is padel suitable for beginners?</h3>
                            <p>Absolutely! Padel is one of the most accessible racket sports. Many venues also offer coaching sessions for newcomers.</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PadelCourtLahore;
