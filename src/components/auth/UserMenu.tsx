import React, { useState } from 'react';
import { User, LogOut, UserX } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { authService } from '../../services/auth';
import { Button } from '../ui/Button';
import { LoginModal } from './LoginModal';
import { DeleteProfileModal } from './DeleteProfileModal';

export const UserMenu: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user, isAuthenticated, guestScore, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authService.signOut();
      logout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <p className="font-medium text-theme-primary">{user?.username}</p>
              <div className="flex items-center space-x-2">
                <span className="text-theme-secondary">Total Points:</span>
                <span className="font-semibold text-indigo-600">{user?.points}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <UserX className="w-4 h-4 mr-2" />
                Delete Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            {guestScore > 0 && (
              <div className="text-sm">
                <span className="text-theme-secondary">Guest Points:</span>
                <span className="ml-1 font-semibold text-indigo-600">{guestScore}</span>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center"
            >
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
          </div>
        )}
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <DeleteProfileModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
};