import { collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Message } from '../components/ChatMessage';
import { ChatSession } from '../components/ChatHistory';

export const saveChatSession = async (
  userId: string,
  title: string,
  messages: Message[],
  mode: string
): Promise<string> => {
  try {
    const chatData = {
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

    const docRef = await addDoc(collection(db, 'chats'), chatData);
    return docRef.id;
  } catch (error) {
    console.error('Error saving chat session:', error);
    throw error;
  }
};

export const updateChatSession = async (
  chatId: string,
  messages: Message[],
  title?: string
): Promise<void> => {
  try {
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

    await updateDoc(doc(db, 'chats', chatId), updateData);
  } catch (error) {
    console.error('Error updating chat session:', error);
    throw error;
  }
};

export const getUserChats = async (userId: string): Promise<ChatSession[]> => {
  try {
    const q = query(
      collection(db, 'chats'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const chats: ChatSession[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      chats.push({
        id: doc.id,
        title: data.title,
        lastMessage: data.lastMessage,
        timestamp: new Date(data.updatedAt),
        mode: data.mode
      });
    });
    
    return chats;
  } catch (error) {
    console.error('Error getting user chats:', error);
    return [];
  }
};

export const getChatMessages = async (chatId: string): Promise<Message[]> => {
  try {
    const chatDoc = await getDocs(query(collection(db, 'chats'), where('__name__', '==', chatId)));
    
    if (!chatDoc.empty) {
      const data = chatDoc.docs[0].data();
      return data.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error getting chat messages:', error);
    return [];
  }
};

export const deleteChatSession = async (chatId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'chats', chatId));
  } catch (error) {
    console.error('Error deleting chat session:', error);
    throw error;
  }
};

export const generateChatTitle = (messages: Message[]): string => {
  const firstUserMessage = messages.find(msg => msg.type === 'user');
  if (firstUserMessage) {
    const title = firstUserMessage.content.substring(0, 50);
    return title.length < firstUserMessage.content.length ? title + '...' : title;
  }
  return 'New Chat';
};