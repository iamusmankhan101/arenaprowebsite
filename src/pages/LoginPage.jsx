import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowLeft, Loader2, Github } from 'lucide-react';
import './AuthPages.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
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
                            <h1>Welcome Back!</h1>
                            <p>Sign in to access your dashboard and continue capturing your sports leads.</p>
                        </div>

                        {error && <div className="auth-error">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label>Email</label>
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
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Link to="/forgot-password" size={14} className="forgot-password">Forgot Password?</Link>
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
                            </button>
                        </form>


                        <div className="auth-footer">
                            <p>Don't have an Account? <Link to="/signup">Sign Up</Link></p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Hero (Teal Branding) */}
                <div className="auth-hero-side" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop')" }}>
                    <button onClick={() => navigate('/')} className="back-btn-overlay">
                        <ArrowLeft size={18} /> Back to website
                    </button>


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

export default LoginPage;
