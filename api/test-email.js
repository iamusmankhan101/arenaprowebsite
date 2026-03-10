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

    try {
        // Check if API key exists
        if (!process.env.RESEND_API_KEY) {
            return res.status(500).json({ 
                error: 'RESEND_API_KEY not configured',
                hasApiKey: false
            });
        }

        // Test basic email sending
        const testEmail = {
            from: 'Arena Pro <support@arenapropk.online>',
            to: ['test@example.com'], // This won't actually send
            subject: 'Test Email from Arena Pro',
            html: '<h1>Test Email</h1><p>This is a test email from Arena Pro.</p>'
        };

        console.log('Testing email configuration...');
        console.log('API Key exists:', !!process.env.RESEND_API_KEY);
        console.log('API Key length:', process.env.RESEND_API_KEY?.length || 0);
        
        return res.status(200).json({ 
            success: true,
            message: 'Email service is configured',
            hasApiKey: true,
            apiKeyLength: process.env.RESEND_API_KEY?.length || 0,
            testEmailConfig: testEmail
        });

    } catch (error) {
        console.error('Test email error:', error);
        return res.status(500).json({ 
            error: 'Test failed', 
            details: error.message,
            hasApiKey: !!process.env.RESEND_API_KEY
        });
    }
};