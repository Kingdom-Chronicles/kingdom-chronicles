import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme } from '../components/ui/ThemeSelector';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'default',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'kingdom-chronicles-theme',
    }
  )
);