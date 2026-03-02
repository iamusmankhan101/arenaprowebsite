import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Menu, X, Instagram, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ forceScrolled = false }) => {
    const [scrolled, setScrolled] = useState(forceScrolled);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [areasOpen, setAreasOpen] = useState(false);

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
        document.body.style.overflow = !mobileOpen ? 'hidden' : 'unset';
    };

    const closeMenu = () => {
        setMobileOpen(false);
        setAreasOpen(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    <img src="/image/pitch it logo (500 x 200 px) (2).png" alt="ArenaPro" className="logo-img" />
                </Link>

                <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                    {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                <div className={`nav-links ${mobileOpen ? 'active' : ''}`}>
                    <div className="mobile-menu-header">
                        <img src="/image/pitch it logo (500 x 200 px) (2).png" alt="ArenaPro" className="mobile-logo-img" />
                    </div>

                    <div className="nav-links-wrapper">
                        <Link to="/" className="nav-link" onClick={closeMenu} style={{ '--i': 0 }}>Home</Link>
                        <Link to="/how-it-works" className="nav-link" onClick={closeMenu} style={{ '--i': 1 }}>How it Works</Link>
                        <Link to="/venues" className="nav-link" onClick={closeMenu} style={{ '--i': 2 }}>Venues</Link>
                        
                        <div className="nav-dropdown" style={{ '--i': 3 }}>
                            <button 
                                className="nav-link dropdown-trigger" 
                                onClick={() => setAreasOpen(!areasOpen)}
                            >
                                Areas <ChevronDown size={16} className={`dropdown-icon ${areasOpen ? 'open' : ''}`} />
                            </button>
                            <div className={`dropdown-menu ${areasOpen ? 'open' : ''}`}>
                                <Link to="/venues/johar-town" className="dropdown-item" onClick={closeMenu}>Johar Town</Link>
                                <Link to="/venues/model-town" className="dropdown-item" onClick={closeMenu}>Model Town</Link>
                                <Link to="/venues/dha" className="dropdown-item" onClick={closeMenu}>DHA</Link>
                                <Link to="/venues/bahria-town" className="dropdown-item" onClick={closeMenu}>Bahria Town</Link>
                                <Link to="/venues/wapda-town" className="dropdown-item" onClick={closeMenu}>Wapda Town</Link>
                            </div>
                        </div>

                        <Link to="/blog" className="nav-link" onClick={closeMenu} style={{ '--i': 4 }}>Blog</Link>
                        <Link to="/contact" className="nav-link" onClick={closeMenu} style={{ '--i': 5 }}>Contact</Link>
                    </div>

                    <div className="mobile-menu-footer">
                        <button className="navbar-cta mobile-cta" onClick={closeMenu}>Download App</button>
                        <div className="mobile-socials">
                            <a href="https://www.instagram.com/arenapropk" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={20} /></a>
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
