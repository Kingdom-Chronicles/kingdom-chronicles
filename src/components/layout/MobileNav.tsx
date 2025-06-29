import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Gamepad2, Trophy, Settings } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { OptionsDrawer } from './OptionsDrawer';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/games', icon: Gamepad2, label: 'Games' },
  { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { type: 'options', icon: Settings, label: 'Options' }
];

export const MobileNav: React.FC = () => {
  const location = useLocation();
  const { theme } = useThemeStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 ${
        theme === 'night' ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'
      }`}>
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            if (item.type === 'options') {
              return (
                <button
                  key="options"
                  onClick={() => setIsDrawerOpen(true)}
                  className={`flex flex-col items-center justify-center w-full h-full ${
                    theme === 'night'
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center w-full h-full ${
                  location.pathname === item.path
                    ? theme === 'night'
                      ? 'text-indigo-400'
                      : 'text-indigo-600'
                    : theme === 'night'
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <OptionsDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  );
};