import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  guestScore: number;
  login: (user: User) => void;
  logout: () => void;
  updateScore: (points: number) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      guestScore: 0,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateScore: (points) => {
        if (points === 0) return;
        
        const state = get();
        const newState = state.isAuthenticated && state.user
          ? {
              user: {
                ...state.user,
                points: (state.user.points || 0) + points
              }
            }
          : { guestScore: state.guestScore + points };
        
        set(newState);
      },
    }),
    {
      name: 'kingdom-chronicles-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        guestScore: state.guestScore
      })
    }
  )
);