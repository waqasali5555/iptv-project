-- PlexTech Admin Security, IP Blocklist, Audit Events & SEO Settings Migration
-- Run in Supabase SQL Editor after 20261126_scheduled_blog_posts.sql.

-- 1. Blocked IPs / CIDRs Table
create table if not exists public.blocked_ips (
  id uuid primary key default gen_random_uuid(),
  ip_address text not null unique,
  reason text not null default 'Suspicious activity',
  threat_level text not null default 'high' check (threat_level in ('low', 'medium', 'high')),
  active boolean not null default true,
  hit_count integer not null default 0,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists blocked_ips_active_idx
  on public.blocked_ips (active, ip_address);

-- 2. Security Events / Intrusion Log Table
create table if not exists public.security_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (
    event_type in (
      'failed_login',
      'brute_force_lockout',
      'unauthorized_account',
      'suspicious_probe',
      'ip_blocked'
    )
  ),
  ip_address text not null default 'unknown',
  email_attempted text not null default '',
  user_agent text not null default '',
  path text not null default '/admin/chat/',
  details text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists security_events_created_idx
  on public.security_events (created_at desc);

-- 3. Admin Site Settings (Deploy Hook URL, GSC Property, Lockout Threshold)
create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

-- 4. Row Level Security (Strictly Admin-Only Read/Write)
alter table public.blocked_ips enable row level security;
alter table public.security_events enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Admin manages blocked_ips" on public.blocked_ips;
create policy "Admin manages blocked_ips"
  on public.blocked_ips
  for all
  to authenticated
  using (auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid)
  with check (auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid);

drop policy if exists "Admin reads and deletes security_events" on public.security_events;
create policy "Admin reads and deletes security_events"
  on public.security_events
  for all
  to authenticated
  using (auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid)
  with check (auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid);

drop policy if exists "Admin manages site_settings" on public.site_settings;
create policy "Admin manages site_settings"
  on public.site_settings
  for all
  to authenticated
  using (auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid)
  with check (auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid);

-- 5. Safe RPCs for Logging Intrusions & Checking IP Blocklist Without Exposing Tables
create or replace function public.log_security_event(
  p_event_type text,
  p_ip_address text default 'unknown',
  p_email_attempted text default '',
  p_user_agent text default '',
  p_path text default '/admin/chat/',
  p_details text default ''
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_event_type not in (
    'failed_login',
    'brute_force_lockout',
    'unauthorized_account',
    'suspicious_probe',
    'ip_blocked'
  ) then
    raise exception 'Invalid security event type';
  end if;

  insert into public.security_events (
    event_type,
    ip_address,
    email_attempted,
    user_agent,
    path,
    details
  )
  values (
    p_event_type,
    left(coalesce(nullif(trim(p_ip_address), ''), 'unknown'), 100),
    left(coalesce(p_email_attempted, ''), 160),
    left(coalesce(p_user_agent, ''), 300),
    left(coalesce(p_path, '/admin/chat/'), 200),
    left(coalesce(p_details, ''), 500)
  );
end;
$$;

grant execute on function public.log_security_event(text, text, text, text, text, text) to anon, authenticated;

create or replace function public.is_ip_blocked(p_ip_address text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  matched_id uuid;
begin
  if p_ip_address is null or trim(p_ip_address) = '' or trim(p_ip_address) = 'unknown' then
    return false;
  end if;

  select id
  into matched_id
  from public.blocked_ips
  where active = true
    and ip_address = trim(p_ip_address)
    and (expires_at is null or expires_at > now())
  limit 1;

  if matched_id is not null then
    update public.blocked_ips
    set hit_count = hit_count + 1
    where id = matched_id;
    return true;
  end if;

  return false;
end;
$$;

grant execute on function public.is_ip_blocked(text) to anon, authenticated;
