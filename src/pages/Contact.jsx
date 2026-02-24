import React from 'react';
import Navbar from '../components/Navbar';
import './Contact.css';
import { Headset, MessageSquare, Mail, Facebook, Instagram, Twitter, Phone } from 'lucide-react';

const Contact = () => {
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

                        <form className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" placeholder="Enter your first name" />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Enter your last name" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" placeholder="Enter your email" />
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
                                        <input type="tel" placeholder="Enter your contact number" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>Message</label>
                                <textarea placeholder="Enter your message" rows="4"></textarea>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="send-btn">Send a Message</button>
                            </div>
                        </form>
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
