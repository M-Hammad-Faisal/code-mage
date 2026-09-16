import type { Metadata } from 'next';
import { getAllBlogPosts, getAllBlogCategories } from '@/lib/mdx';
import { SITE, SITE_OG_IMAGE } from '@/lib/site.config';
import { BlogClient } from './BlogClient';

const description =
  'Tutorials, deep dives, and honest writeups on Python, test automation, and full stack dev.';

export const metadata: Metadata = {
  title: 'Blog',
  description,
  // Category filters (/blog?category=X) render the same server HTML as
  // /blog — canonicalize to the unfiltered URL to avoid diluting this page
  // with crawlable near-duplicate query-param variants.
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    url: `${SITE.url}/blog`,
    title: 'Blog — Code Mage',
    description,
    type: 'website',
    images: SITE_OG_IMAGE,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Code Mage',
    description,
    images: SITE.ogImage,
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getAllBlogCategories();
  return <BlogClient posts={posts} categories={categories} />;
}
