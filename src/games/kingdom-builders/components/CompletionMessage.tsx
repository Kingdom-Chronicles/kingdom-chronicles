import React from 'react';
import { Crown, Star, Gift } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { COMPLETION_MESSAGE } from '../constants/stories';

interface CompletionMessageProps {
  onPlayAgain: () => void;
  onExit: () => void;
  finalScore: number;
}

export const CompletionMessage: React.FC<CompletionMessageProps> = ({ 
  onPlayAgain, 
  onExit, 
  finalScore 
}) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-lg p-8 shadow-lg">
        {/* Celebration Header */}
        <div className="mb-6">
          <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {COMPLETION_MESSAGE.title}
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            {COMPLETION_MESSAGE.subtitle}
          </p>
        </div>

        {/* Score Display */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-yellow-500 mr-2" />
            <span className="text-2xl font-bold text-gray-900">Final Score</span>
          </div>
          <div className="text-4xl font-bold text-indigo-600 mb-2">
            {finalScore.toLocaleString()}
          </div>
          <p className="text-gray-600">Amazing work, Bible Builder!</p>
        </div>

        {/* Coming Soon Message */}
        <div className="bg-indigo-50 rounded-lg p-6 mb-6 border-2 border-indigo-200">
          <Gift className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-indigo-900 mb-2">
            {COMPLETION_MESSAGE.message}
          </h2>
          <p className="text-indigo-700 mb-4">
            {COMPLETION_MESSAGE.footer}
          </p>
          <div className="text-sm text-indigo-600">
            More Bible adventures are being crafted just for you!
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onPlayAgain}
            className="flex items-center justify-center px-6 py-3"
          >
            <Crown className="w-5 h-5 mr-2" />
            Play Again
          </Button>
          <Button
            onClick={onExit}
            variant="outline"
            className="flex items-center justify-center px-6 py-3"
          >
            Exit to Games
          </Button>
        </div>
      </div>
    </div>
  );
};