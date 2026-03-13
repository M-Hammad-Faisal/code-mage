import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  tags: string[];
  featured: boolean;
  readTime: number;
  content: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  content: string;
}

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const LESSONS_DIR = path.join(process.cwd(), 'content/lessons');

// ---------------------------------------------------------------------------
// Blog helpers
// ---------------------------------------------------------------------------

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.(mdx|md)$/, ''));
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getBlogPost(slug: string): BlogPost | null {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    category: data.category ?? 'Uncategorized',
    excerpt: data.excerpt ?? '',
    tags: data.tags ?? [],
    featured: data.featured ?? false,
    readTime: estimateReadTime(content),
    content,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  return getBlogSlugs()
    .map((slug) => getBlogPost(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedBlogPosts(limit?: number): BlogPost[] {
  const posts = getAllBlogPosts().filter((p) => p.featured);
  return limit !== undefined ? posts.slice(0, limit) : posts;
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getAllBlogCategories(): string[] {
  const categories = getAllBlogPosts().map((p) => p.category);
  return [...new Set(categories)].sort();
}

// ---------------------------------------------------------------------------
// Lesson helpers
// ---------------------------------------------------------------------------

export function getAllLessons(): Lesson[] {
  const indexPath = path.join(LESSONS_DIR, 'index.json');
  if (!fs.existsSync(indexPath)) return [];

  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8')) as Array<{
    id?: string;
    slug?: string;
    title: string;
    summary?: string;
    description?: string;
    duration: number;
    level: string;
    tags?: string[];
  }>;

  return index.map((item) => {
    const id = item.id ?? item.slug ?? '';
    const mdPath = path.join(LESSONS_DIR, `${id}.md`);
    const content = fs.existsSync(mdPath) ? fs.readFileSync(mdPath, 'utf8') : '';

    return {
      id,
      title: item.title,
      description: item.summary ?? item.description ?? '',
      duration: item.duration,
      level: (item.level?.toLowerCase() ?? 'beginner') as Lesson['level'],
      tags: item.tags ?? [],
      content,
    };
  });
}

export function getLessonById(id: string): Lesson | null {
  return getAllLessons().find((l) => l.id === id) ?? null;
}

// ---------------------------------------------------------------------------
// Legacy aliases — keeps old names so existing pages don't need to change
// ---------------------------------------------------------------------------

/** @deprecated use getAllBlogPosts */
export const getAllPosts = getAllBlogPosts;

/** @deprecated use getBlogPost */
export const getPostBySlug = getBlogPost;

/** @deprecated use getFeaturedBlogPosts */
export const getFeaturedPosts = getFeaturedBlogPosts;

/** @deprecated use getAllBlogCategories */
export const getAllCategories = getAllBlogCategories;
