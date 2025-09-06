import React from 'react';
import { Check, Phone, Star, Crown, Zap } from 'lucide-react';
import { QuestionnaireData } from '../types';

interface PricingPlansProps {
  questionnaireData: QuestionnaireData;
  onPlanSelect: (planId: string) => void;
}

const plans = [
  {
    id: 'basic',
    name: '3 Month Transformation',
    duration: '3 Months',
    price: '₹9,999',
    originalPrice: '₹15,999',
    popular: false,
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Personalized workout plan',
      'Basic nutrition guidelines',
      'Weekly progress tracking',
      'Email support',
      'Exercise video library',
      'Basic meal planning'
    ]
  },
  {
    id: 'premium',
    name: '6 Month Complete',
    duration: '6 Months',
    price: '₹17,999',
    originalPrice: '₹29,999',
    popular: true,
    icon: Star,
    color: 'from-pink-500 to-orange-500',
    features: [
      'Everything in 3 Month plan',
      'Advanced nutrition coaching',
      'Bi-weekly video consultations',
      'Custom supplement recommendations',
      'Priority WhatsApp support',
      'Habit tracking system',
      'Recipe database access',
      'Progress photo analysis'
    ]
  },
  {
    id: 'elite',
    name: '9 Month Elite',
    duration: '9 Months',
    price: '₹24,999',
    originalPrice: '₹45,999',
    popular: false,
    icon: Crown,
    color: 'from-purple-500 to-indigo-500',
    features: [
      'Everything in 6 Month plan',
      'Weekly 1-on-1 video calls',
      '24/7 WhatsApp support',
      'Custom meal prep plans',
      'Lifestyle coaching',
      'Advanced body composition tracking',
      'Exclusive community access',
      'Lifetime plan updates',
      'Money-back guarantee'
    ]
  }
];

const PricingPlans: React.FC<PricingPlansProps> = ({ questionnaireData, onPlanSelect }) => {
  const getRecommendedPlan = () => {
    if (questionnaireData.experience === 'beginner') return 'basic';
    if (questionnaireData.goal === 'weight-loss' || questionnaireData.goal === 'muscle-gain') return 'premium';
    return 'elite';
  };

  const recommendedPlan = getRecommendedPlan();

  return (
    <div className="min-h-screen p-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Transformation Plan
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Based on your goals: <span className="text-pink-400 font-semibold">{questionnaireData.goal.replace('-', ' ')}</span>
          </p>
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full border border-green-500/30">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Limited Time Offer - Save up to 44%
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="text-center mb-8">
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Phone className="w-5 h-5" />
            Call Now: +91 98765 43210
          </a>
          <p className="text-gray-400 text-sm mt-2">Speak directly with our fitness experts</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const isRecommended = plan.id === recommendedPlan;
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border transition-all duration-300 transform hover:scale-105 ${
                  plan.popular 
                    ? 'border-pink-400 shadow-2xl shadow-pink-500/25 scale-105' 
                    : 'border-white/20 hover:border-white/40'
                } ${isRecommended ? 'ring-2 ring-yellow-400' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                {isRecommended && (
                  <div className="absolute -top-4 right-4">
                    <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      RECOMMENDED
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-gray-400 text-sm mb-4">{plan.duration}</div>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-white">{plan.price}</div>
                    <div className="text-gray-400 line-through text-lg">{plan.originalPrice}</div>
                    <div className="text-green-400 text-sm font-semibold">
                      Save {Math.round((1 - parseInt(plan.price.replace(/[₹,]/g, '')) / parseInt(plan.originalPrice.replace(/[₹,]/g, ''))) * 100)}%
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onPlanSelect(plan.id)}
                  className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white shadow-lg'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/30'
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-gray-400 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.9★</div>
              <div className="text-gray-400 text-sm">Client Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;