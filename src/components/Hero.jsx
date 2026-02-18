import React, { useEffect, useState } from 'react'

const Hero = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="hero">
            <div className="hero-container">
                {/* Badges */}
                <div className="hero-badges">

                    <span className="badge badge-dark">LAUCNHING SOON</span>
                </div>

                {/* Heading */}
                <h1 className="hero-title">
                    Book Your Perfect Sports Venue<br />
                    Anytime, Anywhere.
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle">
                    Your game, your schedule, discover and reserve top sports venues with just a few taps <br />
                </p>

                {/* CTA Button */}
                <div className="hero-cta-group">
                    <a href="#" className="store-badge">
                        <img src="/image/pngtree-google-play-app-icon-vector-png-image_9183316.png" alt="Get it on Google Play" />
                    </a>
                </div>

                {/* Phone Mockup Area */}
                <div className="hero-phone-wrapper">
                    {/* Phone Device Image */}
                    <img
                        src="/image/Untitled design (1).png"
                        alt="App Interface"
                        className="phone-img"
                        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                    />

                    {/* Floating Goals Card */}

                    {/* Floating Images */}
                    <img
                        src="/image/Untitled design (28).png"
                        alt="Float Left"
                        className="floating-img float-left"
                    />
                    <img
                        src="/image/Untitled design (29).png"
                        alt="Float Right"
                        className="floating-img float-right"
                    />

                </div>
            </div>
        </section>
    )
}

export default Hero
