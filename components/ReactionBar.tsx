'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const EMOJIS = ['🔥', '💡', '👏', '🤯', '❤️'];

interface Reaction {
  emoji: string;
  count: number;
}

export function ReactionBar({ slug }: { slug: string }) {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [reacted, setReacted] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch(`/api/views/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.reactions) setReactions(d.reactions);
      })
      .catch(() => null);

    const saved = localStorage.getItem(`reactions-${slug}`);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- slug-dependent localStorage init requires effect
    if (saved) setReacted(new Set(JSON.parse(saved)));
  }, [slug]);

  const react = async (emoji: string) => {
    if (reacted.has(emoji)) return;

    const next = new Set(reacted);
    next.add(emoji);
    setReacted(next);
    localStorage.setItem(`reactions-${slug}`, JSON.stringify([...next]));

    setReactions((prev) => {
      const exists = prev.find((r) => r.emoji === emoji);
      if (exists) return prev.map((r) => (r.emoji === emoji ? { ...r, count: r.count + 1 } : r));
      return [...prev, { emoji, count: 1 }];
    });

    await fetch(`/api/views/${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reaction: emoji }),
    });
  };

  const getCount = (emoji: string) => reactions.find((r) => r.emoji === emoji)?.count ?? 0;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">React:</span>
      {EMOJIS.map((emoji) => {
        const count = getCount(emoji);
        const hasReacted = reacted.has(emoji);
        return (
          <motion.button
            key={emoji}
            onClick={() => react(emoji)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs transition-all ${
              hasReacted
                ? 'border-red-400 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:border-red-300'
            }`}
          >
            <span>{emoji}</span>
            <AnimatePresence mode="wait">
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="font-mono"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
