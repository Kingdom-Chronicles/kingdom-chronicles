import React, { useEffect, useState } from 'react';
import { LeaderboardTable } from '../components/leaderboard/LeaderboardTable';
import { scoreService } from '../services/scores/scoreService';
import { useTheme } from '../hooks/useTheme';
import type { LeaderboardEntry } from '../services/scores/types';
import { games } from './Games';

const ALL_GAMES_OPTION = { id: 'all', title: 'All Games' };

export const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();

  const gameOptions = [
    ALL_GAMES_OPTION, 
    ...games.map(g => ({ id: g.id, title: g.title }))
  ];

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        const data = await scoreService.getLeaderboard(
          50, 
          selectedGame === 'all' ? undefined : selectedGame
        );
        setEntries(data || []);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setEntries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [selectedGame]);

  const filteredEntries = entries.filter(entry => 
    entry?.username?.toLowerCase().includes(searchQuery.toLowerCase() || '')
  );

  return (
    <div className={`min-h-screen ${theme === 'night' ? 'bg-gray-900' : 'bg-gradient-to-b from-indigo-50 to-white'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold text-center mb-8 ${theme === 'night' ? 'text-white' : 'text-gray-900'}`}>
          Global Leaderboard
        </h1>

        <div className={`rounded-lg shadow-md p-6 ${theme === 'night' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            {/* Game Type Filter */}
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className={`w-full sm:flex-1 px-3 py-2 rounded-lg border ${
                theme === 'night' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              {gameOptions.map(game => (
                <option 
                  key={game.id} 
                  value={game.id}
                  className={theme === 'night' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}
                >
                  {game.title}
                </option>
              ))}
            </select>

            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by player name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'night'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
            </div>
          </div>

          <LeaderboardTable 
            entries={filteredEntries} 
            isLoading={isLoading}
            selectedGame={selectedGame}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};