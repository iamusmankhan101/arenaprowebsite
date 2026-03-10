import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { emailService } from './emailService';

export const waitlistService = {
    async joinWaitlist(email, type = 'Early Access') {
        try {
            // Save to Firebase for admin panel
            const waitlistRef = collection(db, 'waitlist');
            await addDoc(waitlistRef, {
                email,
                type,
                createdAt: serverTimestamp(),
                status: 'pending'
            });

            // Send welcome email using Resend (with optional template)
            console.log('Sending welcome email to:', email);
            try {
                // Replace 'your-template-id' with your actual Resend template ID
                await emailService.sendWaitlistWelcomeEmail(email, 'your-template-id');
                console.log('Welcome email sent successfully to:', email);
            } catch (emailError) {
                console.error('Failed to send welcome email:', emailError);
                // Don't throw error here - we still want to save to Firebase even if email fails
            }

            return true;
        } catch (error) {
            console.error("Error joining waitlist:", error);
            throw error;
        }
    }
};
