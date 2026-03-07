import React, { useState } from 'react';
import './VendorSection.css';
import { contactService } from '../services/contactService';

const VendorSection = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        venueName: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const openModal = () => {
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setShowModal(false);
        setSubmitSuccess(false);
        setFormData({
            name: '',
            email: '',
            phone: '',
            venueName: '',
            message: ''
        });
        document.body.style.overflow = 'unset';
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await contactService.submitContactForm({
                firstName: formData.name,
                lastName: '(Vendor Demo)',
                email: formData.email,
                phone: formData.phone,
                message: `Venue: ${formData.venueName}. Message: ${formData.message}`,
                type: 'Vendor Demo Request'
            });

            setSubmitSuccess(true);
            setTimeout(() => {
                closeModal();
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

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

                    <button onClick={openModal} className="book-demo-button">
                        Book a Demo
                    </button>

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
                                <p className="feature-desc">Simplify indoor cricket ground, padel court, and football turf reservations in lahore, eliminate double-bookings, and manage your daily schedule effortlessly from a single, centralized dashboard.</p>
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
                        src="/image/jkl.png"
                        alt="Arena Pro Web Portal"
                        className="vendor-laptop-img"
                    />
                </div>
            </div>

            {/* Demo Booking Modal */}
            {showModal && (
                <div className="demo-modal-overlay" onClick={closeModal}>
                    <div className="demo-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="demo-modal-close" onClick={closeModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {submitSuccess ? (
                            <div className="demo-success-message">
                                <div className="demo-success-icon">
                                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="32" cy="32" r="32" fill="#e8ee26" />
                                        <path d="M20 32L28 40L44 24" stroke="#004d43" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h2 className="demo-success-title">Request Received! 🎉</h2>
                                <p className="demo-success-text">
                                    Thank you for your interest in Arena Pro! Our team will contact you shortly to schedule your personalized demo.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="demo-modal-header">
                                    <h2 className="demo-modal-title">Book a Demo</h2>
                                    <p className="demo-modal-subtitle">
                                        See how Arena Pro can transform your venue management
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="demo-form">
                                    <div className="demo-form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className="demo-form-row">
                                        <div className="demo-form-group">
                                            <label htmlFor="email">Email *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="your@email.com"
                                            />
                                        </div>

                                        <div className="demo-form-group">
                                            <label htmlFor="phone">Phone Number *</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="+92 300 1234567"
                                            />
                                        </div>
                                    </div>

                                    <div className="demo-form-group">
                                        <label htmlFor="venueName">Venue/Club Name *</label>
                                        <input
                                            type="text"
                                            id="venueName"
                                            name="venueName"
                                            value={formData.venueName}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your venue or club name"
                                        />
                                    </div>

                                    <div className="demo-form-group">
                                        <label htmlFor="message">Message (Optional)</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="4"
                                            placeholder="Tell us about your venue and what you'd like to see in the demo..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="demo-submit-button"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Request Demo'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default VendorSection;
