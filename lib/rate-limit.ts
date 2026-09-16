/**
 * Simple in-memory rate limiter for Next.js API routes.
 * Works on a per-Lambda instance basis — adequate for a personal site.
 * For persistent rate limiting across instances, swap the Map for Upstash Redis.
 */

interface RateLimitEntry {
  windowIndex: number;
  currCount: number;
  prevCount: number;
  lastSeen: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up entries untouched for 10 minutes to prevent memory leaks
const STALE_MS = 10 * 60 * 1000;
if (typeof setInterval !== 'undefined') {
  setInterval(
    () => {
      const now = Date.now();
      for (const [key, entry] of store) {
        if (now - entry.lastSeen > STALE_MS) store.delete(key);
      }
    },
    5 * 60 * 1000
  );
}

/**
 * Check if an IP has exceeded the rate limit using a sliding-window counter
 * (weights the previous window's count by how much of it still overlaps the
 * current window), so a client can't double their effective throughput by
 * bursting right at a fixed-window boundary.
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
  const windowIndex = Math.floor(now / windowMs);
  const key = `${ip}:${windowMs}`;

  const entry = store.get(key);
  let currCount: number;
  let prevCount: number;

  if (!entry || entry.windowIndex !== windowIndex) {
    prevCount = entry?.windowIndex === windowIndex - 1 ? entry.currCount : 0;
    currCount = 0;
  } else {
    prevCount = entry.prevCount;
    currCount = entry.currCount;
  }

  currCount += 1;
  store.set(key, { windowIndex, currCount, prevCount, lastSeen: now });

  const elapsedInWindow = now - windowIndex * windowMs;
  const prevWeight = Math.max(0, (windowMs - elapsedInWindow) / windowMs);
  const estimated = currCount + prevCount * prevWeight;

  return {
    allowed: estimated <= limit,
    remaining: Math.max(0, Math.floor(limit - estimated)),
    resetAt: (windowIndex + 1) * windowMs,
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
