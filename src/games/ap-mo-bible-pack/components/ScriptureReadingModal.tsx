import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIBLE_VERSES } from '../constants/verses';
import type { PackType } from '../types';

interface ScriptureReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPack: PackType;
}

export const ScriptureReadingModal: React.FC<ScriptureReadingModalProps> = ({
  isOpen,
  onClose,
  selectedPack
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredVerses = BIBLE_VERSES.filter(verse => verse.packType === selectedPack);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % filteredVerses.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + filteredVerses.length) % filteredVerses.length);
  };

  if (!isOpen) return null;

  const currentVerse = filteredVerses[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <Book className="w-12 h-12 text-indigo-600" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">
            {selectedPack.charAt(0).toUpperCase() + selectedPack.slice(1)} Scriptures
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Read and reflect on these verses before starting your game
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-indigo-50 p-8 rounded-lg mb-6"
            >
              <div className="max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-2">{currentVerse.verse}</h3>
                <p className="text-gray-700 mb-4">{currentVerse.description}</p>
                <div className="bg-white p-6 rounded-lg shadow-inner">
                  <p className="text-lg text-indigo-900 italic">
                    {currentVerse.versions.NKJV}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              className="flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </button>
            <span className="text-gray-500">
              {currentIndex + 1} of {filteredVerses.length}
            </span>
            <button
              onClick={handleNext}
              className="flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
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