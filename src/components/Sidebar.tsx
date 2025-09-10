import React from 'react';
import { Code, Palette, FileText, Globe, Database, Zap, MessageSquare, History, ChevronLeft, ChevronRight, User, LogOut, Sparkles } from 'lucide-react';
import ChatHistory, { ChatSession } from './ChatHistory';
import { User as LocalUser } from '../utils/localAuth';

interface SidebarProps {
  activeMode: string;
  onModeChange: (mode: string) => void;
  chats: ChatSession[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  onChatDelete: (chatId: string) => void;
  isAuthenticated: boolean;
  showMobileMenu: boolean;
  onCloseMobileMenu: () => void;
  user: LocalUser | null;
  onNewChat: () => void;
  onSignOut: () => void;
  onAuthClick: () => void;
}

const modes = [
  { id: 'chat', label: 'Chat Assistant', icon: MessageSquare, description: 'General AI conversation' },
  { id: 'code', label: 'Code Generator', icon: Code, description: 'Generate and debug code' },
  { id: 'design', label: 'UI Designer', icon: Palette, description: 'Create beautiful interfaces' },
  { id: 'content', label: 'Content Writer', icon: FileText, description: 'Write articles and copy' },
  { id: 'database', label: 'Database Expert', icon: Database, description: 'Design and optimize databases' },
  { id: 'automation', label: 'Automation', icon: Zap, description: 'Create scripts and workflows' },
];

export default function Sidebar({ 
  activeMode, 
  onModeChange, 
  chats, 
  activeChat, 
  onChatSelect, 
  onChatDelete,
  isAuthenticated,
  showMobileMenu,
  onCloseMobileMenu,
  user,
  onNewChat,
  onSignOut,
  onAuthClick
}: SidebarProps) {
  const handleModeChange = (mode: string) => {
    onModeChange(mode);
    onCloseMobileMenu();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAccountType = () => {
    // You can customize this logic based on your user data
    return 'Free';
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onCloseMobileMenu}
        />
      )}
      
      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden fixed top-16 right-4 left-4 bg-white rounded-lg shadow-xl border border-gray-200 z-50 transform transition-all duration-300 ease-in-out ${
        showMobileMenu 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
      }`}>
        <div className="p-4 max-h-96 overflow-y-auto scrollbar-thin">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">AI Capabilities</h3>
          
          {/* New Chat Button for Mobile */}
          {user && (
            <button
              onClick={() => {
                onNewChat();
                onCloseMobileMenu();
              }}
              className="w-full flex items-center gap-2 p-3 mb-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              New Chat
            </button>
          )}
          
          <div className="space-y-2">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                  activeMode === mode.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <mode.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-sm">{mode.label}</div>
                  <div className={`text-xs mt-1 ${
                    activeMode === mode.id ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {mode.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Chat History Section for Mobile */}
          {isAuthenticated && chats.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <History className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-700">Chat History</h3>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
                {chats.slice(0, 5).map((chat) => (
                  <div
                    key={chat.id}
                    className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      activeChat === chat.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => {
                      onChatSelect(chat.id);
                      onCloseMobileMenu();
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm mb-1 truncate">
                          {chat.title.length > 20 ? chat.title.substring(0, 20) + '...' : chat.title}
                        </h4>
                        <p className={`text-xs mb-1 truncate ${
                          activeChat === chat.id ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {chat.lastMessage.length > 25 ? chat.lastMessage.substring(0, 25) + '...' : chat.lastMessage}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs ${
                            activeChat === chat.id ? 'text-white/70' : 'text-gray-400'
                          }`}>
                            {(() => {
                              const now = new Date();
                              const diff = now.getTime() - chat.timestamp.getTime();
                              const minutes = Math.floor(diff / (1000 * 60));
                              const hours = Math.floor(diff / (1000 * 60 * 60));
                              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                              
                              if (minutes < 1) return 'Just now';
                              if (minutes < 60) return `${minutes}m ago`;
                              if (hours < 24) return `${hours}h ago`;
                              if (days === 1) return 'Yesterday';
                              if (days < 7) return `${days} days ago`;
                              return chat.timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' });
                            })()}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            activeChat === chat.id 
                              ? 'bg-white/20 text-white' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {chat.mode}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {chats.length > 5 && (
                  <div className="text-center py-2">
                    <span className="text-xs text-gray-500">
                      +{chats.length - 5} more chats
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Auth Section for Mobile */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {getInitials(user.displayName || user.email)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.displayName || user.email}
                    </p>
                    <p className="text-xs text-gray-500">{getAccountType()}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onSignOut();
                    onCloseMobileMenu();
                  }}
                  className="w-full flex items-center gap-2 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onAuthClick();
                  onCloseMobileMenu();
                }}
                className="w-full flex items-center gap-2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-gray-50 border-r border-gray-200 p-4 h-full">
        <div className="h-full flex flex-col overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* New Chat Button for Desktop */}
          {user && (
            <button
              onClick={onNewChat}
              className="flex items-center gap-2 p-3 mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-4 h-4" />
              New Chat
            </button>
          )}
          
          {/* AI Capabilities Section */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">AI Capabilities</h3>
            <div className="space-y-2">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => onModeChange(mode.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                    activeMode === mode.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                      : 'hover:bg-white hover:shadow-sm text-gray-700 hover:transform hover:scale-102'
                  }`}
                >
                  <mode.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-sm">{mode.label}</div>
                    <div className={`text-xs mt-1 ${
                      activeMode === mode.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {mode.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Chat History Section */}
          {isAuthenticated && (
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-700">Chat History</h3>
              </div>
              <ChatHistory
                chats={chats}
                activeChat={activeChat}
                onChatSelect={onChatSelect}
                onChatDelete={onChatDelete}
              />
            </div>
          )}
          
          {/* Account Section at Bottom */}
          <div className="mt-auto pt-4">
            {user ? (
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(user.displayName || user.email)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.displayName || user.email}
                    </p>
                    <p className="text-xs text-gray-500">{getAccountType()}</p>
                  </div>
                </div>
                <button
                  onClick={onSignOut}
                  className="w-full flex items-center justify-center gap-2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}