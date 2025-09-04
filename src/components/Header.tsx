import React from 'react';
import { Bot, Sparkles, LogOut, User } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
  onNewChat: () => void;
  user: FirebaseUser | null;
  onAuthClick: () => void;
  onSignOut: () => void;
}

export default function Header({ onNewChat, user, onAuthClick, onSignOut }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Creator</h1>
            <p className="text-sm text-gray-500">Build anything with AI</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <button
              onClick={onNewChat}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-4 h-4" />
              New Chat
            </button>
          )}
          
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {user.displayName || user.email}
                </span>
              </div>
              <button
                onClick={onSignOut}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <User className="w-4 h-4" />
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}