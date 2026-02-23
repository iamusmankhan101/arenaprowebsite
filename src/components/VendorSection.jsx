import React from 'react';
import './VendorSection.css';

const VendorSection = () => {
    return (
        <section className="vendor-section" id="vendor-portal">
            <div className="vendor-container">
                {/* Left Side Content */}
                <div className="vendor-text-content">
                    <h2 className="vendor-title">
                        Arena Pro for <span className="vendor-highlight">Clubs</span> and <span className="vendor-highlight">Coaches</span>
                    </h2>
                    <p className="vendor-description">
                        Are you managing a club or coaching? Arena Pro provides customized solutions to streamline your operations. Manage bookings, communicate with members, and ensure a superior experience for your players with our comprehensive platform designed for clubs and coaches.
                    </p>

                    <div className="vendor-features">
                        {/* Feature 1 */}
                        <div className="vendor-feature-item">
                            <div className="feature-icon-wrapper">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" fill="#004d43" />
                                    <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h3 className="feature-title">Efficient Booking Management</h3>
                                <p className="feature-desc">Simplify court reservations and scheduling for your club's activities.</p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="vendor-feature-item">
                            <div className="feature-icon-wrapper">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" fill="#004d43" />
                                    <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h3 className="feature-title">Performance Tracking</h3>
                                <p className="feature-desc">Monitor player progress and track match results to optimize coaching strategies.</p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="vendor-feature-item">
                            <div className="feature-icon-wrapper">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" fill="#004d43" />
                                    <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h3 className="feature-title">Customizable Profiles</h3>
                                <p className="feature-desc">Personalize club information and showcase achievements to attract and engage new members.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side Image content */}
                <div className="vendor-image-content">
                    <div className="vendor-image-circle"></div>
                    <img
                        src="/image/jkl.png"
                        alt="Arena Pro Web Portal"
                        className="vendor-laptop-img"
                    />
                </div>
            </div>
        </section>
    );
};

export default VendorSection;
