import React from 'react';
import './AppGallery.css';

const AppGallery = () => {
    return (
        <section className="app-gallery-section" id="gallery">
            <div className="app-gallery-header">
                <h2 className="display">Clean & <span className="secondary-color">Modern Interface</span></h2>
                <p className="app-gallery-desc">Experience our sleek and user-friendly interface.</p>
            </div>

            <div className="app-gallery-slider-container">
                <div className="app-gallery-track">
                    {[
                        '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png',
                        '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png'
                    ].map((img, index) => (
                        <div className="ag-card" key={index} style={{ boxShadow: 'none', background: 'transparent' }}>
                            <img
                                src={`/image/app ui arena pro/${img}`}
                                alt={`App Screen ${img}`}
                                className="ag-phone-img"
                                style={{ width: '100%', height: '100%', objectFit: 'contain', border: 'none', borderRadius: '10px', boxShadow: 'none', margin: '0' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AppGallery;
