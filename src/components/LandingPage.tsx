import React from 'react';
import { ArrowRight, Target, Zap, Trophy } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              Fitness Journey
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get a personalized workout plan tailored to your goals, experience level, and lifestyle. 
            Start your transformation today with science-backed fitness recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Target className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Personalized Goals</h3>
            <p className="text-gray-300 text-sm">Customized plans based on your specific fitness objectives</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Quick Results</h3>
            <p className="text-gray-300 text-sm">See measurable progress in just 2-3 minutes of planning</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Trophy className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Proven Success</h3>
            <p className="text-gray-300 text-sm">Join thousands who've achieved their fitness goals</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="group bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white text-xl font-semibold px-12 py-4 rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto gap-3"
        >
          Start Your Free Assessment
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
        </button>

        <p className="text-gray-400 text-sm mt-6">
          ⚡ Takes only 2 minutes • 100% Free • No email required
        </p>
      </div>
    </div>
  );
};

export default LandingPage;