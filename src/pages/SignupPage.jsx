import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import './AuthPages.css';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        setError('');

        try {
            await signup(email, password, name);
            navigate('/venues');
        } catch (err) {
            setError('Failed to create an account. ' + err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-split-container">
                {/* Left Side: Form (White Background) */}
                <div className="auth-form-side">
                    <div className="auth-logo-wrapper">
                        <Link to="/">
                            <img src="/image/pitch it logo (500 x 200 px) (2).png" alt="ArenaPro Logo" className="auth-logo" />
                        </Link>
                    </div>

                    <div className="auth-card">
                        <div className="auth-header">
                            <h1>Create Account</h1>
                            <p>Sign up to start booking your favorite sports venues and track your matches.</p>
                        </div>

                        {error && <div className="auth-error">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-wrapper">
                                    <User size={18} />
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email address</label>
                                <div className="input-wrapper">
                                    <Mail size={18} />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <Lock size={18} />
                                    <input
                                        type="password"
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <div className="input-wrapper">
                                    <Lock size={18} />
                                    <input
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
                            </button>
                        </form>

                        <div className="auth-divider">OR</div>

                        <div className="social-buttons">
                            <button className="social-btn">
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" alt="Google" />
                                Sign up with Google
                            </button>
                            <button className="social-btn">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
                                Sign up with Apple
                            </button>
                        </div>

                        <div className="auth-footer">
                            <p>Already have an account? <Link to="/login">Sign In</Link></p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Hero (Teal Branding) */}
                <div className="auth-hero-side">
                    <button onClick={() => navigate('/')} className="back-btn-overlay">
                        <ArrowLeft size={18} /> Back to website
                    </button>

                    <div className="hero-overlay-content">
                        <h2>Join the Pakistan's Premier Sports Network.</h2>

                        <div className="testimonial-block">
                            <p className="testimonial-text">
                                "Joining ArenaPro was the best decision for our weekend cricket matches. No more calls, no more uncertainty. Just pure game time."
                            </p>
                            <div className="testimonial-author">
                                <img src="https://i.pravatar.cc/150?u=arena2" alt="Ahmed Khan" className="author-avatar" />
                                <div className="author-info">
                                    <h4>Ahmed Khan</h4>
                                    <p>Regular Captain at Model Town Arena</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="partner-logos">
                        <span className="partner-label">TRUSTED BY TOP VENUES</span>
                        <div className="logo-grid">
                            <div className="partner-logo">ARENA</div>
                            <div className="partner-logo">FITNESS</div>
                            <div className="partner-logo">SPORTS</div>
                            <div className="partner-logo">PITCH</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
