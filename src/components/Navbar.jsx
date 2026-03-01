import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Menu, X, Instagram } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ forceScrolled = false }) => {
    const [scrolled, setScrolled] = useState(forceScrolled);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (forceScrolled) return;
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [forceScrolled]);

    const toggleMenu = () => {
        setMobileOpen(!mobileOpen);
        // Prevent scrolling when menu is open
        document.body.style.overflow = !mobileOpen ? 'hidden' : 'unset';
    };

    const closeMenu = () => {
        setMobileOpen(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    <img src="/image/pitch it logo (500 x 200 px) (2).png" alt="ArenaPro" className="logo-img" />
                </Link>

                {/* Mobile Toggle Button */}
                <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                    {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop and Mobile Links */}
                <div className={`nav-links ${mobileOpen ? 'active' : ''}`}>
                    <div className="mobile-menu-header">
                        <img src="/image/pitch it logo (500 x 200 px) (2).png" alt="ArenaPro" className="mobile-logo-img" />
                    </div>

                    <div className="nav-links-wrapper">
                        <Link to="/" className="nav-link" onClick={closeMenu} style={{ '--i': 0 }}>Home</Link>
                        <Link to="/how-it-works" className="nav-link" onClick={closeMenu} style={{ '--i': 1 }}>How it Works</Link>
                        <Link to="/venues" className="nav-link" onClick={closeMenu} style={{ '--i': 2 }}>Venues</Link>
                        <Link to="/blog" className="nav-link" onClick={closeMenu} style={{ '--i': 3 }}>Blog</Link>
                        <Link to="/contact" className="nav-link" onClick={closeMenu} style={{ '--i': 4 }}>Contact</Link>
                    </div>

                    <div className="mobile-menu-footer">
                        <button className="navbar-cta mobile-cta" onClick={closeMenu}>Download App</button>
                        <div className="mobile-socials">
                            <a href="#" className="social-icon"><Instagram size={20} /></a>
                        </div>
                        <p className="mobile-copy">© 2026 Arena Pro. All rights reserved.</p>
                    </div>
                </div>

                <button className="navbar-cta desktop-cta">Download App</button>
            </div>
        </nav>
    )
}

export default Navbar;
