import { Message } from '../components/ChatMessage';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function generateAIResponse(prompt: string, mode: string): Promise<Message> {
  if (!API_KEY || API_KEY.trim() === '') {
    throw new Error('API key not configured');
  }

  const systemMessages: Record<string, string> = {
    chat: "You are a helpful AI assistant. Answer all questions accurately and thoroughly.",
    code: "You are an expert programmer. Help with coding questions, debug issues, and generate clean, working code.",
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
      model: 'google/gemini-2.0-flash-exp:free',
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
      max_tokens: 2000,
      stream: false
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API Error:', response.status, errorData);
    throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  const aiResponse = data.choices[0]?.message?.content;

  if (!aiResponse || aiResponse.trim() === '') {
    throw new Error('Empty response from API');
  }

  // Extract code blocks if present
  const hasCode = aiResponse.includes('```');
  let files: Array<{ name: string; content: string; language: string }> = [];

  if (hasCode) {
    const codeBlocks = aiResponse.match(/```(\w+)?\n([\s\S]*?)```/g);
    if (codeBlocks) {
      codeBlocks.forEach((block, index) => {
        const match = block.match(/```(\w+)?\n([\s\S]*?)```/);
        if (match) {
          const language = match[1] || 'text';
          const content = match[2].trim();

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
}
