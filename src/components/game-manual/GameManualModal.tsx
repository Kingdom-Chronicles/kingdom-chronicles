import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import type { GameManual } from './constants/gameManual';

interface GameManualModalProps {
  manual: GameManual;
  isOpen: boolean;
  onClose: () => void;
}

export const GameManualModal: React.FC<GameManualModalProps> = ({ manual, isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const Icon = manual.icon;

  if (!isOpen) return null;

  const slides = [
    {
      title: 'How to Play',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">{manual.description}</p>
          <ul className="list-disc pl-5 space-y-2">
            {manual.howToPlay.map((step, index) => (
              <li key={index} className="text-gray-700">{step}</li>
            ))}
          </ul>
        </div>
      )
    },
    {
      title: 'Scoring System',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          {manual.scoring.map((rule, index) => (
            <li key={index} className="text-gray-700">{rule}</li>
          ))}
        </ul>
      )
    },
    {
      title: 'Enjoy the Game!',
      content: (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🎮</div>
          <p className="text-xl text-gray-700">You're all set to start playing!</p>
          <p className="text-gray-600">Remember to have fun while learning.</p>
          <Button onClick={onClose} className="mt-4">
            Let's Play!
          </Button>
        </div>
      )
    }
  ];

  const handlePrevious = () => {
    setCurrentSlide(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <div className="flex items-center mb-6">
            <Icon className="w-8 h-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-bold">{manual.title}</h2>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{slides[currentSlide].title}</h3>
            {slides[currentSlide].content}
          </div>

          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-indigo-600 w-4'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};