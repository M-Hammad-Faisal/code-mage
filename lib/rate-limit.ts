/**
 * Simple in-memory rate limiter for Next.js API routes.
 * Works on a per-Lambda instance basis — adequate for a personal site.
 * For persistent rate limiting across instances, swap the Map for Upstash Redis.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(
    () => {
      const now = Date.now();
      for (const [key, entry] of store) {
        if (entry.resetAt < now) store.delete(key);
      }
    },
    5 * 60 * 1000
  );
}

/**
 * Check if an IP has exceeded the rate limit.
 * @param ip      - The client IP address
 * @param limit   - Maximum allowed requests in the window
 * @param windowMs - Window duration in milliseconds
 * @returns `{ allowed: boolean, remaining: number, resetAt: number }`
 */
export function checkRateLimit(
  ip: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const key = `${ip}:${Math.floor(now / windowMs)}`;

  const entry = store.get(key) ?? { count: 0, resetAt: now + windowMs };
  entry.count += 1;
  store.set(key, entry);

  const remaining = Math.max(0, limit - entry.count);
  return {
    allowed: entry.count <= limit,
    remaining,
    resetAt: entry.resetAt,
  };
}

/** Extract a best-effort client IP from a Next.js request */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}
