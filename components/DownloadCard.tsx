'use client';

import { Download } from 'lucide-react';

interface DownloadCardProps {
  filename: string;
  href: string;
  description: string;
  tests?: number;
}

export function DownloadCard({ filename, href, description, tests }: DownloadCardProps) {
  return (
    <a
      href={href}
      download
      className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-800 hover:shadow-sm transition-all no-underline not-prose my-6"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400">.ts</span>
        </div>
        <div className="min-w-0">
          <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white truncate">
            {filename}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {description}
            {tests !== undefined && <span className="ml-2 text-red-500">{tests} tests</span>}
          </p>
        </div>
      </div>
      <div className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400 group-hover:gap-2.5 transition-all">
        <Download className="w-4 h-4" />
        Download
      </div>
    </a>
  );
}
