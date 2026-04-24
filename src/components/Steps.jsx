import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, CalendarCheck, Trophy } from 'lucide-react';
import './Steps.css';

gsap.registerPlugin(ScrollTrigger);

const Steps = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const cards = cardsRef.current;
        const section = sectionRef.current;

        // Pin each card and stack them
        cards.forEach((card, i) => {
            ScrollTrigger.create({
                trigger: card,
                start: `top ${80 + i * 30}px`,
                end: i === cards.length - 1 ? 'bottom bottom' : `top ${80 + (i + 1) * 30}px`,
                pin: true,
                pinSpacing: i === cards.length - 1 ? true : false,
                scrub: true,
                id: `card-${i}`,
            });

            // Scale down slightly when next card stacks on top
            if (i < cards.length - 1) {
                gsap.to(card, {
                    scale: 0.95,
                    filter: "brightness(0.95)",
                    scrollTrigger: {
                        trigger: cards[i + 1],
                        start: 'top bottom',
                        end: `top ${80 + (i + 1) * 30}px`,
                        scrub: true,
                    },
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <section className="steps" ref={sectionRef}>
            <div className="steps-container">
                {/* Left Heading */}
                <div className="steps-heading">
                    <h2 className="steps-title">
                        Get started in<br />3 simple steps.
                    </h2>
                    <p className="steps-subtitle">
                        Your path to the perfect game starts here.<br />
                        Search, book, and play effortlessly.
                    </p>
                </div>

                {/* Cards */}
                <div className="steps-cards">
                    {/* Step 1 */}
                    <div className="step-card" ref={el => (cardsRef.current[0] = el)}>
                        <div className="step-number">1</div>
                        <div className="step-card-inner">
                            <div className="step-visual step1-visual">
                                <div className="mockup-scene">
                                    <div className="mockup-search-container">
                                        <div className="mockup-search-bar">
                                            <Search size={14} className="mockup-icon" />
                                            <span className="mockup-placeholder">Padel in Lahore...</span>
                                            <div className="mockup-search-btn">Search</div>
                                        </div>
                                        <div className="mockup-tags">
                                            <span className="mockup-tag">Padel</span>
                                            <span className="mockup-tag active">Football</span>
                                            <span className="mockup-tag">Cricket</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="step-card-title">Find Your Venue</h3>
                            <p className="step-card-desc">Browse top-rated courts and turfs near you. Use smart filters like location and sport to find exactly what you need.</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="step-card" ref={el => (cardsRef.current[1] = el)}>
                        <div className="step-number">2</div>
                        <div className="step-card-inner">
                            <div className="step-visual step2-visual">
                                <div className="mockup-scene mockup-scene-alt">
                                    <div className="mockup-calendar">
                                        <div className="mc-header">
                                            <span>Today's Available Slots</span>
                                            <CalendarCheck size={14} className="mockup-icon" />
                                        </div>
                                        <div className="mc-slots">
                                            <div className="mc-slot">
                                                <span className="mc-time">05:00 PM</span>
                                                <span className="mc-status">Booked</span>
                                            </div>
                                            <div className="mc-slot active">
                                                <span className="mc-time">06:00 PM</span>
                                                <span className="mc-status">Book Now</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="step-card-title">Book Your Slot</h3>
                            <p className="step-card-desc">Check real-time availability and confirm your booking instantly. Secure your spot without making a single phone call.</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="step-card" ref={el => (cardsRef.current[2] = el)}>
                        <div className="step-number">3</div>
                        <div className="step-card-inner">
                            <div className="step-visual step3-visual">
                                <div className="mockup-scene mockup-scene-dark">
                                    <div className="mockup-ticket">
                                        <div className="mt-top">
                                            <div className="mt-success-icon">✓</div>
                                            <span className="mt-title">Booking Confirmed</span>
                                        </div>
                                        <div className="mt-divider"></div>
                                        <div className="mt-bottom">
                                            <div className="mt-venue">Arena Pro Turf</div>
                                            <div className="mt-details">Today, 06:00 PM</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="step-card-title">Play and Dominate</h3>
                            <p className="step-card-desc">Show up and hit the ground running. We've handled all the logistics so your only focus is bringing your A-game.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Steps;
