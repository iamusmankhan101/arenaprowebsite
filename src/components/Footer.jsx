import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            {/* CTA Banner for Venue Owners */}
            <div className="footer-cta-banner">
                <div className="footer-cta-content">
                    <div className="footer-cta-text">
                        <span className="footer-cta-label">FOR VENUE OWNERS</span>
                        <h3 className="footer-cta-title">List free. Get discovered. Take bookings on Easily.</h3>
                    </div>
                    <div className="footer-cta-buttons">
                        <Link to="/list-venue" className="footer-cta-btn primary">LIST YOUR VENUE</Link>
                    </div>
                </div>
            </div>

            <div className="footer-container">
                <div className="footer-grid">
                    {/* Column 1: Brand */}
                    <div className="footer-col brand-col">
                        <div className="footer-logo">
                            <img src="/image/pitch it logo (500 x 200 px) (2).png" alt="ArenaPro" className="footer-logo-img" />
                        </div>
                        <p className="footer-desc">
                            Discover padel, cricket, futsal, pickleball, and beach volleyball venues in Pakistan. Pick a time, reserve your slot, and confirm with the venue on WhatsApp.
                        </p>
                        <div className="footer-contact-item">
                            <Phone size={16} />
                            <a href="tel:+923712524553">+92 371 2524553</a>
                        </div>
                        <div className="footer-socials">
                            <a href="https://www.instagram.com/arenapropk" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Explore */}
                    <div className="footer-col">
                        <h4 className="footer-heading">EXPLORE</h4>
                        <ul className="footer-links">
                            <li><Link to="/venues">All venues</Link></li>
                            <li><Link to="/padel-court-lahore">Padel</Link></li>
                            <li><Link to="/indoor-cricket-lahore">Cricket</Link></li>
                            <li><Link to="/futsal-ground-lahore">Futsal</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: For Business */}
                    <div className="footer-col">
                        <h4 className="footer-heading">FOR BUSINESS</h4>
                        <ul className="footer-links">
                            <li><Link to="/list-venue">List your venue</Link></li>
                            <li><a href="https://admin.arenapropk.online" target="_blank" rel="noopener noreferrer">Vendor Portal</a></li>
                            <li><Link to="/faq">Owner FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal & Help */}
                    <div className="footer-col">
                        <h4 className="footer-heading">LEGAL & HELP</h4>
                        <ul className="footer-links">
                            <li><Link to="/privacy">Privacy policy</Link></li>
                            <li><Link to="/terms">Terms & conditions</Link></li>
                            <li><Link to="/faq">FAQs</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">© 2026 ArenaPro. All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
