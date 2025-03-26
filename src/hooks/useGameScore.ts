import { useCallback, useRef } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { scoreService } from '../services/scores/scoreService';

export const useGameScore = (gameType: 'kingdom-builders' | 'ark-escape' | 'bible-charades' | 'scripture-sprint' | 'testament-quiz' | 'bible-verse') => {
  const { user, isAuthenticated, updateScore } = useAuthStore();
  const updatingScore = useRef(false);

  const handleScoreUpdate = useCallback(async (points: number) => {
    if (points === 0 || updatingScore.current) return;

    try {
      updatingScore.current = true;
      
      // Update local state first
      updateScore(points);

      // If authenticated, update DynamoDB
      if (isAuthenticated && user) {
        await scoreService.updateScore(user.id, user.username, {
          gameType,
          score: points,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error updating score:', error);
    } finally {
      updatingScore.current = false;
    }
  }, [isAuthenticated, user, gameType, updateScore]);

  return {
    handleScoreUpdate,
    isAuthenticated
  };
};