import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

/**
 * Rate-limits a request by client IP + route. Returns a 429 response to
 * short-circuit with, or null when the request is within limits.
 *
 * The key includes the route (not just the IP) so two endpoints that
 * happen to use the same window duration — e.g. contact and newsletter
 * both at 10 minutes — don't share one counter and rate-limit each
 * other's traffic.
 */
export async function rateLimitGuard(req: NextRequest, limit: number, windowMs: number) {
  const ip = getClientIp(req);
  const key = `${ip}:${req.nextUrl.pathname}`;
  const { allowed } = await checkRateLimit(key, limit, windowMs);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes and try again.' },
      { status: 429 }
    );
  }
  return null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && EMAIL_RE.test(email);
}
