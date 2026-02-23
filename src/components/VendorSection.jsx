import React from 'react';
import './VendorSection.css';

const VendorSection = () => {
    return (
        <section className="vendor-section" id="vendor-portal">
            <div className="vendor-container">
                {/* Left Side Content */}
                <div className="vendor-text-content">
                    <h2 className="vendor-title">
                        Arena Pro for <span className="vendor-highlight">Venues</span> and <span className="vendor-highlight">Clubs</span>
                    </h2>
                    <p className="vendor-description">
                        Are you managing a sports venue or running a club? Arena Pro provides a dedicated vendor panel to streamline your daily operations. Manage your facilities, track reservations in real-time, and ensure a seamless experience for your players with our comprehensive platform designed specifically for venue owners and club managers.
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
                                <p className="feature-desc">Simplify court reservations, eliminate double-bookings, and manage your daily schedule effortlessly from a single, centralized dashboard.</p>
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
                                <h3 className="feature-title">Booking Time Tracking</h3>
                                <p className="feature-desc">Keep precise track of court usage and session durations. Ensure accurate billing and monitor your busiest slots with automated, real-time time logging.</p>
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
                                <h3 className="feature-title">Daily Reporting</h3>
                                <p className="feature-desc">Gain instant insights into your venue's performance. Generate detailed daily summaries on revenue, total bookings, and facility utilization to make informed business decisions.</p>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="vendor-feature-item">
                            <div className="feature-icon-wrapper">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" fill="#004d43" />
                                    <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h3 className="feature-title">Seamless Revenue Management</h3>
                                <p className="feature-desc">Easily track daily earnings, manage pricing tiers for peak and off-peak hours, and handle both online and on-site payments securely.</p>
                            </div>
                        </div>

                        {/* Feature 5 */}
                        <div className="vendor-feature-item">
                            <div className="feature-icon-wrapper">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" fill="#004d43" />
                                    <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h3 className="feature-title">Dynamic Availability Control</h3>
                                <p className="feature-desc">Instantly block out courts for maintenance, tournaments, or private coaching sessions, ensuring players only ever see your true real-time availability.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side Image content */}
                <div className="vendor-image-content">
                    <div className="vendor-image-circle"></div>
                    <img
                        src="/image/GHJK.png"
                        alt="Arena Pro Web Portal"
                        className="vendor-laptop-img"
                    />
                </div>
            </div>
        </section>
    );
};

export default VendorSection;
