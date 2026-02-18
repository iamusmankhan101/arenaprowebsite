import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src="/image/pitch it logo (500 x 200 px) (2).png" alt="ArenaPro" className="logo-img" />
                </div>
                <button className="navbar-cta">Download App</button>
            </div>
        </nav>
    )
}

export default Navbar
