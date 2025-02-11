import { useCallback } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { scoreService } from '../services/scores/scoreService';

export const useGameScore = (gameType: 'kingdom-builders' | 'ark-escape' | 'bible-charades' | 'scripture-sprint') => {
  const { user, isAuthenticated, updateScore } = useAuthStore();

  const handleScoreUpdate = useCallback(async (points: number) => {
    if (points === 0) return;

    // Update local state
    updateScore(points);

    // If authenticated, update DynamoDB
    if (isAuthenticated && user) {
      try {
        await scoreService.updateScore(user.id, user.username, {
          gameType,
          score: points,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error updating score:', error);
      }
    }
  }, [isAuthenticated, user, gameType, updateScore]);

  return {
    handleScoreUpdate,
    isAuthenticated
  };
};