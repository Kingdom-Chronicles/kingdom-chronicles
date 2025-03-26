import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../ui/Button';
import { SignUpModal } from './SignUpModal';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await authService.signIn(email, password);
      login(user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSuccess = () => {
    setShowSignUp(false);
    setEmail('');
    setPassword('');
    setError('Account created! Please log in.');
  };

  const handleContinueAsGuest = () => {
    onClose();
    navigate('/games');
  };

  if (!isOpen) return null;

  if (showSignUp) {
    return (
      <SignUpModal
        isOpen={true}
        onClose={() => setShowSignUp(false)}
        onSuccess={handleSignUpSuccess}
      />
    );
  }

  return (
    <div className="modal-container">
      <div className="modal-content">
        <button
          onClick={onClose}
          className="modal-close-button"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="modal-title">Login to Save Progress</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <p className={`form-error ${error.includes('created') ? 'text-green-500 dark:text-green-400' : ''}`}>
              {error}
            </p>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <p className="form-text mt-4">
            Don't have an account?{' '}
            <button
              type="button"
              className="form-link"
              onClick={() => setShowSignUp(true)}
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <p className="form-text">
            Or continue as guest to play without saving progress
          </p>
          <Button
            variant="outline"
            onClick={handleContinueAsGuest}
            className="w-full mt-4"
            disabled={isLoading}
          >
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  );
};