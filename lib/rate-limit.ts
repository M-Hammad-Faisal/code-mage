/**
 * Rate limiter for Next.js API routes, backed by Postgres so the
 * counter is shared across every serverless instance — a purely
 * in-memory counter (a plain Map) only holds state per Lambda
 * instance, so under real traffic a client can land on multiple
 * cold-started instances and see a materially higher effective limit
 * than configured. See supabase/migrations/20260916140000_shared_rate_limiter.sql
 * for the atomic sliding-window implementation this calls into.
 */

import { createAnonClient } from '@/lib/supabase/server';

/**
 * Check if a key (typically `${ip}:${route}`) has exceeded the rate
 * limit using a sliding-window counter (weights the previous window's
 * count by how much of it still overlaps the current window), so a
 * client can't double their effective throughput by bursting right at
 * a fixed-window boundary. The check-and-increment happens atomically
 * in a single Postgres statement, so concurrent requests from the same
 * client can't race past the limit.
 *
 * Fails closed: if the database call itself fails (network blip,
 * outage), the request is rejected rather than silently let through —
 * a broken rate limiter should not become "no rate limiting."
 *
 * @param key      - Identifies the caller, e.g. `${ip}:${route}`
 * @param limit    - Maximum allowed requests in the window
 * @param windowMs - Window duration in milliseconds
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const supabase = createAnonClient();

  const { data, error } = await supabase.rpc('check_rate_limit', {
    p_key: key,
    p_window_ms: windowMs,
    p_limit: limit,
  });

  if (error || !data || data.length === 0) {
    console.error('[rate-limit] check_rate_limit failed, failing closed:', error);
    return { allowed: false, remaining: 0, resetAt: Date.now() + windowMs };
  }

  const row = data[0];
  return {
    allowed: row.allowed,
    remaining: row.remaining,
    resetAt: Number(row.reset_at),
  };
}

/**
 * Extract a best-effort client IP from a Next.js request.
 * Prefers headers Vercel's edge sets itself (not attacker-controllable) over
 * raw `x-forwarded-for`, which a client can freely set and which Vercel
 * appends the true client IP to rather than replacing.
 */
export function getClientIp(req: Request): string {
  const vercelIp = req.headers.get('x-vercel-forwarded-for') ?? req.headers.get('x-real-ip');
  if (vercelIp) return vercelIp.split(',')[0].trim();

  // Fallback for non-Vercel environments: the proxy nearest the app appends
  // the real client IP last, so trust the last entry, not the first.
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const parts = forwarded.split(',').map((p) => p.trim());
    return parts[parts.length - 1] || 'unknown';
  }

  return 'unknown';
}
