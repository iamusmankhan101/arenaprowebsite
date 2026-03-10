// Email service using Resend API - simplified approach
export const emailService = {
    async addToAudience(email, firstName = '', lastName = '') {
        try {
            const response = await fetch('/api/add-to-audience', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    firstName: firstName,
                    lastName: lastName
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${errorData.error}`);
            }

            const result = await response.json();
            console.log('Contact added to audience:', result);
            return result;
        } catch (error) {
            console.error('Error adding to audience:', error);
            throw error;
        }
    },

    async sendWaitlistWelcomeEmail(email) {
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${errorData.error}`);
            }

            const result = await response.json();
            console.log('Email sent successfully via Resend:', result);
            return result;
        } catch (error) {
            console.error('Error sending email:', error);
            
            // Fallback to Web3Forms if Resend fails
            try {
                console.log('Falling back to Web3Forms...');
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
✓ 50% OFF your first booking
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

                const fallbackResponse = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const fallbackResult = await fallbackResponse.json();
                
                if (fallbackResponse.ok) {
                    console.log('Email sent successfully via Web3Forms fallback:', fallbackResult);
                    return { success: true, data: fallbackResult, method: 'web3forms' };
                } else {
                    throw new Error(`Web3Forms fallback failed: ${fallbackResult.message}`);
                }
            } catch (fallbackError) {
                console.error('Both Resend and Web3Forms failed:', fallbackError);
                throw new Error('All email services failed');
            }
        }
    }
};