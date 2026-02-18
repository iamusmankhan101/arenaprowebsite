import React from 'react';
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
                            The all-in-one platform to manage your projects, team, and finance effortlessly.
                        </p>
                        <div className="footer-socials">
                            <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
                            <a href="#" className="social-link" aria-label="LinkedIn">in</a>
                            <a href="#" className="social-link" aria-label="Instagram">📸</a>
                        </div>
                    </div>

                    {/* Column 2: Product */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Product</h4>
                        <ul className="footer-links">
                            <li><a href="#">Features</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Integrations</a></li>
                            <li><a href="#">Changelog</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Company</h4>
                        <ul className="footer-links">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Legal</h4>
                        <ul className="footer-links">
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Security</a></li>
                        </ul>
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
