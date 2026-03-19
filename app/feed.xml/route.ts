import { getAllBlogPosts } from '@/lib/mdx';
import { SITE } from '@/lib/site.config';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = getAllBlogPosts().slice(0, 20);
  const base = SITE.url;

  const safeBase = escapeXml(base);
  const safeEmail = escapeXml(SITE.author.email);
  const safeName = escapeXml(SITE.author.name);

  const items = posts
    .map((post) => {
      const safeSlug = escapeXml(post.slug);
      const url = `${safeBase}/blog/${safeSlug}`;
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${escapeXml(new Date(post.date).toUTCString())}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      ${post.tags.map((t) => `<category><![CDATA[${t}]]></category>`).join('\n      ')}
      <author>${safeEmail} (${safeName})</author>
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[${SITE.brand}]]></title>
    <link>${safeBase}</link>
    <description><![CDATA[${SITE.seo.description}]]></description>
    <language>en-US</language>
    <managingEditor>${safeEmail} (${safeName})</managingEditor>
    <webMaster>${safeEmail} (${safeName})</webMaster>
    <lastBuildDate>${escapeXml(new Date().toUTCString())}</lastBuildDate>
    <atom:link href="${safeBase}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${safeBase}/brand/Code%20Mage%20Logo-96.png</url>
      <title><![CDATA[${SITE.brand}]]></title>
      <link>${safeBase}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
