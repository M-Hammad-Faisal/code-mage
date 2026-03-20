'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, Mail, Send } from 'lucide-react';
import { useState } from 'react';

interface Props {
  source?: string;
  compact?: boolean;
}

export function NewsletterForm({ source = 'site', compact = false }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message ?? "You're on the list! 🎉");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong. Try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center gap-2 text-green-500 ${compact ? 'text-sm' : 'text-base'}`}
      >
        <CheckCircle className="w-4 h-4 flex-shrink-0" />
        <span>{message}</span>
      </motion.div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={`flex gap-2 ${compact ? 'max-w-xs' : 'max-w-sm'}`}>
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            aria-label="Email address"
            required
            disabled={status === 'loading'}
            className={`w-full pl-9 pr-3 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all disabled:opacity-60 ${compact ? 'py-2' : 'py-2.5'}`}
          />
        </div>
        <motion.button
          type="submit"
          disabled={status === 'loading'}
          aria-label={compact ? 'Subscribe to newsletter' : undefined}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center gap-1.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-all disabled:opacity-60 ${compact ? 'py-2' : 'py-2.5'}`}
        >
          {status === 'loading' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          {!compact && 'Subscribe'}
        </motion.button>
      </form>
      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-red-400"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
