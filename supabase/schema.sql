-- Run this in Supabase → SQL Editor → New query → Run

create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  email text not null unique,
  name text,
  role text not null,
  competition_interest text,
  location text,
  source text not null default 'hero',
  referral_code text not null,
  referred_by text,
  ip_hash text,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at);
create index if not exists waitlist_ip_hash_idx on public.waitlist (ip_hash);
create index if not exists waitlist_competition_interest_idx
  on public.waitlist (competition_interest);

alter table public.waitlist enable row level security;

-- Rate limiting for API abuse protection
create table if not exists public.api_rate_limits (
  id bigint generated always as identity primary key,
  bucket_key text not null,
  created_at timestamptz not null default now()
);

create index if not exists api_rate_limits_bucket_created_idx
  on public.api_rate_limits (bucket_key, created_at desc);

alter table public.api_rate_limits enable row level security;

-- If waitlist already exists, run these instead of recreating:
-- alter table public.waitlist add column if not exists ip_hash text;
-- alter table public.waitlist add column if not exists competition_interest text;
-- alter table public.waitlist add column if not exists location text;
-- create index if not exists waitlist_competition_interest_idx
--   on public.waitlist (competition_interest);
