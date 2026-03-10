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

            // Add to Resend audience first
            console.log('Adding to Resend audience:', email);
            try {
                await emailService.addToAudience(email);
                console.log('Successfully added to Resend audience:', email);
            } catch (audienceError) {
                console.error('Failed to add to Resend audience:', audienceError);
                // Continue even if audience addition fails
            }

            // Send welcome email using Resend - simplified approach
            console.log('Sending welcome email to:', email);
            try {
                await emailService.sendWaitlistWelcomeEmail(email);
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
