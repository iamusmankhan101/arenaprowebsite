import React from 'react';
import './Features.css';

const Features = () => {
    return (
        <section className="features">
            <div className="features-container">
                <header className="features-header">

                    <h2 className="features-title">
                        Elevate Your<br />
                        <span className="highlight-text">Sports Experience</span>
                    </h2>
                </header>

                <div className="features-grid">
                    {/* 1. MOFIN Blue Style - Smart Booking */}
                    <div className="feature-card mofin-blue">
                        <div className="mofin-content">
                            <h3 className="mofin-title-large">SMART<br />BOOKING</h3>
                            <p className="mofin-desc">Get the app</p>
                            <button className="mofin-btn-dark">Download Now</button>
                        </div>
                        {/* Big distinct background text */}
                        <div className="mofin-bg-text">BOOK</div>
                        <div className="feature-number">01</div>
                    </div>

                    {/* 2. Financial Analytics Style - Challenge Mode */}
                    <div className="feature-card mofin-gray-wide">
                        <div className="feature-number">02</div>
                        <div className="mofin-text-col">
                            <h3 className="mofin-title">Challenge Mode</h3>
                            <p className="mofin-desc">Create teams, challenge local squads to indoor cricket, padel or futsal matches, and track professional stats like Win Rate.</p>
                        </div>
                        <div className="mofin-visual-right">
                            <div className="mofin-challenge-image">
                                <img
                                    src="/image/Copy of arena pro logoqr (1).png"
                                    alt="Challenge Mode Interface"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 3. Smart Savings Style - Venue Insights */}
                    <div className="feature-card mofin-gray-tall">
                        <div className="feature-number">03</div>
                        <div className="mofin-text-top">
                            <h3 className="mofin-title">Premium Venue Insights</h3>
                            <p className="mofin-desc">Detailed profiles for the best padel courts in Lahore, cricket grounds, and premium turfs, complete with amenity icons and reviews.</p>
                        </div>
                        <div className="mofin-visual-bottom" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100%', paddingBottom: '20px' }}>
                            <img
                                src="/image/GHJK.png"
                                alt="Premium Venue Insights"
                                style={{ width: '90%', height: 'auto', borderRadius: '16px', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
                            />
                        </div>
                    </div>

                    {/* 4. Expense Tracking Style - Map Search */}
                    <div className="feature-card mofin-green">
                        <div className="feature-number">04</div>
                        <div className="mofin-text-top">
                            <h3 className="mofin-title">Interactive Map Search</h3>
                            <p className="mofin-desc">Geolocation-based venue finder to instantly discover a football turf near me or the closest padel courts near me.</p>
                        </div>
                        <div className="mofin-visual-center">
                            <img
                                className="mofin-map-image"
                                src="/image/Copy of arena pro logoqr (2).png"
                                alt="Interactive Map Search Interface"
                            />
                        </div>
                    </div>

                    {/* 5. Refer & Earn (Pastel Yellow - Bonus) */}
                    <div className="feature-card mofin-yellow">
                        <div className="feature-number">05</div>
                        <div className="mofin-text-col">
                            <h3 className="mofin-title">Refer & Earn</h3>
                            <p className="mofin-desc">Invite friends, earn Rs. 200 instantly.</p>
                        </div>
                        <div className="mofin-visual-right-small refer-earn-visual">
                            <img className="mofin-refer-image" src="/image/refer.png" alt="Refer and Earn" />
                        </div>
                    </div>

                    {/* 6. Real-Time Alerts (Pastel Purple - Bonus) */}
                    <div className="feature-card" style={{ background: 'transparent', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)' }}>
                        <div className="feature-number">06</div>
                        <div className="mofin-text-col">
                            <h3 className="mofin-title" style={{ color: '#1f1f1f' }}>Real-Time Alerts</h3>
                            <p className="mofin-desc" style={{ color: '#1f1f1f' }}>Instant confirmations for your cricket grounds booking so you never miss a match.</p>
                        </div>
                        <div className="mofin-visual-right-small alerts-visual">
                            <img className="mofin-alerts-image" src="/image/D.png" alt="Real-Time Alerts" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Features;
