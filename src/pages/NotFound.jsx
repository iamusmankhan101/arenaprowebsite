import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-page">
            <Navbar forceScrolled />
            <section className="not-found-section">
                <div className="not-found-bg-text">404</div>
                <div className="not-found-content">
                    <h1 className="not-found-title">Page not found</h1>
                    <p className="not-found-desc">
                        Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                    </p>
                    <Link to="/" className="not-found-btn">
                        Go to Home
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default NotFound;
