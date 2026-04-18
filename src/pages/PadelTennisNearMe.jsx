import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { MapPin, ChevronRight, Loader2 } from 'lucide-react';
import './IndoorCricketLahore.css';
import { venueService } from '../services/venueService';
import VenueCard from '../components/VenueCard';

const AREAS = [
    { name: 'DHA', slug: 'dha', desc: 'Phases 1–8, premium clubs with professional glass courts and floodlighting.' },
    { name: 'Gulberg', slug: null, desc: 'Central Lahore\'s most popular padel destination, close to offices and restaurants.' },
    { name: 'Johar Town', slug: 'johar-town', desc: 'Affordable courts with great facilities, ideal for regular weekly sessions.' },
    { name: 'Model Town', slug: 'model-town', desc: 'Family-friendly clubs with coaching available for all skill levels.' },
    { name: 'Bahria Town', slug: 'bahria-town', desc: 'Modern sports complexes with multiple courts and ample parking.' },
];

const PadelTennisNearMe = () => {
    const [liveVenues, setLiveVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeArea, setActiveArea] = useState('All');

    useEffect(() => {
        document.title = "Padel Tennis Near Me — Find Courts in Your Area | Arena Pro";
        const metaDescription = document.querySelector('meta[name="description"]');
        const description = "Find padel tennis near you in Lahore. Browse courts by area — DHA, Gulberg, Johar Town, Model Town, and Bahria Town. Instant booking with Arena Pro.";
        if (metaDescription) {
            metaDescription.setAttribute("content", description);
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = description;
            document.head.appendChild(meta);
        }

        const fetchVenues = async () => {
            try {
                setLoading(true);
                const data = await venueService.getVenues();
                setLiveVenues(data.filter(v => v.sports.includes('Padel')));
            } catch (error) {
                console.error("Failed to fetch venues:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, []);

    const filteredVenues = activeArea === 'All'
        ? liveVenues
        : liveVenues.filter(v => v.location.toLowerCase().includes(activeArea.toLowerCase()));

    return (
        <div className="indoor-landing-page">
            <Navbar />

            <header className="indoor-hero padel-hero">
                <div className="indoor-hero-content">
                    <Breadcrumb crumbs={[
                        { label: 'Home', path: '/' },
                        { label: 'Padel Courts', path: '/padel-court-lahore' },
                        { label: 'Near Me', path: '/padel-tennis-near-me' },
                    ]} />
                    <h1>Find <span className="highlight">Padel Tennis Near Me</span> in Lahore</h1>
                    <p>
                        Use Arena Pro to locate padel courts in your area. Filter by neighbourhood and book instantly — no phone calls needed.
                    </p>
                    {/* Canonical signal to pillar page */}
                    <p style={{ marginTop: '12px', fontSize: '0.95rem', opacity: 0.85 }}>
                        Want to see all padel venues?{' '}
                        <a href="/padel-court-lahore" style={{ color: '#e8ee26', fontWeight: 700, textDecoration: 'underline' }}>
                            Browse all padel courts in Lahore →
                        </a>
                    </p>
                </div>
            </header>

            <main className="indoor-container">

                {/* Area Filter */}
                <section className="areas-section">
                    <h2 className="section-title">Find Padel Courts by Area</h2>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
                        {['All', ...AREAS.map(a => a.name)].map(area => (
                            <button
                                key={area}
                                onClick={() => setActiveArea(area)}
                                style={{
                                    padding: '10px 22px',
                                    borderRadius: '50px',
                                    border: '2px solid',
                                    borderColor: activeArea === area ? '#004d43' : '#e2e8f0',
                                    background: activeArea === area ? '#004d43' : 'white',
                                    color: activeArea === area ? 'white' : '#0f172a',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontFamily: 'Montserrat, sans-serif',
                                }}
                            >
                                {area}
                            </button>
                        ))}
                    </div>

                    <div className="areas-grid">
                        {AREAS.map(area => (
                            <div key={area.name} className="area-item">
                                <div className="area-icon"><MapPin size={24} /></div>
                                <h3>Padel in {area.name}</h3>
                                <p>{area.desc}</p>
                                {area.slug ? (
                                    <a href={`/venues/${area.slug}`} className="area-link">
                                        Explore {area.name} <ChevronRight size={16} />
                                    </a>
                                ) : (
                                    <a href="/venues" className="area-link">
                                        Browse venues <ChevronRight size={16} />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Filtered Venues */}
                <section className="section">
                    <h2 className="section-title">
                        {activeArea === 'All' ? 'All Padel Courts in Lahore' : `Padel Courts in ${activeArea}`}
                    </h2>
                    <div className="venues-grid">
                        {loading ? (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                                <Loader2 size={40} className="animate-spin" style={{ color: '#004d43', marginBottom: '16px' }} />
                                <p>Finding padel courts near you...</p>
                            </div>
                        ) : filteredVenues.length > 0 ? (
                            filteredVenues.map(venue => (
                                <VenueCard key={venue.id} venue={venue} />
                            ))
                        ) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                                <p>No padel courts found in {activeArea}. <button onClick={() => setActiveArea('All')} style={{ color: '#004d43', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>View all areas</button></p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Bottom canonical CTA */}
                <section className="section" style={{ textAlign: 'center', paddingTop: 0 }}>
                    <div style={{ background: '#f0fdf4', borderRadius: '20px', padding: '40px', border: '1px solid #bbf7d0' }}>
                        <h3 style={{ fontFamily: 'Clash Display, sans-serif', marginBottom: '12px', color: '#0f172a' }}>
                            Looking for the full padel experience?
                        </h3>
                        <p style={{ color: '#64748b', marginBottom: '20px' }}>
                            See all padel venues, pricing, rules, and FAQs on our main padel page.
                        </p>
                        <a
                            href="/padel-court-lahore"
                            style={{
                                display: 'inline-block',
                                background: '#004d43',
                                color: 'white',
                                padding: '14px 32px',
                                borderRadius: '50px',
                                fontWeight: 700,
                                textDecoration: 'none',
                            }}
                        >
                            Browse all padel courts in Lahore →
                        </a>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

export default PadelTennisNearMe;
