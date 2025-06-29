import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface RoundTransitionProps {
  roundNumber: number;
  onNextRound: () => void;
}

export const RoundTransition: React.FC<RoundTransitionProps> = ({ roundNumber, onNextRound }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h2 className="text-3xl font-bold mb-4">Round {roundNumber}</h2>
          <p className="text-gray-600 mb-6">Get ready for the next challenge!</p>
          
          <Button
            onClick={onNextRound}
            className="inline-flex items-center"
          >
            Start Round
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};