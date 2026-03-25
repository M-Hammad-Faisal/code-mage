import type { Metadata } from 'next';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Youtube,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/lib/site.config';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Muhammad Hammad Faisal — Software Engineer at Arbisoft building production scraping pipelines, anti-detection systems, and browser automation tooling.',
};

const TECH_STACK = [
  {
    category: 'Browser Automation',
    items: [
      'Playwright',
      'Patchright',
      'Puppeteer',
      'WebdriverIO',
      'Cypress',
      'Selenium',
      'Appium',
    ],
  },
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java'] },
  { category: 'Backend & Web', items: ['Next.js', 'React', 'Django', 'Node.js', 'FastAPI'] },
  {
    category: 'Infrastructure',
    items: ['Supabase', 'Vercel', 'Docker', 'GitHub Actions', 'Cloud Functions', 'Cloud Run'],
  },
];

const TIMELINE = [
  {
    company: 'Ginkgo Retail',
    date: 'Aug 2022 – May 2023',
    desc: 'Full-stack web apps with React + Django. Built a complete Learning Management System.',
    title: 'Jr. Software Engineer',
  },
  {
    company: 'Arbisoft',
    date: 'May 2023 – Jun 2024',
    desc: 'WebdriverIO E2E test suites for web and mobile (Android/iOS). Built Selenium Grid for parallel distributed testing with Appium.',
    title: 'Jr. Software Engineer',
  },
  {
    company: 'Arbisoft',
    date: 'Jun 2024 – Present',
    desc: 'Production scraping pipelines with Puppeteer/Playwright/Patchright, anti-detection systems, credential management at scale, Cloud Functions & Cloud Run deployments.',
    title: 'Software Engineer',
  },
  {
    company: 'Code Mage',
    date: '2024 – Present',
    desc: 'Test automation tutorials, web scraping deep dives, and career guides for engineers.',
    title: 'Founder & Content Creator',
  },
];

const PROJECTS = [
  {
    desc: 'Technical content platform. 28 tutorial chapters, blog, newsletter.',
    href: 'https://code-mage.dev',
    stack: ['Next.js', 'Supabase', 'MDX', 'Vercel'],
    title: 'Code Mage',
  },
  {
    desc: 'Authored the Best Practices file download page for the official WebdriverIO docs.',
    href: 'https://webdriver.io/docs/best-practices/file-download',
    stack: ['WebdriverIO', 'Open Source', 'Documentation'],
    title: 'WebdriverIO Best Practices',
  },
  {
    desc: 'Full Playwright + 2Captcha integration with retry logic, custom exceptions, pytest tests.',
    href: SITE.socials.github,
    stack: ['Python', 'Playwright', 'pytest', '2Captcha'],
    title: 'Captcha Solver Library',
  },
  {
    desc: 'Enterprise WebdriverIO framework with TypeScript, parallel execution, Allure reports, CI/CD.',
    href: SITE.socials.github,
    stack: ['WebdriverIO', 'TypeScript', 'Mocha', 'Allure'],
    title: 'WD Automation Framework',
  },
  {
    desc: 'Write messages to your future self, delivered at any date. Next.js + Supabase + Resend.',
    href: 'https://timecapsula.website',
    stack: ['Next.js', 'Supabase', 'Resend', 'Vercel'],
    title: 'TimeCapsula',
  },
];

const WRITINGS = [
  {
    color: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
    label: 'Test Automation',
    sub: 'Playwright, WebdriverIO, Cypress — real frameworks, real patterns, real production code.',
  },
  {
    color: 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800',
    label: 'Web Scraping & Anti-Detection',
    sub: 'Bot bypass, CAPTCHA solving, Patchright, and how to not get blocked.',
  },
  {
    color: 'bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800',
    label: 'AI in QA',
    sub: 'How AI tools are reshaping automation — and how to actually use them.',
  },
  {
    color: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800',
    label: 'Career in Engineering',
    sub: 'Job market, freelancing, and why your title matters.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* HERO */}
      <section className="py-20 border-b border-gray-200 dark:border-gray-800">
        <div className="container-max">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Photo */}
            <div className="relative w-36 h-36 md:w-44 md:h-44 flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-br from-red-500 to-orange-400 rounded-2xl blur-sm opacity-40" />
              <Image
                src={SITE.author.avatar}
                alt={SITE.author.name}
                width={176}
                height={176}
                className="relative w-full h-full object-cover object-top rounded-2xl border-2 border-white dark:border-gray-800 shadow-xl"
                priority
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-950" />
            </div>

            {/* Info */}
            <div className="flex-1 max-w-2xl">
              <p className="text-xs font-mono text-red-600 dark:text-red-400 tracking-widest uppercase mb-3">
                — About Me
              </p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-2 tracking-tight leading-tight">
                Muhammad Hammad{' '}
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Faisal
                </span>
              </h1>

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                <Briefcase className="w-3.5 h-3.5 text-red-400" /> Software Engineer (Test
                Automation) @ Arbisoft
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-5">
                <MapPin className="w-3.5 h-3.5 text-red-400" /> Lahore, Punjab, Pakistan
              </div>

              <p className="text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                I&apos;m a{' '}
                <strong className="text-gray-900 dark:text-white">Software Engineer</strong> at{' '}
                <strong className="text-gray-900 dark:text-white">Arbisoft</strong> where I build
                production scraping pipelines, anti-detection systems, and browser automation
                tooling with Playwright, Puppeteer, and Patchright. Before that I built WebdriverIO
                test suites for web and mobile apps, set up Selenium Grid for parallel distributed
                testing, and wrote Cypress architectures.
              </p>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Code Mage</strong> is where I
                write about the stuff I actually do at work — test automation, web scraping, bot
                engineering, and how to not get your scraper blocked. If you&apos;re an engineer who
                automates things (or wants to), you&apos;re in the right place.
              </p>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                I also contribute to open source — I authored the{' '}
                <a
                  href="https://webdriver.io/docs/best-practices/file-download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:underline"
                >
                  Best Practices page on webdriver.io
                </a>{' '}
                and contributed features and fixes to the WebdriverIO repository.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  {
                    href: SITE.socials.github,
                    icon: Github,
                    label: 'GitHub',
                    cls: 'bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 text-white',
                  },
                  {
                    href: SITE.socials.linkedin,
                    icon: Linkedin,
                    label: 'LinkedIn',
                    cls: 'bg-blue-600 hover:bg-blue-700 text-white',
                  },
                  {
                    href: SITE.socials.youtube,
                    icon: Youtube,
                    label: 'YouTube',
                    cls: 'bg-red-600 hover:bg-red-700 text-white',
                  },
                  {
                    href: `mailto:${SITE.author.email}`,
                    icon: Mail,
                    label: 'Email',
                    cls: 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-red-300 hover:text-red-600 dark:hover:text-red-400',
                  },
                  {
                    href: SITE.author.resume,
                    icon: BookOpen,
                    label: 'Resume',
                    cls: 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300',
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shadow-sm ${s.cls}`}
                  >
                    <s.icon className="w-3.5 h-3.5" /> {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="container-max">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
              Tech Stack
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TECH_STACK.map((g) => (
              <div
                key={g.category}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
              >
                <p className="text-xs font-mono text-red-600 dark:text-red-400 uppercase tracking-wider mb-3">
                  {g.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="container-max">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
              Experience
            </h2>
          </div>
          <div className="relative max-w-2xl">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-gray-900 border-2 border-red-500 flex items-center justify-center z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  </div>
                  <div className="pt-1.5">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-sm font-heading font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                        @ {item.company}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-2">
                      {item.date}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="container-max">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
                Projects
              </h2>
            </div>
            <a
              href={`${SITE.socials.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              All repos <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((proj) => (
              <a
                key={proj.title}
                href={proj.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:border-red-300 dark:hover:border-red-700 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-heading font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug">
                    {proj.title}
                  </h3>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500 flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                  {proj.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WRITINGS */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="container-max">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
              What I Write About
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WRITINGS.map((t) => (
              <div key={t.label} className={`rounded-xl border p-4 ${t.color}`}>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {t.label}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-max">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                Want to work together?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-md">
                I&apos;m open to freelance projects, consulting, or just a good conversation about
                automation. Drop me a message anytime.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                📧{' '}
                <a href={`mailto:${SITE.author.email}`} className="text-red-500 hover:underline">
                  {SITE.author.email}
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" /> Get in Touch
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm font-medium transition-all"
              >
                Read the Blog <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
