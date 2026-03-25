import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface TutorialChapter {
  framework: string;
  chapter: string;
  title: string;
  description: string;
  order: number;
  readTime: number;
  content: string;
}

export interface TutorialFramework {
  slug: string;
  title: string;
  description: string;
  forWho: string;
  icon: string;
  color: string;
  chapters: TutorialChapter[];
}

export const FRAMEWORKS: Record<string, Omit<TutorialFramework, 'chapters'>> = {
  prerequisites: {
    slug: 'prerequisites',
    title: 'Prerequisites',
    description:
      'Start here. Node.js, TypeScript, Browser DevTools, and testing fundamentals — everything you need before picking a framework.',
    forWho: 'Complete beginners to test automation — start here before choosing a framework.',
    icon: '📚',
    color:
      'text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20',
  },
  playwright: {
    slug: 'playwright',
    title: 'Playwright',
    description:
      'End-to-end testing for modern web apps. Fast, reliable, works across all browsers.',
    forWho: 'Engineers who want fast, modern, cross-browser E2E testing.',
    icon: '🎭',
    color:
      'text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
  },
  webdriverio: {
    slug: 'webdriverio',
    title: 'WebdriverIO',
    description: 'Enterprise-grade browser and mobile automation. Built on the WebDriver protocol.',
    forWho: 'Teams needing enterprise-grade web and mobile automation.',
    icon: '🤖',
    color:
      'text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20',
  },
  cypress: {
    slug: 'cypress',
    title: 'Cypress',
    description: 'Frontend-focused testing with an exceptional developer experience.',
    forWho: 'Frontend developers who want great DX and fast feedback loops.',
    icon: '🌲',
    color:
      'text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/20',
  },
};

const TUTORIALS_DIR = path.join(process.cwd(), 'content/tutorials');

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getFrameworkChapters(framework: string): TutorialChapter[] {
  const dir = path.join(TUTORIALS_DIR, framework);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .sort();

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data, content } = matter(raw);
    const chapter = file.replace(/^\d+-/, '').replace(/\.(mdx|md)$/, '');

    return {
      framework,
      chapter,
      title: data.title ?? chapter,
      description: data.description ?? '',
      order: data.order ?? 0,
      readTime: estimateReadTime(content),
      content,
    };
  });
}

export function getChapter(framework: string, chapter: string): TutorialChapter | null {
  const dir = path.join(TUTORIALS_DIR, framework);
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
  const match = files.find((f) => f.replace(/^\d+-/, '').replace(/\.(mdx|md)$/, '') === chapter);
  if (!match) return null;

  const raw = fs.readFileSync(path.join(dir, match), 'utf8');
  const { data, content } = matter(raw);

  return {
    framework,
    chapter,
    title: data.title ?? chapter,
    description: data.description ?? '',
    order: data.order ?? 0,
    readTime: estimateReadTime(content),
    content,
  };
}

export function getAllFrameworks(): TutorialFramework[] {
  return Object.values(FRAMEWORKS).map((f) => ({
    ...f,
    chapters: getFrameworkChapters(f.slug),
  }));
}
