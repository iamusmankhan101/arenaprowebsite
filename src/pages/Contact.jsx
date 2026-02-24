import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Contact.css';
import { Headset, MessageSquare, Mail, Facebook, Instagram, Twitter, Phone } from 'lucide-react';

const Contact = () => {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const ACCESS_KEY = "4a9d7b4a-a4e9-4674-8b6b-4e8979685321"; // Temporary key - user can replace with theirs

        const data = {
            ...formData,
            access_key: ACCESS_KEY,
            subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
            to_email: "iamusmankhan101@gmail.com"
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.success) {
                setStatus('success');
                setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('error');
        }
    };

    return (
        <div className="contact-page">
            <Navbar />

            <section className="contact-hero">
                <div className="contact-hero-content">
                    <h1>Contact <span className="highlight">Us</span></h1>
                    <p>We're here to help you get the most out of Arena Pro.</p>
                </div>
            </section>

            <main className="contact-container">
                <div className="contact-card">
                    {/* Left Column: Form */}
                    <div className="contact-form-section">
                        <h2>Send us a message</h2>
                        <p className="form-subtitle">
                            Do you have a question? A complaint? Or need any help to choose the right product from Arena Pro? Feel free to contact us.
                        </p>

                        {status === 'success' ? (
                            <div className="submission-success">
                                <div className="success-icon">✓</div>
                                <h2>Message Sent!</h2>
                                <p>Thank you for contacting us. We will get back to you shortly at {formData.email}.</p>
                                <button className="reset-btn" onClick={() => setStatus('idle')}>Send another message</button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="Enter your first name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Enter your last name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Contact Details</label>
                                        <div className="phone-input-wrapper">
                                            <div className="country-prefix">
                                                <span>+92</span>
                                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1L5 5L9 1" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Enter your contact number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group full-width">
                                    <label>Message</label>
                                    <textarea
                                        name="message"
                                        placeholder="Enter your message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <p className="error-message">Oops! Something went wrong. Please try again later.</p>
                                )}

                                <div className="form-actions">
                                    <button type="submit" className={`send-btn ${status === 'loading' ? 'loading' : ''}`} disabled={status === 'loading'}>
                                        {status === 'loading' ? 'Sending...' : 'Send a Message'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Right Column: Info Box */}
                    <div className="contact-info-section">
                        <div className="info-content">
                            <h3>Hi! We are always here to help you.</h3>

                            <div className="info-blocks">
                                <div className="info-block">
                                    <div className="info-icon">
                                        <Headset size={24} />
                                    </div>
                                    <div className="info-text">
                                        <span className="info-label">Hotline:</span>
                                        <span className="info-value">+92 300 1234567</span>
                                    </div>
                                </div>

                                <div className="info-block">
                                    <div className="info-icon">
                                        <MessageSquare size={24} />
                                    </div>
                                    <div className="info-text">
                                        <span className="info-label">SMS / Whatsapp:</span>
                                        <span className="info-value">+92 300 7654321</span>
                                    </div>
                                </div>

                                <div className="info-block">
                                    <div className="info-icon">
                                        <Mail size={24} />
                                    </div>
                                    <div className="info-text">
                                        <span className="info-label">Email:</span>
                                        <span className="info-value">support@arenapro.pk</span>
                                    </div>
                                </div>
                            </div>

                            <div className="info-footer">
                                <span className="connect-label">Connect with us</span>
                                <div className="contact-socials">

                                    <a href="https://www.instagram.com/arenapropk" target="_blank" rel="noopener noreferrer">
                                        <Instagram size={20} />
                                    </a>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;
