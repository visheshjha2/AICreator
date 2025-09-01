import { Message } from '../components/ChatMessage';

// Enhanced offline AI responses that work without external API
const offlineAIResponses = {
  chat: {
    greetings: [
      "Hello! I'm here to help you with any questions or conversations. What's on your mind today?",
      "Hi there! I'm ready to assist you with whatever you need. How can I help?",
      "Welcome! I'm your AI assistant. Feel free to ask me anything you'd like to know."
    ],
    general: [
      "That's an interesting question! Let me help you with that.",
      "I'd be happy to assist you with that topic.",
      "Great question! Here's what I can tell you about that."
    ]
  },
  
  code: {
    react: `Here's a React component example:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center gap-2 p-2 border rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4"
            />
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-auto px-2 py-1 text-red-500 hover:bg-red-100 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
\`\`\``,

    javascript: `Here's a JavaScript example:

\`\`\`javascript
// Utility functions for common tasks
class DataProcessor {
  constructor() {
    this.data = [];
  }

  // Add data with validation
  addData(item) {
    if (this.validateItem(item)) {
      this.data.push({
        ...item,
        id: Date.now(),
        createdAt: new Date()
      });
      return true;
    }
    return false;
  }

  // Validate data structure
  validateItem(item) {
    return item && typeof item === 'object' && item.name;
  }

  // Filter data by criteria
  filterData(criteria) {
    return this.data.filter(item => {
      return Object.keys(criteria).every(key => 
        item[key] === criteria[key]
      );
    });
  }

  // Sort data by field
  sortData(field, ascending = true) {
    return [...this.data].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      
      if (ascending) {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }

  // Get statistics
  getStats() {
    return {
      total: this.data.length,
      latest: this.data[this.data.length - 1],
      oldest: this.data[0]
    };
  }
}

// Usage example
const processor = new DataProcessor();
processor.addData({ name: 'Item 1', category: 'A' });
processor.addData({ name: 'Item 2', category: 'B' });

console.log('All data:', processor.data);
console.log('Filtered:', processor.filterData({ category: 'A' }));
console.log('Stats:', processor.getStats());
\`\`\``,

    html: `Here's an HTML page example:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Web Page</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            margin: 20px 0;
        }
        
        h1 {
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 2.5em;
        }
        
        .btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.2s;
        }
        
        .btn:hover {
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Welcome to My Website</h1>
            <p>This is a modern, responsive web page with beautiful styling.</p>
            <button class="btn" onclick="showMessage()">Click Me!</button>
        </div>
    </div>

    <script>
        function showMessage() {
            alert('Hello from your new website!');
        }
    </script>
</body>
</html>
\`\`\``,

    css: `Here's a CSS styling example:

\`\`\`css
/* Modern CSS with animations and responsive design */
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #2c3e50;
  --bg-color: #f8f9fa;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 80px 0;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease-out;
}

.hero p {
  font-size: 1.2rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.btn {
  display: inline-block;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .card {
    margin: 1rem 0;
    padding: 1.5rem;
  }
}
\`\`\``,

    python: `Here's a Python example:

\`\`\`python
# Data processing and analysis example
import json
from datetime import datetime
from typing import List, Dict, Any

class DataAnalyzer:
    def __init__(self):
        self.data = []
        self.created_at = datetime.now()
    
    def add_record(self, record: Dict[str, Any]) -> bool:
        """Add a new record with validation"""
        if self.validate_record(record):
            record['id'] = len(self.data) + 1
            record['timestamp'] = datetime.now().isoformat()
            self.data.append(record)
            return True
        return False
    
    def validate_record(self, record: Dict[str, Any]) -> bool:
        """Validate record structure"""
        required_fields = ['name', 'value']
        return all(field in record for field in required_fields)
    
    def filter_records(self, **criteria) -> List[Dict[str, Any]]:
        """Filter records by criteria"""
        filtered = []
        for record in self.data:
            if all(record.get(key) == value for key, value in criteria.items()):
                filtered.append(record)
        return filtered
    
    def get_statistics(self) -> Dict[str, Any]:
        """Calculate basic statistics"""
        if not self.data:
            return {'count': 0, 'average': 0, 'total': 0}
        
        values = [record.get('value', 0) for record in self.data if isinstance(record.get('value'), (int, float))]
        
        return {
            'count': len(self.data),
            'total': sum(values),
            'average': sum(values) / len(values) if values else 0,
            'max': max(values) if values else 0,
            'min': min(values) if values else 0
        }
    
    def export_to_json(self, filename: str = None) -> str:
        """Export data to JSON format"""
        export_data = {
            'created_at': self.created_at.isoformat(),
            'record_count': len(self.data),
            'records': self.data
        }
        
        json_string = json.dumps(export_data, indent=2)
        
        if filename:
            with open(filename, 'w') as f:
                f.write(json_string)
        
        return json_string

# Usage example
if __name__ == "__main__":
    analyzer = DataAnalyzer()
    
    # Add sample data
    analyzer.add_record({'name': 'Product A', 'value': 100, 'category': 'electronics'})
    analyzer.add_record({'name': 'Product B', 'value': 150, 'category': 'electronics'})
    analyzer.add_record({'name': 'Product C', 'value': 75, 'category': 'books'})
    
    # Analyze data
    print("Statistics:", analyzer.get_statistics())
    print("Electronics:", analyzer.filter_records(category='electronics'))
    
    # Export data
    json_output = analyzer.export_to_json()
    print("Exported JSON:", json_output)
\`\`\``,

    general: `Here's a code example:

\`\`\`javascript
// Modern JavaScript utility functions
class Utils {
  // Debounce function for performance optimization
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Deep clone objects
  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => Utils.deepClone(item));
    
    const cloned = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = Utils.deepClone(obj[key]);
      }
    }
    return cloned;
  }

  // Format currency
  static formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Generate random ID
  static generateId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Validate email
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Usage examples
const debouncedSearch = Utils.debounce((query) => {
  console.log('Searching for:', query);
}, 300);

const originalData = { user: { name: 'John', age: 30 } };
const clonedData = Utils.deepClone(originalData);

console.log('Currency:', Utils.formatCurrency(1234.56));
console.log('Random ID:', Utils.generateId());
console.log('Valid email:', Utils.isValidEmail('test@example.com'));
\`\`\``
  },

  design: {
    component: `Here's a beautiful UI component design:

\`\`\`jsx
import React from 'react';

function PricingCard({ title, price, features, highlighted = false }) {
  return (
    <div className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
      highlighted 
        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl' 
        : 'border-gray-200 bg-white hover:border-purple-300 shadow-lg'
    }`}>
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">${price}</span>
          <span className="text-gray-500">/month</span>
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        
        <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
          highlighted
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}>
          Get Started
        </button>
      </div>
    </div>
  );
}

// Usage example
function PricingSection() {
  const plans = [
    {
      title: 'Starter',
      price: 9,
      features: ['5 Projects', '10GB Storage', 'Email Support']
    },
    {
      title: 'Pro',
      price: 29,
      features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics'],
      highlighted: true
    },
    {
      title: 'Enterprise',
      price: 99,
      features: ['Everything in Pro', 'Custom Integrations', 'Dedicated Support', 'SLA Guarantee']
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
\`\`\``,

    general: `Here's a modern UI design pattern:

\`\`\`jsx
import React, { useState } from 'react';

function ModernCard({ title, description, image, tags = [] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default ModernCard;
\`\`\``
  },

  content: {
    blog: `# The Future of Web Development: Trends to Watch in 2025

The web development landscape continues to evolve at a rapid pace. As we move through 2025, several key trends are shaping how we build and interact with web applications.

## 1. AI-Powered Development Tools

Artificial intelligence is revolutionizing how developers write code. From intelligent code completion to automated testing, AI tools are becoming indispensable for modern development workflows.

**Key Benefits:**
- Faster development cycles
- Reduced bugs and errors
- Enhanced code quality
- Automated documentation

## 2. Edge Computing and Performance

With the rise of edge computing, applications are becoming faster and more responsive. Content delivery networks (CDNs) and edge functions are enabling developers to serve content closer to users.

**Performance Improvements:**
- Reduced latency
- Better user experience
- Global scalability
- Cost optimization

## 3. Sustainable Web Development

Environmental consciousness is driving the adoption of green coding practices. Developers are focusing on creating more efficient, lightweight applications that consume less energy.

**Green Practices:**
- Optimized images and assets
- Efficient algorithms
- Minimal JavaScript bundles
- Sustainable hosting solutions

## 4. Enhanced Security Measures

As cyber threats evolve, web security is becoming more sophisticated. Zero-trust architectures and advanced authentication methods are becoming standard.

**Security Trends:**
- Multi-factor authentication
- Biometric verification
- Encrypted communications
- Privacy-first design

## Conclusion

The future of web development is bright, with exciting innovations on the horizon. By staying informed about these trends, developers can build better, more efficient, and more secure applications for users worldwide.`,

    marketing: `# Transform Your Business with AI-Powered Solutions

## Unlock Your Potential with Cutting-Edge Technology

In today's competitive landscape, businesses need every advantage to stay ahead. Our AI-powered platform delivers the tools and insights you need to revolutionize your operations and drive unprecedented growth.

### Why Choose Our Platform?

**🚀 Accelerate Growth**
Leverage advanced analytics and automation to identify opportunities and optimize your business processes for maximum efficiency.

**💡 Smart Decision Making**
Make data-driven decisions with real-time insights and predictive analytics that help you stay ahead of market trends.

**⚡ Instant Results**
See immediate improvements in productivity and performance with our easy-to-implement solutions.

### Success Stories

*"Since implementing this platform, we've seen a 300% increase in efficiency and reduced operational costs by 40%."*
— Sarah Johnson, CEO of TechStart Inc.

*"The AI insights have transformed how we understand our customers. Our conversion rates have doubled!"*
— Michael Chen, Marketing Director at GrowthCo

### Ready to Get Started?

Join thousands of successful businesses already using our platform to drive growth and innovation.

**Limited Time Offer:** Get 30% off your first year when you sign up today!

[Start Your Free Trial] [Schedule a Demo] [Contact Sales]

---

*Transform your business today. The future is AI-powered.*`,

    general: `# Content Creation Made Simple

Creating engaging content doesn't have to be complicated. Whether you're writing blog posts, marketing copy, or social media content, following these principles will help you connect with your audience effectively.

## Key Principles for Great Content

### 1. Know Your Audience
Understanding who you're writing for is crucial. Consider their:
- Pain points and challenges
- Goals and aspirations
- Preferred communication style
- Level of expertise

### 2. Start with a Strong Hook
Your opening should grab attention immediately:
- Ask a compelling question
- Share a surprising statistic
- Tell a relatable story
- Make a bold statement

### 3. Provide Value
Every piece of content should offer something valuable:
- Solve a problem
- Teach something new
- Entertain or inspire
- Save time or money

### 4. Use Clear Structure
Organize your content logically:
- Use headings and subheadings
- Break up long paragraphs
- Include bullet points and lists
- Add visual elements

### 5. End with Action
Always include a clear call-to-action:
- What should readers do next?
- How can they apply this information?
- Where can they learn more?

## Content Types That Work

- **How-to guides** - Step-by-step instructions
- **Case studies** - Real-world examples
- **Lists and tips** - Easy-to-scan information
- **Stories** - Personal or customer experiences
- **Reviews** - Honest product evaluations

Remember: Great content is about serving your audience, not selling to them. Focus on being helpful, and the results will follow naturally.`
  },

  database: {
    schema: `Here's a database schema example:

\`\`\`sql
-- E-commerce Database Schema
-- This schema supports a basic e-commerce platform with users, products, orders, and reviews

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id UUID REFERENCES categories(id),
    stock_quantity INTEGER DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    product_id UUID REFERENCES products(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);

-- Sample queries
-- Get all products in a category with average rating
SELECT 
    p.id,
    p.name,
    p.price,
    p.stock_quantity,
    AVG(r.rating) as average_rating,
    COUNT(r.id) as review_count
FROM products p
LEFT JOIN reviews r ON p.id = r.product_id
WHERE p.category_id = 'category-uuid-here'
    AND p.is_active = true
GROUP BY p.id, p.name, p.price, p.stock_quantity
ORDER BY average_rating DESC;

-- Get user's order history
SELECT 
    o.id,
    o.total_amount,
    o.status,
    o.created_at,
    COUNT(oi.id) as item_count
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.user_id = 'user-uuid-here'
GROUP BY o.id, o.total_amount, o.status, o.created_at
ORDER BY o.created_at DESC;
\`\`\``,

    general: `Here's a database design example:

\`\`\`sql
-- Blog Platform Database Schema
-- Supports articles, authors, comments, and tags

-- Authors table
CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    bio TEXT,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Articles table
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author_id UUID REFERENCES authors(id),
    featured_image VARCHAR(500),
    status VARCHAR(20) DEFAULT 'draft',
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    view_count INTEGER DEFAULT 0
);

-- Tags table
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Article tags junction table
CREATE TABLE article_tags (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

-- Comments table
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    parent_id UUID REFERENCES comments(id),
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance indexes
CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published ON articles(published_at);
CREATE INDEX idx_comments_article ON comments(article_id);
CREATE INDEX idx_comments_approved ON comments(is_approved);

-- Useful queries
-- Get published articles with author info
SELECT 
    a.id,
    a.title,
    a.slug,
    a.excerpt,
    a.published_at,
    a.view_count,
    au.username,
    au.full_name
FROM articles a
JOIN authors au ON a.author_id = au.id
WHERE a.status = 'published'
ORDER BY a.published_at DESC;

-- Get article with tags and comments count
SELECT 
    a.*,
    au.username as author_username,
    COUNT(DISTINCT c.id) as comment_count,
    STRING_AGG(t.name, ', ') as tags
FROM articles a
JOIN authors au ON a.author_id = au.id
LEFT JOIN comments c ON a.id = c.article_id AND c.is_approved = true
LEFT JOIN article_tags at ON a.id = at.article_id
LEFT JOIN tags t ON at.tag_id = t.id
WHERE a.slug = 'article-slug-here'
GROUP BY a.id, au.username;
\`\`\``
  },

  automation: {
    script: `Here's an automation script example:

\`\`\`javascript
// File Processing Automation Script
const fs = require('fs').promises;
const path = require('path');

class FileProcessor {
  constructor(inputDir, outputDir) {
    this.inputDir = inputDir;
    this.outputDir = outputDir;
    this.processedCount = 0;
    this.errors = [];
  }

  async processFiles() {
    try {
      // Ensure output directory exists
      await this.ensureDirectory(this.outputDir);
      
      // Get all files from input directory
      const files = await this.getFiles(this.inputDir);
      
      console.log(\`Found \${files.length} files to process\`);
      
      // Process each file
      for (const file of files) {
        try {
          await this.processFile(file);
          this.processedCount++;
          console.log(\`✓ Processed: \${file}\`);
        } catch (error) {
          this.errors.push({ file, error: error.message });
          console.error(\`✗ Error processing \${file}: \${error.message}\`);
        }
      }
      
      // Generate report
      await this.generateReport();
      
    } catch (error) {
      console.error('Processing failed:', error.message);
    }
  }

  async getFiles(directory) {
    const items = await fs.readdir(directory);
    const files = [];
    
    for (const item of items) {
      const fullPath = path.join(directory, item);
      const stats = await fs.stat(fullPath);
      
      if (stats.isFile()) {
        files.push(fullPath);
      } else if (stats.isDirectory()) {
        // Recursively get files from subdirectories
        const subFiles = await this.getFiles(fullPath);
        files.push(...subFiles);
      }
    }
    
    return files;
  }

  async processFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const fileName = path.basename(filePath);
    const outputPath = path.join(this.outputDir, \`processed_\${fileName}\`);
    
    // Example processing: add timestamp and line numbers
    const lines = content.split('\\n');
    const processedLines = lines.map((line, index) => 
      \`\${String(index + 1).padStart(4, '0')}: \${line}\`
    );
    
    const processedContent = [
      \`// Processed on: \${new Date().toISOString()}\`,
      \`// Original file: \${fileName}\`,
      '',
      ...processedLines
    ].join('\\n');
    
    await fs.writeFile(outputPath, processedContent);
  }

  async ensureDirectory(dir) {
    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true });
    }
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalFiles: this.processedCount + this.errors.length,
      processedFiles: this.processedCount,
      errors: this.errors.length,
      errorDetails: this.errors
    };
    
    const reportPath = path.join(this.outputDir, 'processing_report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\\n=== Processing Complete ===');
    console.log(\`Total files: \${report.totalFiles}\`);
    console.log(\`Successfully processed: \${report.processedFiles}\`);
    console.log(\`Errors: \${report.errors}\`);
    console.log(\`Report saved to: \${reportPath}\`);
  }
}

// Usage
async function main() {
  const processor = new FileProcessor('./input', './output');
  await processor.processFiles();
}

// Run the automation
main().catch(console.error);
\`\`\``,

    general: `Here's a workflow automation example:

\`\`\`javascript
// Task Automation System
class TaskAutomator {
  constructor() {
    this.tasks = new Map();
    this.schedules = new Map();
    this.isRunning = false;
  }

  // Register a new task
  registerTask(name, taskFunction, options = {}) {
    this.tasks.set(name, {
      function: taskFunction,
      options: {
        timeout: options.timeout || 30000,
        retries: options.retries || 3,
        onSuccess: options.onSuccess,
        onError: options.onError
      }
    });
  }

  // Schedule a task to run at intervals
  scheduleTask(taskName, interval) {
    if (!this.tasks.has(taskName)) {
      throw new Error(\`Task '\${taskName}' not found\`);
    }

    const scheduleId = setInterval(() => {
      this.executeTask(taskName);
    }, interval);

    this.schedules.set(taskName, scheduleId);
    console.log(\`Task '\${taskName}' scheduled to run every \${interval}ms\`);
  }

  // Execute a task with error handling and retries
  async executeTask(taskName) {
    const task = this.tasks.get(taskName);
    if (!task) {
      throw new Error(\`Task '\${taskName}' not found\`);
    }

    let attempts = 0;
    const maxAttempts = task.options.retries + 1;

    while (attempts < maxAttempts) {
      try {
        console.log(\`Executing task: \${taskName} (attempt \${attempts + 1})\`);
        
        const result = await Promise.race([
          task.function(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Task timeout')), task.options.timeout)
          )
        ]);

        console.log(\`✓ Task '\${taskName}' completed successfully\`);
        
        if (task.options.onSuccess) {
          task.options.onSuccess(result);
        }
        
        return result;
      } catch (error) {
        attempts++;
        console.error(\`✗ Task '\${taskName}' failed (attempt \${attempts}): \${error.message}\`);
        
        if (attempts >= maxAttempts) {
          if (task.options.onError) {
            task.options.onError(error);
          }
          throw error;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }
  }

  // Stop all scheduled tasks
  stopAll() {
    this.schedules.forEach((scheduleId, taskName) => {
      clearInterval(scheduleId);
      console.log(\`Stopped task: \${taskName}\`);
    });
    this.schedules.clear();
    this.isRunning = false;
  }

  // Get system status
  getStatus() {
    return {
      isRunning: this.isRunning,
      registeredTasks: Array.from(this.tasks.keys()),
      scheduledTasks: Array.from(this.schedules.keys()),
      uptime: process.uptime()
    };
  }
}

// Example usage
const automator = new TaskAutomator();

// Register tasks
automator.registerTask('backup', async () => {
  // Simulate backup process
  console.log('Creating backup...');
  await new Promise(resolve => setTimeout(resolve, 2000));
  return 'Backup completed successfully';
});

automator.registerTask('cleanup', async () => {
  // Simulate cleanup process
  console.log('Cleaning up temporary files...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 'Cleanup completed';
});

automator.registerTask('healthCheck', async () => {
  // Simulate health check
  const status = Math.random() > 0.1 ? 'healthy' : 'unhealthy';
  if (status === 'unhealthy') {
    throw new Error('System health check failed');
  }
  return status;
});

// Schedule tasks
automator.scheduleTask('backup', 24 * 60 * 60 * 1000); // Daily
automator.scheduleTask('cleanup', 60 * 60 * 1000);     // Hourly
automator.scheduleTask('healthCheck', 5 * 60 * 1000);  // Every 5 minutes

// Start automation
automator.isRunning = true;
console.log('Automation system started');
console.log('Status:', automator.getStatus());
\`\`\``
  }
};

// Smart response generator that provides relevant content
function generateSmartResponse(prompt: string, mode: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  switch (mode) {
    case 'code':
      if (lowerPrompt.includes('react') || lowerPrompt.includes('component')) {
        return offlineAIResponses.code.react;
      } else if (lowerPrompt.includes('html')) {
        return offlineAIResponses.code.html;
      } else if (lowerPrompt.includes('css') || lowerPrompt.includes('style')) {
        return offlineAIResponses.code.css;
      } else if (lowerPrompt.includes('python')) {
        return offlineAIResponses.code.python;
      } else {
        return offlineAIResponses.code.javascript;
      }
      
    case 'design':
      if (lowerPrompt.includes('card') || lowerPrompt.includes('component')) {
        return offlineAIResponses.design.component;
      } else {
        return offlineAIResponses.design.general;
      }
      
    case 'content':
      if (lowerPrompt.includes('blog') || lowerPrompt.includes('article')) {
        return offlineAIResponses.content.blog;
      } else if (lowerPrompt.includes('marketing') || lowerPrompt.includes('sales')) {
        return offlineAIResponses.content.marketing;
      } else {
        return offlineAIResponses.content.general;
      }
      
    case 'database':
      if (lowerPrompt.includes('schema') || lowerPrompt.includes('table')) {
        return offlineAIResponses.database.schema;
      } else {
        return offlineAIResponses.database.general;
      }
      
    case 'automation':
      if (lowerPrompt.includes('script') || lowerPrompt.includes('file')) {
        return offlineAIResponses.automation.script;
      } else {
        return offlineAIResponses.automation.general;
      }
      
    default:
      const responses = offlineAIResponses.chat.general;
      return responses[Math.floor(Math.random() * responses.length)] + 
             ` Based on your question about "${prompt}", I'd be happy to provide more specific guidance if you could share more details about what you're looking for.`;
  }
}

// Extract code blocks and create downloadable files
function extractCodeFiles(content: string): Array<{ name: string; content: string; language: string }> {
  const files: Array<{ name: string; content: string; language: string }> = [];
  const codeBlocks = content.match(/```(\w+)?\n([\s\S]*?)```/g);
  
  if (codeBlocks) {
    codeBlocks.forEach((block, index) => {
      const match = block.match(/```(\w+)?\n([\s\S]*?)```/);
      if (match) {
        const language = match[1] || 'text';
        const codeContent = match[2].trim();
        
        const extensions: Record<string, string> = {
          javascript: 'js',
          jsx: 'jsx',
          typescript: 'ts',
          tsx: 'tsx',
          html: 'html',
          css: 'css',
          python: 'py',
          java: 'java',
          sql: 'sql',
          json: 'json'
        };

        const extension = extensions[language.toLowerCase()] || 'txt';
        let filename = `code_${index + 1}.${extension}`;
        
        // Use more descriptive names for common files
        if (language.toLowerCase() === 'jsx' && codeContent.includes('export default')) {
          const componentMatch = codeContent.match(/function\s+(\w+)|const\s+(\w+)\s*=/);
          if (componentMatch) {
            const componentName = componentMatch[1] || componentMatch[2];
            filename = `${componentName}.jsx`;
          }
        } else if (language.toLowerCase() === 'html') {
          filename = 'index.html';
        } else if (language.toLowerCase() === 'css') {
          filename = 'styles.css';
        } else if (language.toLowerCase() === 'sql') {
          filename = 'schema.sql';
        }
        
        files.push({
          name: filename,
          content: codeContent,
          language: language
        });
      }
    });
  }
  
  return files;
}

export async function generateAIResponse(prompt: string, mode: string): Promise<Message> {
  try {
    // Always use offline responses for reliability
    const content = generateSmartResponse(prompt, mode);
    const files = extractCodeFiles(content);

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: content,
      timestamp: new Date(),
      metadata: {
        mode: mode.charAt(0).toUpperCase() + mode.slice(1),
        files: files.length > 0 ? files : undefined
      }
    };
  } catch (error) {
    console.error('AI Response Error:', error);
    
    // Fallback to basic response
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `I'm here to help! Could you provide more details about what you'd like me to help you with regarding "${prompt}"?`,
      timestamp: new Date(),
      metadata: {
        mode: mode.charAt(0).toUpperCase() + mode.slice(1)
      }
    };
  }
}