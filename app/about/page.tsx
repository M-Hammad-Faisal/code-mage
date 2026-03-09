import type { Metadata } from 'next';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Code2,
  ExternalLink,
  Github,
  Heart,
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
    'Muhammad Hammad Faisal — Software Engineer & Test Automation specialist at Arbisoft. Founder of Code Mage. Based in Lahore, Pakistan.',
};

const TECH_STACK = [
  {
    category: 'Test Automation',
    items: ['WebdriverIO', 'Playwright', 'Cypress', 'Selenium', 'Appium', 'Puppeteer', 'PyTest'],
  },
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'Kotlin'] },
  { category: 'Backend & Web', items: ['Django', 'FastAPI', 'React', 'Next.js', 'Node.js'] },
  {
    category: 'Tools & Infra',
    items: ['Supabase', 'Vercel', 'Docker', 'GitHub Actions', 'Cloud Functions', 'Cloud Run'],
  },
];

const TIMELINE = [
  {
    company: 'UET Lahore',
    date: '2020–2024',
    desc: 'Bachelor of Software Engineering.',
    title: 'Student',
  },
  {
    company: 'Ginkgo Retail',
    date: 'Aug 2022 – May 2023',
    desc: 'Built React + Django web apps and a full-stack LMS.',
    title: 'Jr. Software Engineer',
  },
  {
    company: 'Arbisoft',
    date: 'May 2023 – Jun 2024',
    desc: 'WebdriverIO automation frameworks for web and mobile (Android, iOS). Set up Appium + Selenium Grid.',
    title: 'Jr. Software Engineer',
  },
  {
    company: 'Arbisoft',
    date: 'Jun 2024 – Present',
    desc: 'Puppeteer-based scraping pipelines, Playwright password-management tooling, Cloud Functions & Cloud Run deployments.',
    title: 'Software Engineer',
  },
  {
    company: 'Code Mage',
    date: '2024 – Present',
    desc: 'Founded Code Mage — Python tutorials, QA deep dives, project walkthroughs on YouTube and blog.',
    title: 'Founder & Content Creator',
  },
];

const PROJECTS = [
  {
    desc: 'Write messages to your future self, delivered at any date. Next.js + Supabase + Resend.',
    href: 'https://timecapsula.website',
    stack: ['Next.js', 'Supabase', 'Resend', 'Vercel'],
    title: 'TimeCapsula',
  },
  {
    desc: 'Enterprise WebdriverIO framework with TypeScript, parallel execution, Allure reports, CI/CD.',
    href: SITE.socials.github,
    stack: ['WebdriverIO', 'TypeScript', 'Mocha', 'Allure'],
    title: 'WD Automation Framework',
  },
  {
    desc: 'Full Playwright + 2Captcha integration with retry logic, custom exceptions, pytest tests.',
    href: SITE.socials.github,
    stack: ['Python', 'Playwright', 'pytest', '2Captcha'],
    title: 'Captcha Solver Library',
  },
  {
    desc: 'Dynamically generates CI/CD pipeline templates from runtime configs. Built for freelance speed.',
    href: SITE.socials.github,
    stack: ['TypeScript', 'Open Source'],
    title: 'CI/CD Generator',
  },
  {
    desc: 'JSON comparison tool with GitHub-style diff, CLI + web interfaces.',
    href: SITE.socials.github,
    stack: ['JavaScript', 'Node.js', 'HTML/CSS'],
    title: 'JSON Compare Tool',
  },
  {
    desc: 'Privacy-focused AI chat powered by local Ollama models with Material-UI.',
    href: SITE.socials.github,
    stack: ['React', 'Material-UI', 'Ollama'],
    title: 'Ollama Chat App',
  },
];

const WRITINGS = [
  {
    color: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
    label: 'Python & Test Automation',
    sub: 'Deep dives, gotchas, real frameworks',
  },
  {
    color: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
    label: 'Self Improvement',
    sub: 'Discipline, habits, and daily growth',
  },
  {
    color: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
    label: 'Finance & Real Estate',
    sub: 'Islamic-principles-aligned investing',
  },
  {
    color: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800',
    label: 'Communication',
    sub: 'Building the top 1% communicator habit',
  },
  {
    color: 'bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800',
    label: 'Project Breakdowns',
    sub: 'How I built TimeCapsula & others',
  },
  {
    color: 'bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-800',
    label: 'Career & Freelancing',
    sub: 'Upwork, remote work, leveling up',
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
              <p className="text-xs font-mono text-red-500 dark:text-red-400 tracking-widest uppercase mb-3">
                — About Me
              </p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-2 tracking-tight leading-tight">
                Muhammad Hammad{' '}
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Faisal
                </span>
              </h1>

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                <Briefcase className="w-3.5 h-3.5 text-red-400" /> Software Engineer @ Arbisoft
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-5">
                <MapPin className="w-3.5 h-3.5 text-red-400" /> Lahore, Punjab, Pakistan
              </div>

              <p className="text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                I&apos;m a{' '}
                <strong className="text-gray-900 dark:text-white">Test Automation Engineer</strong>{' '}
                specializing in WebdriverIO, Playwright, and Puppeteer frameworks. At{' '}
                <strong className="text-gray-900 dark:text-white">Arbisoft</strong> since 2023 —
                building automation for web, mobile (Android/iOS), and cloud-deployed scraping
                pipelines.
              </p>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Outside work I ship side projects (TimeCapsula being the latest), write on{' '}
                <strong className="text-gray-900 dark:text-white">Code Mage</strong>, and share dev
                content on YouTube. Studied Software Engineering at{' '}
                <strong className="text-gray-900 dark:text-white">UET Lahore</strong>.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  {
                    href: SITE.socials.youtube,
                    icon: Youtube,
                    label: 'YouTube',
                    cls: 'bg-red-600 hover:bg-red-700 text-white',
                  },
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
                    href: SITE.author.portfolio,
                    icon: ExternalLink,
                    label: 'Portfolio',
                    cls: 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300',
                  },
                  {
                    href: SITE.author.resume,
                    icon: BookOpen,
                    label: 'Resume',
                    cls: 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300',
                  },
                  {
                    href: `mailto:${SITE.author.email}`,
                    icon: Mail,
                    label: 'Email',
                    cls: 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-red-300 hover:text-red-600 dark:hover:text-red-400',
                  },
                  {
                    href: SITE.socials.patreon,
                    icon: Heart,
                    label: 'Patreon',
                    cls: 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-orange-300 hover:text-orange-500',
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
                <p className="text-xs font-mono text-red-500 dark:text-red-400 uppercase tracking-wider mb-3">
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
                      <span className="text-xs text-red-500 dark:text-red-400 font-medium">
                        @ {item.company}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-gray-400 dark:text-gray-500 mb-2">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WRITINGS.map((t) => (
              <div key={t.label} className={`rounded-xl border p-4 ${t.color}`}>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {t.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.sub}</p>
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
                Let&apos;s work together
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-md">
                Open to freelance projects, collaborations, or just a good tech conversation. Drop
                me a message anytime.
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
