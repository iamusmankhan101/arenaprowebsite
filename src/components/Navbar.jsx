import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

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

    const toggleMenu = () => setMobileOpen(!mobileOpen);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={() => setMobileOpen(false)}>
                    <img src="/image/pitch it logo (500 x 200 px) (2).png" alt="ArenaPro" className="logo-img" />
                </Link>

                {/* Mobile Toggle Button */}
                <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                    {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop and Mobile Links */}
                <div className={`nav-links ${mobileOpen ? 'active' : ''}`}>
                    <Link to="/how-it-works" className="nav-link" onClick={() => setMobileOpen(false)}>How it Works</Link>
                    <button className="navbar-cta mobile-cta">Download App</button>
                </div>

                <button className="navbar-cta desktop-cta">Download App</button>
            </div>
        </nav>
    )
}

export default Navbar;
