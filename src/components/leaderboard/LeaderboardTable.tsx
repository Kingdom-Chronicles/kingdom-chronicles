import React from 'react';
import { Trophy, Search } from 'lucide-react';
import type { LeaderboardEntry } from '../../services/scores/types';
import { getGameName } from '../../pages/Games';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  isLoading?: boolean;
  selectedGame: string;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ 
  entries,
  isLoading,
  selectedGame
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto" />
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-theme-secondary">
        <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>No results found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
              Player
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
              Total Score
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {entries.map((entry) => (
            <tr 
              key={`${entry.username}-${entry.rank}`} 
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {entry.rank <= 3 ? (
                    <Trophy className={`w-5 h-5 ${
                      entry.rank === 1 ? 'text-yellow-400' :
                      entry.rank === 2 ? 'text-gray-400' :
                      'text-amber-600'
                    }`} />
                  ) : (
                    <span className="text-theme-secondary">{entry.rank}</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-theme-primary">
                  {entry.username}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-theme-primary">
                  {entry.totalScore.toLocaleString()}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};