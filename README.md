# AI Creator

A powerful AI assistant application built with React, TypeScript, and Tailwind CSS. Create anything from code to creative content with multiple AI modes.

## Features

- 🤖 **Multiple AI Modes**: Chat, Code Generation, UI Design, Content Writing, Database Help, and Automation
- 💬 **Chat History**: Save and manage your conversations
- 🔐 **Local Authentication**: Secure user accounts stored locally
- 📱 **Responsive Design**: Works on desktop and mobile
- ⚡ **Fast Performance**: Built with Vite for optimal speed
- 🎨 **Beautiful UI**: Modern design with smooth animations
- 🔄 **Intelligent Model Fallback**: Automatically tries multiple AI models if one is rate-limited

## Quick Start

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure API Key (Recommended)**
   - Copy `.env.example` to `.env`
   - Get a free API key from [OpenRouter](https://openrouter.ai/keys)
   - Add your key to the `.env` file:
     ```
     VITE_OPENROUTER_API_KEY=sk-or-v1-your_key_here
     ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - The app will open at `http://localhost:5173`

### Stackblitz or GitHub Deployment

If you're running this on Stackblitz, GitHub Codespaces, or any hosted platform:

1. **Get an API Key**
   - Sign up for free at [OpenRouter](https://openrouter.ai/keys)
   - Copy your API key

2. **Add API Key via Settings**
   - Click the **Settings** button (gear icon) in the header
   - Paste your OpenRouter API key
   - Click **Save**

3. **Start Chatting**
   - Your API key is saved locally in your browser
   - Start using the AI assistant immediately

**Note**: The app includes automatic fallback to multiple free AI models (Gemini, Llama, Mistral) if one is rate-limited.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── AuthModal.tsx   # Authentication modal
│   ├── ChatHistory.tsx # Chat history sidebar
│   ├── ChatMessage.tsx # Individual chat messages
│   ├── CodeBlock.tsx   # Code syntax highlighting
│   ├── Header.tsx      # App header
│   ├── LoadingIndicator.tsx # Loading animation
│   ├── PromptInput.tsx # Message input component
│   └── Sidebar.tsx     # Main sidebar
├── utils/              # Utility functions
│   ├── aiResponses.ts  # AI response handling
│   ├── localAuth.ts    # Local authentication
│   └── localChatStorage.ts # Local chat storage
├── config/             # Configuration files
│   └── firebase.ts     # Firebase config (optional)
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons
- **Firebase** - Optional cloud storage
- **OpenRouter** - Optional AI API

## Deployment

The app can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder after running `npm run build`
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the built files from `dist` folder
- **Any static host**: Upload the contents of `dist` folder

## Troubleshooting

### White Screen on Load
If you see a white screen:
1. Check the browser console for errors (F12)
2. Ensure all dependencies are installed: `npm install`
3. Try clearing browser cache and reloading
4. Make sure you're using Node.js version 16 or higher

### Build Errors
If build fails:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Try `npm run build`

### AI Responses Not Working
If AI responses aren't working:

1. **Missing API Key Error**
   - Click the Settings button (gear icon) in the header
   - Get a free API key from [OpenRouter](https://openrouter.ai/keys)
   - Paste your key in the Settings modal
   - Click Save

2. **Rate Limiting Issues**
   - The app automatically tries multiple AI models
   - If you see rate limit errors, wait a few moments and try again
   - Consider getting a paid OpenRouter plan for higher limits

3. **Check Browser Console**
   - Press F12 to open developer tools
   - Go to Console tab to see detailed error messages

### API Key Storage
- Your API key is stored **locally** in your browser using localStorage
- It is **never** sent to our servers
- It is only used to communicate directly with OpenRouter API
- Clearing browser cache/data will remove the saved key

## License

MIT License - feel free to use this project for personal or commercial purposes.