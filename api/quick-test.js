const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'GET') {
        try {
            // Quick test - just try to add a test email to audience
            const testEmail = 'test@example.com';
            const audienceId = 'a4e3f715-7436-48c4-9319-5fbe1f98c3b6';
            
            console.log('Quick test - adding to audience...');
            
            const result = await resend.contacts.create({
                email: testEmail,
                audienceId: audienceId
            });
            
            return res.status(200).json({
                success: true,
                message: 'Audience test successful',
                result: result,
                audienceId: audienceId
            });
            
        } catch (error) {
            console.error('Quick test failed:', error);
            
            return res.status(500).json({
                success: false,
                error: error.message,
                audienceId: 'a4e3f715-7436-48c4-9319-5fbe1f98c3b6',
                apiKeyExists: !!process.env.RESEND_API_KEY
            });
        }
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
};