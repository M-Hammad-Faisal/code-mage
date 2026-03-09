import type { Metadata } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { BlogClient } from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Tutorials, deep dives, and honest writeups on Python, test automation, and full stack dev.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  return <BlogClient posts={posts} categories={categories} />;
}
