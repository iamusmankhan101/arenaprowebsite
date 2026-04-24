import React from 'react';
import { Calendar, MapPin, Clock, ShieldCheck, CreditCard, Star, Search, Zap } from 'lucide-react';
import './Features.css';

const Features = () => {
    return (
        <section className="features" id="features">
            <div className="features-container">
                <header className="features-header">
                    <span className="features-eyebrow">Why Arena Pro</span>
                    <h2 className="features-title">
                        Everything You Need to<br />
                        <span className="highlight-text">Book & Play</span>
                    </h2>
                    <p className="features-subtitle">
                        From discovering venues to confirming your slot — Arena Pro makes every step seamless.
                    </p>
                </header>

                <div className="features-grid">
                    {/* 1. Instant Booking — Large hero card */}
                    <div className="feature-card card-instant-booking">
                        <div className="card-icon-wrap card-icon-accent">
                            <Zap size={28} />
                        </div>
                        <div className="card-text">
                            <h3 className="card-heading">Instant Booking</h3>
                            <p className="card-desc">
                                No calls, no waiting. Browse available time slots and confirm your booking in seconds — all from your browser.
                            </p>
                        </div>
                        <div className="card-decoration card-decoration-booking">
                            <div className="decoration-slot">
                                <span className="slot-time">06:00 PM</span>
                                <span className="slot-status slot-available">Available</span>
                            </div>
                            <div className="decoration-slot">
                                <span className="slot-time">07:00 PM</span>
                                <span className="slot-status slot-booked">Booked</span>
                            </div>
                            <div className="decoration-slot active-slot">
                                <span className="slot-time">08:00 PM</span>
                                <span className="slot-status slot-available">Available</span>
                            </div>
                        </div>
                        <div className="feature-number">01</div>
                    </div>

                    {/* 2. Discover Venues — Standard card */}
                    <div className="feature-card card-discover">
                        <div className="card-icon-wrap card-icon-green">
                            <Search size={28} />
                        </div>
                        <div className="card-text">
                            <h3 className="card-heading">Discover Venues</h3>
                            <p className="card-desc">
                                Explore top-rated padel courts, futsal grounds, and cricket nets across Lahore — filtered by area, sport, and availability.
                            </p>
                        </div>
                        <div className="feature-number">02</div>
                    </div>

                    {/* 3. Real-Time Availability */}
                    <div className="feature-card card-realtime">
                        <div className="card-icon-wrap card-icon-dark">
                            <Clock size={28} />
                        </div>
                        <div className="card-text">
                            <h3 className="card-heading">Real-Time Availability</h3>
                            <p className="card-desc">
                                See live slot availability for every venue. No more calling ahead — what you see is what's open.
                            </p>
                        </div>
                        <div className="feature-number">03</div>
                    </div>

                    {/* 4. Verified Venues — Wide card */}
                    <div className="feature-card card-verified">
                        <div className="card-icon-wrap card-icon-white">
                            <ShieldCheck size={28} />
                        </div>
                        <div className="card-text">
                            <h3 className="card-heading">Verified & Trusted</h3>
                            <p className="card-desc">
                                Every venue on Arena Pro is personally verified. Accurate photos, honest pricing, and genuine reviews you can trust.
                            </p>
                        </div>
                        <div className="card-verified-badges">
                            <div className="verified-badge">
                                <ShieldCheck size={16} />
                                <span>Verified Photos</span>
                            </div>
                            <div className="verified-badge">
                                <Star size={16} />
                                <span>Rated 4.5+</span>
                            </div>
                            <div className="verified-badge">
                                <MapPin size={16} />
                                <span>Location Checked</span>
                            </div>
                        </div>
                        <div className="feature-number">04</div>
                    </div>

                    {/* 5. Easy Payments */}
                    <div className="feature-card card-payments">
                        <div className="card-icon-wrap card-icon-lime">
                            <CreditCard size={28} />
                        </div>
                        <div className="card-text">
                            <h3 className="card-heading">Flexible Payments</h3>
                            <p className="card-desc">
                                Pay securely online or at the venue. We support all major payment methods for a hassle-free experience.
                            </p>
                        </div>
                        <div className="feature-number">05</div>
                    </div>

                    {/* 6. Smart Scheduling */}
                    <div className="feature-card card-scheduling">
                        <div className="card-icon-wrap card-icon-accent">
                            <Calendar size={28} />
                        </div>
                        <div className="card-text">
                            <h3 className="card-heading">Smart Scheduling</h3>
                            <p className="card-desc">
                                Pick your date, choose your time, select your sport — and you're in. The simplest way to plan your next game.
                            </p>
                        </div>
                        <div className="feature-number">06</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
