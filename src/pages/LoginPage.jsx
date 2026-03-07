import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, ChevronLeft, AlertCircle } from 'lucide-react';
import './AuthPages.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/venues";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(email, password);
            navigate(from, { replace: true });
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
                {/* Left Hero Side */}
                <div
                    className="auth-hero-side"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=1974&auto=format&fit=crop')` }}
                >
                    <div className="hero-overlay-content">
                        <h2>The Ultimate Arena Experience.</h2>
                        <p>Sign in to access premium sports venues and manage your bookings effortlessly.</p>
                    </div>
                </div>

                {/* Right Form Side */}
                <div className="auth-form-side">
                    <button className="back-btn-overlay" onClick={() => navigate('/')}>
                        <ChevronLeft size={18} /> Back
                    </button>

                    <div className="auth-card">
                        <div className="auth-header">
                            <h1>Welcome Back!</h1>
                            <p>Enter your details to stay connected.</p>
                        </div>

                        {error && (
                            <div className="auth-error">
                                <AlertCircle size={18} /> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label>Email address</label>
                                <div className="input-wrapper">
                                    <Mail size={18} />
                                    <input
                                        type="email"
                                        placeholder="Hello@arenapro.pk"
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
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign in'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
