import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Target, Trophy, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface manualmodelprops {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualModel: React.FC<manualmodelprops> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const tutorials = [
    {
      title: 'Setup',
      description: 'Prepare to play the game.',
      icon: <Play className="w-6 h-6 text-indigo-600" />,
      content: (
        <ul className="text-left space-y-2 pl-4 list-decimal">
        <li>Choose a game mode (Bible Books or Bible Stories).</li>
        <li>Select a host to present the questions or play in self-check mode.</li>
        <li>Prepare the question cards/prompts and answer key.</li>
      </ul>
      ),
    },
    {
      title: 'Gameplay and Scoring',
      description: 'Learn the game flow and scoring.',
      icon: <Target className="w-6 h-6 text-yellow-600" />,
      content: (
        <ul className="text-left space-y-2 pl-4 list-decimal">
          <li>The host presents a question to the player or team.</li>
          <li>The player/team must answer whether it is from the Old Testament or New Testament.</li>
          <li>+50 points for correct answers, -50 for incorrect answers.</li>
          <li>Continue presenting questions in turns or rounds.</li>
        </ul>
      ),
    },
    {
      title: 'Winning the Game',
      description: 'Learn how to win.',
      icon: <Trophy className="w-6 h-6 text-blue-600" />,
      content: (
        <ul className="text-left space-y-2 pl-4 list-decimal">
          <li>The player/team with the highest score wins the game.</li>
          <li>For a quick game, set a winning score (e.g., first to 10 points wins).</li>
        </ul>
      ),
    },
    {
      title: 'Enjoy 🎊',
      description: 'Have fun and enjoy the game!',
      icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
      content: (
        <ul className="text-left space-y-2 pl-4 list-decimal">
          <li>Great job! You’ve got everything set up and understood the rules. It’s time to begin!</li>
          <li>Gather your players, choose your mode, and get ready for an exciting game!</li>
          <li>Good luck, and may the best team win!</li>
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

          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
            {currentTutorial.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
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
                <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
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
