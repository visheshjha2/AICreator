import React from 'react';
import { Code, Palette, FileText, Database, Zap, MessageSquare, History, Sparkles, X } from 'lucide-react';
import ChatHistory, { ChatSession } from './ChatHistory';

interface SidebarProps {
  activeMode: string;
  onModeChange: (mode: string) => void;
  chats: ChatSession[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  onChatDelete: (chatId: string) => void;
  isAuthenticated: boolean;
  isMobileMenuOpen?: boolean;
  onMobileMenuClose?: () => void;
  onNewChat?: () => void;
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
  isMobileMenuOpen,
  onMobileMenuClose,
  onNewChat
}: SidebarProps) {
  const handleModeChange = (mode: string) => {
    onModeChange(mode);
    // Close mobile menu when mode is selected on mobile
    if (onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  const handleChatSelect = (chatId: string) => {
    onChatSelect(chatId);
    // Close mobile menu when chat is selected on mobile
    if (onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onMobileMenuClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:relative top-0 left-0 h-full w-80 md:w-64 bg-gray-50 border-r border-gray-200 z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">AI Creator</span>
          </div>
          <button
            onClick={onMobileMenuClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile New Chat Button */}
        {isAuthenticated && onNewChat && (
          <div className="md:hidden p-4 border-b border-gray-200">
            <button
              onClick={() => {
                onNewChat();
                onMobileMenuClose?.();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              New Chat
            </button>
          </div>
        )}

        <div className="h-full overflow-y-auto p-4 pb-20 md:pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* AI Capabilities Section */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">AI Capabilities</h3>
          <div className="space-y-2">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 active:scale-95 ${
                  activeMode === mode.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'hover:bg-white hover:shadow-sm text-gray-700'
                }`}
              >
                <mode.icon className="w-5 h-5 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-sm md:text-sm">{mode.label}</div>
                  <div className={`text-xs mt-1 leading-relaxed ${
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
            <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-4 h-4 text-gray-600" />
              <h3 className="text-sm font-semibold text-gray-700">Chat History</h3>
            </div>
            <ChatHistory
              chats={chats}
              activeChat={activeChat}
              onChatSelect={handleChatSelect}
              onChatDelete={onChatDelete}
            />
          </div>
        )}
        </div>
      </div>
    </>
  );
}