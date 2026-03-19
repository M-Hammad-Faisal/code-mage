'use client';

import { ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NavItem {
  href: string;
  title: string;
}

interface Props {
  prev?: NavItem;
  next?: NavItem;
}

const btnBase =
  'w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95';
const btnDark = 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900';

export function BackToTop({ prev, next }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Prev — bottom left */}
      {prev && (
        <Link
          href={prev.href}
          title={prev.title}
          className={`fixed bottom-6 left-6 z-50 ${btnBase} ${btnDark}`}
          aria-label={`Previous: ${prev.title}`}
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
      )}

      {/* Right column — next + back to top */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-center">
        {next && (
          <Link
            href={next.href}
            title={next.title}
            className={`${btnBase} ${btnDark}`}
            aria-label={`Next: ${next.title}`}
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`${btnBase} bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700`}
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
