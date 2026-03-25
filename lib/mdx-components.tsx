import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';
import { DownloadCard } from '@/components/DownloadCard';
import { CodeBlock } from '@/components/CodeBlock';
import { slugify } from '@/lib/extract-headings';

function HeadingWithId({
  level,
  children,
  ...props
}: ComponentPropsWithoutRef<'h2'> & { level: 2 | 3 }) {
  const Tag = `h${level}` as 'h2' | 'h3';
  const text = typeof children === 'string' ? children : '';
  const id = text ? slugify(text) : undefined;
  return (
    <Tag id={id} {...props}>
      {children}
    </Tag>
  );
}

/**
 * getMDXComponents returns the component map passed to <MDXRemote components={...} />.
 *
 * Any React component added here is automatically available in every .mdx file
 * without needing an import statement in the MDX itself.
 *
 * Usage in MDX:
 *   <DownloadCard
 *     filename="login.spec.ts"
 *     href="/downloads/playwright/login.spec.ts"
 *     description="Login flow — happy path + error states"
 *     tests={9}
 *   />
 */
export function getMDXComponents(overrides?: MDXComponents): MDXComponents {
  return {
    // ── Custom components ──────────────────────────────────────────────────
    DownloadCard,

    // ── HTML element overrides ─────────────────────────────────────────────
    pre: CodeBlock,
    h2: (props) => <HeadingWithId level={2} {...props} />,
    h3: (props) => <HeadingWithId level={3} {...props} />,

    // ── Spread any caller overrides last so they win ───────────────────────
    ...overrides,
  };
}
