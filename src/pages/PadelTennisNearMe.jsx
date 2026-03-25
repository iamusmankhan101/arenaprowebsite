import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Download, MapPin, Star, Calendar, Users, CreditCard, ChevronRight, Loader2 } from 'lucide-react';
import './IndoorCricketLahore.css'; // Reusing styles for consistency
import { venueService } from '../services/venueService';
import VenueCard from '../components/VenueCard';

const PadelTennisNearMe = () => {
    const [liveVenues, setLiveVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // SEO Metadata Update
        document.title = "Padel Tennis Near Me | Best Padel Clubs in Lahore | Arena Pro";
        const metaDescription = document.querySelector('meta[name="description"]');
        const description = "Looking for padel tennis near me? Discover and book the best padel tennis courts in Lahore instantly. Join Arena Pro for premium padel club access in DHA, Gulberg, and more.";
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
                    <h1>Best <span className="highlight">Padel Tennis Near Me</span> in Lahore</h1>
                    <p>
                        Searching for <strong>padel tennis near me</strong>? Arena Pro is your ultimate destination to find and book 
                        top-tier padel courts in Lahore. Experience the thrill of padel at premium clubs with instant booking.
                    </p>
                    <div className="cta-group">
                        <a href="/waitlist" className="cta-primary">
                            <Download size={20} /> Join Waitlist
                        </a>
                        <a href="/venues" className="cta-secondary">
                            Explore Padel Courts
                        </a>
                    </div>
                </div>
            </header>

            <main className="indoor-container">
                {/* Venues Sneak Peek */}
                <section className="section">
                    <h2 className="section-title">Best Padel Tennis Near Me in Lahore</h2>
                    <p style={{ textAlign: 'center', marginBottom: '40px', color: '#64748b', maxWidth: '800px', margin: '0 auto 40px' }}>
                        Discover premium padel facilities with professional glass walls, international-standard turf, and floodlighting 
                        designed for the perfect match. Experience the best "padel tennis near me" with Arena Pro.
                    </p>
                    <div className="venues-grid">
                        {loading ? (
                            <div className="loading-state" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                                <Loader2 size={40} className="animate-spin" style={{ color: '#004d43', marginBottom: '16px' }} />
                                <p>Finding padel tennis courts near you...</p>
                            </div>
                        ) : liveVenues.length > 0 ? (
                            liveVenues.map(venue => (
                                <VenueCard key={venue.id} venue={venue} />
                            ))
                        ) : (
                            <div className="no-venues" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                                <p>No padel tennis venues found at the moment. Please check back later!</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Popular Areas Section */}
                <section className="areas-section">
                    <h2 className="section-title">Popular Areas for Padel Tennis Near Me</h2>
                    <div className="areas-grid">
                        <div className="area-item">
                            <div className="area-icon">
                                <MapPin size={24} />
                            </div>
                            <h3>Padel in Gulberg</h3>
                            <p>
                                Looking for <strong>padel tennis near me</strong> in Gulberg? Book the most popular clubs 
                                in the heart of Lahore instantly.
                            </p>
                            <a href="/venues" className="area-link">
                                Explore Gulberg <ChevronRight size={16} />
                            </a>
                        </div>
                        <div className="area-item">
                            <div className="area-icon">
                                <MapPin size={24} />
                            </div>
                            <h3>DHA Padel Clubs</h3>
                            <p>
                                From Phase 1 to Phase 8, find premium <strong>padel tennis near me</strong> in DHA. 
                                Secure your court at professional facilities.
                            </p>
                            <a href="/venues/dha" className="area-link">
                                Explore DHA <ChevronRight size={16} />
                            </a>
                        </div>
                        <div className="area-item">
                            <div className="area-icon">
                                <MapPin size={24} />
                            </div>
                            <h3>Model Town & Johar Town</h3>
                            <p>
                                Get the best rates for <strong>padel tennis near me</strong> in Model Town and Johar Town's 
                                top sports complexes.
                            </p>
                            <a href="/venues/model-town" className="area-link">
                                Explore Areas <ChevronRight size={16} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Why Arena Pro */}
                <section className="section bg-light">
                    <h2 className="section-title">Why Book Padel Tennis with Arena Pro?</h2>
                    <div className="features-list">
                        <div className="feature-box">
                            <Calendar size={32} color="#004d43" style={{ marginBottom: '20px' }} />
                            <h4>Instant Confirmation</h4>
                            <p>Real-time booking means your court is reserved the moment you click. No more waiting for callbacks.</p>
                        </div>
                        <div className="feature-box">
                            <Users size={32} color="#004d43" style={{ marginBottom: '20px' }} />
                            <h4>Find Partners</h4>
                            <p>Connect with other players searching for "padel tennis near me" and join the local community matching.</p>
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
                    <h2 className="section-title">Padel Tennis FAQs</h2>
                    <div className="faq-container">
                        <div className="faq-item">
                            <h3>Where can I find padel tennis near me in Lahore?</h3>
                            <p>Arena Pro covers all major areas in Lahore including DHA (Phases 1-8), Gulberg, Model Town, and Johar Town. Simply use our map to find the closest court.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Is padel tennis expensive to play?</h3>
                            <p>Padel is very affordable when playing with friends. Most courts in Lahore range from Rs. 4,000 to Rs. 8,000 per hour, which is split between 4 players.</p>
                        </div>
                        <div className="faq-item">
                            <h3>How can I book a padel court?</h3>
                            <p>You can book directly through the Arena Pro app or website. Choose your preferred venue, time slot, and confirm your booking instantly.</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PadelTennisNearMe;
