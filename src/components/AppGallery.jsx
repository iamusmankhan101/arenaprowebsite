import React from 'react';
import './AppGallery.css';

const AppGallery = () => {
    return (
        <section className="app-gallery-section" id="gallery">
            <div className="app-gallery-header">
                <h2 className="app-gallery-title">Clean & <span className="highlight-text-blue">Modern Interface</span></h2>
                <p className="app-gallery-desc">Experience our sleek and user-friendly interface.</p>
            </div>

            <div className="app-gallery-slider-container">
                <div className="app-gallery-track">
                    {/* Reusing App Cards for layout presentation */}
                    {[1, 2].map((group) => (
                        <React.Fragment key={group}>
                            <div className="ag-card">
                                <div className="ag-inner" style={{ backgroundImage: "linear-gradient(180deg, #0a192f, #020c1b)" }}>
                                    <div className="ag-content">
                                        <h4 className="ag-card-title" style={{ color: '#eab308' }}>TOURNAMENTS</h4>
                                        <p className="ag-card-desc">Explore Upcoming Tournaments</p>
                                        <img src="/image/Untitled design (27).png" alt="Tournaments App Screen" className="ag-phone-img" />
                                    </div>
                                    <div className="ag-decor ag-ball-1">🎾</div>
                                </div>
                            </div>
                            <div className="ag-card">
                                <div className="ag-inner" style={{ backgroundImage: "linear-gradient(180deg, #0f172a, #020617)" }}>
                                    <div className="ag-content">
                                        <h4 className="ag-card-title" style={{ color: '#a3e635' }}>TOURNAMENT RESULTS</h4>
                                        <p className="ag-card-desc">Stay Updated with Live Tournament Scores</p>
                                        <img src="/image/home.png" alt="Tournament Results App Screen" className="ag-phone-img" />
                                    </div>
                                    <div className="ag-decor ag-ball-2">🏀</div>
                                </div>
                            </div>
                            <div className="ag-card">
                                <div className="ag-inner" style={{ backgroundImage: "linear-gradient(180deg, #0a192f, #020c1b)" }}>
                                    <div className="ag-content">
                                        <h4 className="ag-card-title" style={{ color: '#fbbf24' }}>CLUB DISCOUNTS</h4>
                                        <p className="ag-card-desc">Access bank-specific club discounts instantly</p>
                                        <img src="/image/Copy of arena pro logoqr (3).png" alt="Discounts App Screen" className="ag-phone-img" />
                                    </div>
                                    <div className="ag-decor ag-ball-3">⚽</div>
                                </div>
                            </div>
                            <div className="ag-card">
                                <div className="ag-inner" style={{ backgroundImage: "linear-gradient(180deg, #0f172a, #020617)" }}>
                                    <div className="ag-content">
                                        <h4 className="ag-card-title" style={{ color: '#38bdf8' }}>PLAYER STATS</h4>
                                        <p className="ag-card-desc">Track and improve your game performance</p>
                                        <img src="/image/Copy of arena pro logoqr (1).png" alt="Stats App Screen" className="ag-phone-img" />
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AppGallery;
