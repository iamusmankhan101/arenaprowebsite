import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
                    opacity: 0.7,
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
                        Download, connect, and play.
                    </p>
                </div>

                {/* Cards */}
                <div className="steps-cards">
                    {/* Step 1 */}
                    <div className="step-card" ref={el => (cardsRef.current[0] = el)}>
                        <div className="step-number">1</div>
                        <div className="step-card-inner">
                            <div className="step-visual step1-visual">
                                <div className="step1-phone">
                                    <div className="step1-phone-screen">
                                        <div className="step1-greeting">Welcome to ArenaPro 🏆</div>
                                        <div className="step1-stats-row">
                                            <div className="step1-stat-box" style={{ background: '#4cd964' }}></div>
                                            <div className="step1-stat-box" style={{ background: '#004d43' }}></div>
                                            <div className="step1-stat-box" style={{ background: '#e8e435' }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="step1-badge app-store">App Store</div>
                                <div className="step1-badge play-store">Play Store</div>
                            </div>
                            <h3 className="step-card-title">Download App</h3>
                            <p className="step-card-desc">Get the app now on iOS and Android for free.</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="step-card" ref={el => (cardsRef.current[1] = el)}>
                        <div className="step-number">2</div>
                        <div className="step-card-inner">
                            <div className="step-visual step2-visual">
                                <div className="step2-profile-card">
                                    <div className="step2-user">
                                        <div className="step2-avatar"></div>
                                        <div className="step2-user-info">
                                            <div className="step2-name">Alex Striker</div>
                                            <div className="step2-email">alex@sports.com</div>
                                        </div>
                                    </div>
                                    <div className="step2-option">
                                        <span className="step2-icon">⚽</span>
                                        <span>Create a Team</span>
                                    </div>
                                    <div className="step2-option">
                                        <span className="step2-icon">🔍</span>
                                        <span>Find Venues</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className="step-card-title">Create Profile</h3>
                            <p className="step-card-desc">Set up your player profile and connect with friends.</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="step-card" ref={el => (cardsRef.current[2] = el)}>
                        <div className="step-number">3</div>
                        <div className="step-card-inner">
                            <div className="step-visual step3-visual">
                                <div className="step3-task-card">
                                    <div className="step3-label">UPCOMING GAMES</div>
                                    <div className="step3-task">
                                        <span className="step3-check confirmed"></span>
                                        <span>Friday Football</span>
                                    </div>
                                    <div className="step3-task">
                                        <span className="step3-check confirmed"></span>
                                        <span>Cricket Match</span>
                                    </div>
                                    <div className="step3-task">
                                        <span className="step3-check"></span>
                                        <span>Weekend Tennis</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className="step-card-title">Book & Play</h3>
                            <p className="step-card-desc">Find your venue, book your slot, and enjoy the game.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Steps;
