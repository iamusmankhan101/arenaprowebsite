const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        if (!process.env.RESEND_API_KEY) {
            return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
        }

        console.log('Testing audience addition for:', email);
        console.log('API Key exists:', !!process.env.RESEND_API_KEY);
        console.log('API Key length:', process.env.RESEND_API_KEY?.length);

        // Test different audience API formats
        const audienceId = 'a4e3f715-7436-48c4-9319-5fbe1f98c3b6';
        
        try {
            // Method 1: Standard format
            console.log('Trying standard format...');
            const result1 = await resend.contacts.create({
                email: email,
                firstName: '',
                lastName: '',
                unsubscribed: false,
                audienceId: audienceId
            });
            
            return res.status(200).json({
                success: true,
                method: 'standard',
                result: result1,
                audienceId: audienceId
            });
            
        } catch (error1) {
            console.log('Standard format failed:', error1.message);
            
            try {
                // Method 2: Without firstName/lastName
                console.log('Trying minimal format...');
                const result2 = await resend.contacts.create({
                    email: email,
                    audienceId: audienceId
                });
                
                return res.status(200).json({
                    success: true,
                    method: 'minimal',
                    result: result2,
                    audienceId: audienceId
                });
                
            } catch (error2) {
                console.log('Minimal format failed:', error2.message);
                
                try {
                    // Method 3: Check if audience exists first
                    console.log('Checking audience...');
                    const audiences = await resend.audiences.list();
                    console.log('Available audiences:', audiences);
                    
                    return res.status(500).json({
                        success: false,
                        error: 'All contact creation methods failed',
                        errors: [error1.message, error2.message],
                        availableAudiences: audiences,
                        testedAudienceId: audienceId
                    });
                    
                } catch (error3) {
                    return res.status(500).json({
                        success: false,
                        error: 'Complete failure',
                        errors: [error1.message, error2.message, error3.message],
                        testedAudienceId: audienceId
                    });
                }
            }
        }

    } catch (error) {
        console.error('Test audience error:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            details: error.response?.data || 'No additional details'
        });
    }
};