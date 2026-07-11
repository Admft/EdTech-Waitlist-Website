-- Run this in Supabase → SQL Editor → New query → Run

create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  email text not null unique,
  name text,
  role text not null,
  source text not null default 'hero',
  referral_code text not null,
  referred_by text,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at);

-- Lock down: no public read/write via anon key; API uses the secret key
alter table public.waitlist enable row level security;

-- Optional: allow anyone to insert via the publishable key (not needed if you only use the secret key in /api/waitlist)
-- create policy "Allow public waitlist inserts"
--   on public.waitlist for insert
--   to anon
--   with check (true);
