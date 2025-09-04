import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';

export interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  mode: string;
}

interface ChatHistoryProps {
  chats: ChatSession[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  onChatDelete: (chatId: string) => void;
}

export default function ChatHistory({ chats, activeChat, onChatSelect, onChatDelete }: ChatHistoryProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-2">
      {chats.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No chat history yet</p>
        </div>
      ) : (
        chats.map((chat) => (
          <div
            key={chat.id}
            className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 active:scale-95 ${
              activeChat === chat.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'hover:bg-white hover:shadow-sm text-gray-700'
            }`}
            onClick={() => onChatSelect(chat.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm mb-1">
                  {truncateText(chat.title, 30)}
                </h4>
                <p className={`text-xs mb-1 ${
                  activeChat === chat.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {truncateText(chat.lastMessage, 30)}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${
                    activeChat === chat.id ? 'text-white/70' : 'text-gray-400'
                  }`}>
                    {formatTime(chat.timestamp)}
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChatDelete(chat.id);
                }}
                className={`opacity-0 group-hover:opacity-100 p-2 rounded transition-opacity touch-manipulation ${
                  activeChat === chat.id
                    ? 'hover:bg-white/20 text-white'
                    : 'hover:bg-red-100 text-red-600'
                }`}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}