/** Shared helpers for the filesystem-backed content loaders (blog, lessons, tutorials). */

/** Route-param/slug allowlist — blocks path-traversal before it reaches `path.join`. */
export const SAFE_SLUG = /^[a-z0-9-]+$/;

export function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
