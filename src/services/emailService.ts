import { EMAIL_CONFIG, WORDPRESS_WEBHOOK } from '../config/email';
import { QuestionnaireData, AppointmentData } from '../types';

// Email service configuration - easily switchable between providers
const EMAIL_SERVICE = {
  PROVIDER: 'RESEND', // Can be changed to 'SENDGRID', 'NODEMAILER', etc.
  API_URL: 'https://api.resend.com/emails',
  API_KEY: import.meta.env.VITE_RESEND_API_KEY,
  FALLBACK_MODE: !import.meta.env.VITE_RESEND_API_KEY, // Use demo mode if no API key
};

const IS_TESTING = true;
const TEST_FROM_EMAIL = 'onboarding@resend.dev';
const TEST_TO_EMAIL = 'awesomegymholic786@gmail.com';

const planNames = {
  basic: '3 Month Transformation (₹9,999)',
  premium: '6 Month Complete (₹17,999)',
  elite: '9 Month Elite (₹24,999)'
} as const;

export interface EmailData {
  questionnaire: QuestionnaireData;
  selectedPlan: string;
  appointment: AppointmentData;
}

export const sendQuestionnaireEmail = async (data: EmailData): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('🔄 Starting email send process...');
    
    // Check if API key is available
    if (!EMAIL_SERVICE.API_KEY) {
      console.warn('⚠️ No API key found - running in demo mode');
      return simulateEmailSend(data);
    }

    // Prepare email data
    const emailPayload = {
      from: IS_TESTING ? TEST_FROM_EMAIL : EMAIL_CONFIG.FROM_EMAIL,
      to: [IS_TESTING ? TEST_TO_EMAIL : EMAIL_CONFIG.ADMIN_EMAIL],
      subject: 'New Fitness Questionnaire Submission',
      html: createHtmlEmail(data),
      text: formatEmailMessage(data)
    };

    console.log('📧 Sending email to:', emailPayload.to);

    // Send email using Resend API
    const response = await fetch(EMAIL_SERVICE.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${EMAIL_SERVICE.API_KEY}`,
      },
      body: JSON.stringify(emailPayload)
    });

    // Handle response
    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Email API Error:', response.status, errorData);
      
      // Provide specific error messages
      if (response.status === 401) {
        throw new Error('Invalid API key - please check your Resend API key');
      } else if (response.status === 422) {
        throw new Error('Email validation failed - check sender/recipient addresses');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded - please try again later');
      } else {
        throw new Error(`Email service error: ${response.status} - ${errorData}`);
      }
    }

    const result = await response.json();
    console.log('✅ Email sent successfully! ID:', result.id);
    
    return { success: true };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('❌ Email sending failed:', errorMessage);
    
    // In production, you might want to retry or use fallback
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { 
        success: false, 
        error: 'Network error - please check your internet connection and try again' 
      };
    }
    
    return { success: false, error: errorMessage };
  }
};

// Fallback function for demo mode
const simulateEmailSend = async (data: EmailData): Promise<{ success: boolean; error?: string }> => {
  console.log('🎭 Demo Mode: Email would be sent with data:', {
    from: IS_TESTING ? TEST_FROM_EMAIL : EMAIL_CONFIG.FROM_EMAIL,
    to: IS_TESTING ? TEST_TO_EMAIL : EMAIL_CONFIG.ADMIN_EMAIL,
    subject: 'New Fitness Questionnaire Submission',
    message: formatEmailMessage(data)
  });

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log('✅ Demo email sent successfully!');
  return { success: true };
};

const createHtmlEmail = (data: EmailData): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
      <div style="background: linear-gradient(135deg, #ec4899, #f97316); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🏋️ New Fitness Consultation Request</h1>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">👤 Personal Details</h2>
        <table style="width: 100%; margin-bottom: 20px;">
          <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${data.appointment.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${data.appointment.email}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${data.appointment.phone}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">WhatsApp:</td><td>${EMAIL_CONFIG.WHATSAPP_NUMBER}</td></tr>
        </table>

        <h2 style="color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px;">📅 Appointment Details</h2>
        <table style="width: 100%; margin-bottom: 20px;">
          <tr><td style="padding: 8px 0; font-weight: bold;">Selected Plan:</td><td>${planNames[data.selectedPlan as keyof typeof planNames]}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Date:</td><td>${data.appointment.date}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Time:</td><td>${data.appointment.time}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">UPI ID:</td><td>${EMAIL_CONFIG.UPI_ID}</td></tr>
        </table>

        <h2 style="color: #333; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">🎯 Questionnaire Responses</h2>
        <table style="width: 100%; margin-bottom: 20px;">
          <tr><td style="padding: 8px 0; font-weight: bold;">Primary Goal:</td><td>${data.questionnaire.goal.replace('-', ' ').toUpperCase()}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Experience:</td><td>${data.questionnaire.experience.toUpperCase()}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Time Commitment:</td><td>${data.questionnaire.timeCommitment}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Equipment:</td><td>${data.questionnaire.equipment.replace('-', ' ').toUpperCase()}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Body Type:</td><td>${data.questionnaire.bodyType.toUpperCase()}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Age Range:</td><td>${data.questionnaire.age}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Gender:</td><td>${data.questionnaire.gender.replace('-', ' ').toUpperCase()}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Challenges:</td><td>${Array.isArray(data.questionnaire.challenges) 
            ? data.questionnaire.challenges.join(', ').toUpperCase()
            : data.questionnaire.challenges}</td></tr>
        </table>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">Submitted: ${new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
      </div>
    </div>
  `;
};

const formatEmailMessage = (data: EmailData): string => {
  return `
🏋️ NEW FITNESS QUESTIONNAIRE SUBMISSION

👤 PERSONAL DETAILS:
Name: ${data.appointment.name}
Email: ${data.appointment.email}
Phone: ${data.appointment.phone}
WhatsApp: ${EMAIL_CONFIG.WHATSAPP_NUMBER}

📅 APPOINTMENT:
Date: ${data.appointment.date}
Time: ${data.appointment.time}

💰 SELECTED PLAN:
${planNames[data.selectedPlan as keyof typeof planNames]}
Payment UPI: ${EMAIL_CONFIG.UPI_ID}

🎯 QUESTIONNAIRE RESPONSES:
• Primary Goal: ${data.questionnaire.goal.replace('-', ' ').toUpperCase()}
• Experience Level: ${data.questionnaire.experience.toUpperCase()}
• Time Commitment: ${data.questionnaire.timeCommitment}
• Equipment Access: ${data.questionnaire.equipment.replace('-', ' ').toUpperCase()}
• Body Type: ${data.questionnaire.bodyType.toUpperCase()}
• Age Range: ${data.questionnaire.age}
• Gender: ${data.questionnaire.gender.replace('-', ' ').toUpperCase()}
• Main Challenges: ${Array.isArray(data.questionnaire.challenges) 
    ? data.questionnaire.challenges.join(', ').toUpperCase()
    : data.questionnaire.challenges}

⏰ Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

---
This email was automatically generated from the fitness questionnaire website.
  `.trim();
};

export const sendToWebhook = async (data: EmailData): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!WORDPRESS_WEBHOOK) {
      throw new Error('WordPress webhook URL is not configured');
    }

    const response = await fetch(WORDPRESS_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: 'fitness-questionnaire'
      })
    });

    if (!response.ok) {
      throw new Error(`Webhook failed with status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Webhook failed:', errorMessage);
    return { success: false, error: errorMessage };
  }
};