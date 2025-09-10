import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatMessage, { Message } from './components/ChatMessage';
import PromptInput from './components/PromptInput';
import LoadingIndicator from './components/LoadingIndicator';
import { generateAIResponse } from './utils/aiResponses';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI Creator assistant. I can help you build anything you can imagine - from web applications and mobile apps to content, designs, and automation workflows. What would you like to create today?",
      timestamp: new Date(),
      metadata: { mode: 'Chat Assistant' }
    }
  ]);
  const [activeMode, setActiveMode] = useState('chat');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handlePromptSubmit = async (prompt: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsGenerating(true);

    try {
      const response = await generateAIResponse(prompt, activeMode);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: "I apologize, but I encountered an error while processing your request. Please try again.",
        timestamp: new Date(),
        metadata: { mode: activeMode }
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: "Hello! I'm your AI Creator assistant. I can help you build anything you can imagine - from web applications and mobile apps to content, designs, and automation workflows. What would you like to create today?",
        timestamp: new Date(),
        metadata: { mode: 'Chat Assistant' }
      }
    ]);
  };

  const handleModeChange = (mode: string) => {
    setActiveMode(mode);
    const modeMessages: Record<string, string> = {
      chat: "I'm ready to assist with general questions and conversations. How can I help you?",
      code: "I'm ready to generate code for any programming task. What would you like me to build?",
      web: "I'm ready to build web applications and websites. What project should we start with?",
      design: "I'm ready to create beautiful UI designs and user experiences. What should we design?",
      content: "I'm ready to write compelling content for your needs. What type of content should I create?",
      database: "I'm ready to help with database design and optimization. What data system are you building?",
      automation: "I'm ready to create automation workflows and scripts. What tasks should we automate?"
    };

    const modeMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: modeMessages[mode] || modeMessages.chat,
      timestamp: new Date(),
      metadata: { mode: mode.charAt(0).toUpperCase() + mode.slice(1) }
    };

    setMessages(prev => [...prev, modeMessage]);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header onNewChat={handleNewChat} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeMode={activeMode} onModeChange={handleModeChange} />
        
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isGenerating && <LoadingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <PromptInput onSubmit={handlePromptSubmit} isGenerating={isGenerating} />
        </div>
      </div>
    </div>
  );
}

export default App;