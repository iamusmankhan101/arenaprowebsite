// Simple email service using Web3Forms with autoresponse
export const emailService = {
    async sendWaitlistWelcomeEmail(email) {
        try {
            const formData = new FormData();
            formData.append('access_key', 'ab647f2f-c25d-4cd9-ac03-d48c21f21a9a');
            formData.append('name', 'Arena Pro Waitlist');
            formData.append('email', email);
            formData.append('subject', 'New Waitlist Signup');
            formData.append('message', `New user joined the waitlist: ${email}`);
            
            // Enable autoresponse to send welcome email to user
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

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(`Web3Forms error: ${result.message}`);
            }

            console.log('Email sent successfully via Web3Forms:', result);
            return { success: true, data: result };
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
};