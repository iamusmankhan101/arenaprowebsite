import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timedOut, setTimedOut] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Safety timeout: If Firebase takes > 6 seconds, show a skip option
        const timeoutId = setTimeout(() => {
            if (loading) {
                console.warn('🕒 Auth initialization taking longer than expected...');
                setTimedOut(true);
            }
        }, 6000);

        // Handle redirect result
        const handleRedirect = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result && result.user) {
                    console.log('Successfully signed in via redirect');
                    await saveUserToFirestore(result.user, result.user.displayName);
                }
            } catch (err) {
                console.error('Redirect result error:', err);
            }
        };
        handleRedirect();

        return () => {
            unsubscribe();
            clearTimeout(timeoutId);
        };
    }, [loading]);

    const saveUserToFirestore = async (user, name) => {
        if (!user) return;
        
        try {
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            
            const userData = {
                uid: user.uid,
                email: user.email,
                fullName: name || user.displayName || 'ArenaPro User',
                displayName: name || user.displayName || 'ArenaPro User',
                photoURL: user.photoURL || null,
                createdAt: userSnap.exists() ? userSnap.data().createdAt : serverTimestamp(),
                updatedAt: serverTimestamp(),
                status: 'active',
                isActive: true,
                phoneNumber: user.phoneNumber || null,
            };

            await setDoc(userRef, userData, { merge: true });
            console.log('✅ User data synced to Firestore');
        } catch (error) {
            console.error('❌ Error syncing user to Firestore:', error);
        }
    };

    const signup = async (email, password, name) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await saveUserToFirestore(userCredential.user, name);
        return userCredential;
    };

    const login = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await saveUserToFirestore(result.user, result.user.displayName);
        return result;
    };

    const logout = () => {
        return signOut(auth);
    };

    const loginWithGoogle = async (useRedirect = false) => {
        const provider = new GoogleAuthProvider();
        
        if (useRedirect || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            return signInWithRedirect(auth, provider);
        }

        try {
            const result = await signInWithPopup(auth, provider);
            if (result.user) {
                await saveUserToFirestore(result.user, result.user.displayName);
            }
            return result;
        } catch (err) {
            if (err.code === 'auth/popup-blocked' || err.code === 'auth/cancelled-popup-request') {
                console.log('Popup blocked or cancelled, falling back to redirect...');
                return signInWithRedirect(auth, provider);
            }
            throw err;
        }
    };

    const value = {
        user,
        signup,
        login,
        loginWithGoogle,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: '#004d43',
                    color: 'white',
                    fontFamily: 'Montserrat, sans-serif',
                    textAlign: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid rgba(255,255,255,0.1)',
                        borderTop: '4px solid #e8e435',
                        borderRadius: '50%',
                        animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
                        marginBottom: '20px'
                    }}></div>
                    
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Arena Pro</h2>
                    <p style={{ opacity: 0.8, marginBottom: '20px' }}>Setting up your personalized sports experience...</p>
                    
                    {timedOut && (
                        <div style={{ 
                            marginTop: '20px', 
                            animation: 'fadeIn 0.5s ease' 
                        }}>
                            <p style={{ fontSize: '0.9rem', color: '#ffcc00', marginBottom: '15px' }}>
                                This is taking longer than usual. It might be due to a slow internet connection.
                            </p>
                            <button 
                                onClick={() => setLoading(false)}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    border: '1px solid white',
                                    padding: '10px 20px',
                                    borderRadius: '30px',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = 'white';
                                    e.target.style.color = '#004d43';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = 'white';
                                }}
                            >
                                Skip & Enter Site
                            </button>
                        </div>
                    )}

                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    `}</style>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};
