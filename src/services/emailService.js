// Email service using Resend API
export const emailService = {
    async sendWaitlistWelcomeEmail(email) {
        try {
            // Since we can't expose Resend API key in frontend,
            // we'll create a simple API endpoint or use a serverless function
            const response = await fetch('/api/send-waitlist-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: email,
                    subject: 'Welcome to Arena Pro Waitlist! 🎉',
                    html: `
                        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                            <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                <div style="text-align: center; margin-bottom: 30px;">
                                    <img src="https://arenapropk.online/image/arena_pro_logo.png" alt="Arena Pro" style="height: 60px;">
                                </div>
                                
                                <h1 style="color: #004d43; font-size: 28px; text-align: center; margin-bottom: 20px;">
                                    Welcome to Arena Pro! 🎉
                                </h1>
                                
                                <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                                    Hi there!
                                </p>
                                
                                <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                                    Thank you for joining the Arena Pro waitlist! You're now on the list to be among the first to experience seamless sports venue booking in Lahore.
                                </p>
                                
                                <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0;">
                                    <h3 style="color: #004d43; margin-bottom: 15px; font-size: 18px;">As an early member, you'll receive:</h3>
                                    <ul style="color: #333; font-size: 16px; line-height: 1.8; padding-left: 20px;">
                                        <li><strong>20% OFF</strong> your first booking</li>
                                        <li><strong>Early access</strong> to new features</li>
                                        <li><strong>Priority customer support</strong></li>
                                    </ul>
                                </div>
                                
                                <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                                    We're launching soon and will notify you as soon as we're live. Get ready to own the arena!
                                </p>
                                
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="https://arenapropk.online" style="background: #004d43; color: #e8ee26; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                                        Visit Arena Pro
                                    </a>
                                </div>
                                
                                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                                
                                <div style="text-align: center; color: #666; font-size: 14px;">
                                    <p style="margin-bottom: 10px;"><strong>Arena Pro - Book Your Game, Own The Arena</strong></p>
                                    <p style="margin-bottom: 5px;">Website: <a href="https://arenapropk.online" style="color: #004d43;">https://arenapropk.online</a></p>
                                    <p style="margin-bottom: 5px;">Instagram: <a href="https://instagram.com/arenapropk" style="color: #004d43;">@arenapropk</a></p>
                                    <p>Support: <a href="mailto:support@arenapropk.online" style="color: #004d43;">support@arenapropk.online</a></p>
                                </div>
                            </div>
                        </div>
                    `
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
};