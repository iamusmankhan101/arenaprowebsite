import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import MoreSports from '../components/MoreSports';
import { Download, MapPin, Star, Calendar, Users, CreditCard, ChevronRight, Loader2 } from 'lucide-react';
import './IndoorCricketLahore.css';
import { venueService } from '../services/venueService';
import VenueCard from '../components/VenueCard';

const IndoorCricketLahore = () => {
    const [liveVenues, setLiveVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // SEO Metadata Update
        document.title = "Indoor Cricket Grounds Booking in Lahore | Arena Pro";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Looking for the best indoor cricket in Lahore? Use Arena Pro for instant cricket grounds booking in Model Town, Johar Town, and more. Join the waitlist today!");
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = "Looking for the best indoor cricket in Lahore? Use Arena Pro for instant cricket grounds booking, indoor cricket nets, and cricket academy sessions in Model Town, Johar Town, and more. Join the waitlist today!";
            document.head.appendChild(meta);
        }

        window.scrollTo(0, 0);

        const fetchVenues = async () => {
            try {
                setLoading(true);
                const data = await venueService.getVenues();
                // Filter for Cricket and make sure it's Lahore (though default service might return all active)
                const cricketVenues = data.filter(venue => 
                    venue.sports.includes('Cricket')
                );
                setLiveVenues(cricketVenues);
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
            <header className="indoor-hero">
                <div className="indoor-hero-content">
                    <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'Indoor Cricket', path: '/indoor-cricket-lahore' }]} />
                    <h1>Top-Rated <span className="highlight">Cricket Grounds Booking</span> in Lahore</h1>
                    <p>
                        Experience the thrill of cricket without the heat or rain. Use Arena Pro to find and book a premium 
                        <strong> indoor cricket court</strong> instantly. No phone calls required - just tap and play.
                    </p>
                    <div className="cta-group">
                        <a href="/waitlist" className="cta-primary">
                            <Download size={20} /> Join Waitlist
                        </a>
                        <a href="/venues" className="cta-secondary">
                            View Cricket Grounds
                        </a>
                    </div>
                </div>
            </header>

            <main className="indoor-container">
                {/* Venues Sneak Peek */}
                <section className="section">
                    <h2 className="section-title">Find the Best Indoor Cricket in Lahore Near You</h2>
                    <p style={{ textAlign: 'center', marginBottom: '40px', color: '#64748b', maxWidth: '800px', margin: '0 auto 40px' }}>
                        Discover premium facilities with Olympic-grade lighting, professional pitch quality, and air-conditioned environments 
                        designed for the ultimate cricketing experience.
                    </p>
                    <div className="venues-grid">
                        {loading ? (
                            <div className="loading-state" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                                <Loader2 size={40} className="animate-spin" style={{ color: '#004d43', marginBottom: '16px' }} />
                                <p>Loading premium cricket arenas...</p>
                            </div>
                        ) : liveVenues.length > 0 ? (
                            liveVenues.map(venue => (
                                <VenueCard key={venue.id} venue={venue} />
                            ))
                        ) : (
                            <div className="no-venues" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                                <p>No cricket venues found at the moment. Please check back later!</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Popular Areas (SEO Goldmine) */}
                <section className="areas-section">
                    <h2 className="section-title">Popular Areas for Indoor Cricket Booking</h2>
                    <div className="areas-grid">
                        <div className="area-item">
                            <div className="area-icon">
                                <MapPin size={24} />
                            </div>
                            <h3>Model Town Indoor Cricket</h3>
                            <p>
                                Players from <strong>model town cricket academy</strong> and <strong>model town cricket club lahore</strong> 
                                frequently use Arena Pro to book nearby indoor pitches.
                            </p>
                            <a href="/venues/model-town" className="area-link">
                                Explore Model Town <ChevronRight size={16} />
                            </a>
                        </div>
                        <div className="area-item">
                            <div className="area-icon">
                                <MapPin size={24} />
                            </div>
                            <h3>Indoor Cricket in Johar Town</h3>
                            <p>
                                Finding an <strong>indoor cricket lahore johar town</strong> has never been easier. Use our interactive map search 
                                to find a <strong>cricket ground near me</strong>.
                            </p>
                            <a href="/venues/johar-town" className="area-link">
                                Explore Johar Town <ChevronRight size={16} />
                            </a>
                        </div>
                        <div className="area-item">
                            <div className="area-icon">
                                <MapPin size={24} />
                            </div>
                            <h3>DHA & Other Hubs</h3>
                            <p>
                                Across DHA Phase 1 to 8, Gulberg, and Bahria Town, Arena Pro connects you with the best indoor cricket hubs in Lahore.
                            </p>
                            <a href="/venues/dha" className="area-link">
                                Explore DHA <ChevronRight size={16} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Why Arena Pro */}
                <section className="section">
                    <h2 className="section-title">Why Book Your Indoor Cricket Court with Arena Pro?</h2>
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

                {/* FAQ Section */}
                <section className="section">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="faq-container">
                        <div className="faq-item">
                            <h3>How much does an indoor cricket court cost in Lahore?</h3>
                            <p>Prices typically range from Rs. 3,000 to Rs. 6,000 per hour, depending on the venue's facilities, peak hours, and location.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Can I book a cricket ground near me for a corporate tournament?</h3>
                            <p>Yes! Arena Pro features a vendor panel that allows for bulk bookings and corporate tournament management. Contact our support for specialized event assistance.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Do the venues provide indoor cricket nets and equipment?</h3>
                            <p>Most venues listed on Arena Pro provide high-quality <strong>indoor cricket nets</strong>. Equipment availability (bats/balls) varies by venue, but many offer rentals or complementary gear.</p>
                        </div>
                    </div>
                </section>

                <MoreSports currentSport="cricket" />
            </main>

            <Footer />
        </div>
    );
};

export default IndoorCricketLahore;
