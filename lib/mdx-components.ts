import type { MDXComponents } from 'mdx/types';
import { DownloadCard } from '@/components/DownloadCard';
import { CodeBlock } from '@/components/CodeBlock';

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

    // ── Spread any caller overrides last so they win ───────────────────────
    ...overrides,
  };
}
