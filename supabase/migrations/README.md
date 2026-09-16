# Database migrations

Tracked, sequential migrations for the "Code Mage" Supabase project (`ffdtwndoakysjvihikjz`). Applied via the Supabase MCP's `apply_migration`, which records each one in Supabase's own migration history — check current state with `list_migrations` or `supabase migration list` if using the CLI.

| Migration | What it does |
|---|---|
| `20260916130839_init_schema.sql` | Baseline — reconstructs the schema that was previously applied by hand via the SQL Editor (4 tables, RLS enabled, `increment_view`/`increment_reaction` RPCs). Written idempotently so it's safe to re-run. |
| `20260916130853_harden_rls_and_search_path.sql` | Security hardening: removes direct public INSERT/UPDATE access to `blog_views`/`blog_reactions` (writes now only possible through the two RPCs above), and pins `search_path` on both `SECURITY DEFINER` functions to close a privilege-escalation vector. |
| `20260916140000_shared_rate_limiter.sql` | Adds `rate_limits` table + `check_rate_limit()` RPC — a Postgres-backed, atomic sliding-window rate limiter shared across all serverless instances (replaces the old in-memory-per-instance version in `lib/rate-limit.ts`). |

## Conventions going forward

- Name files `YYYYMMDDHHMMSS_description.sql`, matching what Supabase's migration history assigns when applied.
- Every table gets RLS enabled. If a table needs writes from anonymous users, prefer a `SECURITY DEFINER` function with a pinned `search_path` over a permissive RLS policy — it keeps the write path auditable and narrow instead of "anyone can PATCH any row."
- After applying a migration, run the Supabase security advisor (`get_advisors` with `type: "security"`) and confirm no new warnings before moving on.
- Never apply a migration to the live project without the file existing here first — this folder is the source of truth, not the SQL Editor.
