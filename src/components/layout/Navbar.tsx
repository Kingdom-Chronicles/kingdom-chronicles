import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CrownIcon, Trophy, MessageSquare, Settings, Menu, X } from 'lucide-react';
import { UserMenu } from '../auth/UserMenu';
import { useThemeStore } from '../../store/useThemeStore';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme } = useThemeStore();
  const isGameRoute = location.pathname.startsWith('/games/');

  const getNavbarClass = () => {
    if (theme === 'night') {
      return 'bg-gray-800 text-white';
    }
    return 'bg-white';
  };

  return (
    <nav className={`${getNavbarClass()} shadow-md sticky top-0 z-50 transition-all duration-300 hidden md:block`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 hover-pulse">
              <CrownIcon className="h-8 w-8 text-indigo-600" />
              <span className={`text-xl font-bold ${theme === 'night' ? 'text-white' : 'text-gray-900'}`}>
                Kingdom Chronicles
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link 
                to="/games" 
                className={`px-3 py-2 rounded-md transition-all duration-300 ${
                  theme === 'night'
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-indigo-50'
                }`}
              >
                Games
              </Link>
              <Link 
                to="/leaderboard" 
                className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 ${
                  theme === 'night'
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-indigo-50'
                }`}
              >
                <Trophy className="w-4 h-4 mr-1" />
                Leaderboard
              </Link>
              <Link 
                to="/settings" 
                className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 ${
                  theme === 'night'
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-indigo-50'
                }`}
              >
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </Link>
              <Link 
                to="/feedback" 
                className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 ${
                  theme === 'night'
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-indigo-50'
                }`}
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                Feedback
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden md:block">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};