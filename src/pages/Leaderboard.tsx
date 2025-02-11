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
    <div className={`theme-base min-h-screen ${theme === 'night' ? 'bg-gray-900' : 'bg-gradient-to-b from-indigo-50 to-white'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-theme-primary">
          Global Leaderboard
        </h1>

        <div className="card">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            {/* Game Type Filter */}
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="form-select rounded-lg border-gray-300 flex-1"
            >
              {gameOptions.map(game => (
                <option key={game.id} value={game.id}>
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
                className="form-input w-full rounded-lg border-gray-300"
              />
            </div>
          </div>

          <LeaderboardTable 
            entries={filteredEntries} 
            isLoading={isLoading}
            selectedGame={selectedGame}
          />
        </div>
      </div>
    </div>
  );
};