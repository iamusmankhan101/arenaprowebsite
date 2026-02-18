import React from 'react';
import './Features.css';

const Features = () => {
    return (
        <section className="features">
            <div className="features-container">
                <header className="features-header">
                    <span className="features-eyebrow">• ARENAPA PRO</span>
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
                            <p className="mofin-desc">Create teams, challenge squads, and track professional stats like Win Rate.</p>
                        </div>
                        <div className="mofin-visual-right">
                            <div className="mofin-phone-mockup">
                                <div className="mp-screen">
                                    <div className="mp-header">
                                        <span>Squads</span>
                                        <span>···</span>
                                    </div>
                                    <div className="mp-content">
                                        <div className="mp-card">
                                            <div className="mp-avatar">🦁</div>
                                            <div className="mp-lines">
                                                <div className="mpl mpl-1"></div>
                                                <div className="mpl mpl-2"></div>
                                            </div>
                                        </div>
                                        <div className="mp-stat-row">
                                            <div className="mp-stat">Win Rate 85%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Smart Savings Style - Venue Insights */}
                    <div className="feature-card mofin-gray-tall">
                        <div className="feature-number">03</div>
                        <div className="mofin-text-top">
                            <h3 className="mofin-title">Premium Venue Insights</h3>
                            <p className="mofin-desc">Detailed venue profiles with amenity icons and reviews.</p>
                        </div>
                        <div className="mofin-visual-bottom">
                            <div className="mofin-float-card">
                                <div className="mfc-header">
                                    <div className="mfc-icon">🏟️</div>
                                    <div className="mfc-info">
                                        <div className="mfc-title">Turf Arena</div>
                                        <div className="mfc-sub">5.0 ⭐</div>
                                    </div>
                                    <div className="mfc-price">Rs. 800</div>
                                </div>
                                <div className="mfc-body">
                                    <div className="mfc-tag">Parking ✅</div>
                                    <div className="mfc-tag">Water 💧</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Expense Tracking Style - Map Search */}
                    <div className="feature-card mofin-green">
                        <div className="feature-number">04</div>
                        <div className="mofin-text-top">
                            <h3 className="mofin-title">Interactive Map Search</h3>
                            <p className="mofin-desc">Geolocation-based venue finder to discover nearby turfs.</p>
                        </div>
                        <div className="mofin-visual-center">
                            <div className="mofin-dark-card">
                                <div className="mdc-header">
                                    <span>Near You</span>
                                    <span>MAP</span>
                                </div>
                                <div className="mdc-content">
                                    <div className="mdc-loc">Sector 5</div>
                                </div>
                            </div>
                            {/* Connecting Nodes */}
                            <div className="mofin-node node-1">📍</div>
                            <div className="mofin-node node-2">📍</div>
                            <div className="mofin-node node-3">📍</div>
                        </div>
                    </div>

                    {/* 5. Refer & Earn (Pastel Yellow - Bonus) */}
                    <div className="feature-card mofin-yellow">
                        <div className="feature-number">05</div>
                        <div className="mofin-text-col">
                            <h3 className="mofin-title">Refer & Earn</h3>
                            <p className="mofin-desc">Invite friends, earn Rs. 300 instantly.</p>
                        </div>
                        <div className="mofin-visual-right-small">
                            <div className="mofin-coin">💰</div>
                        </div>
                    </div>

                    {/* 6. Real-Time Alerts (Pastel Purple - Bonus) */}
                    <div className="feature-card mofin-purple">
                        <div className="feature-number">06</div>
                        <div className="mofin-text-col">
                            <h3 className="mofin-title">Real-Time Alerts</h3>
                            <p className="mofin-desc">Instant booking notifications.</p>
                        </div>
                        <div className="mofin-visual-right-small">
                            <div className="mofin-bell">🔔</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Features;
