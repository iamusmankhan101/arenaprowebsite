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
import { auth } from '../config/firebase';

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
                if (result) {
                    console.log('Successfully signed in via redirect');
                }
            } catch (err) {
                console.error('Redirect result error:', err);
            }
        };
        handleRedirect();

        return () => unsubscribe();
    }, []);

    const signup = async (email, password, name) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        return userCredential;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
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
            return await signInWithPopup(auth, provider);
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
            {!loading && children}
        </AuthContext.Provider>
    );
};
