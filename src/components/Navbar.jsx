import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';

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
                <Link to="/" className="navbar-logo">
                    <img src="/image/pitch it logo (500 x 200 px) (2).png" alt="ArenaPro" className="logo-img" />
                </Link>
                <div className="nav-links">
                    <Link to="/how-it-works" className="nav-link">How it Works</Link>
                </div>
                <button className="navbar-cta">Download App</button>
            </div>
        </nav>
    )
}

export default Navbar;
