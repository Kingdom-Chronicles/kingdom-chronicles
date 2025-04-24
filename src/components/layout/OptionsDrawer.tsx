import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Palette, MessageSquare, LogIn, UserX } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { LoginModal } from '../auth/LoginModal';
import { DeleteProfileModal } from '../auth/DeleteProfileModal';

interface OptionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OptionsDrawer: React.FC<OptionsDrawerProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useThemeStore();
  const { isAuthenticated } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const location = useLocation();

  if (!isOpen && !showLoginModal && !showDeleteModal) return null;

  // Check if we should hide the theme button
  const isLeaderboardPage = location.pathname === '/leaderboard';
  const shouldHideThemeButton = isLeaderboardPage && theme === 'night';

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      } ${theme === 'night' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-lg font-semibold ${theme === 'night' ? 'text-white' : 'text-gray-900'}`}>
              Options
            </h2>
            <button
              onClick={onClose}
              className={theme === 'night' ? 'text-gray-400' : 'text-gray-500'}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            {!shouldHideThemeButton && (
              <button
                onClick={() => {
                  const themes = ['default', 'night', 'classic'] as const;
                  const currentIndex = themes.indexOf(theme);
                  const nextTheme = themes[(currentIndex + 1) % themes.length];
                  setTheme(nextTheme);
                }}
                className={`w-full flex items-center p-3 rounded-lg ${
                  theme === 'night'
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Palette className="w-5 h-5 mr-3" />
                <span>Change Theme ({theme})</span>
              </button>
            )}

            <Link
              to="/feedback"
              onClick={onClose}
              className={`w-full flex items-center p-3 rounded-lg ${
                theme === 'night'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="w-5 h-5 mr-3" />
              <span>Send Feedback</span>
            </Link>

            {isAuthenticated ? (
              <button
                onClick={() => setShowDeleteModal(true)}
                className={`w-full flex items-center p-3 rounded-lg ${
                  theme === 'night'
                    ? 'text-red-400 hover:bg-gray-700'
                    : 'text-red-600 hover:bg-gray-100'
                }`}
              >
                <UserX className="w-5 h-5 mr-3" />
                <span>Delete Profile</span>
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className={`w-full flex items-center p-3 rounded-lg ${
                  theme === 'night'
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <LogIn className="w-5 h-5 mr-3" />
                <span>Login</span>
              </button>
            )}
          </div>

          <div className="h-16" /> {/* Spacer for bottom nav */}
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          onClose();
        }}
      />

      <DeleteProfileModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          onClose();
        }}
      />
    </>
  );
};