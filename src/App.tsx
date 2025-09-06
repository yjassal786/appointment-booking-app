import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Questionnaire from './components/Questionnaire';
import PricingPlans from './components/PricingPlans';
import AppointmentBooking from './components/AppointmentBooking';
import { QuestionnaireData, AppointmentData } from './types';
import { sendQuestionnaireEmail } from './services/emailService';
import type { EmailData } from './services/emailService';
import { TestEmail } from './components/TestEmail';

function App() {
  const [currentStep, setCurrentStep] = useState<'landing' | 'questionnaire' | 'pricing' | 'appointment' | 'confirmation'>('landing');
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleStartQuestionnaire = () => {
    setCurrentStep('questionnaire');
  };

  const handleQuestionnaireComplete = (data: QuestionnaireData) => {
    setQuestionnaireData(data);
    setCurrentStep('pricing');
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setCurrentStep('appointment');
  };

  const handleAppointmentComplete = async (data: AppointmentData) => {
    setCurrentStep('confirmation');
    setEmailError(null);
    
    const emailData: EmailData = {
      questionnaire: questionnaireData!,
      selectedPlan: selectedPlan!,
      appointment: data
    };
    
    try {
      const response = await sendQuestionnaireEmail(emailData);
      
      if (response.success) {
        console.log('Email sent successfully');
      } else {
        setEmailError(response.error || 'Failed to send email');
        console.error('Email error:', response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setEmailError(errorMessage);
      console.error('Email sending failed:', errorMessage);
    }
  };

  const handleRestart = () => {
    setCurrentStep('landing');
    setQuestionnaireData(null);
    setSelectedPlan(null);
    setEmailError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Add TestEmail component in top-right corner */}
      <div className="absolute top-4 right-4 z-50">
        <TestEmail />
      </div>

      {currentStep === 'landing' && (
        <LandingPage onStart={handleStartQuestionnaire} />
      )}
      {currentStep === 'questionnaire' && (
        <Questionnaire onComplete={handleQuestionnaireComplete} />
      )}
      {currentStep === 'pricing' && (
        <PricingPlans 
          questionnaireData={questionnaireData!} 
          onPlanSelect={handlePlanSelect}
        />
      )}
      {currentStep === 'appointment' && (
        <AppointmentBooking 
          selectedPlan={selectedPlan!}
          onComplete={handleAppointmentComplete}
          onBack={() => setCurrentStep('pricing')}
        />
      )}
      {currentStep === 'confirmation' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✓</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h1>
              <p className="text-gray-300 mb-6">
                Your appointment has been scheduled. We'll contact you shortly to confirm the details.
              </p>
              {emailError && (
                <p className="text-red-400 mb-4">
                  Note: {emailError}
                </p>
              )}
              <button
                onClick={handleRestart}
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
              >
                Book Another Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;