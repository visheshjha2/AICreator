import { Message } from '../components/ChatMessage';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Fallback responses for when API is unavailable
const fallbackResponses: Record<string, (prompt: string) => string> = {
  chat: (prompt: string) => `I understand you're asking about: "${prompt}". While I'm currently unable to connect to the AI service, I'd be happy to help once the connection is restored. Please try again in a moment.`,
  
  code: (prompt: string) => {
    // Generate complete, functional code based on specific requests
    if (prompt.toLowerCase().includes('tic tac toe') || prompt.toLowerCase().includes('tic-tac-toe')) {
      return `Here's a complete tic-tac-toe game implementation:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>Tic Tac Toe</h1>
        <div class="game-info">
            <div class="current-player">Current Player: <span id="current-player">X</span></div>
            <div class="game-status" id="game-status">Game in progress</div>
        </div>
        <div class="game-board" id="game-board">
            <div class="cell" data-index="0"></div>
            <div class="cell" data-index="1"></div>
            <div class="cell" data-index="2"></div>
            <div class="cell" data-index="3"></div>
            <div class="cell" data-index="4"></div>
            <div class="cell" data-index="5"></div>
            <div class="cell" data-index="6"></div>
            <div class="cell" data-index="7"></div>
            <div class="cell" data-index="8"></div>
        </div>
        <button class="reset-btn" id="reset-btn">Reset Game</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
\`\`\`

\`\`\`css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.game-container {
    background: white;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 100%;
}

h1 {
    color: #333;
    margin-bottom: 20px;
    font-size: 2.5rem;
}

.game-info {
    margin-bottom: 20px;
}

.current-player {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #555;
}

#current-player {
    font-weight: bold;
    color: #667eea;
}

.game-status {
    font-size: 1rem;
    color: #777;
}

.game-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    margin: 20px 0;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
}

.cell {
    width: 90px;
    height: 90px;
    background: #f8f9fa;
    border: 2px solid #e9ecef;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.cell:hover {
    background: #e9ecef;
    transform: scale(1.05);
}

.cell.x {
    color: #e74c3c;
}

.cell.o {
    color: #3498db;
}

.cell.winning {
    background: #2ecc71;
    color: white;
    animation: pulse 0.6s ease-in-out;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

.reset-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.reset-btn:hover {
    transform: translateY(-2px);
}

.winner {
    color: #2ecc71;
    font-weight: bold;
}

.draw {
    color: #f39c12;
    font-weight: bold;
}
\`\`\`

\`\`\`javascript
class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameStatus = document.getElementById('game-status');
        this.currentPlayerDisplay = document.getElementById('current-player');
        this.cells = document.querySelectorAll('.cell');
        this.resetBtn = document.getElementById('reset-btn');
        
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.updateDisplay();
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.board[index] = this.currentPlayer;
        this.updateCell(index);
        
        if (this.checkWinner()) {
            this.gameStatus.textContent = \`Player \${this.currentPlayer} wins!\`;
            this.gameStatus.classList.add('winner');
            this.gameActive = false;
            this.highlightWinningCells();
            return;
        }
        
        if (this.checkDraw()) {
            this.gameStatus.textContent = "It's a draw!";
            this.gameStatus.classList.add('draw');
            this.gameActive = false;
            return;
        }
        
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
    }
    
    updateCell(index) {
        const cell = this.cells[index];
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
    }
    
    checkWinner() {
        return this.winningConditions.some(condition => {
            const [a, b, c] = condition;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    highlightWinningCells() {
        this.winningConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                this.cells[a].classList.add('winning');
                this.cells[b].classList.add('winning');
                this.cells[c].classList.add('winning');
            }
        });
    }
    
    updateDisplay() {
        this.currentPlayerDisplay.textContent = this.currentPlayer;
        this.currentPlayerDisplay.style.color = this.currentPlayer === 'X' ? '#e74c3c' : '#3498db';
    }
    
    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
        
        this.gameStatus.textContent = 'Game in progress';
        this.gameStatus.classList.remove('winner', 'draw');
        this.updateDisplay();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
\`\`\`

This is a complete, fully functional tic-tac-toe game with:
- Interactive game board with click handling
- Win detection for all possible winning combinations
- Draw detection when the board is full
- Visual feedback with animations and color coding
- Reset functionality to start a new game
- Responsive design that works on all devices
- Modern styling with gradients and hover effects`;
    }
    
    if (prompt.toLowerCase().includes('react') || prompt.toLowerCase().includes('component')) {
      return `Here's a complete React component implementation:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function InteractiveCounter() {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    setHistory(prev => [...prev, \`Incremented to \${count + 1}\`]);
    setIsAnimating(true);
  };

  const handleDecrement = () => {
    setCount(prev => prev - 1);
    setHistory(prev => [...prev, \`Decremented to \${count - 1}\`]);
    setIsAnimating(true);
  };

  const handleReset = () => {
    setCount(0);
    setHistory([]);
    setIsAnimating(true);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Interactive Counter
      </h2>
      
      <div className="text-center mb-6">
        <div className={\`text-6xl font-bold transition-all duration-300 \${
          isAnimating ? 'scale-110 text-blue-600' : 'scale-100 text-gray-800'
        }\`}>
          {count}
        </div>
        <p className="text-gray-600 mt-2">Current Count</p>
      </div>
      
      <div className="flex justify-center space-x-4 mb-6">
        <button 
          onClick={handleDecrement}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          - Decrease
        </button>
        
        <button 
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Reset
        </button>
        
        <button 
          onClick={handleIncrement}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          + Increase
        </button>
      </div>
      
      {history.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">History:</h3>
          <div className="max-h-32 overflow-y-auto bg-gray-50 rounded-lg p-3">
            {history.slice(-5).map((entry, index) => (
              <div key={index} className="text-sm text-gray-600 py-1">
                {entry}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default InteractiveCounter;
\`\`\`

This component includes:
- State management with useState and useEffect hooks
- Interactive buttons with hover effects
- Animation feedback when count changes
- History tracking of all actions
- Responsive design with Tailwind CSS
- Complete functionality without any placeholders`;
    }
    
    if (prompt.toLowerCase().includes('calculator')) {
      return `Here's a complete calculator implementation:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <link rel="stylesheet" href="calculator.css">
</head>
<body>
    <div class="calculator">
        <div class="display">
            <div class="previous-operand" id="previous-operand"></div>
            <div class="current-operand" id="current-operand">0</div>
        </div>
        <div class="buttons">
            <button class="btn clear" onclick="calculator.clear()">C</button>
            <button class="btn clear" onclick="calculator.delete()">DEL</button>
            <button class="btn operator" onclick="calculator.chooseOperation('÷')">÷</button>
            <button class="btn operator" onclick="calculator.chooseOperation('×')">×</button>
            
            <button class="btn number" onclick="calculator.appendNumber('7')">7</button>
            <button class="btn number" onclick="calculator.appendNumber('8')">8</button>
            <button class="btn number" onclick="calculator.appendNumber('9')">9</button>
            <button class="btn operator" onclick="calculator.chooseOperation('-')">-</button>
            
            <button class="btn number" onclick="calculator.appendNumber('4')">4</button>
            <button class="btn number" onclick="calculator.appendNumber('5')">5</button>
            <button class="btn number" onclick="calculator.appendNumber('6')">6</button>
            <button class="btn operator" onclick="calculator.chooseOperation('+')">+</button>
            
            <button class="btn number" onclick="calculator.appendNumber('1')">1</button>
            <button class="btn number" onclick="calculator.appendNumber('2')">2</button>
            <button class="btn number" onclick="calculator.appendNumber('3')">3</button>
            <button class="btn equals" onclick="calculator.compute()" rowspan="2">=</button>
            
            <button class="btn number zero" onclick="calculator.appendNumber('0')">0</button>
            <button class="btn number" onclick="calculator.appendNumber('.')">.</button>
        </div>
    </div>
    <script src="calculator.js"></script>
</body>
</html>
\`\`\`

\`\`\`css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.calculator {
    background: #2c3e50;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    max-width: 320px;
    width: 100%;
}

.display {
    background: #34495e;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    text-align: right;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.previous-operand {
    color: #bdc3c7;
    font-size: 1rem;
    min-height: 1.5rem;
}

.current-operand {
    color: white;
    font-size: 2rem;
    font-weight: bold;
    word-wrap: break-word;
    word-break: break-all;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.btn {
    border: none;
    border-radius: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    height: 60px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.btn:active {
    transform: translateY(0);
}

.number {
    background: #ecf0f1;
    color: #2c3e50;
}

.number:hover {
    background: #d5dbdb;
}

.operator {
    background: #e67e22;
    color: white;
}

.operator:hover {
    background: #d35400;
}

.equals {
    background: #27ae60;
    color: white;
    grid-row: span 2;
}

.equals:hover {
    background: #229954;
}

.clear {
    background: #e74c3c;
    color: white;
}

.clear:hover {
    background: #c0392b;
}

.zero {
    grid-column: span 2;
}
\`\`\`

\`\`\`javascript
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return \`\${integerDisplay}.\${decimalDigits}\`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand) || '0';
        
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                \`\${this.getDisplayNumber(this.previousOperand)} \${this.operation}\`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        calculator.appendNumber(event.key);
    }
    if (event.key === '+' || event.key === '-') {
        calculator.chooseOperation(event.key);
    }
    if (event.key === '*') {
        calculator.chooseOperation('×');
    }
    if (event.key === '/') {
        event.preventDefault();
        calculator.chooseOperation('÷');
    }
    if (event.key === 'Enter' || event.key === '=') {
        calculator.compute();
    }
    if (event.key === 'Escape') {
        calculator.clear();
    }
    if (event.key === 'Backspace') {
        calculator.delete();
    }
});
\`\`\`

This is a fully functional calculator with:
- All basic arithmetic operations (+, -, ×, ÷)
- Decimal number support
- Delete and clear functionality
- Keyboard support for all operations
- Error handling (division by zero)
- Number formatting with commas
- Modern, responsive design
- Smooth animations and hover effects`;
    }
    
    if (prompt.toLowerCase().includes('function') || prompt.toLowerCase().includes('javascript')) {
      return `Here's a complete JavaScript implementation based on your request:

\`\`\`javascript
// Complete utility functions collection

// Array manipulation functions
function processArray(array, operation = 'filter') {
    if (!Array.isArray(array)) {
        throw new Error('Input must be an array');
    }
    
    switch (operation) {
        case 'filter':
            return array.filter(item => item !== null && item !== undefined);
        case 'sort':
            return [...array].sort((a, b) => {
                if (typeof a === 'number' && typeof b === 'number') {
                    return a - b;
                }
                return String(a).localeCompare(String(b));
            });
        case 'unique':
            return [...new Set(array)];
        case 'reverse':
            return [...array].reverse();
        default:
            return array;
    }
}

// Data validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
        isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
        errors: {
            length: password.length < minLength,
            uppercase: !hasUpperCase,
            lowercase: !hasLowerCase,
            numbers: !hasNumbers,
            specialChar: !hasSpecialChar
        }
    };
}

// Date and time utilities
function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

function getTimeDifference(date1, date2) {
    const diff = Math.abs(new Date(date2) - new Date(date1));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
}

// String manipulation functions
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function truncateText(text, maxLength, suffix = '...') {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - suffix.length) + suffix;
}

// Number utilities
function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function generateRandomNumber(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roundToDecimals(number, decimals = 2) {
    return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// Local storage utilities
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function loadFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
}

// API utilities
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// Usage examples:
console.log('Array processing:', processArray([1, 2, 2, 3, null, 4], 'unique'));
console.log('Email validation:', validateEmail('test@example.com'));
console.log('Date formatting:', formatDate(new Date(), 'DD/MM/YYYY HH:mm'));
console.log('Currency formatting:', formatCurrency(1234.56));
console.log('Text slugification:', slugify('Hello World! This is a Test'));

// Export functions for use in other modules
export {
    processArray,
    validateEmail,
    validatePhone,
    validatePassword,
    formatDate,
    getTimeDifference,
    capitalizeWords,
    slugify,
    truncateText,
    formatCurrency,
    generateRandomNumber,
    roundToDecimals,
    saveToStorage,
    loadFromStorage,
    fetchWithTimeout
};
\`\`\`

This provides a complete collection of utility functions with real implementations, error handling, and practical examples.`;
    }
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
    
    // Generic fallback with more specific guidance
    return `I'd love to help you with code generation! To provide you with complete, functional code instead of placeholders, could you please specify:

1. **What type of application/feature** you want to build
2. **Which programming language** you prefer (JavaScript, Python, React, etc.)
3. **Any specific requirements** or functionality you need

For example, instead of asking for "a function," you could ask for:
- "A function to validate email addresses"
- "A React component for a todo list"
- "A Python script to process CSV files"
- "A JavaScript calculator with basic operations"

This way, I can generate complete, working code tailored to your exact needs rather than generic placeholder code.

**Your request was:** "${prompt}"

Could you provide more details so I can create the specific functionality you're looking for?`;
  },

  design: (prompt: string) => {
    if (prompt.toLowerCase().includes('login') || prompt.toLowerCase().includes('sign in')) {
      return `Here's a complete modern login page design:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Modern Design</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <div class="logo">
                    <div class="logo-icon">🔐</div>
                    <h1>Welcome Back</h1>
                </div>
                <p class="subtitle">Sign in to your account</p>
            </div>
            
            <form class="login-form" id="loginForm">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <div class="input-wrapper">
                        <input type="email" id="email" name="email" required>
                        <span class="input-icon">📧</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <div class="input-wrapper">
                        <input type="password" id="password" name="password" required>
                        <span class="input-icon">🔒</span>
                        <button type="button" class="toggle-password" onclick="togglePassword()">👁️</button>
                    </div>
                </div>
                
                <div class="form-options">
                    <label class="checkbox-wrapper">
                        <input type="checkbox" id="remember">
                        <span class="checkmark"></span>
                        Remember me
                    </label>
                    <a href="#" class="forgot-password">Forgot password?</a>
                </div>
                
                <button type="submit" class="login-btn">
                    <span class="btn-text">Sign In</span>
                    <span class="btn-loader" style="display: none;">⏳</span>
                </button>
                
                <div class="divider">
                    <span>or continue with</span>
                </div>
                
                <div class="social-login">
                    <button type="button" class="social-btn google">
                        <span class="social-icon">🔍</span>
                        Google
                    </button>
                    <button type="button" class="social-btn github">
                        <span class="social-icon">🐙</span>
                        GitHub
                    </button>
                </div>
                
                <p class="signup-link">
                    Don't have an account? <a href="#">Sign up</a>
                </p>
            </form>
        </div>
    </div>
    <script src="login.js"></script>
</body>
</html>
\`\`\`

\`\`\`css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.login-container {
    width: 100%;
    max-width: 400px;
}

.login-card {
    background: white;
    border-radius: 20px;
    padding: 40px 30px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
}

.login-header {
    text-align: center;
    margin-bottom: 30px;
}

.logo {
    margin-bottom: 10px;
}

.logo-icon {
    font-size: 3rem;
    margin-bottom: 10px;
}

.login-header h1 {
    color: #333;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 5px;
}

.subtitle {
    color: #666;
    font-size: 1rem;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
    font-size: 0.9rem;
}

.input-wrapper {
    position: relative;
}

.input-wrapper input {
    width: 100%;
    padding: 15px 50px 15px 45px;
    border: 2px solid #e1e5e9;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #f8f9fa;
}

.input-wrapper input:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
}

.toggle-password {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 5px;
    border-radius: 5px;
    transition: background 0.2s ease;
}

.toggle-password:hover {
    background: rgba(0, 0, 0, 0.05);
}

.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    font-size: 0.9rem;
}

.checkbox-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #666;
}

.checkbox-wrapper input {
    margin-right: 8px;
}

.forgot-password {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
}

.forgot-password:hover {
    color: #5a6fd8;
}

.login-btn {
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 15px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.login-btn:active {
    transform: translateY(0);
}

.divider {
    text-align: center;
    margin: 25px 0;
    position: relative;
    color: #666;
    font-size: 0.9rem;
}

.divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e1e5e9;
    z-index: 1;
}

.divider span {
    background: white;
    padding: 0 15px;
    position: relative;
    z-index: 2;
}

.social-login {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 25px;
}

.social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    border: 2px solid #e1e5e9;
    border-radius: 10px;
    background: white;
    color: #333;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.social-btn:hover {
    border-color: #667eea;
    background: #f8f9ff;
}

.social-icon {
    font-size: 1.2rem;
}

.signup-link {
    text-align: center;
    color: #666;
    font-size: 0.9rem;
}

.signup-link a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
}

.signup-link a:hover {
    text-decoration: underline;
}

@media (max-width: 480px) {
    .login-card {
        padding: 30px 20px;
    }
    
    .social-login {
        grid-template-columns: 1fr;
    }
}
\`\`\`

\`\`\`javascript
// Login form functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');

    // Form validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function showError(input, message) {
        input.style.borderColor = '#e74c3c';
        // You can add error message display here
    }

    function clearError(input) {
        input.style.borderColor = '#e1e5e9';
    }

    // Real-time validation
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            showError(this, 'Please enter a valid email address');
        } else {
            clearError(this);
        }
    });

    passwordInput.addEventListener('blur', function() {
        if (this.value && !validatePassword(this.value)) {
            showError(this, 'Password must be at least 6 characters');
        } else {
            clearError(this);
        }
    });

    // Form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Validate inputs
        if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            return;
        }
        
        if (!validatePassword(password)) {
            showError(passwordInput, 'Password must be at least 6 characters');
            return;
        }
        
        // Show loading state
        loginBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
        
        try {
            // Simulate API call
            await simulateLogin(email, password);
            
            // Success - redirect or show success message
            alert('Login successful!');
            // window.location.href = '/dashboard';
            
        } catch (error) {
            alert('Login failed: ' + error.message);
        } finally {
            // Reset button state
            loginBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    });

    // Simulate login API call
    async function simulateLogin(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate different responses
                if (email === 'demo@example.com' && password === 'password123') {
                    resolve({ success: true, token: 'fake-jwt-token' });
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 2000);
        });
    }

    // Social login handlers
    document.querySelector('.google').addEventListener('click', function() {
        alert('Google login would be implemented here');
    });

    document.querySelector('.github').addEventListener('click', function() {
        alert('GitHub login would be implemented here');
    });
});

// Password visibility toggle
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// Add smooth animations
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});
\`\`\`

This is a complete, modern login page with:
- Responsive design that works on all devices
- Form validation with real-time feedback
- Password visibility toggle
- Loading states and animations
- Social login buttons
- Modern gradient design
- Smooth hover effects and transitions
- Accessible form elements
- Complete JavaScript functionality`;
    }
    
    return `I'd help you create beautiful UI designs! For your request about "${prompt}", I would typically provide detailed design guidance, component suggestions, and styling recommendations. 

To give you a complete design implementation instead of general advice, could you specify:

1. **What type of UI component** you need (login form, dashboard, card, navigation, etc.)
2. **The style you prefer** (modern, minimal, corporate, colorful, etc.)
3. **Any specific requirements** (responsive, dark mode, animations, etc.)

For example:
- "Design a modern login page with social login options"
- "Create a dashboard layout with sidebar navigation"
- "Design a product card component with hover effects"
- "Build a responsive navigation menu"

This way I can provide complete HTML, CSS, and JavaScript code for your specific design needs.`;
  },

  content: (prompt: string) => {
    return `I'd help you create engaging content! For your request about "${prompt}", I would typically provide well-structured writing, copy suggestions, and content strategies. 

To provide you with complete, ready-to-use content instead of generic templates, could you specify:

1. **What type of content** you need (blog post, marketing copy, email, social media, etc.)
2. **Your target audience** (professionals, consumers, students, etc.)
3. **The tone and style** (formal, casual, persuasive, informative, etc.)
4. **Key points or topics** to cover

For example:
- "Write a blog post about sustainable living for millennials"
- "Create marketing copy for a new fitness app"
- "Draft a professional email template for client onboarding"
- "Write social media captions for a restaurant's new menu"

This way I can create specific, actionable content tailored to your exact needs.`;
  },
  
  database: (prompt: string) => {
    if (prompt.toLowerCase().includes('user') || prompt.toLowerCase().includes('authentication')) {
      return `Here's a complete user authentication database schema:

\`\`\`sql
-- Users table with authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    avatar_url TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User roles junction table
CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id)
);

-- Password reset tokens
CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email verification tokens
CREATE TABLE email_verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User sessions for tracking active logins
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit log for user activities
CREATE TABLE user_audit_log (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES 
('admin', 'Full system access'),
('user', 'Standard user access'),
('moderator', 'Content moderation access');

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX idx_password_reset_tokens_expires ON password_reset_tokens(expires_at);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);
CREATE INDEX idx_audit_log_user_id ON user_audit_log(user_id);
CREATE INDEX idx_audit_log_created_at ON user_audit_log(created_at);
\`\`\`

\`\`\`javascript
// Complete Node.js authentication service
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const crypto = require('crypto');

class AuthService {
    constructor(dbConfig) {
        this.pool = new Pool(dbConfig);
        this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
        this.saltRounds = 12;
    }

    async registerUser(userData) {
        const { email, username, password, firstName, lastName, phone } = userData;
        
        try {
            // Check if user already exists
            const existingUser = await this.pool.query(
                'SELECT id FROM users WHERE email = $1 OR username = $2',
                [email, username]
            );
            
            if (existingUser.rows.length > 0) {
                throw new Error('User already exists with this email or username');
            }
            
            // Hash password
            const passwordHash = await bcrypt.hash(password, this.saltRounds);
            
            // Insert new user
            const result = await this.pool.query(
                \`INSERT INTO users (email, username, password_hash, first_name, last_name, phone)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING id, email, username, first_name, last_name, created_at\`,
                [email, username, passwordHash, firstName, lastName, phone]
            );
            
            const user = result.rows[0];
            
            // Assign default user role
            await this.pool.query(
                \`INSERT INTO user_roles (user_id, role_id)
                 SELECT $1, id FROM roles WHERE name = 'user'\`,
                [user.id]
            );
            
            // Generate email verification token
            const verificationToken = await this.generateEmailVerificationToken(user.id);
            
            // Log registration
            await this.logUserActivity(user.id, 'user_registered', { email, username });
            
            return {
                user,
                verificationToken,
                message: 'User registered successfully. Please verify your email.'
            };
            
        } catch (error) {
            throw error;
        }
    }

    async loginUser(email, password, ipAddress, userAgent) {
        try {
            // Get user with password hash
            const result = await this.pool.query(
                \`SELECT u.*, array_agg(r.name) as roles
                 FROM users u
                 LEFT JOIN user_roles ur ON u.id = ur.user_id
                 LEFT JOIN roles r ON ur.role_id = r.id
                 WHERE u.email = $1 AND u.is_active = true
                 GROUP BY u.id\`,
                [email]
            );
            
            if (result.rows.length === 0) {
                throw new Error('Invalid email or password');
            }
            
            const user = result.rows[0];
            
            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password_hash);
            if (!isValidPassword) {
                await this.logUserActivity(user.id, 'login_failed', { reason: 'invalid_password' });
                throw new Error('Invalid email or password');
            }
            
            // Update last login
            await this.pool.query(
                'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
                [user.id]
            );
            
            // Create session
            const sessionToken = await this.createUserSession(user.id, ipAddress, userAgent);
            
            // Generate JWT
            const token = jwt.sign(
                { 
                    userId: user.id, 
                    email: user.email,
                    roles: user.roles.filter(r => r !== null)
                },
                this.jwtSecret,
                { expiresIn: '24h' }
            );
            
            // Log successful login
            await this.logUserActivity(user.id, 'login_success', { ip_address: ipAddress });
            
            // Remove sensitive data
            delete user.password_hash;
            
            return {
                user,
                token,
                sessionToken,
                expiresIn: '24h'
            };
            
        } catch (error) {
            throw error;
        }
    }

    async createUserSession(userId, ipAddress, userAgent) {
        const sessionToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        
        await this.pool.query(
            \`INSERT INTO user_sessions (user_id, session_token, ip_address, user_agent, expires_at)
             VALUES ($1, $2, $3, $4, $5)\`,
            [userId, sessionToken, ipAddress, userAgent, expiresAt]
        );
        
        return sessionToken;
    }

    async generatePasswordResetToken(email) {
        const result = await this.pool.query(
            'SELECT id FROM users WHERE email = $1 AND is_active = true',
            [email]
        );
        
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        
        const userId = result.rows[0].id;
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        
        await this.pool.query(
            \`INSERT INTO password_reset_tokens (user_id, token, expires_at)
             VALUES ($1, $2, $3)\`,
            [userId, token, expiresAt]
        );
        
        return token;
    }

    async resetPassword(token, newPassword) {
        const result = await this.pool.query(
            \`SELECT prt.user_id, prt.expires_at
             FROM password_reset_tokens prt
             WHERE prt.token = $1 AND prt.used = false\`,
            [token]
        );
        
        if (result.rows.length === 0) {
            throw new Error('Invalid or expired reset token');
        }
        
        const { user_id, expires_at } = result.rows[0];
        
        if (new Date() > expires_at) {
            throw new Error('Reset token has expired');
        }
        
        // Hash new password
        const passwordHash = await bcrypt.hash(newPassword, this.saltRounds);
        
        // Update password
        await this.pool.query(
            'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
            [passwordHash, user_id]
        );
        
        // Mark token as used
        await this.pool.query(
            'UPDATE password_reset_tokens SET used = true WHERE token = $1',
            [token]
        );
        
        // Log password reset
        await this.logUserActivity(user_id, 'password_reset', { token_used: token });
        
        return { message: 'Password reset successfully' };
    }

    async logUserActivity(userId, action, details = {}) {
        await this.pool.query(
            \`INSERT INTO user_audit_log (user_id, action, details)
             VALUES ($1, $2, $3)\`,
            [userId, action, JSON.stringify(details)]
        );
    }

    async getUserById(userId) {
        const result = await this.pool.query(
            \`SELECT u.id, u.email, u.username, u.first_name, u.last_name, 
                    u.phone, u.avatar_url, u.email_verified, u.last_login, 
                    u.created_at, array_agg(r.name) as roles
             FROM users u
             LEFT JOIN user_roles ur ON u.id = ur.user_id
             LEFT JOIN roles r ON ur.role_id = r.id
             WHERE u.id = $1 AND u.is_active = true
             GROUP BY u.id\`,
            [userId]
        );
        
        return result.rows[0] || null;
    }

    async validateSession(sessionToken) {
        const result = await this.pool.query(
            \`SELECT us.user_id, us.expires_at, u.email, u.is_active
             FROM user_sessions us
             JOIN users u ON us.user_id = u.id
             WHERE us.session_token = $1\`,
            [sessionToken]
        );
        
        if (result.rows.length === 0) {
            return null;
        }
        
        const session = result.rows[0];
        
        if (new Date() > session.expires_at || !session.is_active) {
            return null;
        }
        
        return session;
    }
}

module.exports = AuthService;
\`\`\`

This provides a complete user authentication system with:
- Secure password hashing with bcrypt
- JWT token generation and validation
- Session management
- Password reset functionality
- Email verification system
- Role-based access control
- Comprehensive audit logging
- Database indexes for performance
- Complete CRUD operations for user management`;
    }
    
    return `I'd help you with database design and queries! For your request about "${prompt}", I would typically provide schema designs, optimized queries, and database best practices.

To provide you with a complete database implementation instead of general advice, could you specify:

1. **What type of database system** you're using (PostgreSQL, MySQL, MongoDB, etc.)
2. **What you want to store** (users, products, orders, blog posts, etc.)
3. **Any specific requirements** (relationships, constraints, performance needs, etc.)

For example:
- "Design a user authentication system with roles"
- "Create an e-commerce database schema with products and orders"
- "Build a blog database with posts, comments, and categories"
- "Design a social media database with users, posts, and followers"

This way I can provide complete SQL schemas, queries, and even application code for your specific database needs.`;
  },
  
  automation: (prompt: string) => {
    if (prompt.toLowerCase().includes('email') || prompt.toLowerCase().includes('notification')) {
      return `Here's a complete email automation system:

\`\`\`javascript
// Email automation service with multiple providers
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const fs = require('fs').promises;
const path = require('path');

class EmailAutomationService {
    constructor(config) {
        this.config = config;
        this.transporter = this.createTransporter();
        this.templates = new Map();
        this.scheduledJobs = new Map();
        this.loadTemplates();
    }

    createTransporter() {
        // Support multiple email providers
        switch (this.config.provider) {
            case 'gmail':
                return nodemailer.createTransporter({
                    service: 'gmail',
                    auth: {
                        user: this.config.email,
                        pass: this.config.password
                    }
                });
            case 'smtp':
                return nodemailer.createTransporter({
                    host: this.config.host,
                    port: this.config.port,
                    secure: this.config.secure,
                    auth: {
                        user: this.config.username,
                        pass: this.config.password
                    }
                });
            case 'sendgrid':
                return nodemailer.createTransporter({
                    service: 'SendGrid',
                    auth: {
                        user: 'apikey',
                        pass: this.config.apiKey
                    }
                });
            default:
                throw new Error('Unsupported email provider');
        }
    }

    async loadTemplates() {
        try {
            const templatesDir = path.join(__dirname, 'templates');
            const files = await fs.readdir(templatesDir);
            
            for (const file of files) {
                if (file.endsWith('.html')) {
                    const templateName = path.basename(file, '.html');
                    const templateContent = await fs.readFile(
                        path.join(templatesDir, file), 
                        'utf-8'
                    );
                    this.templates.set(templateName, templateContent);
                }
            }
        } catch (error) {
            console.error('Error loading templates:', error);
        }
    }

    async sendEmail(options) {
        try {
            const mailOptions = {
                from: options.from || this.config.defaultFrom,
                to: options.to,
                cc: options.cc,
                bcc: options.bcc,
                subject: options.subject,
                text: options.text,
                html: options.html,
                attachments: options.attachments
            };

            const result = await this.transporter.sendMail(mailOptions);
            
            // Log successful send
            await this.logEmailActivity({
                messageId: result.messageId,
                to: options.to,
                subject: options.subject,
                status: 'sent',
                timestamp: new Date()
            });

            return {
                success: true,
                messageId: result.messageId,
                response: result.response
            };
        } catch (error) {
            // Log failed send
            await this.logEmailActivity({
                to: options.to,
                subject: options.subject,
                status: 'failed',
                error: error.message,
                timestamp: new Date()
            });
            
            throw error;
        }
    }

    async sendTemplateEmail(templateName, recipients, data, options = {}) {
        const template = this.templates.get(templateName);
        if (!template) {
            throw new Error(\`Template '\${templateName}' not found\`);
        }

        // Replace template variables
        let html = template;
        for (const [key, value] of Object.entries(data)) {
            const regex = new RegExp(\`{{\\s*\${key}\\s*}}\`, 'g');
            html = html.replace(regex, value);
        }

        // Send to multiple recipients
        const results = [];
        for (const recipient of recipients) {
            try {
                const result = await this.sendEmail({
                    to: recipient.email,
                    subject: this.replaceVariables(options.subject || 'Notification', {
                        ...data,
                        ...recipient
                    }),
                    html: this.replaceVariables(html, {
                        ...data,
                        ...recipient
                    }),
                    ...options
                });
                results.push({ email: recipient.email, success: true, result });
            } catch (error) {
                results.push({ 
                    email: recipient.email, 
                    success: false, 
                    error: error.message 
                });
            }
        }

        return results;
    }

    replaceVariables(text, data) {
        let result = text;
        for (const [key, value] of Object.entries(data)) {
            const regex = new RegExp(\`{{\\s*\${key}\\s*}}\`, 'g');
            result = result.replace(regex, value);
        }
        return result;
    }

    // Schedule recurring emails
    scheduleRecurringEmail(name, cronExpression, emailOptions) {
        const job = cron.schedule(cronExpression, async () => {
            try {
                await this.sendEmail(emailOptions);
                console.log(\`Scheduled email '\${name}' sent successfully\`);
            } catch (error) {
                console.error(\`Failed to send scheduled email '\${name}':\`, error);
            }
        }, {
            scheduled: false
        });

        this.scheduledJobs.set(name, job);
        job.start();
        
        return job;
    }

    // Welcome email automation
    async sendWelcomeEmail(user) {
        return await this.sendTemplateEmail('welcome', [user], {
            firstName: user.firstName,
            email: user.email,
            loginUrl: \`\${this.config.baseUrl}/login\`,
            supportEmail: this.config.supportEmail
        }, {
            subject: 'Welcome to {{firstName}}! Get started today'
        });
    }

    // Password reset automation
    async sendPasswordResetEmail(user, resetToken) {
        const resetUrl = \`\${this.config.baseUrl}/reset-password?token=\${resetToken}\`;
        
        return await this.sendTemplateEmail('password-reset', [user], {
            firstName: user.firstName,
            resetUrl: resetUrl,
            expiryTime: '1 hour'
        }, {
            subject: 'Reset your password'
        });
    }

    // Order confirmation automation
    async sendOrderConfirmation(order) {
        return await this.sendTemplateEmail('order-confirmation', [order.customer], {
            firstName: order.customer.firstName,
            orderNumber: order.orderNumber,
            orderDate: order.createdAt.toLocaleDateString(),
            totalAmount: order.totalAmount,
            items: order.items,
            trackingUrl: \`\${this.config.baseUrl}/track/\${order.orderNumber}\`
        }, {
            subject: 'Order Confirmation #{{orderNumber}}'
        });
    }

    // Newsletter automation
    async sendNewsletter(subscribers, content) {
        const results = [];
        const batchSize = 50; // Send in batches to avoid rate limits
        
        for (let i = 0; i < subscribers.length; i += batchSize) {
            const batch = subscribers.slice(i, i + batchSize);
            
            const batchResults = await this.sendTemplateEmail('newsletter', batch, {
                ...content,
                unsubscribeUrl: \`\${this.config.baseUrl}/unsubscribe\`
            }, {
                subject: content.subject
            });
            
            results.push(...batchResults);
            
            // Wait between batches
            if (i + batchSize < subscribers.length) {
                await this.delay(1000);
            }
        }
        
        return results;
    }

    // Abandoned cart automation
    async sendAbandonedCartEmail(cart) {
        const cartValue = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        return await this.sendTemplateEmail('abandoned-cart', [cart.customer], {
            firstName: cart.customer.firstName,
            cartItems: cart.items,
            cartValue: cartValue.toFixed(2),
            checkoutUrl: \`\${this.config.baseUrl}/checkout?cart=\${cart.id}\`,
            discountCode: 'COMEBACK10'
        }, {
            subject: 'You left something in your cart!'
        });
    }

    // Birthday email automation
    async sendBirthdayEmails() {
        const today = new Date();
        const todayString = \`\${today.getMonth() + 1}-\${today.getDate()}\`;
        
        // This would typically query your database for users with birthdays today
        const birthdayUsers = await this.getBirthdayUsers(todayString);
        
        const results = [];
        for (const user of birthdayUsers) {
            try {
                const result = await this.sendTemplateEmail('birthday', [user], {
                    firstName: user.firstName,
                    discountCode: 'BIRTHDAY20',
                    shopUrl: this.config.baseUrl
                }, {
                    subject: 'Happy Birthday {{firstName}}! 🎉'
                });
                results.push(...result);
            } catch (error) {
                console.error(\`Failed to send birthday email to \${user.email}:\`, error);
            }
        }
        
        return results;
    }

    // Email campaign analytics
    async getEmailAnalytics(startDate, endDate) {
        // This would typically query your email logs database
        const logs = await this.getEmailLogs(startDate, endDate);
        
        const analytics = {
            totalSent: logs.filter(log => log.status === 'sent').length,
            totalFailed: logs.filter(log => log.status === 'failed').length,
            deliveryRate: 0,
            topFailureReasons: {},
            dailyStats: {}
        };
        
        analytics.deliveryRate = (analytics.totalSent / (analytics.totalSent + analytics.totalFailed)) * 100;
        
        // Group failure reasons
        logs.filter(log => log.status === 'failed').forEach(log => {
            const reason = log.error || 'Unknown';
            analytics.topFailureReasons[reason] = (analytics.topFailureReasons[reason] || 0) + 1;
        });
        
        return analytics;
    }

    async logEmailActivity(activity) {
        // Log to file or database
        const logEntry = {
            timestamp: new Date().toISOString(),
            ...activity
        };
        
        // In a real application, you'd save this to a database
        console.log('Email Activity:', logEntry);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Stop all scheduled jobs
    stopAllScheduledJobs() {
        for (const [name, job] of this.scheduledJobs) {
            job.stop();
            console.log(\`Stopped scheduled job: \${name}\`);
        }
        this.scheduledJobs.clear();
    }
}

// Usage example
const emailService = new EmailAutomationService({
    provider: 'gmail',
    email: 'your-email@gmail.com',
    password: 'your-app-password',
    defaultFrom: 'Your Company <noreply@yourcompany.com>',
    baseUrl: 'https://yourwebsite.com',
    supportEmail: 'support@yourcompany.com'
});

// Schedule daily newsletter
emailService.scheduleRecurringEmail('daily-newsletter', '0 9 * * *', {
    to: 'subscribers@yourcompany.com',
    subject: 'Daily Newsletter',
    template: 'newsletter'
});

// Schedule birthday emails to run daily at 8 AM
cron.schedule('0 8 * * *', async () => {
    await emailService.sendBirthdayEmails();
});

module.exports = EmailAutomationService;
\`\`\`

\`\`\`html
<!-- templates/welcome.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome!</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome {{firstName}}!</h1>
            <p>We're excited to have you on board</p>
        </div>
        <div class="content">
            <p>Hi {{firstName}},</p>
            <p>Thank you for joining our platform! We're thrilled to have you as part of our community.</p>
            <p>To get started, click the button below to access your account:</p>
            <a href="{{loginUrl}}" class="button">Get Started</a>
            <p>If you have any questions, don't hesitate to reach out to our support team at {{supportEmail}}.</p>
            <p>Best regards,<br>The Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
\`\`\`

This complete email automation system includes:
- Multiple email provider support (Gmail, SMTP, SendGrid)
- Template-based email system with variable replacement
- Scheduled recurring emails with cron jobs
- Automated workflows (welcome, password reset, order confirmation)
- Newsletter and marketing campaign support
- Abandoned cart recovery automation
- Birthday email automation
- Email analytics and logging
- Batch processing to handle rate limits
- Error handling and retry logic
- Professional HTML email templates`;
    }
    
    return `I'd help you create automation scripts! For your request about "${prompt}", I would typically provide workflow automation, scripts, and process optimization solutions.

To provide you with complete automation code instead of general concepts, could you specify:

1. **What you want to automate** (emails, file processing, data sync, backups, etc.)
2. **What platform/language** you prefer (Node.js, Python, bash scripts, etc.)
3. **Any specific triggers or schedules** (time-based, event-based, etc.)
4. **Integration requirements** (APIs, databases, file systems, etc.)

For example:
- "Create an email automation system for welcome emails"
- "Build a script to automatically backup files to cloud storage"
- "Automate social media posting from a content calendar"
- "Create a data synchronization script between two databases"

This way I can provide complete, working automation solutions tailored to your specific needs.`;
  }
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
    // Check if API key is available
    if (!API_KEY || API_KEY.trim() === '') {
      console.warn('No API key configured, using enhanced fallback responses');
      return generateEnhancedFallbackResponse(prompt, mode);
    }

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
    return generateEnhancedFallbackResponse(prompt, mode);
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
    return generateEnhancedFallbackResponse(prompt, mode);
  }
}

// Enhanced fallback response generator
function generateEnhancedFallbackResponse(prompt: string, mode: string): Message {
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