import { sendQuestionnaireEmail } from '../services/emailService';
import type { EmailData } from '../services/emailService';
import { EMAIL_CONFIG } from '../config/email';

export const testEmailConfig = async () => {
  console.log('Starting email test...'); // For debugging
  console.log('API Key exists:', !!import.meta.env.VITE_RESEND_API_KEY); // For debugging

  const testData: EmailData = {
    questionnaire: {
      goal: 'weight-loss',
      experience: 'beginner',
      timeCommitment: '3-4 hours/week',
      equipment: 'home-gym',
      bodyType: 'ectomorph',
      age: '25-34',
      gender: 'male',
      challenges: ['time-management', 'motivation']
    },
    selectedPlan: 'basic',
    appointment: {
      name: 'Test User',
      email: EMAIL_CONFIG.ADMIN_EMAIL,
      phone: '1234567890',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM'
    }
  };

  try {
    const result = await sendQuestionnaireEmail(testData);
    console.log('Email test result:', result);
    return result;
  } catch (error) {
    console.error('Test failed:', error);
    return { success: false, error: String(error) };
  }
};