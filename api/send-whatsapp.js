const twilio = require('twilio');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') { res.status(200).end(); return; }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { accountSid, authToken } = {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN
    };

    if (!accountSid || !authToken) {
        return res.status(500).json({ error: 'Twilio credentials not configured' });
    }

    try {
        const { phone, customerName, venueName, date, time, amount } = req.body;

        if (!phone) return res.status(400).json({ error: 'Phone number is required' });

        // Normalize Pakistani number to E.164 format
        let normalizedPhone = phone.replace(/\s+/g, '').replace(/-/g, '');
        if (normalizedPhone.startsWith('0')) {
            normalizedPhone = '+92' + normalizedPhone.slice(1);
        } else if (!normalizedPhone.startsWith('+')) {
            normalizedPhone = '+' + normalizedPhone;
        }

        const client = twilio(accountSid, authToken);

        const message = await client.messages.create({
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'}`,
            to: `whatsapp:${normalizedPhone}`,
            body: `🏟️ *Arena Pro – Booking Received!*\n\nHi ${customerName},\n\nYour booking has been submitted successfully.\n\n📍 *Venue:* ${venueName}\n📅 *Date:* ${date}\n⏰ *Time:* ${time}\n💰 *Amount:* PKR ${amount}\n\nOur team will contact you shortly to confirm.\n\n_Arena Pro – Book Your Game, Own The Arena_`
        });

        console.log('WhatsApp message sent:', message.sid);
        return res.status(200).json({ success: true, sid: message.sid });
    } catch (error) {
        console.error('WhatsApp send error:', error);
        return res.status(500).json({ error: error.message });
    }
};
