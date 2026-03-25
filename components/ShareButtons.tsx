'use client';
import { useState } from 'react';
import { Link2, Linkedin, Twitter } from 'lucide-react';

interface Props {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-gray-400 dark:text-gray-500 font-mono uppercase tracking-wider mr-1">
        Share
      </span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-all"
      >
        <Linkedin className="w-3.5 h-3.5" /> LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white text-xs font-medium transition-all"
      >
        <Twitter className="w-3.5 h-3.5" /> X / Twitter
      </a>
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 text-xs font-medium transition-all"
      >
        <Link2 className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  );
}
