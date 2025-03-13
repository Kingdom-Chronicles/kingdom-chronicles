import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Book, Trophy, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface manualmodelprops {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualModel: React.FC<manualmodelprops> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hardcoded tutorial content
  const tutorials = [
    {
      title: 'Game Setup',
      description: 'Prepare to play the game.',
      icon: <Book className="w-6 h-6 text-indigo-600" />,
      content: (
        <ul className="text-center space-y-2 pl-4">
          <li>Divide into Teams: Split players into two or more teams.</li>
        </ul>
      ),
    },
    {
      title: 'How to Play and Win',
      description: 'Play the game by acting out prompts and scoring points.',
      icon: <Trophy className="w-6 h-6 text-indigo-600" />,
      content: (
        <ul className="text-left space-y-2 pl-4 list-decimal">
          <li>Start the Round: A Team A player picks a prompt from the list.</li>
          <li>Act It Out: No talking, just gestures and body language!</li>
          <li>Guess the Prompt: Teammates guess before time runs out. Correct guesses score 1 point.</li>
          <li>Rotate Turns: Teams continue taking turns until the game ends.</li>
          <li>Winning: The team with the highest score wins!</li>
        </ul>
      ),
    },
    {
      title: 'Enjoy 🎊',
      description: 'Have fun and enjoy the game!',
      icon: <CheckCircle className="w-6 h-6 text-indigo-600" />,
      content: (
        <ul className="text-left space-y-2 pl-4 list-decimal">
          <li>Cheer for your team and keep the fun going!</li>
          <li>May the best team win!</li>
        </ul>
      ),
    },
  ];
  

  // Reset the current index when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0); // Reset to the first step when the modal is opened
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentIndex === tutorials.length - 1) {
      onClose(); // Close the modal when the "Let us Begin" tutorial is reached
    } else {
      setCurrentIndex((prev) => (prev + 1) % tutorials.length);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + tutorials.length) % tutorials.length);
  };

  if (!isOpen) return null;

  const currentTutorial = tutorials[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 dark:text-gray-300 dark:hover:text-gray-500"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            {currentTutorial.icon}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
            {currentTutorial.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center mb-8">
            {currentTutorial.description}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-indigo-50 dark:bg-indigo-900 p-8 rounded-lg mb-6"
            >
              <div className="max-w-2xl mx-auto">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 text-center mb-4">
                  {currentTutorial.content}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              className="flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </button>
            <span className="text-gray-500 dark:text-gray-300">
              {currentIndex + 1} of {tutorials.length}
            </span>
            <button
              onClick={handleNext}
              className="flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
