// Server client — use in Server Components, API routes, Server Actions
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from './types';

type NextCookieOptions = Parameters<Awaited<ReturnType<typeof cookies>>['set']>[2];

// Standard server client — respects RLS, use for user-scoped operations
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options as NextCookieOptions);
            });
          } catch {
            // Called from a Server Component — cookie mutation safe to ignore
          }
        },
      },
    }
  );
}

// Service client — bypasses RLS via secret key. Only use where a route
// genuinely needs to act outside RLS (e.g. admin operations); every
// public-facing route in this project uses createAnonClient() instead
// so a leaked key or a routing bug can't grant more than RLS already
// allows anonymous users to do.
export function createServiceClient() {
  return createSupabaseClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// Publishable-key client — respects RLS as the `anon` role. Use in
// API routes where the table's RLS policy already allows the
// operation (public INSERT on contact_messages/newsletter_subscribers,
// public SELECT + the increment_view/increment_reaction RPCs on
// blog_views/blog_reactions — see supabase/migrations/).
export function createAnonClient() {
  return createSupabaseClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
