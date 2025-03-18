import React, { useState } from 'react';
import { X } from 'lucide-react';
import { authService } from '../../services/auth';
import { Button } from '../ui/Button';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.signUp(email, password, username);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error creating account');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <button
          onClick={onClose}
          className="modal-close-button"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="modal-title">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>

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
              minLength={8}
            />
            <p className="form-helper-text">
              Password must be at least 8 characters long
            </p>
          </div>

          {error && (
            <p className="form-error">{error}</p>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>

          <p className="form-text">
            Already have an account?{' '}
            <button
              type="button"
              className="form-link"
              onClick={onClose}
              disabled={isLoading}
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};