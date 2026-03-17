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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

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

        return () => unsubscribe();
    }, []);
    const saveUserToFirestore = async (user, name) => {
        if (!user) return;
        
        try {
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            
            // Only update if user doesn't exist or we want to ensure latest info
            // For signup, we definitely want to set it
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
        
        // Sync to Firestore
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
            // Sync to Firestore
            if (result.user) {
                await saveUserToFirestore(result.user, result.user.displayName);
            }
            return result;
        } catch (err) {
            if (err.code === 'auth/popup-blocked' || err.code === 'auth/cancelled-popup-request') {
                console.log('Popup blocked or cancelled, falling back to redirect...');
                return signInWithRedirect(auth, provider);
            }
            if (err.code === 'auth/unauthorized-domain') {
                console.error('DOMAN AUTHORIZATION REQUIRED: Please add you domain to Firebase authorized domains.');
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
                    fontFamily: 'sans-serif'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid rgba(255,255,255,0.3)',
                        borderTop: '4px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <p style={{ marginTop: '20px', fontSize: '1.1em' }}>Loading Arena Pro...</p>
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};
