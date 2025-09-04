import React from 'react';
import { Bot, User, Copy, ThumbsUp, ThumbsDown, Download, Heart, Sparkles } from 'lucide-react';
import CodeBlock from './CodeBlock';

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    mode?: string;
    codeLanguage?: string;
    isCode?: boolean;
    files?: Array<{ name: string; content: string; language: string }>;
  };
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [liked, setLiked] = React.useState(false);
  const [disliked, setDisliked] = React.useState(false);
  const [showLikeEffect, setShowLikeEffect] = React.useState(false);
  const [showDislikeEffect, setShowDislikeEffect] = React.useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadFiles = (files: Array<{ name: string; content: string; language: string }>) => {
    files.forEach(file => {
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setDisliked(false);
      setShowLikeEffect(true);
      setTimeout(() => setShowLikeEffect(false), 1000);
    } else {
      setLiked(false);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDisliked(true);
      setLiked(false);
      setShowDislikeEffect(true);
      setTimeout(() => setShowDislikeEffect(false), 800);
    } else {
      setDisliked(false);
    }
  };

  return (
    <div className={`flex gap-3 sm:gap-4 p-4 sm:p-6 ${message.type === 'assistant' ? 'bg-gray-50/50' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        message.type === 'assistant' 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
          : 'bg-gray-600'
      }`}>
        {message.type === 'assistant' ? (
          <Bot className="w-4 h-4 text-white" />
        ) : (
          <User className="w-4 h-4 text-white" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-gray-900">
            {message.type === 'assistant' ? 'AI Creator' : 'You'}
          </span>
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </span>
          {message.metadata?.mode && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              {message.metadata.mode}
            </span>
          )}
        </div>
        
        <div className="prose prose-sm max-w-none">
          {message.metadata?.isCode ? (
            <CodeBlock 
              code={message.content} 
              language={message.metadata.codeLanguage || 'text'} 
            />
          ) : (
            <p className="whitespace-pre-wrap text-gray-700 text-sm sm:text-base leading-relaxed">{message.content}</p>
          )}
        </div>
        
        {message.metadata?.files && message.metadata.files.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-semibold text-gray-700">Generated Files:</h4>
            {message.metadata.files.map((file, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 border-b border-gray-200">
                  <span className="font-mono text-sm text-gray-700">{file.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(file.content)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <CodeBlock code={file.content} language={file.language} />
              </div>
            ))}
            <button
              onClick={() => downloadFiles(message.metadata?.files || [])}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors active:scale-95 touch-manipulation"
            >
              <Download className="w-4 h-4" />
              Download All Files
            </button>
          </div>
        )}
        
        {message.type === 'assistant' && (
          <div className="flex items-center gap-1 sm:gap-2 mt-4 relative">
            <button 
              onClick={handleLike}
              className={`relative p-2 rounded-full transition-all duration-200 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center ${
                liked 
                  ? 'text-green-600 bg-green-100 transform scale-110' 
                  : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 transition-transform duration-200 ${liked ? 'scale-110' : ''}`} />
              
              {/* Like effect animation */}
              {showLikeEffect && (
                <>
                  <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>
                  <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-red-500 animate-bounce" />
                  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 animate-spin" />
                  <Sparkles className="absolute -bottom-1 -left-1 w-2 h-2 text-blue-400 animate-pulse" />
                </>
              )}
            </button>
            
            <button 
              onClick={handleDislike}
              className={`relative p-2 rounded-full transition-all duration-200 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center ${
                disliked 
                  ? 'text-red-600 bg-red-100 transform scale-110' 
                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <ThumbsDown className={`w-4 h-4 transition-transform duration-200 ${disliked ? 'scale-110' : ''}`} />
              
              {/* Dislike effect animation */}
              {showDislikeEffect && (
                <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></div>
              )}
            </button>
            
            <button 
              onClick={() => copyToClipboard(message.content)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}