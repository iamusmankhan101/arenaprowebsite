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
        const { email, firstName, lastName } = req.body;

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

        console.log('Adding contact to Resend audience:', email);

        // Create contact data with your specific audience ID
        const contactData = {
            email: email,
            firstName: firstName || '',
            lastName: lastName || '',
            unsubscribed: false,
            audienceId: 'a4e3f715-7436-48c4-9319-5fbe1f98c3b6' // Your Arena Pro audience ID
        };

        // Add contact to Resend
        const contact = await resend.contacts.create(contactData);

        console.log('Contact added successfully:', contact);
        return res.status(200).json({ success: true, contact });

    } catch (error) {
        console.error('Error adding contact to audience:', error);
        
        // Handle specific Resend errors
        if (error.message && error.message.includes('already exists')) {
            return res.status(200).json({ 
                success: true, 
                message: 'Contact already exists in audience',
                alreadyExists: true 
            });
        }
        
        return res.status(500).json({ 
            error: 'Failed to add contact to audience', 
            details: error.message 
        });
    }
};