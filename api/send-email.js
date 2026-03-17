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
        const { email, type, bookingData } = req.body;

        // Validate basic required fields
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Check if Resend API key is available
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not set');
            return res.status(500).json({ error: 'Email service not configured' });
        }

        const emailType = type || 'waitlist'; // Default to waitlist for backward compatibility
        console.log(`Processing ${emailType} request for:`, email);

        if (emailType === 'waitlist') {
            // --- WAITLIST LOGIC ---
            const results = {
                email,
                audienceAdded: false,
                welcomeEmailSent: false,
                adminNotificationSent: false,
                errors: []
            };

            // 1. Add to audience
            try {
                await resend.contacts.create({
                    email: email,
                    audienceId: 'a4e3f715-7436-48c4-9319-5fbe1f98c3b6'
                });
                results.audienceAdded = true;
            } catch (err) {
                results.errors.push(`Audience: ${err.message}`);
            }

            // 2. Welcome Email
            try {
                await resend.emails.send({
                    from: 'Arena Pro <support@arenapropk.online>',
                    to: [email],
                    subject: 'Welcome to Arena Pro Waitlist! 🎉',
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h1 style="color: #004d43;">Welcome to Arena Pro! 🎉</h1>
                            <p>Thank you for joining our waitlist! You're now on the list to experience seamless sports venue booking in Lahore.</p>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <h3 style="color: #004d43;">Early member benefits:</h3>
                                <ul>
                                    <li><strong>50% OFF</strong> your first booking</li>
                                    <li>Early access to new features</li>
                                </ul>
                            </div>
                            <p>We'll notify you as soon as we're live!</p>
                        </div>
                    `
                });
                results.welcomeEmailSent = true;
            } catch (err) {
                results.errors.push(`Email: ${err.message}`);
            }

            // 3. Admin Notification
            try {
                await resend.emails.send({
                    from: 'Arena Pro <support@arenapropk.online>',
                    to: 'iamusmankhan101@gmail.com',
                    subject: 'New Waitlist Signup',
                    html: `<p>New waitlist signup: <strong>${email}</strong></p>`
                });
                results.adminNotificationSent = true;
            } catch (err) {
                results.errors.push(`Admin: ${err.message}`);
            }

            return res.status(200).json({ success: true, results });

        } else if (emailType === 'booking') {
            // --- BOOKING CONFIRMATION LOGIC ---
            if (!bookingData) {
                return res.status(400).json({ error: 'Booking data is required for confirmation emails' });
            }

            const { venueName, date, time, customerName, totalAmount } = bookingData;

            // 1. Send Confirmation to User
            const userEmailPromise = resend.emails.send({
                from: 'Arena Pro <support@arenapropk.online>',
                to: [email],
                subject: `Arena Pro Booking Confirmation: ${venueName} - ${date}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
                        <h2 style="color: #004d43;">Booking Confirmation</h2>
                        <p>Hi ${customerName},</p>
                        <p>This email is to confirm your booking at <strong>${venueName}</strong> through Arena Pro. We’ve got you all set for a late-night session!</p>
                        
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #eee;">
                            <h3 style="margin-top: 0; color: #004d43; border-bottom: 2px solid #004d43; padding-bottom: 10px;">Here are your booking details:</h3>
                            <p style="margin: 10px 0;"><strong>Date:</strong> ${date}</p>
                            <p style="margin: 10px 0;"><strong>Time:</strong> ${time}</p>
                            <p style="margin: 10px 0;"><strong>Location:</strong> ${venueName}</p>
                            <p style="margin: 10px 0;"><strong>Platform:</strong> Booked via Arena Pro</p>
                        </div>

                        <p>Please ensure you arrive a few minutes early to check in at the front desk. If you need to make any changes or cancellations, you can manage your reservation directly through the Arena Pro app.</p>
                        
                        <p style="font-weight: bold; font-size: 1.1em; color: #004d43; margin-top: 30px;">Enjoy your game!</p>
                        
                        <p style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
                            Best regards,<br>
                            <strong>Arena Pro Team</strong>
                        </p>
                    </div>
                `
            });

            // 2. Send Alert to Admin
            const adminEmailPromise = resend.emails.send({
                from: 'Arena Pro <support@arenapropk.online>',
                to: 'iamusmankhan101@gmail.com',
                subject: `New Booking Request: ${venueName}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px;">
                        <h2 style="color: #004d43;">New Booking Alert!</h2>
                        <p>A new booking has been made on the website.</p>
                        <ul>
                            <li><strong>Customer:</strong> ${customerName}</li>
                            <li><strong>Email:</strong> ${email}</li>
                            <li><strong>Venue:</strong> ${venueName}</li>
                            <li><strong>Date:</strong> ${date}</li>
                            <li><strong>Time:</strong> ${time}</li>
                            <li><strong>Amount:</strong> PKR ${totalAmount}</li>
                        </ul>
                        <p>Please check the admin panel for details.</p>
                    </div>
                `
            });

            // 1. Add to audience (Optional but recommended for consistency)
            try {
                await resend.contacts.create({
                    email: email,
                    firstName: customerName.split(' ')[0] || '',
                    lastName: customerName.split(' ').slice(1).join(' ') || '',
                    audienceId: 'a4e3f715-7436-48c4-9319-5fbe1f98c3b6'
                });
            } catch (err) {
                console.warn('Audience addition failed for booking:', err.message);
                // Continue sending emails even if audience addition fails
            }

            // 2. Send emails
            await Promise.all([userEmailPromise, adminEmailPromise]);
            return res.status(200).json({ success: true, message: 'Booking emails sent' });

        } else {
            return res.status(400).json({ error: 'Invalid email type' });
        }

    } catch (error) {
        console.error('Error in send-email API:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};