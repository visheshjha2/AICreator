import React, { useState, useRef, useEffect } from 'react';
import { localAuth, User } from './utils/localAuth';
import { localChatStorage } from './utils/localChatStorage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatMessage, { Message } from './components/ChatMessage';
import PromptInput from './components/PromptInput';
import LoadingIndicator from './components/LoadingIndicator';
import AuthModal from './components/AuthModal';
import { ChatSession } from './components/ChatHistory';
import { generateAIResponse } from './utils/aiResponses';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(true);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeMode, setActiveMode] = useState('chat');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  useEffect(() => {
    // Initialize app with error handling
    const initializeApp = async () => {
      try {
        const currentUser = localAuth.getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          loadUserChats(currentUser.id);
        } else {
          setChats([]);
          setActiveChat(null);
          setMessages([getWelcomeMessage('chat')]);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        setMessages([getWelcomeMessage('chat')]);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    // Initialize with welcome message if no messages
    if (messages.length === 0) {
      setMessages([getWelcomeMessage(activeMode)]);
    }
  }, [activeMode]);

  const loadUserChats = (userId: string) => {
    try {
      const userChats = localChatStorage.getUserChats(userId);
      setChats(userChats);
    } catch (error) {
      console.error('Error loading chats:', error);
    }
  };

  const getWelcomeMessage = (mode: string): Message => {
    const welcomeMessages: Record<string, string> = {
      chat: "Hello! I'm your AI assistant. I can help you with any questions or conversations. What would you like to know?",
      code: "I'm ready to help with programming and coding tasks. What do you need help with?",
      design: "I'm ready to help with UI/UX design. What design challenge can I help with?",
      content: "I'm ready to help create content. What type of content do you need?",
      database: "I'm ready to help with database questions. What database topic can I assist with?",
      automation: "I'm ready to help with automation and scripting. What would you like to automate?"
    };

    return {
      id: '1',
      type: 'assistant',
      content: welcomeMessages[mode] || welcomeMessages.chat,
      timestamp: new Date(),
      metadata: { mode: mode.charAt(0).toUpperCase() + mode.slice(1) }
    };
  };

  const handlePromptSubmit = async (prompt: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsGenerating(true);

    try {
      const response = await generateAIResponse(prompt, activeMode);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        metadata: response.metadata
      };
      
      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);

      // Save or update chat session
      if (activeChat) {
        localChatStorage.updateChatSession(activeChat, finalMessages);
      } else {
        const title = localChatStorage.generateChatTitle(finalMessages);
        const chatId = localChatStorage.saveChatSession(user.id, title, finalMessages, activeMode);
        setActiveChat(chatId);
        loadUserChats(user.id);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
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
    setMessages([getWelcomeMessage(activeMode)]);
    setActiveChat(null);
    setIsMobileMenuOpen(false); // Close mobile menu when starting new chat
  };

  const handleModeChange = async (mode: string) => {
    // Save current chat if there are messages and user is logged in
    if (user && messages.length > 1 && !activeChat) {
      try {
        const title = localChatStorage.generateChatTitle(messages);
        localChatStorage.saveChatSession(user.id, title, messages, activeMode);
        loadUserChats(user.id);
      } catch (error) {
        console.error('Error saving chat before mode change:', error);
      }
    }

    setActiveMode(mode);
    setMessages([getWelcomeMessage(mode)]);
    setActiveChat(null);
    setIsMobileMenuOpen(false); // Close mobile menu when changing mode
  };

  const handleChatSelect = (chatId: string) => {
    try {
      const chatMessages = localChatStorage.getChatMessages(chatId);
      setMessages(chatMessages);
      setActiveChat(chatId);
      setIsMobileMenuOpen(false); // Close mobile menu when selecting chat
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  const handleChatDelete = (chatId: string) => {
    try {
      localChatStorage.deleteChatSession(chatId);
      if (activeChat === chatId) {
        setMessages([getWelcomeMessage(activeMode)]);
        setActiveChat(null);
      }
      if (user) {
        loadUserChats(user.id);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await localAuth.signOut();
      setUser(null);
      setMessages([]);
      setActiveChat(null);
      setChats([]);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    loadUserChats(authenticatedUser.id);
    setAuthModalOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header 
        onNewChat={handleNewChat} 
        user={user}
        onAuthClick={() => setAuthModalOpen(true)}
        onSignOut={handleSignOut}
        onMobileMenuToggle={handleMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar 
          activeMode={activeMode} 
          onModeChange={handleModeChange}
          chats={chats}
          activeChat={activeChat}
          onChatSelect={handleChatSelect}
          onChatDelete={handleChatDelete}
          isAuthenticated={!!user}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={() => setIsMobileMenuOpen(false)}
          onNewChat={handleNewChat}
        />
        
        <div className="flex-1 flex flex-col min-w-0">
          {user ? (
            <>
              <div className="flex-1 overflow-y-auto px-2 sm:px-0">
                <div className="max-w-4xl mx-auto">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center p-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                          Welcome to AI Creator
                        </h2>
                        <p className="text-gray-600">
                          Start a conversation to begin using the AI assistant
                        </p>
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))
                  )}
                  {isGenerating && <LoadingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <PromptInput onSubmit={handlePromptSubmit} isGenerating={isGenerating} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md mx-auto p-4 sm:p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🤖</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                  Welcome to AI Creator
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-8">
                  Sign in to start creating amazing content with AI assistance. 
                  Build anything from code to creative content with our powerful AI tools.
                </p>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 touch-manipulation"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;