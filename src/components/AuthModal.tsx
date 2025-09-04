import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { localAuth, User as LocalUser } from '../utils/localAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onModeChange: (mode: 'login' | 'signup') => void;
  onAuthSuccess: (user: LocalUser) => void;
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange, onAuthSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let user: LocalUser;
      
      if (mode === 'signup') {
        user = await localAuth.signUp(email, password, name);
      } else {
        user = await localAuth.signIn(email, password);
      }
      
      onAuthSuccess(user);
      onClose();
      setEmail('');
      setPassword('');
      setName('');
    } catch (error: any) {
      let errorMessage = 'An error occurred. Please try again.';
      
      if (error.message === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please sign in instead.';
      } else if (error.message === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters long.';
      } else if (error.message === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.message === 'auth/user-not-found') {
        errorMessage = 'No account found with this email. Please sign up first.';
      } else if (error.message === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 touch-manipulation"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 touch-manipulation min-h-[44px]"
          >
            {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}
              className="ml-1 text-purple-600 hover:text-purple-700 font-medium touch-manipulation"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}