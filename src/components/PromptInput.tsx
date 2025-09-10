import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isGenerating: boolean;
}

export default function PromptInput({ onSubmit, isGenerating }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onSubmit(prompt);
      setPrompt('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        // Handle image upload
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = event.target?.result as string;
          setPrompt(prev => prev + `\n[Image uploaded: ${file.name}]`);
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('text/')) {
        // Handle text file upload
        const reader = new FileReader();
        reader.onload = (event) => {
          const textContent = event.target?.result as string;
          setPrompt(prev => prev + `\n[File content: ${file.name}]\n${textContent}`);
        };
        reader.readAsText(file);
      } else {
        setPrompt(prev => prev + `\n[File uploaded: ${file.name}]`);
      }
    }
  };
  return (
    <div className="border-t border-gray-200 p-4 pb-16 bg-white">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to create..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>
        <div className="flex gap-2">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*,text/*,.pdf,.doc,.docx"
          />
          <button
            type="button"
            onClick={() => document.getElementById('file-upload')?.click()}
            className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Upload file"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}