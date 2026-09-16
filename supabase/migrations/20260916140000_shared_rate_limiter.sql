-- ============================================================
-- Shared, persistent rate limiter
--
-- The previous rate limiter (lib/rate-limit.ts) kept its sliding-
-- window counters in an in-memory Map. On Vercel that state is
-- per-Lambda-instance, not shared — under real traffic a client can
-- get routed to multiple cold-started instances and see a materially
-- higher effective limit than what's configured (e.g. "5 req/10min"
-- becomes closer to "5 req/10min per instance you happen to land on").
--
-- This moves the same sliding-window algorithm into Postgres, atomic
-- per call via INSERT ... ON CONFLICT, so every request against the
-- same key is serialized through one row regardless of which
-- serverless instance handled it.
--
-- The table has RLS enabled with NO policies — same pattern as
-- blog_views/blog_reactions — so it's only reachable through this
-- SECURITY DEFINER function, never via direct REST calls.
-- ============================================================

create table if not exists public.rate_limits (
  key          text primary key,
  window_index bigint not null,
  curr_count   integer not null default 0,
  prev_count   integer not null default 0,
  updated_at   timestamptz not null default now()
);

alter table public.rate_limits enable row level security;
-- Intentionally no policies: nobody can SELECT/INSERT/UPDATE this
-- table directly, including via the anon/publishable key. Only
-- check_rate_limit() below can touch it (SECURITY DEFINER bypasses RLS).

create or replace function public.check_rate_limit(
  p_key text,
  p_window_ms bigint,
  p_limit integer
)
returns table(allowed boolean, remaining integer, reset_at bigint)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_now bigint := (extract(epoch from clock_timestamp()) * 1000)::bigint;
  v_window_index bigint := v_now / p_window_ms;
  v_curr integer;
  v_prev integer;
  v_elapsed bigint;
  v_prev_weight double precision;
  v_estimated double precision;
begin
  -- Opportunistic cleanup so this table doesn't grow unbounded —
  -- roughly 1 in 100 calls prunes rows untouched for over an hour.
  if random() < 0.01 then
    delete from public.rate_limits where updated_at < now() - interval '1 hour';
  end if;

  insert into public.rate_limits as rl (key, window_index, curr_count, prev_count, updated_at)
  values (p_key, v_window_index, 1, 0, now())
  on conflict (key) do update set
    prev_count = case
      when rl.window_index = v_window_index - 1 then rl.curr_count
      when rl.window_index = v_window_index then rl.prev_count
      else 0
    end,
    curr_count = case
      when rl.window_index = v_window_index then rl.curr_count + 1
      else 1
    end,
    window_index = v_window_index,
    updated_at = now()
  returning rl.curr_count, rl.prev_count into v_curr, v_prev;

  v_elapsed := v_now - v_window_index * p_window_ms;
  v_prev_weight := greatest(0, (p_window_ms - v_elapsed)::double precision / p_window_ms);
  v_estimated := v_curr + v_prev * v_prev_weight;

  return query select
    v_estimated <= p_limit,
    greatest(0, floor(p_limit - v_estimated))::integer,
    (v_window_index + 1) * p_window_ms;
end;
$$;
