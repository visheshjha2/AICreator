import { Message } from '../components/ChatMessage';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function generateAIResponse(prompt: string, mode: string): Promise<Message> {
  try {
    // Create system message based on mode
    const systemMessages: Record<string, string> = {
      chat: "You are a helpful AI assistant. Provide clear, direct answers to questions. For simple questions like math problems, give straightforward answers.",
      code: "You are an expert programmer. Help with coding questions, debug issues, and generate clean, working code.",
      web: "You are a web development expert. Help build websites, web applications, and provide modern web development solutions.",
      design: "You are a UI/UX design expert. Help create beautiful, user-friendly interfaces and provide design guidance.",
      content: "You are a content creation expert. Help write articles, copy, marketing content, and creative writing.",
      database: "You are a database expert. Help with database design, queries, optimization, and data management.",
      automation: "You are an automation expert. Help create scripts, workflows, and automated solutions."
    };

    const systemMessage = systemMessages[mode] || systemMessages.chat;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AI Assistant'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

    // Check if the response contains code
    const hasCode = aiResponse.includes('```');
    let files: Array<{ name: string; content: string; language: string }> = [];

    if (hasCode && (mode === 'code' || mode === 'web')) {
      // Extract code blocks and create files
      const codeBlocks = aiResponse.match(/```(\w+)?\n([\s\S]*?)```/g);
      if (codeBlocks) {
        codeBlocks.forEach((block, index) => {
          const match = block.match(/```(\w+)?\n([\s\S]*?)```/);
          if (match) {
            const language = match[1] || 'text';
            const content = match[2].trim();
            
            // Generate appropriate filename based on language
            const extensions: Record<string, string> = {
              javascript: 'js',
              typescript: 'ts',
              html: 'html',
              css: 'css',
              python: 'py',
              java: 'java',
              cpp: 'cpp',
              c: 'c',
              php: 'php',
              ruby: 'rb',
              go: 'go',
              rust: 'rs',
              sql: 'sql',
              json: 'json',
              xml: 'xml',
              yaml: 'yml'
            };

            const extension = extensions[language.toLowerCase()] || 'txt';
            const filename = `generated_${index + 1}.${extension}`;
            
            files.push({
              name: filename,
              content: content,
              language: language
            });
          }
        });
      }
    }

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
      metadata: {
        mode: mode.charAt(0).toUpperCase() + mode.slice(1),
        files: files.length > 0 ? files : undefined
      }
    };

  } catch (error) {
    console.error('AI Response Error:', error);
    
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: "I'm sorry, I encountered an error while processing your request. Please check your internet connection and try again.",
      timestamp: new Date(),
      metadata: {
        mode: mode.charAt(0).toUpperCase() + mode.slice(1)
      }
    };
  }
}