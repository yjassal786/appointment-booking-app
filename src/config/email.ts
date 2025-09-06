// Email Configuration using Resend
// Documentation: https://resend.com/docs/api-reference/introduction

export const EMAIL_CONFIG = {
  // Admin email where notifications will be sent
  ADMIN_EMAIL: 'awesomegymholic786@gmail.com', // Replace with your email
  
  // Sender email (use onboarding@resend.dev until domain verification)
  FROM_EMAIL: 'Fitness Questionnaire <onboarding@resend.dev>',
  
  // WhatsApp configuration
  WHATSAPP_NUMBER: '919876543210', // Replace with your WhatsApp number
  
  // UPI Payment details
  UPI_ID: 'fitness@paytm', // Replace with your UPI ID
};

// WordPress webhook URL (if using WordPress integration)
export const WORDPRESS_WEBHOOK = 'https://yourdomain.com/wp-json/custom/v1/questionnaire';

// Make sure to add VITE_RESEND_API_KEY to your .env file:
// VITE_RESEND_API_KEY=re_xxxxxxxxxxxx