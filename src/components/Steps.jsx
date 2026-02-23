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
                            <div className="step-visual step1-visual" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img
                                    src="/image/pngtree-google-play-app-icon-vector-png-image_9183316.png"
                                    alt="Get it on Google Play"
                                    style={{ width: '80%', height: 'auto', objectFit: 'contain' }}
                                />
                            </div>
                            <h3 className="step-card-title">Get the App</h3>
                            <p className="step-card-desc">Grab Arena Pro from your app store and put the ultimate sports hub right in your pocket.</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="step-card" ref={el => (cardsRef.current[1] = el)}>
                        <div className="step-number">2</div>
                        <div className="step-card-inner">
                            <div className="step-visual step2-visual" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img
                                    src="/image/fd.png"
                                    alt="Create an account profile preview"
                                    style={{ width: '80%', height: 'auto', objectFit: 'contain' }}
                                />
                            </div>
                            <h3 className="step-card-title">Create an account</h3>
                            <p className="step-card-desc">Sign up in seconds and personalize your profile to play your way.</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="step-card" ref={el => (cardsRef.current[2] = el)}>
                        <div className="step-number">3</div>
                        <div className="step-card-inner">
                            <div className="step-visual step3-visual" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img
                                    src="/image/saa.png"
                                    alt="Discover Arena Pro"
                                    style={{ width: '80%', height: 'auto', objectFit: 'contain' }}
                                />
                            </div>
                            <h3 className="step-card-title">Discover Arena Pro</h3>
                            <p className="step-card-desc">Unlock a new level of play. Find local courts, meet your next teammates, and level up your game.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Steps;
