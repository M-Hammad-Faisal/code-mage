-- ============================================================
-- Security hardening
--
-- Fixes two issues found by the Supabase security advisor:
--
-- 1. blog_views / blog_reactions had unrestricted public INSERT and
--    UPDATE policies (`with check (true)` / `using (true)`). That
--    means anyone could PATCH the REST API directly and set an
--    arbitrary view/reaction count, bypassing the one-at-a-time
--    increment_view()/increment_reaction() RPCs the app actually
--    uses. Writes should only be possible through those functions.
--
-- 2. increment_view() / increment_reaction() are SECURITY DEFINER
--    with no explicit search_path, so they run with whatever
--    search_path the calling role has — a classic Postgres privilege
--    escalation vector for SECURITY DEFINER functions if a caller
--    can get a malicious object earlier in their search_path.
-- ============================================================

-- 1. Remove direct-write access. SELECT stays public (view/reaction
--    counts are meant to be visible); INSERT/UPDATE now only happen
--    inside the SECURITY DEFINER functions, which bypass RLS by
--    design and are the only supported write path.
drop policy if exists "Anyone can upsert views" on public.blog_views;
drop policy if exists "Anyone can update views" on public.blog_views;
drop policy if exists "Anyone can upsert reactions" on public.blog_reactions;
drop policy if exists "Anyone can update reactions" on public.blog_reactions;

-- 2. Pin search_path on both SECURITY DEFINER functions so they can't
--    be tricked into resolving an object from an attacker-controlled
--    schema earlier in the caller's search_path.
alter function public.increment_view(text) set search_path = public, pg_temp;
alter function public.increment_reaction(text, text) set search_path = public, pg_temp;
