'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      aria-label="Back to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
