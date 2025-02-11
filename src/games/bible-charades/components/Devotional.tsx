import React from 'react';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { BibleStory } from '../types';

interface DevotionalProps {
  story: BibleStory;
  onContinue: () => void;
}

export const Devotional: React.FC<DevotionalProps> = ({ story, onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex items-center justify-center mb-4">
        <Book className="w-8 h-8 text-indigo-600" />
      </div>

      <h3 className="text-xl font-bold mb-2">{story.title}</h3>
      <p className="text-gray-600 mb-4">{story.description}</p>
      
      <div className="bg-indigo-50 rounded-lg p-4 mb-4">
        <h4 className="font-semibold mb-2">Scripture Reference</h4>
        <p className="text-indigo-800">{story.scripture}</p>
      </div>
      
      <div className="bg-green-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold mb-2">Reflection</h4>
        <p className="text-green-800">{story.devotional}</p>
      </div>

      <Button onClick={onContinue} className="w-full">
        Continue to Next Round
      </Button>
    </motion.div>
  );
};