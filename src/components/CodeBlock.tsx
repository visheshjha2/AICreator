import React from 'react';
import { Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  const highlightCode = (code: string, language: string) => {
    // Simple syntax highlighting for common languages
    const keywords: Record<string, string[]> = {
      python: ['import', 'from', 'def', 'class', 'if', 'else', 'elif', 'for', 'while', 'try', 'except', 'with', 'as', 'return', 'yield', 'lambda', 'and', 'or', 'not', 'in', 'is', 'True', 'False', 'None'],
      javascript: ['import', 'from', 'export', 'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'try', 'catch', 'return', 'class', 'extends', 'async', 'await', 'true', 'false', 'null', 'undefined'],
      typescript: ['import', 'from', 'export', 'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'try', 'catch', 'return', 'class', 'extends', 'async', 'await', 'true', 'false', 'null', 'undefined', 'interface', 'type'],
      html: ['<!DOCTYPE', 'html', 'head', 'body', 'div', 'span', 'p', 'a', 'img', 'script', 'style', 'link', 'meta'],
      css: ['color', 'background', 'margin', 'padding', 'border', 'width', 'height', 'display', 'position', 'font'],
      java: ['public', 'private', 'protected', 'class', 'interface', 'extends', 'implements', 'import', 'package', 'if', 'else', 'for', 'while', 'try', 'catch', 'return', 'new', 'this', 'super', 'static', 'final', 'void', 'int', 'String', 'boolean', 'true', 'false', 'null']
    };

    let highlightedCode = code;
    const langKeywords = keywords[language.toLowerCase()] || [];

    // Highlight strings (green)
    highlightedCode = highlightedCode.replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span style="color: #22c55e;">$1$2$1</span>');
    
    // Highlight comments (gray)
    highlightedCode = highlightedCode.replace(/(#.*$|\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span style="color: #6b7280;">$1</span>');
    
    // Highlight numbers (orange)
    highlightedCode = highlightedCode.replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #f97316;">$1</span>');
    
    // Highlight keywords (blue)
    langKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlightedCode = highlightedCode.replace(regex, `<span style="color: #3b82f6;">${keyword}</span>`);
    });

    // Highlight function names (yellow)
    highlightedCode = highlightedCode.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span style="color: #eab308;">$1</span>(');

    return highlightedCode;
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-200 text-sm rounded-t-lg">
        <span className="font-mono">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 px-2 py-1 hover:bg-gray-700 rounded transition-colors"
        >
          <Copy className="w-3 h-3" />
          Copy
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
        <code 
          className="font-mono text-sm"
          dangerouslySetInnerHTML={{ 
            __html: highlightCode(code, language) 
          }}
        />
      </pre>
    </div>
  );
}