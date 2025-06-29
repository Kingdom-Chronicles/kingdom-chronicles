import React from 'react';
import { Flame, Calendar, Trophy } from 'lucide-react';
import { useGameProgressStore } from '../../../store/useGameProgressStore';
import { format, isToday, parseISO } from 'date-fns';

interface StreakDisplayProps {
  gameType: 'scripture-sprint' | 'bible-verse';
  currentStreak: number;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ gameType, currentStreak }) => {
  const { lastPlayed } = useGameProgressStore();
  const lastPlayedDate = lastPlayed[gameType];
  
  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-purple-600';
    if (streak >= 14) return 'text-orange-600';
    if (streak >= 7) return 'text-red-600';
    if (streak >= 3) return 'text-yellow-600';
    return 'text-blue-600';
  };

  const getStreakMessage = (streak: number) => {
    if (streak >= 30) return 'Legendary Streak! 🏆';
    if (streak >= 14) return 'Amazing Streak! 🔥';
    if (streak >= 7) return 'Great Streak! ⭐';
    if (streak >= 3) return 'Good Streak! 👍';
    if (streak >= 1) return 'Keep it up! 💪';
    return 'Start your streak today!';
  };

  const playedToday = lastPlayedDate && isToday(parseISO(lastPlayedDate));

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6 border border-indigo-200">
      <div className="flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <Flame className={`w-6 h-6 ${getStreakColor(currentStreak)}`} />
          <div className="text-center">
            <div className={`text-2xl font-bold ${getStreakColor(currentStreak)}`}>
              {currentStreak}
            </div>
            <div className="text-xs text-gray-600">Day Streak</div>
          </div>
        </div>

        <div className="h-8 w-px bg-gray-300" />

        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-600" />
          <div className="text-center">
            <div className={`text-sm font-medium ${playedToday ? 'text-green-600' : 'text-gray-600'}`}>
              {playedToday ? '✓ Played Today' : 'Not Played Today'}
            </div>
            {lastPlayedDate && (
              <div className="text-xs text-gray-500">
                Last: {format(parseISO(lastPlayedDate), 'MMM d')}
              </div>
            )}
          </div>
        </div>

        <div className="h-8 w-px bg-gray-300" />

        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-600" />
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700">
              {getStreakMessage(currentStreak)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};