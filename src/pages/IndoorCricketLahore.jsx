import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Download, MapPin, Star, Clock, Trophy, ChevronRight } from 'lucide-react';
import './IndoorCricketLahore.css';

const IndoorCricketLahore = () => {
    useEffect(() => {
        // SEO Metadata Update
        document.title = "Indoor Cricket Grounds Booking in Lahore | Arena Pro";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Looking for the best indoor cricket in Lahore? Use Arena Pro for instant cricket grounds booking in Model Town, Johar Town, and more. Download the app today!");
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = "Looking for the best indoor cricket in Lahore? Use Arena Pro for instant cricket grounds booking in Model Town, Johar Town, and more. Download the app today!";
            document.head.appendChild(meta);
        }

        // URL Slug is managed by routing in App.jsx
        window.scrollTo(0, 0);
    }, []);

    const venues = [
        {
            id: 'modeltown-arena',
            name: 'Model Town Cricket Arena',
            location: 'Model Town, Lahore',
            rating: 4.8,
            price: 'Rs. 3,500/hr',
            image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=500&auto=format&fit=crop'
        },
        {
            id: 'johar-town-hub',
            name: 'Johar Town Sports Complex',
            location: 'Johar Town, Lahore',
            rating: 4.7,
            price: 'Rs. 4,000/hr',
            image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?q=80&w=500&auto=format&fit=crop'
        },
        {
            id: 'dha-cricket-center',
            name: 'DHA Phase 5 Indoor Arena',
            location: 'DHA Phase 5, Lahore',
            rating: 4.9,
            price: 'Rs. 5,000/hr',
            image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=500&auto=format&fit=crop'
        }
    ];

    return (
        <div className="indoor-landing-page">
            <Navbar />

            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-content">
                    <h1>Top-Rated <span className="highlight">Cricket Grounds Booking</span> in Lahore</h1>
                    <p className="hero-description">
                        Experience the thrill of cricket without the heat or rain. Use Arena Pro to find and book a premium 
                        <strong> indoor cricket court</strong> (KD 25) instantly. No phone calls required—just tap and play.
                    </p>
                    <div className="cta-group">
                        <a href="/waitlist" className="cta-primary">
                            <Download size={20} /> Download App to Book
                        </a>
                        <a href="/venues" className="cta-secondary">
                            View Cricket Grounds
                        </a>
                    </div>
                </div>
            </header>

            {/* Venues Sneak Peek */}
            <section className="section">
                <h2 className="section-title">Find the Best Indoor Cricket in Lahore Near You</h2>
                <p style={{ textAlign: 'center', marginBottom: '40px', color: '#aaa', maxWidth: '800px', margin: '0 auto 40px' }}>
                    Discover premium facilities with Olympic-grade lighting, professional pitch quality, and air-conditioned environments 
                    designed for the ultimate cricketing experience.
                </p>
                <div className="venues-grid">
                    {venues.map(venue => (
                        <div className="venue-card" key={venue.id}>
                            <div className="venue-image">
                                <img src={venue.image} alt={`Players enjoying a match at an indoor cricket court in ${venue.location}`} />
                            </div>
                            <div className="venue-details">
                                <h3>{venue.name}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#aaa', marginBottom: '10px' }}>
                                    <MapPin size={16} /> {venue.location}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#e8ee26' }}>
                                    <Star size={16} fill="#e8ee26" /> {venue.rating}
                                </div>
                                <div className="venue-meta">
                                    <span className="price">{venue.price}</span>
                                    <button className="cta-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Book Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Areas (SEO Goldmine) */}
            <section className="section areas-section">
                <h2 className="section-title">Popular Areas for Indoor Cricket Booking</h2>
                <div className="areas-grid">
                    <div className="area-item">
                        <h3>Model Town Indoor Cricket</h3>
                        <p>
                            Players from <strong>model town cricket academy</strong> (KD 20) and <strong>model town cricket club lahore</strong> (KD 22) 
                            frequently use Arena Pro to book nearby indoor pitches. Our platform lists the most accessible venues in and around Model Town.
                        </p>
                    </div>
                    <div className="area-item">
                        <h3>Indoor Cricket in Johar Town</h3>
                        <p>
                            Finding an <strong>indoor cricket lahore johar town</strong> (KD 29) has never been easier. Use our interactive map search 
                            to find a <strong>cricket ground near me</strong> (KD 33) and secure your slot within seconds.
                        </p>
                    </div>
                    <div className="area-item">
                        <h3>DHA & Other Hubs</h3>
                        <p>
                            Across DHA Phase 1 to 8, Gulberg, and Bahria Town, Arena Pro connects you with the best indoor cricket hubs in Lahore. 
                            From casual weekend games to competitive tournaments, we cover the whole city.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Arena Pro */}
            <section className="section">
                <h2 className="section-title">Why Book Your Indoor Cricket Court with Arena Pro?</h2>
                <div className="features-list">
                    <div className="feature-box">
                        <h4>Real-Time Availability</h4>
                        <p>Live calendar integration means no more double bookings or wasted trips. What you see is what you get.</p>
                    </div>
                    <div className="feature-box">
                        <h4>Challenge Mode</h4>
                        <p>Missing a player or want to take on a new team? Use Challenge Mode to find opponents for your next match.</p>
                    </div>
                    <div className="feature-box">
                        <h4>Split Payments</h4>
                        <p>No more awkward cash collecting. Split the booking cost with your teammates directly through the app.</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section">
                <h2 className="section-title">Frequently Asked Questions (FAQs)</h2>
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
                        <p>Most venues listed on Arena Pro provide high-quality <strong>indoor cricket nets</strong> (KD 10). Equipment availability (bats/balls) varies by venue, but many offer rentals or complementary gear.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default IndoorCricketLahore;
