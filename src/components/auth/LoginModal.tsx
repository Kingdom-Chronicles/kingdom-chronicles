import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
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
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
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
      setEmail(''); // Clear the email field after login
      setPassword(''); // Clear the password field after login
      setShowPassword(false);
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

  const handleResetPassword = async () => {
    if (newPassword.trim()) {
      try {
        await authService.resetPassword(resetEmail, newPassword);
        setPasswordResetSuccess(true);
        setShowResetPassword(false);
        setNewPassword('');
        setResetEmail('');
        setError('');
        setPassword('');
        
        // Clear the success message immediately after it's set
        setPasswordResetSuccess(false);
      } catch (err: any) {
        setError(err.message || 'An error occurred while resetting the password.');
      }
    } else {
      setError('Please enter a new password.');
    }
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

  if (showResetPassword) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
          <button
            onClick={() => setShowResetPassword(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold mb-6">Reset Your Password</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className={`text-sm ${error.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                {error}
              </p>
            )}

            <Button
              onClick={handleResetPassword}
              className="w-full"
              disabled={isLoading}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Login to Save Progress</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
            {passwordResetSuccess && (
              <p className="text-sm text-green-500 mt-2">
                Password successfully updated! Please log in with your new password.
              </p>
            )}
          </div>

          {error && (
            <p className={`text-sm ${error.includes('created') ? 'text-green-500' : 'text-red-500'}`}>
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

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-500"
              onClick={() => setShowSignUp(true)}
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>

          <p className="text-center text-sm text-gray-500 mt-4">
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-500"
              onClick={() => setShowResetPassword(true)}
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </p>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
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
