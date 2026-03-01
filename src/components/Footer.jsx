import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Column 1: Brand */}
                    <div className="footer-col brand-col">
                        <div className="footer-logo">
                            <img src="/image/pitch it logo (500 x 200 px) (2).png" alt="ArenaPro" className="footer-logo-img" />
                        </div>
                        <p className="footer-desc">
                            Discover and book top sports venues instantly. From futsal courts and padel to indoor cricket — Arena Pro is your all-in-one sports booking app in Lahore.
                        </p>
                        <div className="footer-socials">
                            <a href="https://www.instagram.com/arenapropk" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/how-it-works">How It Works</Link></li>
                            <li><Link to="/venues">Venues</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Sports */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Sports</h4>
                        <ul className="footer-links">
                            <li><Link to="/venues">Indoor Cricket</Link></li>
                            <li><Link to="/venues">Futsal</Link></li>
                            <li><Link to="/venues">Padel</Link></li>
                            <li><Link to="/venues">Tennis</Link></li>
                            <li><Link to="/venues">Badminton</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Contact Us</h4>
                        <ul className="footer-contact-list">
                            <li>
                                <Phone size={16} />
                                <a href="tel:+923390078965">0339 0078965</a>
                            </li>
                            <li>
                                <Mail size={16} />
                                <a href="mailto:support@arenapropk.online">support@arenapropk.online</a>
                            </li>
                            <li>
                                <MapPin size={16} />
                                <span>Lahore, Punjab, Pakistan</span>
                            </li>
                        </ul>

                        <a
                            href="https://play.google.com/store"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-download-btn"
                        >
                            <img src="/image/pngtree-google-play-app-icon-vector-png-image_9183316.png" alt="Get it on Google Play" className="footer-playstore-img" />
                        </a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">© 2026 ArenaPro. All rights reserved | Made with ❤️ By Werzio</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
