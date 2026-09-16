import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/mdx';
import { getAllFrameworks } from '@/lib/tutorials';
import { SITE } from '@/lib/site.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  // `lastModified` is only set where we have a genuine per-content date
  // (blog posts have real frontmatter dates). Stamping build time on pages
  // with no real "last changed" signal would tell crawlers everything
  // changes on every deploy, which is misleading rather than helpful.
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/tutorial`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const blogPages: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    ...(post.date ? { lastModified: new Date(post.date) } : {}),
    changeFrequency: 'monthly',
    priority: post.featured ? 0.9 : 0.7,
  }));

  const tutorialPages: MetadataRoute.Sitemap = getAllFrameworks().flatMap((fw) => [
    {
      url: `${base}/tutorial/${fw.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...fw.chapters.map((ch) => ({
      url: `${base}/tutorial/${fw.slug}/${ch.chapter}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]);

  return [...staticPages, ...blogPages, ...tutorialPages];
}
