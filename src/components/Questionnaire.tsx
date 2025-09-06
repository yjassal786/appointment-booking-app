import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { QuestionnaireData } from '../types';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';

interface QuestionnaireProps {
  onComplete: (data: QuestionnaireData) => void;
}

const questions = [
  {
    id: 'goal',
    question: 'What is your primary fitness goal?',
    type: 'single' as const,
    options: [
      { value: 'weight-loss', label: 'Lose Weight', emoji: '🏃‍♀️' },
      { value: 'muscle-gain', label: 'Build Muscle', emoji: '💪' },
      { value: 'endurance', label: 'Improve Endurance', emoji: '🚴‍♂️' },
      { value: 'general-fitness', label: 'General Fitness', emoji: '✨' },
      { value: 'strength', label: 'Increase Strength', emoji: '🏋️‍♂️' },
    ]
  },
  {
    id: 'experience',
    question: 'What is your current fitness level?',
    type: 'single' as const,
    options: [
      { value: 'beginner', label: 'Beginner', description: 'Just starting my fitness journey' },
      { value: 'intermediate', label: 'Intermediate', description: 'I exercise regularly' },
      { value: 'advanced', label: 'Advanced', description: 'Very experienced with workouts' },
    ]
  },
  {
    id: 'timeCommitment',
    question: 'How much time can you commit to working out?',
    type: 'single' as const,
    options: [
      { value: '15-30min', label: '15-30 minutes', description: 'Short, efficient workouts' },
      { value: '30-45min', label: '30-45 minutes', description: 'Moderate workout sessions' },
      { value: '45-60min', label: '45-60 minutes', description: 'Comprehensive training' },
      { value: '60min+', label: '60+ minutes', description: 'Extended workout sessions' },
    ]
  },
  {
    id: 'equipment',
    question: 'What equipment do you have access to?',
    type: 'single' as const,
    options: [
      { value: 'none', label: 'No Equipment', description: 'Bodyweight exercises only' },
      { value: 'basic', label: 'Basic Equipment', description: 'Dumbbells, resistance bands' },
      { value: 'home-gym', label: 'Home Gym', description: 'Full equipment setup' },
      { value: 'gym', label: 'Gym Membership', description: 'Access to commercial gym' },
    ]
  },
  {
    id: 'bodyType',
    question: 'How would you describe your current body type?',
    type: 'single' as const,
    options: [
      { value: 'ectomorph', label: 'Lean/Slim', description: 'Naturally thin build' },
      { value: 'mesomorph', label: 'Athletic/Balanced', description: 'Medium build, some muscle' },
      { value: 'endomorph', label: 'Curvy/Larger', description: 'Rounder, fuller build' },
    ]
  },
  {
    id: 'age',
    question: 'What is your age range?',
    type: 'single' as const,
    options: [
      { value: '18-25', label: '18-25 years' },
      { value: '26-35', label: '26-35 years' },
      { value: '36-45', label: '36-45 years' },
      { value: '46-55', label: '46-55 years' },
      { value: '55+', label: '55+ years' },
    ]
  },
  {
    id: 'gender',
    question: 'What is your gender?',
    type: 'single' as const,
    options: [
      { value: 'female', label: 'Female' },
      { value: 'male', label: 'Male' },
      { value: 'other', label: 'Other' },
      { value: 'prefer-not-to-say', label: 'Prefer not to say' },
    ]
  },
  {
    id: 'challenges',
    question: 'What are your biggest fitness challenges?',
    type: 'multiple' as const,
    options: [
      { value: 'time', label: 'Lack of Time' },
      { value: 'motivation', label: 'Staying Motivated' },
      { value: 'knowledge', label: 'Not Knowing What to Do' },
      { value: 'consistency', label: 'Being Consistent' },
      { value: 'energy', label: 'Low Energy' },
      { value: 'injuries', label: 'Past Injuries' },
    ]
  }
];

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      onComplete(answers as QuestionnaireData);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = answers[currentQuestion.id] !== undefined;

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto w-full">
        <ProgressBar progress={progress} currentStep={currentStep + 1} totalSteps={questions.length} />
        
        <QuestionCard
          question={currentQuestion}
          selectedValue={answers[currentQuestion.id]}
          onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
        />

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 text-white/70 hover:text-white transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 disabled:from-gray-500 disabled:to-gray-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isLastStep ? 'Get My Plan' : 'Continue'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;