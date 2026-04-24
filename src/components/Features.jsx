import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, Clock, ShieldCheck, CreditCard, Star, Search, Zap, CheckCircle2, Wifi, Users } from 'lucide-react';
import './Features.css';

const Features = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('card-visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const cards = sectionRef.current?.querySelectorAll('.feature-card');
        cards?.forEach((card, i) => {
            card.style.setProperty('--delay', `${i * 80}ms`);
            observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="features" id="features" ref={sectionRef}>
            {/* Background decoration */}
            <div className="features-bg-orb features-bg-orb-1" />
            <div className="features-bg-orb features-bg-orb-2" />

            <div className="features-container">
                <header className="features-header">
                    <span className="features-eyebrow">
                        <Zap size={12} style={{ display: 'inline', marginRight: 6 }} />
                        Why Arena Pro
                    </span>
                    <h2 className="features-title">
                        Everything You Need to<br />
                        <span className="highlight-text">Book &amp; Play</span>
                    </h2>
                    <p className="features-subtitle">
                        From discovering venues to confirming your slot — Arena Pro makes every step seamless.
                    </p>
                </header>

                <div className="features-grid">

                    {/* ── 1. Instant Booking (hero, 2-col) ── */}
                    <div className="feature-card card-instant-booking">
                        <div className="card-left">
                            <div className="card-icon-wrap card-icon-lime-dark">
                                <Zap size={24} />
                            </div>
                            <div className="card-text">
                                <h3 className="card-heading">Instant Booking</h3>
                                <p className="card-desc">
                                    No calls, no waiting. Browse available slots and confirm your booking in seconds — right from your browser.
                                </p>
                            </div>
                            <div className="card-tag-row">
                                <span className="inline-tag">⚡ Free Cancellation</span>
                                <span className="inline-tag">✓ Instant Confirm</span>
                            </div>
                        </div>
                        <div className="card-right">
                            <div className="slot-card">
                                <div className="slot-card-header">
                                    <span className="slot-card-label">Today's Slots</span>
                                    <span className="slot-card-sport">
                                        <span className="sport-dot sport-padel" />
                                        Padel
                                    </span>
                                </div>
                                <div className="slot-list">
                                    <div className="slot-item slot-item-available">
                                        <div className="slot-item-left">
                                            <Clock size={16} color="#888" strokeWidth={2.5} />
                                            <div className="slot-time-stack">
                                                <span>06:00</span>
                                                <span>PM</span>
                                            </div>
                                        </div>
                                        <div className="slot-pill-large slot-pill-available">UNAVAILABLE</div>
                                    </div>
                                    <div className="slot-item slot-item-booked">
                                        <div className="slot-item-left">
                                            <Clock size={16} color="#c0392b" strokeWidth={2.5} />
                                            <div className="slot-time-stack">
                                                <span>07:00</span>
                                                <span>PM</span>
                                            </div>
                                        </div>
                                        <div className="slot-pill-large slot-pill-booked">BOOKED</div>
                                    </div>
                                    <div className="slot-item slot-item-active">
                                        <div className="slot-item-left">
                                            <Clock size={16} color="#fff" strokeWidth={2.5} />
                                            <div className="slot-time-stack">
                                                <span>08:00</span>
                                                <span>PM</span>
                                            </div>
                                        </div>
                                        <div className="slot-pill-large slot-pill-active">
                                            <span className="slot-pulse-dot" />
                                            AVAILABLE
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="feature-number">01</div>
                    </div>

                    {/* ── 2. Discover Venues (lime) ── */}
                    <div className="feature-card card-discover">
                        <div className="card-icon-wrap card-icon-dark-solid">
                            <Search size={22} />
                        </div>
                        <div className="card-text">
                            <h3 className="card-heading">Discover Venues</h3>
                            <p className="card-desc">
                                Explore top-rated padel courts, futsal grounds &amp; cricket nets — filtered by area, sport, and availability.
                            </p>
                        </div>
                        <div className="discover-tags">
                            <div className="location-pill"><MapPin size={12} />Johar Town</div>
                            <div className="location-pill"><MapPin size={12} />DHA</div>
                            <div className="location-pill active-pill"><MapPin size={12} />Gulberg</div>
                            <div className="location-pill"><MapPin size={12} />Model Town</div>
                        </div>
                        <div className="feature-number">02</div>
                    </div>

                    {/* ── 3. Real-Time Availability (white) ── */}
                    <div className="feature-card card-realtime">
                        <div className="card-icon-wrap card-icon-green-soft">
                            <Wifi size={22} />
                        </div>
                        <div className="card-text">
                            <h3 className="card-heading">Real-Time Availability</h3>
                            <p className="card-desc">
                                See live slot availability for every venue. No more calling ahead — what you see is what's open.
                            </p>
                        </div>
                        <div className="realtime-indicator">
                            <span className="live-dot" />
                            <span className="live-text">Live Updates</span>
                            <span className="live-count">47 slots open</span>
                        </div>
                        <div className="feature-number">03</div>
                    </div>

                    {/* ── 4. Verified & Trusted (green, 2-col) ── */}
                    <div className="feature-card card-verified">
                        <div className="verified-inner">
                            <div className="card-icon-wrap card-icon-white-soft">
                                <ShieldCheck size={24} />
                            </div>
                            <div className="card-text">
                                <h3 className="card-heading">Verified &amp; Trusted</h3>
                                <p className="card-desc">
                                    Every venue on Arena Pro is personally verified. Accurate photos, honest pricing, and genuine reviews you can trust.
                                </p>
                            </div>
                            <div className="verified-checklist">
                                <div className="verified-check-item">
                                    <CheckCircle2 size={16} className="check-icon" />
                                    <span>Photos verified on-site</span>
                                </div>
                                <div className="verified-check-item">
                                    <CheckCircle2 size={16} className="check-icon" />
                                    <span>Pricing transparent &amp; fixed</span>
                                </div>
                                <div className="verified-check-item">
                                    <CheckCircle2 size={16} className="check-icon" />
                                    <span>Reviews from real players</span>
                                </div>
                            </div>
                        </div>
                        <div className="verified-score-badge">
                            <div className="score-ring">
                                <span className="score-val">4.8</span>
                                <span className="score-label">Avg Rating</span>
                            </div>
                            <div className="score-stars">
                                {[1,2,3,4,5].map(i => (
                                    <Star key={i} size={14} fill={i <= 4 ? '#e8ee26' : 'none'} color="#e8ee26" />
                                ))}
                            </div>
                            <span className="score-sub">1,200+ Reviews</span>
                        </div>
                        <div className="feature-number feature-number-light">04</div>
                    </div>

                    {/* ── 5. Flexible Payments (white) ── */}
                    <div className="feature-card card-payments">
                        <div className="card-icon-wrap card-icon-lime-dark">
                            <CreditCard size={22} />
                        </div>
                        <div className="card-text">
                            <h3 className="card-heading">Flexible Payments</h3>
                            <p className="card-desc">
                                Pay securely online or at the venue. Multiple payment methods, zero hidden fees.
                            </p>
                        </div>
                        <div className="payment-methods">
                            <div className="pay-method">
                                <img src="/image/Easypaisa-logo.png" alt="Easypaisa" className="pay-logo" />
                            </div>
                            <div className="pay-method">
                                <img src="/image/easypaisa-pay-logo-11685340011w1ndm8dzgj.png" alt="EasyPay" className="pay-logo" />
                            </div>
                            <div className="pay-method pay-cash">
                                <span>💵</span>
                                <span>Cash</span>
                            </div>
                        </div>
                        <div className="feature-number">05</div>
                    </div>

                    {/* ── 6. Smart Scheduling (dark, 2-col) ── */}
                    <div className="feature-card card-scheduling">
                        <div className="card-icon-wrap card-icon-yellow-glow">
                            <Calendar size={22} />
                        </div>
                        <div className="card-text">
                            <h3 className="card-heading">Smart Scheduling</h3>
                            <p className="card-desc">
                                Pick your date, choose your time, select your sport — and you're in. The simplest way to plan your next game.
                            </p>
                        </div>
                        <div className="scheduling-mini-cal">
                            <div className="cal-header">
                                <span className="cal-month">April 2025</span>
                                <Users size={14} className="cal-icon" />
                            </div>
                            <div className="cal-days">
                                {['M','T','W','T','F','S','S'].map((d,i) => (
                                    <span key={i} className="cal-day-label">{d}</span>
                                ))}
                                {[...Array(7)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`cal-day-num ${i === 3 ? 'cal-day-active' : ''} ${i === 1 || i === 5 ? 'cal-day-booked' : ''}`}
                                    >
                                        {21 + i}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="feature-number feature-number-muted">06</div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Features;
