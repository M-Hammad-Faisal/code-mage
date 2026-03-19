import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/mdx';
import { getAllFrameworks } from '@/lib/tutorials';
import { SITE } from '@/lib/site.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/tutorial`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/learn`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const blogPages: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: 'monthly',
    priority: post.featured ? 0.9 : 0.7,
  }));

  const tutorialPages: MetadataRoute.Sitemap = getAllFrameworks().flatMap((fw) => [
    {
      url: `${base}/tutorial/${fw.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...fw.chapters.map((ch) => ({
      url: `${base}/tutorial/${fw.slug}/${ch.chapter}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]);

  return [...staticPages, ...blogPages, ...tutorialPages];
}
