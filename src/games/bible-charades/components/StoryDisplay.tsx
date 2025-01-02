import React, { useState } from 'react';
import { Book } from 'lucide-react';
import type { BibleStory } from '../types';

interface StoryDisplayProps {
  story: BibleStory;
  onGuess?: (guess: string) => void;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, onGuess }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleGuess = (guess: string) => {
    setSelectedAnswer(guess);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      onGuess?.(guess);
    }, 1500);
  };

  const isCorrectAnswer = (option: string) => option === story.options[0];
  
  const getAnswerStyles = (option: string) => {
    if (!showFeedback || selectedAnswer !== option) {
      return "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50";
    }
    return isCorrectAnswer(option)
      ? "border-green-500 bg-green-50"
      : "border-red-500 bg-red-50";
  };

  return (
    <div className="space-y-6">
      {/* Story Visual Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {story.images && story.images.length > 0 ? (
          <img 
            src={story.images[0].url} 
            alt={story.images[0].alt}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg mb-4">
            <p className="text-gray-700 text-lg text-center leading-relaxed">
              {story.fallbackDescription}
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-center bg-indigo-50 p-4 rounded-lg">
          <Book className="w-6 h-6 text-indigo-600 mr-2" />
          <p className="text-lg font-semibold text-indigo-900">
            Scripture: {story.scripture}
          </p>
        </div>
      </div>

      {/* Answer Options */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-center mb-6">Select Your Answer</h3>
        <div className="space-y-3">
          {story.options.map((option) => (
            <button
              key={option}
              onClick={() => !showFeedback && handleGuess(option)}
              disabled={showFeedback}
              className={`
                w-full p-4 text-left rounded-lg border-2 transition-all duration-200 
                flex items-center space-x-3
                ${getAnswerStyles(option)}
              `}
            >
              <div className={`
                w-6 h-6 rounded-full border-2 flex-shrink-0
                ${showFeedback && selectedAnswer === option
                  ? isCorrectAnswer(option)
                    ? 'border-green-500 bg-green-500'
                    : 'border-red-500 bg-red-500'
                  : 'border-gray-300'
                }
              `} />
              <span className="text-lg">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};