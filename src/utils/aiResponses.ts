import { Message } from '../components/ChatMessage';

export const generateAIResponse = async (prompt: string, mode: string): Promise<Message> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

  const responses: Record<string, (prompt: string) => Message> = {
    chat: (prompt: string) => ({
      id: Date.now().toString(),
      type: 'assistant',
      content: `I'd be happy to help you with "${prompt}". As a general AI assistant, I can help with various tasks including answering questions, providing explanations, brainstorming ideas, and more. What specific aspect would you like me to focus on?`,
      timestamp: new Date(),
      metadata: { mode: 'Chat Assistant' }
    }),

    code: (prompt: string) => {
      const codeExamples: Record<string, { content: string, files: Array<{ name: string; content: string; language: string }> }> = {
        'todo app': {
          content: "I've created a complete todo application with React and TypeScript. Here's the implementation:",
          files: [
            {
              name: 'TodoApp.tsx',
              language: 'typescript',
              content: `import React, { useState } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now().toString(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Todo App</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 p-2 border rounded"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        {todos.map(todo => (
          <div key={todo.id} className="flex items-center gap-2 p-2 border rounded">
            <button
              onClick={() => toggleTodo(todo.id)}
              className={\`p-1 rounded \${todo.completed ? 'text-green-500' : 'text-gray-400'}\`}
            >
              <Check className="w-4 h-4" />
            </button>
            <span className={\`flex-1 \${todo.completed ? 'line-through text-gray-500' : ''}\`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`
            }
          ]
        },
        default: {
          content: "Here's a code solution for your request:",
          files: [
            {
              name: 'solution.js',
              language: 'javascript',
              content: `// AI-generated code for: ${prompt}
function solution() {
  // Implementation would be generated based on your specific requirements
  console.log("This is a placeholder for AI-generated code");
  
  // The actual AI would analyze your prompt and generate appropriate code
  return "Generated solution based on: " + "${prompt}";
}

export default solution;`
            }
          ]
        }
      };

      const response = codeExamples[prompt.toLowerCase()] || codeExamples.default;
      
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        metadata: { 
          mode: 'Code Generator',
          files: response.files
        }
      };
    },

    web: (prompt: string) => ({
      id: Date.now().toString(),
      type: 'assistant',
      content: `I'll help you build a web application for "${prompt}". As a web developer AI, I can create modern, responsive websites using React, TypeScript, and Tailwind CSS. I can build everything from simple landing pages to complex web applications with state management, APIs, and database integration.

Key features I can implement:
• Responsive design for all devices
• Modern UI/UX with smooth animations
• State management and data handling
• API integrations
• Authentication systems
• Database connectivity
• Performance optimization

What specific features would you like me to focus on for your web application?`,
      timestamp: new Date(),
      metadata: { mode: 'Web Developer' }
    }),

    design: (prompt: string) => ({
      id: Date.now().toString(),
      type: 'assistant',
      content: `I'll create a beautiful UI design for "${prompt}". As a UI designer AI, I can help you with:

🎨 Design Systems:
• Color palettes and typography
• Consistent spacing and layouts
• Component libraries
• Style guides

📱 Interface Design:
• Modern, clean interfaces
• Responsive layouts
• Micro-interactions and animations
• Accessibility-focused designs

🎯 User Experience:
• User flow optimization
• Information architecture
• Wireframing and prototyping
• Design patterns and best practices

I'll use modern design principles to create interfaces that are both beautiful and functional. What specific design elements or style preferences do you have in mind?`,
      timestamp: new Date(),
      metadata: { mode: 'UI Designer' }
    }),

    content: (prompt: string) => ({
      id: Date.now().toString(),
      type: 'assistant',
      content: `I'll create compelling content for "${prompt}". As a content writer AI, I can help you with:

📝 Content Types:
• Blog articles and posts
• Marketing copy and campaigns
• Technical documentation
• Social media content
• Email sequences
• Website copy

🎯 Content Strategy:
• SEO-optimized writing
• Audience targeting
• Brand voice development
• Content planning
• Engagement optimization

📊 Content Formats:
• Long-form articles
• Short-form social posts
• Headlines and taglines
• Product descriptions
• Case studies and testimonials

What type of content would you like me to create, and who is your target audience?`,
      timestamp: new Date(),
      metadata: { mode: 'Content Writer' }
    }),

    database: (prompt: string) => ({
      id: Date.now().toString(),
      type: 'assistant',
      content: `I'll help you design and optimize a database solution for "${prompt}". As a database expert AI, I can assist with:

🗄️ Database Design:
• Entity relationship modeling
• Schema optimization
• Normalization strategies
• Index optimization
• Query performance tuning

⚡ Database Technologies:
• SQL databases (PostgreSQL, MySQL)
• NoSQL solutions (MongoDB, Redis)
• Cloud databases (Supabase, Firebase)
• Data warehousing solutions

🔧 Implementation:
• Migration scripts
• Seed data generation
• Backup strategies
• Security best practices
• Scaling considerations

What type of data will you be storing, and what are your performance and scalability requirements?`,
      timestamp: new Date(),
      metadata: { mode: 'Database Expert' }
    }),

    automation: (prompt: string) => ({
      id: Date.now().toString(),
      type: 'assistant',
      content: `I'll create automation solutions for "${prompt}". As an automation AI, I can help you build:

🤖 Automation Types:
• Workflow automation
• Data processing pipelines
• API integrations
• Scheduled tasks
• Event-driven processes

🛠️ Tools and Technologies:
• Node.js scripts
• Python automation
• Webhook handlers
• Cron jobs
• CI/CD pipelines

⚡ Common Use Cases:
• Data synchronization
• Report generation
• Email marketing
• Social media posting
• File processing
• System monitoring

What specific tasks would you like to automate, and what triggers should initiate these processes?`,
      timestamp: new Date(),
      metadata: { mode: 'Automation' }
    })
  };

  return responses[mode] ? responses[mode](prompt) : responses.chat(prompt);
};