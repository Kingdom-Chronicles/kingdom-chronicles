import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from './Button';
import { analyticsService } from '../../services/analytics/analyticsService';
import { useThemeStore } from '../../store/useThemeStore';

export type Theme = 'default' | 'night' | 'classic';

interface ThemeSelectorProps {
  currentTheme?: Theme; // Made optional since we'll use the store value
  onThemeChange?: (theme: Theme) => void; // Made optional since we'll use the store value
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = () => {
  const { theme, setTheme } = useThemeStore();

  const handleThemeChange = () => {
    const themes: Theme[] = ['default', 'night', 'classic'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    // Track theme change in analytics
    analyticsService.trackEvent({
      category: 'Theme',
      action: 'change_theme',
      label: nextTheme,
      value: 1
    });

    setTheme(nextTheme);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleThemeChange}
          className="flex items-center space-x-2"
        >
          <Palette className="w-4 h-4" />
          <span>Change Theme</span>
        </Button>
      </div>
    </div>
  );
};