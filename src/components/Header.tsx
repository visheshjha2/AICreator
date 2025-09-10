import React from 'react';
import { Bot, MoreVertical, X } from 'lucide-react';
import { User as LocalUser } from '../utils/localAuth';

interface HeaderProps {
  user: LocalUser | null;
  showMobileMenu: boolean;
  onToggleMobileMenu: () => void;
}

export default function Header({ 
  user, 
  showMobileMenu, 
  onToggleMobileMenu 
}: HeaderProps) {
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
        
        {/* Mobile Three-Dot Menu */}
        <div className="md:hidden">
          <button
            onClick={onToggleMobileMenu}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {showMobileMenu ? (
              <X className="w-5 h-5" />
            ) : (
              <MoreVertical className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}