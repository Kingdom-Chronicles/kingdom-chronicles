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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Login to Save Progress</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                       focus:border-indigo-500 dark:focus:border-indigo-400"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                       focus:border-indigo-500 dark:focus:border-indigo-400"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <p className={`text-sm ${error.includes('created') ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
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

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
              onClick={() => setShowSignUp(true)}
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
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