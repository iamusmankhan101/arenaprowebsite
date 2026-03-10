import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GoogleAuthRelay = () => {
    const [status, setStatus] = useState('Initializing Google Sign-In...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleAuth = async () => {
            try {
                setStatus('Opening Google Sign-In...');
                const provider = new GoogleAuthProvider();
                const result = await signInWithPopup(auth, provider);

                setStatus('Sign-in successful! Extracting token...');
                const idToken = await result.user.getIdToken();

                setStatus('Redirecting back to Arena Pro app...');

                // Deep link back to the app
                const appUrl = `arenapro://auth-success?token=${idToken}`;

                // For better UX, we try to redirect after a short delay
                setTimeout(() => {
                    window.location.href = appUrl;
                }, 1000);

            } catch (err) {
                console.error('Google Auth Relay Error:', err);
                setError(err.message || 'Authentication failed');
                setStatus('Error occurred during sign-in.');
            }
        };

        handleAuth();
    }, []);

    return (
        <div className="auth-relay-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar forceScrolled={true} />

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <div style={{
                    background: 'white',
                    padding: '40px',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '100%'
                }}>
                    {!error ? (
                        <>
                            <Loader2 className="animate-spin" size={48} style={{ color: '#004d43', margin: '0 auto 20px' }} />
                            <h2 style={{ color: '#333', marginBottom: '10px' }}>Authenticating</h2>
                            <p style={{ color: '#666' }}>{status}</p>
                            <p style={{ fontSize: '12px', color: '#999', marginTop: '20px' }}>
                                Please don't close this window. You will be redirected back to the app automatically.
                            </p>
                        </>
                    ) : (
                        <>
                            <div style={{ color: '#ef4444', marginBottom: '20px', fontSize: '48px' }}>⚠️</div>
                            <h2 style={{ color: '#333', marginBottom: '10px' }}>Sign-In Failed</h2>
                            <p style={{ color: '#ef4444' }}>{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                style={{
                                    marginTop: '20px',
                                    background: '#004d43',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 24px',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}
                            >
                                Try Again
                            </button>
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default GoogleAuthRelay;
