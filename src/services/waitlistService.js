import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

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

            // Send notification to admin and auto-reply to user via Web3Forms
            const formData = new FormData();
            formData.append('access_key', 'ab647f2f-c25d-4cd9-ac03-d48c21f21a9a');
            formData.append('name', 'New Waitlist Signup');
            formData.append('email', email); // User's email (this will be the reply-to)
            formData.append('subject', 'New Waitlist Signup - Arena Pro');
            formData.append('message', `New user joined the waitlist: ${email}`);
            
            // Auto-reply configuration for user
            formData.append('autoresponse', 'true');
            formData.append('autoresponse_subject', 'Welcome to Arena Pro Waitlist! 🎉');
            formData.append('autoresponse_message', `Hi there!

Thank you for joining the Arena Pro waitlist! You're now on the list to be among the first to experience seamless sports venue booking in Lahore.

As an early member, you'll receive:
✓ 20% OFF your first booking
✓ Early access to new features
✓ Priority customer support

We're launching soon and will notify you as soon as we're live. Get ready to own the arena!

Best regards,
The Arena Pro Team

---
Arena Pro - Book Your Game, Own The Arena
Website: https://arenapropk.online
Instagram: @arenapropk
Support: support@arenapropk.online`);

            console.log('Sending waitlist signup for:', email);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            console.log('Web3Forms response:', result);

            if (!response.ok) {
                console.error('Failed to send email notification:', result);
            } else {
                console.log('Waitlist signup processed successfully for:', email);
            }

            return true;
        } catch (error) {
            console.error("Error joining waitlist:", error);
            throw error;
        }
    }
};
