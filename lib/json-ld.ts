import { SITE } from '@/lib/site.config';

/** JSON-LD helpers. Each returns a plain object meant to be JSON.stringify'd
 * into a `<script type="application/ld+json">` tag. */

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.author.name,
    url: SITE.author.portfolio,
    jobTitle: SITE.author.role,
    image: `${SITE.url}${SITE.author.avatar}`,
    sameAs: [SITE.socials.github, SITE.socials.linkedin, SITE.socials.youtube],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.brand,
    url: SITE.url,
    description: SITE.description,
    author: { '@type': 'Person', name: SITE.author.name },
  };
}

export function blogPostingJsonLd(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}) {
  const url = `${SITE.url}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${url}/opengraph-image`,
    url,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    articleSection: post.category,
    author: {
      '@type': 'Person',
      name: SITE.author.name,
      url: SITE.author.portfolio,
    },
    publisher: {
      '@type': 'Person',
      name: SITE.author.name,
      image: `${SITE.url}${SITE.author.avatar}`,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
