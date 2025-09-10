# AI Creator

A powerful AI assistant application built with React, TypeScript, and Tailwind CSS. Create anything from code to creative content with multiple AI modes.

## Features

- 🤖 **Multiple AI Modes**: Chat, Code Generation, UI Design, Content Writing, Database Help, and Automation
- 💬 **Chat History**: Save and manage your conversations
- 🔐 **Local Authentication**: Secure user accounts stored locally
- 📱 **Responsive Design**: Works on desktop and mobile
- ⚡ **Fast Performance**: Built with Vite for optimal speed
- 🎨 **Beautiful UI**: Modern design with smooth animations

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - The app will automatically open at `http://localhost:5173`
   - If it doesn't open automatically, click the URL in your terminal

## Configuration (Optional)

The app works out of the box with intelligent fallback responses. For enhanced AI capabilities:

1. Copy `.env.example` to `.env`
2. Get an API key from [OpenRouter](https://openrouter.ai/keys)
3. Add your key to the `.env` file:
   ```
   VITE_OPENROUTER_API_KEY=your_key_here
   ```

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

### API Issues
If AI responses aren't working:
1. The app uses fallback responses by default
2. For enhanced responses, add an OpenRouter API key to `.env`
3. Check console for any API-related errors

## License

MIT License - feel free to use this project for personal or commercial purposes.