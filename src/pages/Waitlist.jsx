import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Waitlist.css';
import { waitlistService } from '../services/waitlistService';
import { Loader2 } from 'lucide-react';

function Waitlist() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 24,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Check if form was successfully submitted
        if (searchParams.get('success') === 'true') {
            setShowModal(true);
            // Remove the success parameter from URL
            searchParams.delete('success');
            setSearchParams(searchParams);
        }
    }, [searchParams, setSearchParams]);

    useEffect(() => {
        // Set a fixed launch date (April 10, 2026 at 12:00 PM)
        const launchDate = new Date('2026-04-10T12:00:00');

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = launchDate.getTime() - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            } else {
                // Launch date has passed
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const closeModal = () => {
        setShowModal(false);
    };

    const handleJoinWaitlist = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await waitlistService.joinWaitlist(email);
            setShowModal(true);
            setEmail('');
        } catch (error) {
            alert("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="waitlist-page">
                <div className="waitlist-container">


                    <h1 className="waitlist-title">
                        Book Your Game,<br />Own The Arena
                    </h1>

                    <p className="waitlist-description">
                        Join thousands of players in Lahore who are ready to book cricket grounds, futsal courts, and padel venues instantly. Be the first to experience seamless sports booking.
                    </p>

                    <div className="countdown-container">
                        <div className="countdown-label">Launching In</div>
                        <div className="countdown-timer">
                            <div className="countdown-item">
                                <div className="countdown-value">{timeLeft.days}</div>
                                <div className="countdown-unit">Days</div>
                            </div>
                            <div className="countdown-separator">:</div>
                            <div className="countdown-item">
                                <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                                <div className="countdown-unit">Hours</div>
                            </div>
                            <div className="countdown-separator">:</div>
                            <div className="countdown-item">
                                <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                                <div className="countdown-unit">Minutes</div>
                            </div>
                            <div className="countdown-separator">:</div>
                            <div className="countdown-item">
                                <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                                <div className="countdown-unit">Seconds</div>
                            </div>
                        </div>
                    </div>

                    <div className="offer-badge">
                        <span className="offer-icon">🎁</span>
                        <span className="offer-text">Early members get <strong>50% OFF</strong> on their first booking!</span>
                    </div>

                    <h2 className="form-heading">Join The Waitlist</h2>

                    <form onSubmit={handleJoinWaitlist} className="waitlist-form">
                        <div className="input-wrapper">
                            <svg className="email-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your email..."
                                required
                                className="email-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>
                        <button type="submit" className="join-button" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Join The Waitlist"}
                        </button>
                    </form>

                    <div className="social-proof">
                        <div className="avatars">
                            <div className="avatar">
                                <img src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
                            </div>
                            <div className="avatar">
                                <img src="https://i.pravatar.cc/150?img=33" alt="User avatar" />
                            </div>
                            <div className="avatar">
                                <img src="https://i.pravatar.cc/150?img=68" alt="User avatar" />
                            </div>
                            <div className="avatar">
                                <img src="https://i.pravatar.cc/150?img=25" alt="User avatar" />
                            </div>
                            <div className="avatar">
                                <img src="https://i.pravatar.cc/150?img=59" alt="User avatar" />
                            </div>
                        </div>
                        <p className="members-text">
                            Join <strong>2,500+</strong> sports enthusiasts already on the waitlist.
                        </p>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className="modal-icon">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="32" cy="32" r="32" fill="#e8ee26" />
                                <path d="M20 32L28 40L44 24" stroke="#004d43" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <h2 className="modal-title">You're on the List! 🎉</h2>

                        <p className="modal-description">
                            Welcome to Arena Pro! You'll be among the first to experience seamless sports venue booking in Lahore.
                        </p>

                        <div className="modal-benefits">
                            <div className="benefit-item">
                                <span className="benefit-icon">✓</span>
                                <span className="benefit-text">50% OFF your first booking</span>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon">✓</span>
                                <span className="benefit-text">Early access to new features</span>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon">✓</span>
                                <span className="benefit-text">Priority customer support</span>
                            </div>
                        </div>

                        <p className="modal-footer">
                            We'll notify you as soon as we launch. Get ready to own the arena!
                        </p>

                        <button className="modal-button" onClick={closeModal}>
                            Got It!
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default Waitlist;
