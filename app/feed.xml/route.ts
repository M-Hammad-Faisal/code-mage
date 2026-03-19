import { getAllBlogPosts } from '@/lib/mdx';
import { SITE } from '@/lib/site.config';

export async function GET() {
  const posts = getAllBlogPosts().slice(0, 20);
  const base = SITE.url;

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${base}/blog/${post.slug}</link>
      <guid isPermaLink="true">${base}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      ${post.tags.map((t) => `<category><![CDATA[${t}]]></category>`).join('\n      ')}
      <author>${SITE.author.email} (${SITE.author.name})</author>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[${SITE.brand}]]></title>
    <link>${base}</link>
    <description><![CDATA[${SITE.seo.description}]]></description>
    <language>en-US</language>
    <managingEditor>${SITE.author.email} (${SITE.author.name})</managingEditor>
    <webMaster>${SITE.author.email} (${SITE.author.name})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${base}/brand/Code Mage Logo-96.png</url>
      <title><![CDATA[${SITE.brand}]]></title>
      <link>${base}</link>
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
