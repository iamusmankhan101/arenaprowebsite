import React from 'react';
import './DownloadApp.css';

const DownloadApp = () => {
    return (
        <section className="download-app-section" id="download">
            <div className="download-app-container">

                {/* Left Side: Text and Buttons */}
                <div className="download-text-content">
                    <h2 className="download-title">
                        Let's download free from apple and play store
                    </h2>
                    <p className="download-description">
                        Let's download Arena Pro for free from the Apple App Store and Google Play Store. Experience our innovative platform designed for sports enthusiasts.
                    </p>

                    <div className="download-buttons-group">


                        <a href="#" className="dl-store-badge">
                            <img src="/image/pngtree-google-play-app-icon-vector-png-image_9183316.png" alt="Get it on Google Play" />
                        </a>
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
