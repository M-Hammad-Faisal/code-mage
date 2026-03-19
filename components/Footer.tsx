import { Github, Heart, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';
import { NAV_LINKS, SITE } from '@/lib/site.config';
import { NewsletterForm } from './NewsletterForm';

const SOCIALS = [
  {
    href: SITE.socials.youtube,
    icon: Youtube,
    label: 'YouTube',
    color: 'hover:bg-red-600 hover:border-red-600',
  },
  {
    href: SITE.socials.github,
    icon: Github,
    label: 'GitHub',
    color: 'hover:bg-gray-700 hover:border-gray-700',
  },
  {
    href: SITE.socials.linkedin,
    icon: Linkedin,
    label: 'LinkedIn',
    color: 'hover:bg-blue-600 hover:border-blue-600',
  },
  {
    href: SITE.socials.patreon,
    icon: Heart,
    label: 'Patreon',
    color: 'hover:bg-orange-500 hover:border-orange-500',
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-950 dark:bg-black border-t border-gray-800 dark:border-gray-900">
      <div className="container-max py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white text-sm font-bold">⚡</span>
              </div>
              <span className="font-heading font-bold text-white text-lg">{SITE.brand}</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              {SITE.description}
            </p>

            {/* Newsletter */}
            <NewsletterForm source="footer" compact />

            {/* Socials */}
            <div className="flex items-center gap-2 mt-5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 ${s.color}`}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
              Contact
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>
                <a
                  href={`mailto:${SITE.author.email}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE.author.email}
                </a>
              </p>
              <p>{SITE.author.location}</p>
              <p className="pt-2">
                <a
                  href={SITE.author.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Portfolio →
                </a>
              </p>
              <p>
                <a
                  href={SITE.author.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Resume →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 dark:border-gray-900">
        <div className="container-max py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} {SITE.author.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Made with <span className="text-red-400">❤</span> in Lahore, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
