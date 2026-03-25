import { ImageResponse } from 'next/og';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { SITE } from '@/lib/site.config';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? 'Code Mage';
  const category = post?.category ?? 'Blog';
  const excerpt = post?.excerpt ?? SITE.seo.description;
  const readTime = post?.readTime ?? 0;

  const categoryAccents: Record<string, string> = {
    'Python Deep Dive': '#3b82f6',
    'Test Automation': '#22c55e',
    'Web Scraping': '#06b6d4',
    'Project Breakdown': '#f97316',
    'AI in QA': '#a855f7',
    Career: '#eab308',
    Uncategorized: '#6b7280',
  };
  const accent = categoryAccents[category] ?? '#ef4444';
  const shortExcerpt = excerpt.length > 120 ? excerpt.slice(0, 120) + '…' : excerpt;
  const fontSize = title.length > 60 ? '38px' : '46px';

  return new ImageResponse(
    // Satori requires ALL multi-child elements to have display:flex
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0a0a0a',
        padding: '60px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Top section: brand + category + title + excerpt */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            ⚡
          </div>
          <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700 }}>Code Mage</span>
        </div>

        {/* Category pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '5px 14px',
            borderRadius: '999px',
            border: `1.5px solid ${accent}`,
            background: `${accent}22`,
            color: accent,
            fontSize: '13px',
            fontWeight: 600,
            marginBottom: '20px',
            width: '200px',
          }}
        >
          {category}
        </div>

        {/* Title */}
        <div
          style={{
            color: '#ffffff',
            fontSize,
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '16px',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Excerpt */}
        <div
          style={{
            color: '#9ca3af',
            fontSize: '18px',
            lineHeight: 1.5,
            maxWidth: '760px',
          }}
        >
          {shortExcerpt}
        </div>
      </div>

      {/* Footer: author + read time */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
            }}
          >
            👤
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600 }}>
              {SITE.author.name}
            </span>
            <span style={{ color: '#6b7280', fontSize: '13px' }}>code-mage.dev</span>
          </div>
        </div>

        {/* Read time badge */}
        {readTime > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#9ca3af',
              fontSize: '14px',
              background: '#1f2937',
              padding: '8px 16px',
              borderRadius: '8px',
            }}
          >
            {readTime} min read
          </div>
        )}
      </div>
    </div>,
    { ...size }
  );
}
