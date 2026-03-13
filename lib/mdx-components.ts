import type { MDXComponents } from 'mdx/types';
import { DownloadCard } from '@/components/DownloadCard';

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
    // Uncomment and customise if you want to style raw markdown elements.
    //
    // a: ({ href, children }) => (
    //   <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
    //     {children}
    //   </a>
    // ),
    //
    // pre: ({ children }) => (
    //   <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm">
    //     {children}
    //   </pre>
    // ),

    // ── Spread any caller overrides last so they win ───────────────────────
    ...overrides,
  };
}
