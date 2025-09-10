import React from 'react';
import { Code, Palette, FileText, Globe, Database, Zap, MessageSquare } from 'lucide-react';

interface SidebarProps {
  activeMode: string;
  onModeChange: (mode: string) => void;
}

const modes = [
  { id: 'chat', label: 'Chat Assistant', icon: MessageSquare, description: 'General AI conversation' },
  { id: 'code', label: 'Code Generator', icon: Code, description: 'Generate and debug code' },
  { id: 'web', label: 'Web Developer', icon: Globe, description: 'Build websites and apps' },
  { id: 'design', label: 'UI Designer', icon: Palette, description: 'Create beautiful interfaces' },
  { id: 'content', label: 'Content Writer', icon: FileText, description: 'Write articles and copy' },
  { id: 'database', label: 'Database Expert', icon: Database, description: 'Design and optimize databases' },
  { id: 'automation', label: 'Automation', icon: Zap, description: 'Create scripts and workflows' },
];

export default function Sidebar({ activeMode, onModeChange }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">AI Capabilities</h3>
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
              activeMode === mode.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'hover:bg-white hover:shadow-sm text-gray-700'
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
  );
}