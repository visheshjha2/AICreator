import React from 'react';
import { Bot, Sparkles, LogOut, User, Menu, X } from 'lucide-react';
import { User as LocalUser } from '../utils/localAuth';

interface HeaderProps {
  onNewChat: () => void;
  user: LocalUser | null;
  onAuthClick: () => void;
  onSignOut: () => void;
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function Header({ 
  onNewChat, 
  user, 
  onAuthClick, 
  onSignOut, 
  onMobileMenuToggle,
  isMobileMenuOpen 
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile menu button - only visible on mobile */}
          {user && (
            <button
              onClick={onMobileMenuToggle}
              className="md:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          )}
          
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">AI Creator</h1>
            <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Build anything with AI</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {user && (
            <button
              onClick={onNewChat}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-4 h-4" />
              New Chat
            </button>
          )}
          
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {user.displayName || user.email}
                </span>
              </div>
              
              {/* Mobile user indicator */}
              <div className="sm:hidden w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              
              <button
                onClick={onSignOut}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
              
              {/* Mobile sign out button */}
              <button
                onClick={onSignOut}
                className="sm:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}