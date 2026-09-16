-- ============================================================
-- Code Mage — baseline schema
--
-- This reconstructs the schema that was previously applied by hand
-- via the Supabase SQL Editor (see git history of
-- lib/supabase/migrations.sql). Written idempotently so it can run
-- safely against a database that already has this schema, which
-- brings Supabase's tracked migration history in line with reality.
-- ============================================================

create extension if not exists "uuid-ossp";

-- ── newsletter_subscribers ──────────────────────────────────
create table if not exists public.newsletter_subscribers (
  id          uuid primary key default uuid_generate_v4(),
  email       text not null unique,
  confirmed   boolean not null default false,
  source      text,
  created_at  timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "Anyone can subscribe" on public.newsletter_subscribers;
create policy "Anyone can subscribe"
  on public.newsletter_subscribers for insert
  with check (true);

-- ── contact_messages ────────────────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can submit contact" on public.contact_messages;
create policy "Anyone can submit contact"
  on public.contact_messages for insert
  with check (true);

-- ── blog_views ──────────────────────────────────────────────
create table if not exists public.blog_views (
  id          uuid primary key default uuid_generate_v4(),
  slug        text not null unique,
  views       bigint not null default 0,
  updated_at  timestamptz not null default now()
);

alter table public.blog_views enable row level security;

drop policy if exists "Anyone can view counts" on public.blog_views;
create policy "Anyone can view counts"
  on public.blog_views for select
  using (true);

-- NOTE: the original hand-applied schema also granted public INSERT/UPDATE
-- on this table directly (bypassing the RPC below). That's removed in
-- 20260916130853_harden_rls_and_search_path.sql — writes should only
-- happen through increment_view(), not raw REST calls.

-- ── blog_reactions ───────────────────────────────────────────
create table if not exists public.blog_reactions (
  id          uuid primary key default uuid_generate_v4(),
  slug        text not null,
  emoji       text not null,
  count       bigint not null default 0,
  updated_at  timestamptz not null default now(),
  unique(slug, emoji)
);

alter table public.blog_reactions enable row level security;

drop policy if exists "Anyone can view reactions" on public.blog_reactions;
create policy "Anyone can view reactions"
  on public.blog_reactions for select
  using (true);

-- Same note as blog_views above — direct public INSERT/UPDATE existed
-- historically and is removed by the hardening migration.

-- ── Increment helper functions ──────────────────────────────
-- SECURITY DEFINER so they can upsert blog_views/blog_reactions on
-- behalf of anonymous callers without those tables needing a public
-- write policy (see 20260916130853_harden_rls_and_search_path.sql,
-- which is what actually restricts writes to these functions only).
create or replace function public.increment_view(post_slug text)
returns void
language plpgsql
security definer
as $$
begin
  insert into public.blog_views (slug, views, updated_at)
  values (post_slug, 1, now())
  on conflict (slug)
  do update set
    views = blog_views.views + 1,
    updated_at = now();
end;
$$;

create or replace function public.increment_reaction(post_slug text, reaction_emoji text)
returns void
language plpgsql
security definer
as $$
begin
  insert into public.blog_reactions (slug, emoji, count, updated_at)
  values (post_slug, reaction_emoji, 1, now())
  on conflict (slug, emoji)
  do update set
    count = blog_reactions.count + 1,
    updated_at = now();
end;
$$;
