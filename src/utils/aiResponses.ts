import { Message } from '../components/ChatMessage';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Fallback responses for when API is unavailable
const fallbackResponses: Record<string, (prompt: string) => string> = {
  chat: (prompt: string) => `I understand you're asking about: "${prompt}". While I'm currently unable to connect to the AI service, I'd be happy to help once the connection is restored. Please try again in a moment.`,
  
  code: (prompt: string) => {
    // Generate basic code examples based on common requests
    if (prompt.toLowerCase().includes('react') || prompt.toLowerCase().includes('component')) {
      return `Here's a basic React component example:

\`\`\`jsx
import React, { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Counter Component</h2>
      <p className="mb-4">Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
}

export default MyComponent;
\`\`\`

This is a basic example. For more specific code generation, please try again when the AI service is available.`;
    }
    
    if (prompt.toLowerCase().includes('function') || prompt.toLowerCase().includes('javascript')) {
      return `Here's a JavaScript function example:

\`\`\`javascript
// Example function based on your request
function processData(data) {
  // Add your logic here
  return data.map(item => ({
    ...item,
    processed: true,
    timestamp: new Date()
  }));
}

// Usage example
const result = processData([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
]);

console.log(result);
\`\`\`

This is a basic example. For more specific code generation, please try again when the AI service is available.`;
    }
    
    return `I'd love to help you with code generation! Here's a basic template to get you started:

\`\`\`javascript
// Your code will go here
function yourFunction() {
  // Implementation details
  console.log('Hello, World!');
}

yourFunction();
\`\`\`

For more specific code generation based on your request: "${prompt}", please try again when the AI service is available.`;
  },
  
  design: (prompt: string) => `I'd help you create beautiful UI designs! For your request about "${prompt}", I would typically provide detailed design guidance, component suggestions, and styling recommendations. Please try again when the AI service is available.`,
  
  content: (prompt: string) => `I'd help you create engaging content! For your request about "${prompt}", I would typically provide well-structured writing, copy suggestions, and content strategies. Please try again when the AI service is available.`,
  
  database: (prompt: string) => `I'd help you with database design and queries! For your request about "${prompt}", I would typically provide schema designs, optimized queries, and database best practices. Please try again when the AI service is available.`,
  
  automation: (prompt: string) => `I'd help you create automation scripts! For your request about "${prompt}", I would typically provide workflow automation, scripts, and process optimization solutions. Please try again when the AI service is available.`
};

// Rate limiting state
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAYS = [1000, 3000, 5000]; // 1s, 3s, 5s

// Sleep utility function
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateAIResponse(prompt: string, mode: string): Promise<Message> {
  try {
    // Rate limiting: ensure minimum time between requests
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await sleep(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
    }
    lastRequestTime = Date.now();

    // Create system message based on mode
    const systemMessages: Record<string, string> = {
      chat: "You are a helpful AI assistant. Provide clear, direct answers to questions. For simple questions like math problems, give straightforward answers.",
      code: "You are an expert programmer. Help with coding questions, debug issues, and generate clean, working code.",
      design: "You are a UI/UX design expert. Help create beautiful, user-friendly interfaces and provide design guidance.",
      content: "You are a content creation expert. Help write articles, copy, marketing content, and creative writing.",
      database: "You are a database expert. Help with database design, queries, optimization, and data management.",
      automation: "You are an automation expert. Help create scripts, workflows, and automated solutions."
    };

    const systemMessage = systemMessages[mode] || systemMessages.chat;

    // Retry logic for handling rate limits and temporary failures
    let lastError: Error | null = null;
    let response: Response | undefined;
    
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        response = await fetch(API_URL, {
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

        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.choices[0]?.message?.content;
          
          if (!aiResponse || aiResponse.trim() === '') {
            throw new Error('Empty response from API');
          }

          // Check if the response contains code
          const hasCode = aiResponse.includes('```');
          let files: Array<{ name: string; content: string; language: string }> = [];

          if (hasCode) {
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
                  let filename = `generated_${index + 1}.${extension}`;
                  
                  // For web development, use more descriptive names
                  if (mode === 'web') {
                    if (language.toLowerCase() === 'html') {
                      filename = 'index.html';
                    } else if (language.toLowerCase() === 'css') {
                      filename = 'style.css';
                    } else if (language.toLowerCase() === 'javascript') {
                      filename = 'script.js';
                    }
                  }
                  
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
        }

        // Handle specific error cases
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : RETRY_DELAYS[attempt] || 5000;
          
          if (attempt < MAX_RETRIES) {
            console.log(`Rate limited. Retrying in ${waitTime}ms... (attempt ${attempt + 1}/${MAX_RETRIES + 1})`);
            await sleep(waitTime);
            continue;
          } else {
            throw new Error('RATE_LIMIT_EXCEEDED');
          }
        } else if (response.status >= 500) {
          // Server errors - retry with exponential backoff
          if (attempt < MAX_RETRIES) {
            await sleep(RETRY_DELAYS[attempt]);
            continue;
          }
        }
        
        // For other errors, don't retry
        throw new Error(`API request failed: ${response.status}`);
        
      } catch (error) {
        lastError = error as Error;
        
        // If it's a network error and we have retries left, continue
        if (attempt < MAX_RETRIES && (error as Error).name === 'TypeError') {
          await sleep(RETRY_DELAYS[attempt]);
          continue;
        }
        
        // If it's not a retryable error, break
        if ((error as Error).message !== 'RATE_LIMIT_EXCEEDED' && response && response.status !== 429) {
          break;
        }
      }
    }

    // If we get here, all retries failed
    console.warn('API unavailable, using fallback response');
    
    // Use fallback response instead of throwing error
    const fallbackResponse = fallbackResponses[mode] ? fallbackResponses[mode](prompt) : fallbackResponses.chat(prompt);
    
    // Check if fallback response contains code
    const hasCode = fallbackResponse.includes('```');
    let files: Array<{ name: string; content: string; language: string }> = [];

    if (hasCode) {
      // Extract code blocks from fallback response
      const codeBlocks = fallbackResponse.match(/```(\w+)?\n([\s\S]*?)```/g);
      if (codeBlocks) {
        codeBlocks.forEach((block, index) => {
          const match = block.match(/```(\w+)?\n([\s\S]*?)```/);
          if (match) {
            const language = match[1] || 'text';
            const content = match[2].trim();
            
            const extensions: Record<string, string> = {
              javascript: 'js',
              jsx: 'jsx',
              typescript: 'ts',
              tsx: 'tsx',
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
            let filename = `example_${index + 1}.${extension}`;
            
            if (language.toLowerCase() === 'jsx' || language.toLowerCase() === 'tsx') {
              filename = 'Component.jsx';
            } else if (language.toLowerCase() === 'javascript') {
              filename = 'script.js';
            } else if (language.toLowerCase() === 'html') {
              filename = 'index.html';
            } else if (language.toLowerCase() === 'css') {
              filename = 'styles.css';
            }
            
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
      content: fallbackResponse,
      timestamp: new Date(),
      metadata: {
        mode: mode.charAt(0).toUpperCase() + mode.slice(1),
        files: files.length > 0 ? files : undefined
      }
    };
  } catch (error) {
    console.error('AI Response Error:', error);
    
    // Handle specific error types with user-friendly messages
    let errorMessage = "I'm sorry, I encountered an error while processing your request. Please try again.";
    
    if ((error as Error).message === 'RATE_LIMIT_EXCEEDED') {
      errorMessage = "I'm currently receiving too many requests. Please wait a moment and try again. The AI service has temporary rate limits to ensure fair usage for all users.";
    } else if ((error as Error).message.includes('429')) {
      errorMessage = "The AI service is temporarily busy. Please wait 30 seconds and try again.";
    } else if ((error as Error).message.includes('500')) {
      errorMessage = "The AI service is temporarily unavailable. Please try again in a few moments.";
    } else if ((error as Error).name === 'TypeError') {
      errorMessage = "Unable to connect to the AI service. Please check your internet connection and try again.";
    }

    // If it's a critical error, use fallback response
    const fallbackResponse = fallbackResponses[mode] ? fallbackResponses[mode](prompt) : fallbackResponses.chat(prompt);
    
    // Check if fallback response contains code
    const hasCode = fallbackResponse.includes('```');
    let files: Array<{ name: string; content: string; language: string }> = [];

    if (hasCode) {
      // Extract code blocks from fallback response
      const codeBlocks = fallbackResponse.match(/```(\w+)?\n([\s\S]*?)```/g);
      if (codeBlocks) {
        codeBlocks.forEach((block, index) => {
          const match = block.match(/```(\w+)?\n([\s\S]*?)```/);
          if (match) {
            const language = match[1] || 'text';
            const content = match[2].trim();
            
            const extensions: Record<string, string> = {
              javascript: 'js',
              jsx: 'jsx',
              typescript: 'ts',
              tsx: 'tsx',
              html: 'html',
              css: 'css',
              python: 'py'
            };

            const extension = extensions[language.toLowerCase()] || 'txt';
            let filename = `fallback_${index + 1}.${extension}`;
            
            if (language.toLowerCase() === 'jsx') {
              filename = 'Component.jsx';
            } else if (language.toLowerCase() === 'javascript') {
              filename = 'script.js';
            }
            
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
      content: fallbackResponse,
      timestamp: new Date(),
      metadata: {
        mode: mode.charAt(0).toUpperCase() + mode.slice(1),
        files: files.length > 0 ? files : undefined
      }
    };
  }
}