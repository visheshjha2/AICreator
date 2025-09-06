import React from 'react';
import { Code, Palette, FileText, Globe, Database, Zap, MessageSquare, History, ChevronLeft, ChevronRight } from 'lucide-react';
import ChatHistory, { ChatSession } from './ChatHistory';

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
  onCloseMobileMenu
}: SidebarProps) {
  const handleModeChange = (mode: string) => {
    onModeChange(mode);
    onCloseMobileMenu();
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
        <div className="p-4 max-h-96 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">AI Capabilities</h3>
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
        </div>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-gray-50 border-r border-gray-200 p-4 h-full">
      <div className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
          <div>
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
      </div>
      </div>
    </>
  );
}