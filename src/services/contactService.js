import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const contactService = {
    async submitContactForm(formData) {
        try {
            const contactsRef = collection(db, 'contacts');
            await addDoc(contactsRef, {
                ...formData,
                fullName: `${formData.firstName} ${formData.lastName}`,
                createdAt: serverTimestamp(),
                status: 'unread'
            });
            return true;
        } catch (error) {
            console.error("Error submitting contact form:", error);
            throw error;
        }
    }
};
