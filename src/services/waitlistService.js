import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const waitlistService = {
    async joinWaitlist(email, type = 'Early Access') {
        try {
            const waitlistRef = collection(db, 'waitlist');
            await addDoc(waitlistRef, {
                email,
                type,
                createdAt: serverTimestamp(),
                status: 'pending'
            });
            return true;
        } catch (error) {
            console.error("Error joining waitlist:", error);
            throw error;
        }
    }
};
