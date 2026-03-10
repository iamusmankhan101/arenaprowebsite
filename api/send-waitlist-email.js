import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { to, subject, html } = req.body;

        // Validate required fields
        if (!to || !subject || !html) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(to)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Send email using Resend
        const data = await resend.emails.send({
            from: 'Arena Pro <noreply@arenapropk.online>',
            to: [to],
            subject: subject,
            html: html,
        });

        console.log('Email sent successfully:', data);
        return res.status(200).json({ success: true, data });

    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ 
            error: 'Failed to send email', 
            details: error.message 
        });
    }
}