const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email } = req.body;

        // Validate required fields
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Check if Resend API key is available
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not set');
            return res.status(500).json({ error: 'Email service not configured' });
        }

        console.log('Processing waitlist signup for:', email);
        const results = {
            email: email,
            audienceAdded: false,
            welcomeEmailSent: false,
            adminNotificationSent: false,
            errors: []
        };

        // Step 1: Add user to audience (with full access API key)
        try {
            console.log('Adding contact to Resend audience...');
            console.log('Using audience ID: a4e3f715-7436-48c4-9319-5fbe1f98c3b6');
            
            const contactResult = await resend.contacts.create({
                email: email,
                firstName: '',
                lastName: '',
                unsubscribed: false,
                audienceId: 'a4e3f715-7436-48c4-9319-5fbe1f98c3b6'
            });
            
            console.log('Contact added to audience successfully:', contactResult);
            results.audienceAdded = true;
        } catch (audienceError) {
            console.error('Failed to add to audience - Full error:', audienceError);
            console.error('Error message:', audienceError.message);
            console.error('Error response:', audienceError.response?.data);
            results.errors.push(`Audience: ${audienceError.message}`);
        }

        // Step 2: Send welcome email to user
        try {
            console.log('Sending welcome email...');
            const welcomeEmailData = await resend.emails.send({
                from: 'Arena Pro <support@arenapropk.online>',
                to: [email],
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
                                    <li><strong>50% OFF</strong> your first booking</li>
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
            });
            console.log('Welcome email sent:', welcomeEmailData);
            results.welcomeEmailSent = true;
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            results.errors.push(`Welcome email: ${emailError.message}`);
        }

        // Step 3: Send admin notification
        try {
            console.log('Sending admin notification...');
            const adminEmailData = await resend.emails.send({
                from: 'Arena Pro <support@arenapropk.online>',
                to: 'iamusmankhan101@gmail.com', // Using your verified email
                subject: '🎉 New Waitlist Signup - Arena Pro',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #004d43;">New Waitlist Signup!</h2>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Joined:</strong> ${new Date().toLocaleString()}</p>
                            <p><strong>Source:</strong> Arena Pro Waitlist Form</p>
                        </div>
                        <p style="color: #666; font-size: 14px;">
                            This user has been automatically added to your Resend audience and received a welcome email.
                        </p>
                    </div>
                `
            });
            console.log('Admin notification sent:', adminEmailData);
            results.adminNotificationSent = true;
        } catch (adminEmailError) {
            console.error('Failed to send admin notification:', adminEmailError);
            results.errors.push(`Admin notification: ${adminEmailError.message}`);
        }

        // Return detailed results
        const success = results.welcomeEmailSent || results.audienceAdded;
        console.log('Final results:', results);
        
        return res.status(success ? 200 : 500).json({ 
            success: success,
            results: results
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ 
            error: 'Failed to send email', 
            details: error.message 
        });
    }
};