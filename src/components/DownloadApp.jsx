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
                        <button className="dl-btn apple-dl-btn">
                            <div className="dl-btn-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.716 3.736C15.604 2.66 16.195 1.155 16.035 -0.016C15.004 0.026 13.435 0.672 12.512 1.745C11.69 2.698 10.978 4.223 11.168 5.378C12.316 5.467 13.824 4.814 14.716 3.736ZM16.208 5.483C14.782 5.483 13.312 6.444 12.553 6.444C11.791 6.444 10.59 5.567 9.387 5.594C7.818 5.623 6.368 6.505 5.558 7.917C3.901 10.79 5.138 15.034 6.75 17.37C7.535 18.508 8.441 19.8 9.691 19.768C10.916 19.734 11.378 19.006 12.836 19.006C14.296 19.006 14.718 19.768 16.002 19.768C17.306 19.768 18.11 18.6 18.887 17.458C19.794 16.12 20.17 14.823 20.2 14.757C20.143 14.735 17.437 13.687 17.408 10.607C17.382 8.031 19.531 6.84 19.642 6.782C18.398 4.975 16.48 5.483 16.208 5.483Z" fill="black" />
                                </svg>
                            </div>

                        </button>

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
