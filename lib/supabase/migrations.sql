-- ============================================================
-- Code Mage — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
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

-- Anyone can insert (subscribe), nobody can read (privacy)
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

-- Anyone can submit a message
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

-- Public read
create policy "Anyone can view counts"
  on public.blog_views for select
  using (true);

-- Public upsert (via function below — no direct write)
create policy "Anyone can upsert views"
  on public.blog_views for insert
  with check (true);

create policy "Anyone can update views"
  on public.blog_views for update
  using (true);

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

create policy "Anyone can view reactions"
  on public.blog_reactions for select
  using (true);

create policy "Anyone can upsert reactions"
  on public.blog_reactions for insert
  with check (true);

create policy "Anyone can update reactions"
  on public.blog_reactions for update
  using (true);

-- ── Increment view helper function ──────────────────────────
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

-- ── Increment reaction helper ────────────────────────────────
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
