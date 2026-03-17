import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Instagram, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = ({ forceScrolled = false }) => {
    const [scrolled, setScrolled] = useState(forceScrolled);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [areasOpen, setAreasOpen] = useState(false);
    const [sportsOpen, setSportsOpen] = useState(false);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

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

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

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
                                onClick={() => setSportsOpen(!sportsOpen)}
                            >
                                Sports <ChevronDown size={16} className={`dropdown-icon ${sportsOpen ? 'open' : ''}`} />
                            </button>
                            <div className={`dropdown-menu ${sportsOpen ? 'open' : ''}`}>
                                <Link to="/indoor-cricket-lahore" className="dropdown-item" onClick={closeMenu}>Indoor Cricket</Link>
                                <Link to="/padel-court-lahore" className="dropdown-item" onClick={closeMenu}>Padel Court</Link>
                                <Link to="/futsal-ground-lahore" className="dropdown-item" onClick={closeMenu}>Futsal Ground</Link>
                                <Link to="/badminton-court-lahore" className="dropdown-item" onClick={closeMenu}>Badminton</Link>
                            </div>
                        </div>

                        <div className="nav-dropdown" style={{ '--i': 4 }}>
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
                                <Link to="/waitlist" className="dropdown-item" onClick={closeMenu}>Waitlist</Link>
                            </div>
                        </div>

                        <Link to="/blog" className="nav-link" onClick={closeMenu} style={{ '--i': 4 }}>Blog</Link>
                        <Link to="/contact" className="nav-link" onClick={closeMenu} style={{ '--i': 5 }}>Contact</Link>
                    </div>

                    <div className="mobile-menu-footer">
                        {user ? (
                            <button className="navbar-cta mobile-cta" onClick={handleLogout}>Logout</button>
                        ) : (
                            <Link to="/login" className="navbar-cta mobile-cta" onClick={closeMenu}>Login</Link>
                        )}
                        <div className="mobile-socials">
                            <a href="https://www.instagram.com/arenapropk" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={20} /></a>
                        </div>
                        <p className="mobile-copy">© 2026 Arena Pro. All rights reserved.</p>
                    </div>
                </div>

                <div className="navbar-actions">
                    {user ? (
                        <div className="user-profile">
                            <Link to="/profile" className="user-avatar" title={user.displayName || user.email}>
                                <User size={18} />
                                <span className="user-name-short">{user.displayName?.split(' ')[0] || 'User'}</span>
                            </Link>
                            <button onClick={handleLogout} className="logout-icon-btn" title="Logout">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="navbar-cta desktop-cta">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
