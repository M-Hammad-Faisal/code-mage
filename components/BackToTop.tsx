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
  'h-10 rounded-full shadow-lg flex items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-95 px-3';
const btnNav = 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium';
const btnTop = 'bg-red-600 hover:bg-red-700 text-white w-10 px-0';

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
      {/* Prev — bottom-left */}
      {prev && (
        <Link
          href={prev.href}
          title={prev.title}
          className={`fixed bottom-6 left-6 z-50 ${btnBase} ${btnNav}`}
          aria-label={`Previous: ${prev.title}`}
        >
          <ChevronLeft className="w-4 h-4 flex-shrink-0" />
          <span className="max-w-[120px] truncate">{prev.title}</span>
        </Link>
      )}

      {/* Back to top + Next — stacked on bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Back to top arrow sits above Next */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`${btnBase} ${btnTop}`}
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        {/* Next */}
        {next && (
          <Link
            href={next.href}
            title={next.title}
            className={`${btnBase} ${btnNav}`}
            aria-label={`Next: ${next.title}`}
          >
            <span className="max-w-[120px] truncate">{next.title}</span>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
          </Link>
        )}
      </div>
    </>
  );
}
