import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: number;
  featured?: boolean;
  content: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const LESSONS_DIR = path.join(process.cwd(), 'content/lessons');

function calcReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ── Blog Posts ────────────────────────────────────────────────

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  return files
    .map((file) => {
      const slug = file.replace(/\.(mdx|md)$/, '');
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? new Date().toISOString().split('T')[0],
        excerpt: data.excerpt ?? '',
        category: data.category ?? 'Uncategorized',
        tags: data.tags ?? [],
        readTime: calcReadTime(content),
        featured: data.featured ?? false,
        content,
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const extensions = ['.mdx', '.md'];
  for (const ext of extensions) {
    const filePath = path.join(BLOG_DIR, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        category: data.category ?? 'Uncategorized',
        tags: data.tags ?? [],
        readTime: calcReadTime(content),
        featured: data.featured ?? false,
        content,
      };
    }
  }
  return null;
}

export function getFeaturedPosts(limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getAllCategories(): string[] {
  const cats = getAllPosts().map((p) => p.category);
  return [...new Set(cats)];
}

// ── Lessons ───────────────────────────────────────────────────

export function getAllLessons(): Lesson[] {
  if (!fs.existsSync(LESSONS_DIR)) return [];

  const indexPath = path.join(LESSONS_DIR, 'index.json');
  if (fs.existsSync(indexPath)) {
    try {
      return JSON.parse(fs.readFileSync(indexPath, 'utf8')) as Lesson[];
    } catch {
      // fall through to file scan
    }
  }

  const files = fs.readdirSync(LESSONS_DIR).filter((f) => f.endsWith('.md'));

  return files.map((file) => {
    const id = file.replace('.md', '');
    const raw = fs.readFileSync(path.join(LESSONS_DIR, file), 'utf8');
    const { data, content } = matter(raw);

    return {
      id,
      title: data.title ?? id,
      description: data.description ?? '',
      duration: data.duration ?? '5 min',
      level: data.level ?? 'beginner',
      tags: data.tags ?? [],
      content,
    } as Lesson;
  });
}

export function getLessonById(id: string): Lesson | null {
  const filePath = path.join(LESSONS_DIR, `${id}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    id,
    title: data.title ?? id,
    description: data.description ?? '',
    duration: data.duration ?? '5 min',
    level: data.level ?? 'beginner',
    tags: data.tags ?? [],
    content,
  };
}
