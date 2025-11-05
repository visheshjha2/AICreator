import { Message } from '../components/ChatMessage';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Fallback responses for when API is unavailable
const fallbackResponses: Record<string, (prompt: string) => string> = {
  chat: (prompt: string) => {
    const lowerPrompt = prompt.toLowerCase().trim();
    
    // Handle greetings
    if (lowerPrompt.match(/^(hi|hello|hey|good morning|good afternoon|good evening)$/)) {
      return "Hello! I'm your AI assistant. How can I help you today? I can assist with coding, design, content creation, database questions, and automation tasks.";
    }
    
    // Handle simple questions
    if (lowerPrompt.includes('how are you')) {
      return "I'm doing great, thank you for asking! I'm here and ready to help you with any questions or tasks you have. What would you like to work on today?";
    }
    
    if (lowerPrompt.includes('what can you do')) {
      return "I can help you with many things! Here are my main capabilities:\n\n• **Chat Assistant** - Answer questions and have conversations\n• **Code Generator** - Write and debug code in various languages\n• **UI Designer** - Create beautiful user interfaces\n• **Content Writer** - Write articles, copy, and creative content\n• **Database Expert** - Design databases and write queries\n• **Automation** - Create scripts and workflows\n\nWhat would you like to try first?";
    }
    
    // Handle math questions
    const mathMatch = lowerPrompt.match(/what is (\d+)\s*[\+\-\*\/]\s*(\d+)/);
    if (mathMatch) {
      const num1 = parseInt(mathMatch[1]);
      const num2 = parseInt(mathMatch[2]);
      const operator = lowerPrompt.match(/[\+\-\*\/]/)?.[0];
      
      let result;
      switch (operator) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num2 !== 0 ? num1 / num2 : 'undefined (division by zero)'; break;
        default: result = 'calculation error';
      }
      
      return `${num1} ${operator} ${num2} = ${result}`;
    }
    
    // Handle general questions with helpful response
    return `I'd be happy to help you with "${prompt}"! I can assist with various tasks including:\n\n• Answering questions and providing information\n• Writing and editing content\n• Solving problems and brainstorming\n• Explaining concepts and topics\n• Providing recommendations and advice\n\nCould you provide a bit more detail about what specifically you'd like help with?`;
  },
  
  code: (prompt: string) => {
    const lowerPrompt = prompt.toLowerCase();
    
    // Handle specific programming language requests
    if (lowerPrompt.includes('python')) {
      return `Here's a Python example for your request:

\`\`\`python
# Python code example
def main():
    print("Hello, World!")
    # Add your code logic here
    
if __name__ == "__main__":
    main()
\`\`\`

This is a basic Python template. Let me know what specific functionality you need and I can provide more detailed code!`;
    }
    
    if (lowerPrompt.includes('javascript') || lowerPrompt.includes('js')) {
      return `Here's a JavaScript example:

\`\`\`javascript
// JavaScript code example
function main() {
    console.log("Hello, World!");
    // Add your code logic here
}

main();
\`\`\`

Let me know what specific JavaScript functionality you need!`;
    }
    
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

This is a basic React component example. Let me know what specific functionality you need!`;
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

This is a basic JavaScript function example. What specific functionality would you like me to help you implement?`;
    }
    
    return `I'd be happy to help you with coding! Here's a basic template:

\`\`\`javascript
// Code template
function processRequest() {
  // Your implementation here
  console.log('Processing your request...');
}

processRequest();
\`\`\`

What programming language and specific functionality would you like help with?`;
  },
  
  design: (prompt: string) => `I'd be happy to help you create beautiful UI designs! For "${prompt}", I can provide:

• **Design System Recommendations** - Colors, typography, spacing
• **Component Layouts** - Headers, cards, forms, navigation
• **Responsive Design** - Mobile-first approach
• **CSS/Tailwind Styling** - Modern, clean aesthetics
• **User Experience** - Intuitive interactions and flows

What specific design element would you like to work on first?`,
  
  content: (prompt: string) => `I'd love to help you create engaging content! For "${prompt}", I can assist with:

• **Article Writing** - Blog posts, tutorials, guides
• **Marketing Copy** - Headlines, descriptions, CTAs
• **Creative Writing** - Stories, scripts, creative pieces
• **Technical Documentation** - How-to guides, API docs
• **Social Media Content** - Posts, captions, hashtags

What type of content would you like me to help you create?`,
  
  database: (prompt: string) => `I'd be happy to help with database design and queries! For "${prompt}", I can provide:

• **Database Schema Design** - Tables, relationships, constraints
• **SQL Queries** - SELECT, INSERT, UPDATE, DELETE operations
• **Query Optimization** - Indexing, performance tuning
• **Database Best Practices** - Normalization, security
• **Different Database Types** - MySQL, PostgreSQL, MongoDB

What specific database task would you like help with?`,
  
  automation: (prompt: string) => `I'd be excited to help you create automation scripts! For "${prompt}", I can provide:

• **Workflow Automation** - Task scheduling, process flows
• **Scripts** - Python, Bash, PowerShell automation
• **API Integration** - Connecting different services
• **Data Processing** - File handling, data transformation
• **System Administration** - Server management, deployments

What process would you like to automate?`
};

// Rate limiting state
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAYS = [500, 2000]; // 0.5s, 2s

// Sleep utility function
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateAIResponse(prompt: string, mode: string): Promise<Message> {
  try {
    // Check if API key is available
    if (!API_KEY || API_KEY.trim() === '') {
      console.warn('No API key configured, using fallback responses');
      return generateEnhancedFallbackResponse(prompt, mode);
    }

    console.log('Using OpenRouter API with key:', API_KEY.substring(0, 20) + '...');

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
            model: 'google/gemini-2.0-flash-exp:free',
            messages: [
              {
                role: 'system',
                content: systemMessage + ' Be helpful, accurate, and concise. Keep responses under 1000 words.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 2000,
            stream: false
          })
        });

        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.choices[0]?.message?.content;
          
          if (!aiResponse || aiResponse.trim() === '') {
            throw new Error('Empty response from API');
          }

          console.log('Received AI response:', aiResponse.substring(0, 100) + '...');

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
          const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : RETRY_DELAYS[attempt] || 2000;
          
          console.log(`Rate limited (429). Retrying in ${waitTime}ms...`);
          if (attempt < MAX_RETRIES) {
            await sleep(waitTime);
            continue;
          } else {
            console.warn('Rate limit exceeded after all retries, using fallback');
            return generateEnhancedFallbackResponse(prompt, mode);
          }
        } else if (response.status >= 500) {
          // Server errors - retry with exponential backoff
          console.log(`Server error (${response.status}). Retrying...`);
          if (attempt < MAX_RETRIES) {
            await sleep(RETRY_DELAYS[attempt]);
            continue;
          } else {
            console.warn('Server error after all retries, using fallback');
            return generateEnhancedFallbackResponse(prompt, mode);
          }
        } else if (response.status === 401) {
          console.error('Authentication error - invalid API key');
          return {
            id: Date.now().toString(),
            type: 'assistant',
            content: `🔑 **Authentication Error**\n\nThere's an issue with the API key configuration.\n\n**What this means:**\n• The API key is invalid, expired, or missing\n• The AI service cannot authenticate your request\n• This needs to be fixed in the application settings\n\n**Suggested actions:**\n• Check if your OpenRouter API key is correctly configured\n• Verify the API key hasn't expired\n• Generate a new API key from OpenRouter if needed\n\nFor now, I'll provide basic assistance, but full AI capabilities require a valid API key.`,
            timestamp: new Date(),
            metadata: {
              mode: mode.charAt(0).toUpperCase() + mode.slice(1),
              error: 'authentication_error'
            }
          };
        } else if (response.status >= 400) {
          console.error(`Client error (${response.status}):`, await response?.text());
          return generateEnhancedFallbackResponse(prompt, mode);
        }
        
        break;
        
      } catch (error) {
        lastError = error as Error;
        console.error('Request error:', error);
        
        // If it's a network error and we have retries left, continue
        if (attempt < MAX_RETRIES && (error as Error).name === 'TypeError') {
          await sleep(RETRY_DELAYS[attempt]);
          continue;
        }
        
        // If we've exhausted retries for network errors
        if (attempt >= MAX_RETRIES && (error as Error).name === 'TypeError') {
          console.warn('Network error after all retries, using fallback');
          return generateEnhancedFallbackResponse(prompt, mode);
        }
        
        break;
      }
    }

    // If we get here, all retries failed with an unexpected error
    console.warn('All API attempts failed with unexpected error. Last error:', lastError?.message);
    return generateEnhancedFallbackResponse(prompt, mode);
  } catch (error) {
    console.error('Critical AI Response Error:', error);
    
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `🚨 **Critical Error**\n\nAn unexpected error occurred while processing your request.\n\n**What happened:**\n• A critical system error prevented request processing\n• This is an internal application issue\n• The error has been logged for investigation\n\n**What you can do:**\n• Try refreshing the page\n• Try again with a different request\n• Contact support if the issue persists\n\nI apologize for this technical difficulty. Please try again.`,
      timestamp: new Date(),
      metadata: {
        mode: mode.charAt(0).toUpperCase() + mode.slice(1),
        error: 'critical_error'
      }
    };
  }
}

// Enhanced fallback response generator
function generateEnhancedFallbackResponse(prompt: string, mode: string): Message {
  // Try to provide intelligent responses based on the prompt
  const lowerPrompt = prompt.toLowerCase().trim();
  
  // Handle common questions with direct answers
  if (lowerPrompt.includes('miss you') && lowerPrompt.includes('reply')) {
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `Here are some thoughtful ways to reply when someone says they miss you:

**Warm & Caring:**
• "I miss you too! Can't wait to see you again."
• "Missing you as well. You're always in my thoughts."
• "The feeling is mutual! Hope we can catch up soon."

**Playful & Light:**
• "Aww, I miss you too! We need to fix that soon."
• "Miss you more! 😊"
• "Right back at you! Let's plan something soon."

**Sincere & Deep:**
• "I've been thinking about you too. You mean a lot to me."
• "Thank you for saying that. I miss our conversations."
• "That means so much to hear. I miss you too."

**If you want to make plans:**
• "I miss you too! Are you free this weekend?"
• "Same here! Want to grab coffee/dinner soon?"
• "Missing you too! Let's schedule a call/meetup."

Choose based on your relationship with the person and how you genuinely feel!`,
      timestamp: new Date(),
      metadata: {
        mode: mode.charAt(0).toUpperCase() + mode.slice(1)
      }
    };
  }
  
  // Handle math questions - improved regex to catch direct calculations
  const mathMatch = lowerPrompt.match(/(?:what is\s+)?(\d+)\s*[\+\-\*\/]\s*(\d+)(?:\s*=\s*\?)?/);
  if (mathMatch) {
    const num1 = parseInt(mathMatch[1]);
    const num2 = parseInt(mathMatch[2]);
    const operator = mathMatch[0].match(/[\+\-\*\/]/)?.[0];
    
    let result;
    switch (operator) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/': result = num2 !== 0 ? num1 / num2 : 'undefined (division by zero)'; break;
      default: result = 'calculation error';
    }
    
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `${num1} ${operator} ${num2} = ${result}`,
      timestamp: new Date(),
      metadata: {
        mode: mode.charAt(0).toUpperCase() + mode.slice(1)
      }
    };
  }
  
  // Handle math questions in fallback responses too
  const fallbackMathMatch = lowerPrompt.match(/(?:what is\s+)?(\d+)\s*[\+\-\*\/]\s*(\d+)(?:\s*=\s*\?)?/);
  if (fallbackMathMatch) {
    const num1 = parseInt(fallbackMathMatch[1]);
    const num2 = parseInt(fallbackMathMatch[2]);
    const operator = fallbackMathMatch[0].match(/[\+\-\*\/]/)?.[0];
    
    let result;
    switch (operator) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/': result = num2 !== 0 ? num1 / num2 : 'undefined (division by zero)'; break;
      default: result = 'calculation error';
    }
    
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `${num1} ${operator} ${num2} = ${result}`,
      timestamp: new Date(),
      metadata: {
        mode: mode.charAt(0).toUpperCase() + mode.slice(1)
      }
    };
  }
  
  // Use the existing fallback response system
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
          let filename = `generated_${index + 1}.${extension}`;
          
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
}