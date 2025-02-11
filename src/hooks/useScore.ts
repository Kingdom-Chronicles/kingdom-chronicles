import { useAuthStore } from '../store/useAuthStore';

export const useScore = () => {
  const { user, isAuthenticated, guestScore, updateGuestScore, updateUserPoints } = useAuthStore();

  const addPoints = (points: number) => {
    if (isAuthenticated && user) {
      updateUserPoints(points);
    } else {
      updateGuestScore(points);
    }
  };

  const getCurrentScore = () => {
    return isAuthenticated ? user?.points || 0 : guestScore;
  };

  return {
    addPoints,
    getCurrentScore,
    isAuthenticated
  };
};