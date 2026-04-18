import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import MoreSports from '../components/MoreSports';
import { Download, MapPin, Star, Calendar, Users, CreditCard, ChevronRight, Loader2 } from 'lucide-react';
import './IndoorCricketLahore.css'; // Reusing styles for consistency
import { venueService } from '../services/venueService';
import VenueCard from '../components/VenueCard';

const PadelCourtLahore = () => {
    const [liveVenues, setLiveVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // SEO Metadata Update
        document.title = "Book Padel Court Online Pakistan | Best Padel Clubs in Lahore | Arena Pro";
        const metaDescription = document.querySelector('meta[name="description"]');
        const description = "Looking to book padel court online Pakistan? Book premium padel clubs in Gulberg, DHA, and Model Town in Lahore instantly through Arena Pro.";
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
                    <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'Padel Courts', path: '/padel-court-lahore' }]} />
                    <h1>Premium <span className="highlight">Padel Court Booking</span> in Lahore</h1>
                    <p>
                        Discover the fastest-growing sport in the world. If you want to <strong>book padel court online Pakistan</strong>, use Arena Pro to find and reserve 
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
                                <VenueCard key={venue.id} venue={venue} />
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

                {/* Canonical signal to /padel-tennis-near-me */}
                <section className="section" style={{ textAlign: 'center', paddingTop: 0 }}>
                    <p style={{ color: '#64748b' }}>
                        Looking for courts by area?{' '}
                        <a href="/padel-tennis-near-me" style={{ color: '#004d43', fontWeight: 700 }}>
                            Find padel tennis near you →
                        </a>
                    </p>
                </section>

                <MoreSports currentSport="padel" />
            </main>

            <Footer />
        </div>
    );
};

export default PadelCourtLahore;
