import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Download, MapPin, Star, Calendar, Users, CreditCard, ChevronRight, Loader2 } from 'lucide-react';
import './IndoorCricketLahore.css'; // Reusing styles for consistency
import { venueService } from '../services/venueService';
import VenueCard from '../components/VenueCard';

const BadmintonBookingLahore = () => {
    const [liveVenues, setLiveVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // SEO Metadata Update
        document.title = "Badminton Court Booking in Lahore | Indoor Badminton | Arena Pro";
        const metaDescription = document.querySelector('meta[name="description"]');
        const description = "Book premium indoor badminton courts in Lahore instantly. Find top-rated facilities with professional lighting and high-quality flooring. Join the Arena Pro waitlist for exclusive access!";
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
                // Filter for Badminton
                const badmintonVenues = data.filter(venue => 
                    venue.sports.includes('Badminton')
                );
                setLiveVenues(badmintonVenues);
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
            <header className="indoor-hero badminton-hero">
                <div className="indoor-hero-content">
                    <h1>Reliable <span className="highlight">Badminton Court Booking</span> in Lahore</h1>
                    <p>
                        Elevate your game on professional indoor courts. Use Arena Pro to find and book 
                        <strong> premium badminton facilities</strong> in Lahore. 
                        No phone calls required - just tap and play.
                    </p>
                    <div className="cta-group">
                        <a href="/waitlist" className="cta-primary">
                            <Download size={20} /> Join Waitlist
                        </a>
                        <a href="/venues" className="cta-secondary">
                            View All Courts
                        </a>
                    </div>
                </div>
            </header>

            <main className="indoor-container">
                {/* Venues Grid */}
                <section className="section">
                    <h2 className="section-title">Best Indoor Badminton Courts in Lahore</h2>
                    <p style={{ textAlign: 'center', marginBottom: '40px', color: '#64748b', maxWidth: '800px', margin: '0 auto 40px' }}>
                        Discover top-rated badminton courts with professional PVC flooring, 
                        anti-glare lighting, and high-clearance ceilings.
                    </p>
                    <div className="venues-grid">
                        {loading ? (
                            <div className="loading-state" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                                <Loader2 size={40} className="animate-spin" style={{ color: '#004d43', marginBottom: '16px' }} />
                                <p>Finding badminton courts...</p>
                            </div>
                        ) : liveVenues.length > 0 ? (
                            liveVenues.map(venue => (
                                <VenueCard key={venue.id} venue={venue} />
                            ))
                        ) : (
                            <div className="no-venues" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                                <p>No badminton venues found at the moment. Please check back later!</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Why Badminton with Arena Pro */}
                <section className="section">
                    <h2 className="section-title">Why Book Badminton with Arena Pro?</h2>
                    <div className="features-list">
                        <div className="feature-box">
                            <Calendar size={32} color="#004d43" style={{ marginBottom: '20px' }} />
                            <h4>Flexible Scheduling</h4>
                            <p>From early morning sessions to late-night matches, find a slot that fits your busy lifestyle.</p>
                        </div>
                        <div className="feature-box">
                            <Users size={32} color="#004d43" style={{ marginBottom: '20px' }} />
                            <h4>Community Vibes</h4>
                            <p>Join a community of badminton lovers. Organize friendly matches or participate in local club tournaments.</p>
                        </div>
                        <div className="feature-box">
                            <CreditCard size={32} color="#004d43" style={{ marginBottom: '20px' }} />
                            <h4>Honest Pricing</h4>
                            <p>No hidden fees. Book directly at venue rates and enjoy exclusive discounts through Arena Pro.</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="section">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="faq-container">
                        <div className="faq-item">
                            <h3>Are indoor badminton courts air-conditioned?</h3>
                            <p>Most premium venues in Lahore offer climate-controlled environments for a comfortable playing experience year-round.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Do I need to bring my own shuttlecocks?</h3>
                            <p>While many venues sell shuttlecocks, it's generally recommended to bring your own for consistent play.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Is coaching available at These venues?</h3>
                            <p>Many of our partner badminton clubs have resident coaches available for all skill levels. You can inquire directly through the app.</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default BadmintonBookingLahore;
