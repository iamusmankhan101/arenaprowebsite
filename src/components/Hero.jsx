import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

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
                    <Link to="/waitlist" className="badge badge-dark">Join Waitlist</Link>
                </div>

                {/* Heading */}
                <h1 className="hero-title">
                    Find and Book the Best Cricket & Padel Venues in Lahore.
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle">
                    Stop searching for a football turf near me or the top padel courts. Arena Pro connects you with premium facilities instantly. Find everything from <Link to="/lahore/indoor-cricket" style={{ color: '#e8ee26', textDecoration: 'underline' }}>indoor cricket</Link> arena to the best padel tennis courts in lahore. <br />
                </p>

                {/* CTA Button */}
                <div className="hero-cta-group">
                    <Link to="/waitlist" className="waitlist-cta-button">
                        Join Waitlist
                    </Link>
                </div>

                {/* Phone Mockup Area */}
                <div className="hero-phone-wrapper">
                    {/* Phone Device Image */}
                    <img
                        src="/image/home.png"
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
