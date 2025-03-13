import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ScriptureSprintmanual, 
  testamentquizmanual, 
  bibleCharadesmanual, 
  bibleversemanual,
  bibleMemoryTutorials 
} from './gamemanualmodels';
import { ManualModelProps } from './tutorials';

export const ManualModel: React.FC<ManualModelProps> = ({ isOpen, onClose, gameType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const tutorials = {
    'scripture-sprint': ScriptureSprintmanual,
    'testament-quiz': testamentquizmanual,
    'bible-charades': bibleCharadesmanual,
    'bible-verse': bibleversemanual,
    'bible-memory': bibleMemoryTutorials
  }[gameType];

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentTutorial = tutorials[currentIndex];
  const isLastStep = currentIndex === tutorials.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors dark:text-gray-300 dark:hover:text-gray-500"
          aria-label="Close tutorial"
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
                {currentTutorial.content}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors dark:text-indigo-400 dark:hover:text-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
              {isLastStep ? 'Finish' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};