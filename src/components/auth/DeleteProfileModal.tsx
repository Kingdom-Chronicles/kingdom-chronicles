import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../ui/Button';
import { authService } from '../../services/auth';

interface DeleteProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteProfileModal: React.FC<DeleteProfileModalProps> = ({ isOpen, onClose }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { user, logout } = useAuthStore();

  if (!isOpen || !user) return null;

  const handleDeleteProfile = async () => {
    try {
      setIsDeleting(true);
      await authService.deleteAccount(user.id);
      logout();
      onClose();
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <button
          onClick={onClose}
          className="modal-close-button"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Delete Profile</h2>
          <p className="text-gray-600 text-center">
            Are you sure you want to delete your profile? This action cannot be undone.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            This will:
            <ul className="list-disc ml-5 mt-2">
              <li>Delete your account permanently</li>
              <li>Remove all your game progress</li>
              <li>Delete your achievements</li>
              <li>Remove you from the leaderboards</li>
            </ul>
          </p>

          <div className="flex flex-col space-y-3">
            <Button
              onClick={handleDeleteProfile}
              disabled={isDeleting}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete My Profile'}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              disabled={isDeleting}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};