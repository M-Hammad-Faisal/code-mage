// Browser client — use in Client Components only
// NOTE: SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be exposed via NEXT_PUBLIC_*
// if this client is used in client components. Currently all Supabase access
// in this project goes through server-side routes, so these are server-only vars.
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!
  );
}
