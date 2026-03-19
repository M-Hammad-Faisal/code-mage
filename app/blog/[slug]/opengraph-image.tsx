import { ImageResponse } from 'next/og';
import { getPostBySlug, getAllBlogPosts } from '@/lib/mdx';
import { SITE } from '@/lib/site.config';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? 'Code Mage';
  const category = post?.category ?? 'Blog';
  const excerpt = post?.excerpt ?? SITE.seo.description;
  const readTime = post?.readTime ?? 0;

  // Derive a simple accent colour from the category without Tailwind classes
  const categoryAccents: Record<string, string> = {
    'Python Deep Dive': '#3b82f6',
    'Test Automation': '#22c55e',
    'Project Breakdown': '#f97316',
    'Self Improvement': '#a855f7',
    Finance: '#10b981',
    Communication: '#ec4899',
    Career: '#eab308',
    Uncategorized: '#6b7280',
  };
  const accent = categoryAccents[category] ?? '#ef4444';

  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        background: '#0a0a0a',
        padding: '60px',
        fontFamily: 'sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient blob */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
        }}
      />

      {/* Top bar — brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}
        >
          ⚡
        </div>
        <span
          style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700, letterSpacing: '-0.5px' }}
        >
          Code Mage
        </span>
      </div>

      {/* Category pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '6px 14px',
          borderRadius: '999px',
          border: `1px solid ${accent}55`,
          background: `${accent}18`,
          color: accent,
          fontSize: '13px',
          fontWeight: 600,
          marginBottom: '24px',
          width: 'fit-content',
        }}
      >
        {category}
      </div>

      {/* Title */}
      <div
        style={{
          color: '#ffffff',
          fontSize: title.length > 60 ? '38px' : '46px',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-1px',
          marginBottom: '20px',
          maxWidth: '900px',
        }}
      >
        {title}
      </div>

      {/* Excerpt */}
      {excerpt && (
        <div
          style={{
            color: '#9ca3af',
            fontSize: '18px',
            lineHeight: 1.5,
            maxWidth: '760px',
            marginBottom: '40px',
          }}
        >
          {excerpt.length > 120 ? excerpt.slice(0, 120) + '…' : excerpt}
        </div>
      )}

      {/* Footer — author + read time */}
      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}
          >
            👤
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600 }}>
              {SITE.author.name}
            </span>
            <span style={{ color: '#6b7280', fontSize: '13px' }}>code-mage.vercel.app</span>
          </div>
        </div>
        {readTime > 0 && (
          <div
            style={{
              color: '#6b7280',
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
