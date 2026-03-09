'use client';

import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Youtube,
} from 'lucide-react';
import { useState } from 'react';
import { SITE } from '@/lib/site.config';

const CONTACTS = [
  {
    href: `mailto:${SITE.author.email}`,
    icon: Mail,
    label: 'Email',
    sub: 'Fastest way to reach me',
    value: SITE.author.email,
  },
  {
    href: SITE.socials.linkedin,
    icon: Linkedin,
    label: 'LinkedIn',
    sub: 'Connect professionally',
    value: 'linkedin.com/in/m-hammad-faisal',
  },
  {
    href: SITE.socials.github,
    icon: Github,
    label: 'GitHub',
    sub: 'See my repos',
    value: 'github.com/M-Hammad-Faisal',
  },
  {
    href: SITE.socials.youtube,
    icon: Youtube,
    label: 'YouTube',
    sub: 'Watch my tutorials',
    value: '@code_your_magic',
  },
  {
    href: `tel:${SITE.author.phone}`,
    icon: Phone,
    label: 'Phone',
    sub: 'WhatsApp preferred',
    value: SITE.author.phone,
  },
  {
    href: '',
    icon: MapPin,
    label: 'Location',
    sub: 'Pakistan Standard Time (PKT +5)',
    value: SITE.author.location,
  },
];

export function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMsg(data.message);
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setMsg(data.error ?? 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMsg('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-red-500 dark:text-red-400 tracking-widest uppercase mb-3">
            — Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Let&apos;s Talk
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
            Have a project, want to collaborate, or just want to chat about test automation?
            I&apos;m always open to interesting conversations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact tiles */}
          <div className="lg:col-span-2 space-y-3">
            {CONTACTS.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-800 hover:shadow-sm transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950/40 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                        {c.label}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{c.value}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{c.sub}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950/40 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                        {c.label}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{c.value}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{c.sub}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-7">
              <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-red-500" /> Send a Message
              </h2>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-5xl mb-4">🚀</div>
                  <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    Message sent!
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{msg}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        name: 'name',
                        placeholder: 'Your name',
                        label: 'Name *',
                        type: 'text',
                        required: true,
                      },
                      {
                        name: 'email',
                        placeholder: 'your@email.com',
                        label: 'Email *',
                        type: 'email',
                        required: true,
                      },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          name={f.name}
                          required={f.required}
                          value={form[f.name as keyof typeof form]}
                          onChange={handleChange}
                          placeholder={f.placeholder}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me what you have in mind..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg px-3 py-2">
                      {msg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition-all shadow-sm"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
