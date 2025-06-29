import React from 'react';
import { Play, RotateCcw, Info } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface TurnActionsProps {
  onNextTurn: () => void;
  onReset: () => void;
  turn: number;
  maxTurns: number;
  canEndTurn: boolean;
}

export const TurnActions: React.FC<TurnActionsProps> = ({
  onNextTurn,
  onReset,
  turn,
  maxTurns,
  canEndTurn
}) => {
  const isLastTurn = turn >= maxTurns;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Turn {turn} of {maxTurns}
          </div>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(turn / maxTurns) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={onNextTurn}
            disabled={!canEndTurn || isLastTurn}
            size="sm"
            className="flex items-center"
          >
            <Play className="w-4 h-4 mr-1" />
            {isLastTurn ? 'Game Complete' : 'End Turn'}
          </Button>
          
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>
      
      {!canEndTurn && (
        <div className="mt-2 flex items-center text-sm text-amber-600">
          <Info className="w-4 h-4 mr-1" />
          Build at least one building to end your turn
        </div>
      )}
    </div>
  );
};