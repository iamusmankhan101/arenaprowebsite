export const whatsappService = {
    async sendBookingNotification({ customerName, phone, venueName, date, time, amount }) {
        try {
            const response = await fetch('/api/send-whatsapp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customerName, phone, venueName, date, time, amount })
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'WhatsApp send failed');
            console.log('WhatsApp notification sent:', result.sid);
            return result;
        } catch (error) {
            console.error('WhatsApp notification error:', error);
            // Non-fatal — don't rethrow, just log
            return { success: false, error: error.message };
        }
    }
};
