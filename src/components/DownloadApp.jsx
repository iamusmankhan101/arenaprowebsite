import React from 'react';
import { Link } from 'react-router-dom';
import './DownloadApp.css';

const DownloadApp = () => {
    return (
        <section className="download-app-section" id="download">
            <div className="download-app-container">

                {/* Left Side: Text and Buttons */}
                <div className="download-text-content">
                    <h2 className="download-title">
                        Join the Waitlist and Be the First to Book
                    </h2>
                    <p className="download-description">
                        Sign up now to get early access to Arena Pro. Be among the first to experience seamless sports venue booking in Lahore and get 50% off your first booking.
                    </p>

                    <div className="download-buttons-group">
                        <Link to="/waitlist" className="waitlist-download-button">
                            Join Waitlist Now
                        </Link>
                    </div>

                </div>

                {/* Right Side: Phone Image Overlay Design */}
                <div className="download-image-content">
                    <div className="dl-image-wrapper">
                        <img src="/image/DownloadAppMockup.png" alt="Arena Pro App Interface" className="dl-phone-mockup" />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default DownloadApp;
