import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { Team } from '../types';

interface TeamSetupProps {
  onTeamsReady: (teams: Team[]) => void;
}

export const TeamSetup: React.FC<TeamSetupProps> = ({ onTeamsReady }) => {
  const [team1Name, setTeam1Name] = useState('Team 1');
  const [team2Name, setTeam2Name] = useState('Team 2');

  const handleStartGame = () => {
    const teams: Team[] = [
      { id: '1', name: team1Name, score: 0, isActing: true },
      { id: '2', name: team2Name, score: 0, isActing: false }
    ];
    onTeamsReady(teams);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <Users className="w-12 h-12 text-indigo-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6">Team Setup</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team 1 Name
          </label>
          <input
            type="text"
            value={team1Name}
            onChange={(e) => setTeam1Name(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team 2 Name
          </label>
          <input
            type="text"
            value={team2Name}
            onChange={(e) => setTeam2Name(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <Button
        onClick={handleStartGame}
        className="w-full"
      >
        Start Game
      </Button>
    </div>
  );
};