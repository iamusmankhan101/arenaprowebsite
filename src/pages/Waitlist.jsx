import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Waitlist.css';

function Waitlist() {
    const [timeLeft, setTimeLeft] = useState({
        days: 24,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Set launch date to 24 days from now
        const launchDate = new Date();
        launchDate.setDate(launchDate.getDate() + 24);

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
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <Navbar />
            <div className="waitlist-page">
                <div className="waitlist-container">
                <div className="waitlist-badges">
                    <span className="badge">Coming Soon</span>
                    <span className="badge">Lahore</span>
                </div>

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

                <form action="https://api.web3forms.com/submit" method="POST" className="waitlist-form">
                    <input type="hidden" name="access_key" value="ab647f2f-c25d-4cd9-ac03-d48c21f21a9a" />
                    <input type="hidden" name="subject" value="New Waitlist Signup - Arena Pro 🎉" />
                    <input type="hidden" name="from_name" value="Arena Pro Waitlist" />
                    <input type="hidden" name="redirect" value="https://arenapropk.online/waitlist?success=true" />
                    
                    <div className="input-wrapper">
                        <svg className="email-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email..."
                            required
                            className="email-input"
                        />
                    </div>
                    <button type="submit" className="join-button">
                        Join The Waitlist
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
            <Footer />
        </>
    );
}

export default Waitlist;
