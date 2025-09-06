import { EmailData } from '../services/emailService';

// Form validation utilities
export const validateForm = (formData: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Name validation
  if (!formData.name || formData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.push('Please enter a valid email address');
  }

  // Phone validation (Indian phone numbers)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\D/g, '').slice(-10))) {
    errors.push('Please enter a valid 10-digit phone number');
  }

  // Date validation
  if (!formData.date) {
    errors.push('Please select an appointment date');
  } else {
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.push('Please select a future date');
    }
  }

  // Time validation
  if (!formData.time) {
    errors.push('Please select an appointment time');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Test email functionality
export const testEmailService = async (): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('🧪 Testing email service...');
    
    const testData: EmailData = {
      questionnaire: {
        goal: 'Lose Weight',
        experience: 'Beginner',
        timeCommitment: '1-2 hours',
        equipment: 'Home gym',
        bodyType: 'Average',
        age: '25-30',
        gender: 'Male',
        challenges: ['Time management']
      },
      selectedPlan: 'basic',
      appointment: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '9876543210',
        date: new Date().toISOString().split('T')[0],
        time: '10:00 AM'
      }
    };

    // Import the email service dynamically to avoid circular dependencies
    const { sendQuestionnaireEmail } = await import('../services/emailService');
    const result = await sendQuestionnaireEmail(testData);
    
    if (result.success) {
      return {
        success: true,
        message: '✅ Email service is working correctly!'
      };
    } else {
      return {
        success: false,
        message: `❌ Email service failed: ${result.error}`
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `❌ Email service test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

// Flow validation - check if all steps are working
export const validateCompleteFlow = async (
  questionnaireData: any,
  selectedPlan: string,
  appointmentData: any
): Promise<{ isValid: boolean; errors: string[]; warnings: string[] }> => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Step 1: Validate questionnaire data
  if (!questionnaireData || Object.keys(questionnaireData).length === 0) {
    errors.push('Questionnaire data is missing');
  } else {
    // Check required questionnaire fields
    const requiredFields = ['goal', 'experience', 'timeCommitment'];
    for (const field of requiredFields) {
      if (!questionnaireData[field]) {
        errors.push(`Questionnaire field '${field}' is missing`);
      }
    }
  }

  // Step 2: Validate selected plan
  const validPlans = ['basic', 'premium', 'elite'];
  if (!validPlans.includes(selectedPlan)) {
    errors.push('Invalid plan selected');
  }

  // Step 3: Validate appointment data
  const formValidation = validateForm(appointmentData);
  if (!formValidation.isValid) {
    errors.push(...formValidation.errors);
  }

  // Step 4: Test email service
  try {
    const emailTest = await testEmailService();
    if (!emailTest.success) {
      warnings.push(`Email service issue: ${emailTest.message}`);
    }
  } catch (error) {
    warnings.push('Could not test email service');
  }

  // Step 5: Check environment variables
  if (!import.meta.env.VITE_RESEND_API_KEY) {
    warnings.push('VITE_RESEND_API_KEY environment variable is not set - email will run in demo mode');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Network connectivity test
export const testNetworkConnectivity = async (): Promise<boolean> => {
  try {
    const response = await fetch('https://httpbin.org/get', { 
      method: 'GET',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    return response.ok;
  } catch (error) {
    console.error('Network connectivity test failed:', error);
    return false;
  }
};
