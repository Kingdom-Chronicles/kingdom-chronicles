import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { TimeSelector } from './TimeSelector';
import { RoundSelector } from './RoundSelector';
import { DEFAULT_SETTINGS } from '../constants/gameSettings';

interface GameSetupProps {
  title: string;
  description: string;
  onGameStart: (settings: any) => void;
  children?: React.ReactNode;
}

export const GameSetup: React.FC<GameSetupProps> = ({ 
  title, 
  description, 
  onGameStart,
  children 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <Settings className="w-12 h-12 text-indigo-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
      <p className="text-gray-600 text-center mb-6">{description}</p>
      
      {children}
    </div>
  );
};