import { Check, Copy } from 'lucide-react';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  prism,
  tomorrow,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useCopyToClipboard, useTheme } from '../hooks/useMDXHooks';

interface CodeBlockProps {
  [key: string]: unknown;
  children: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
  ...props
}) => {
  const isDark = useTheme();
  const { copied, copyToClipboard } = useCopyToClipboard();

  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';

  // Handle inline code
  if (!className) {
    return (
      <code
        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  }

  // Handle code blocks
  const codeString = String(children).replace(/\n$/, '');

  return (
    <div className="relative group my-6">
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
          {language}
        </span>
        <button
          onClick={async () => copyToClipboard(codeString)}
          className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={16} />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span className="text-xs">Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        style={isDark ? tomorrow : prism}
        language={language}
        PreTag="div"
        className="!mt-0 !rounded-t-none"
        customStyle={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          margin: 0,
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};
