import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { SAFE_SLUG, estimateReadTime } from '@/lib/content-utils';

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

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

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

export function getBlogPost(slug: string): BlogPost | null {
  if (!SAFE_SLUG.test(slug)) return null;

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
