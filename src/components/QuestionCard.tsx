import React from 'react';

interface Question {
  id: string;
  question: string;
  type: 'single' | 'multiple';
  options: Array<{
    value: string;
    label: string;
    emoji?: string;
    description?: string;
  }>;
}

interface QuestionCardProps {
  question: Question;
  selectedValue: any;
  onAnswer: (value: any) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedValue, onAnswer }) => {
  const handleSingleSelect = (value: string) => {
    onAnswer(value);
  };

  const handleMultipleSelect = (value: string) => {
    const currentSelected = selectedValue || [];
    const newSelected = currentSelected.includes(value)
      ? currentSelected.filter((item: string) => item !== value)
      : [...currentSelected, value];
    onAnswer(newSelected);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center leading-tight">
        {question.question}
      </h2>

      <div className={`grid gap-4 ${question.type === 'multiple' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {question.options.map((option) => {
          const isSelected = question.type === 'single' 
            ? selectedValue === option.value
            : (selectedValue || []).includes(option.value);

          return (
            <button
              key={option.value}
              onClick={() => question.type === 'single' 
                ? handleSingleSelect(option.value) 
                : handleMultipleSelect(option.value)
              }
              className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 text-left ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-500/20 to-orange-500/20 border-pink-400 shadow-lg shadow-pink-500/25'
                  : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
              }`}
            >
              <div className="flex items-center gap-4">
                {option.emoji && (
                  <span className="text-2xl">{option.emoji}</span>
                )}
                <div className="flex-1">
                  <div className={`font-semibold text-lg ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                    {option.label}
                  </div>
                  {option.description && (
                    <div className={`text-sm mt-1 ${isSelected ? 'text-pink-200' : 'text-gray-400'}`}>
                      {option.description}
                    </div>
                  )}
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {question.type === 'multiple' && (
        <p className="text-gray-400 text-sm text-center mt-6">
          Select all that apply
        </p>
      )}
    </div>
  );
};

export default QuestionCard;