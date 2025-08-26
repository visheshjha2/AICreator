import { Message } from '../components/ChatMessage';
import { ChatSession } from '../components/ChatHistory';

class LocalChatStorage {
  private chatsKey = 'ai-creator-chats';

  // Get all chats for a user
  getUserChats(userId: string): ChatSession[] {
    try {
      const allChats = this.getAllChats();
      return allChats
        .filter(chat => chat.userId === userId)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .map(chat => ({
          id: chat.id,
          title: chat.title,
          lastMessage: chat.lastMessage,
          timestamp: new Date(chat.updatedAt),
          mode: chat.mode
        }));
    } catch (error) {
      console.error('Error getting user chats:', error);
      return [];
    }
  }

  // Save a new chat session
  saveChatSession(
    userId: string,
    title: string,
    messages: Message[],
    mode: string
  ): string {
    try {
      const chatId = Date.now().toString();
      const allChats = this.getAllChats();
      
      const newChat = {
        id: chatId,
        userId,
        title,
        messages: messages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp.toISOString()
        })),
        mode,
        lastMessage: messages[messages.length - 1]?.content || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      allChats.push(newChat);
      localStorage.setItem(this.chatsKey, JSON.stringify(allChats));
      
      return chatId;
    } catch (error) {
      console.error('Error saving chat session:', error);
      throw error;
    }
  }

  // Update an existing chat session
  updateChatSession(chatId: string, messages: Message[], title?: string): void {
    try {
      const allChats = this.getAllChats();
      const chatIndex = allChats.findIndex(chat => chat.id === chatId);
      
      if (chatIndex === -1) {
        throw new Error('Chat not found');
      }

      const updateData: any = {
        messages: messages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp.toISOString()
        })),
        lastMessage: messages[messages.length - 1]?.content || '',
        updatedAt: new Date().toISOString()
      };

      if (title) {
        updateData.title = title;
      }

      allChats[chatIndex] = { ...allChats[chatIndex], ...updateData };
      localStorage.setItem(this.chatsKey, JSON.stringify(allChats));
    } catch (error) {
      console.error('Error updating chat session:', error);
      throw error;
    }
  }

  // Get messages for a specific chat
  getChatMessages(chatId: string): Message[] {
    try {
      const allChats = this.getAllChats();
      const chat = allChats.find(c => c.id === chatId);
      
      if (!chat) {
        return [];
      }

      return chat.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    } catch (error) {
      console.error('Error getting chat messages:', error);
      return [];
    }
  }

  // Delete a chat session
  deleteChatSession(chatId: string): void {
    try {
      const allChats = this.getAllChats();
      const filteredChats = allChats.filter(chat => chat.id !== chatId);
      localStorage.setItem(this.chatsKey, JSON.stringify(filteredChats));
    } catch (error) {
      console.error('Error deleting chat session:', error);
      throw error;
    }
  }

  // Generate a chat title from messages
  generateChatTitle(messages: Message[]): string {
    const firstUserMessage = messages.find(msg => msg.type === 'user');
    if (firstUserMessage) {
      const title = firstUserMessage.content.substring(0, 50);
      return title.length < firstUserMessage.content.length ? title + '...' : title;
    }
    return 'New Chat';
  }

  // Get all chats from localStorage
  private getAllChats(): any[] {
    try {
      const chats = localStorage.getItem(this.chatsKey);
      return chats ? JSON.parse(chats) : [];
    } catch (error) {
      console.error('Error getting all chats:', error);
      return [];
    }
  }
}

export const localChatStorage = new LocalChatStorage();