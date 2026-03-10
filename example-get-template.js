// Example: How to get a template using Resend API
import { emailService } from './src/services/emailService.js';

// Example 1: Get a specific template by ID
async function getTemplateExample() {
    try {
        const templateId = 'waitlist-arena-pro'; // Arena Pro waitlist template
        const template = await emailService.getTemplate(templateId);
        
        console.log('Template Details:');
        console.log('ID:', template.template.id);
        console.log('Name:', template.template.name);
        console.log('Subject:', template.template.subject);
        console.log('HTML:', template.template.html);
        
        return template;
    } catch (error) {
        console.error('Failed to get template:', error.message);
    }
}

// Example 2: Get waitlist template (convenience method)
async function getWaitlistTemplateExample() {
    try {
        const template = await emailService.getWaitlistTemplate();
        console.log('Waitlist template retrieved:', template);
        return template;
    } catch (error) {
        console.error('Failed to get waitlist template:', error.message);
    }
}

// Example 3: Use template in email sending
async function sendEmailWithTemplate() {
    try {
        // First get the template to verify it exists
        const template = await emailService.getWaitlistTemplate();
        
        if (template.success) {
            // Now send email using the template
            const result = await emailService.sendWaitlistWelcomeEmail(
                'user@example.com',
                template.template.id
            );
            console.log('Email sent with template:', result);
        }
    } catch (error) {
        console.error('Failed to send email with template:', error.message);
    }
}

// Export functions for use
export {
    getTemplateExample,
    getWaitlistTemplateExample,
    sendEmailWithTemplate
};

// If running this file directly (for testing)
if (import.meta.url === `file://${process.argv[1]}`) {
    console.log('Testing template retrieval...');
    getTemplateExample();
}