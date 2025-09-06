import React from 'react';

interface ProgressBarProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, currentStep, totalSteps }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white/70 text-sm font-medium">
          Question {currentStep} of {totalSteps}
        </span>
        <span className="text-white/70 text-sm font-medium">
          {Math.round(progress)}% Complete
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
          <div 
            className="bg-gradient-to-r from-pink-500 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full shadow-lg transform translate-x-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;