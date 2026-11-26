-- PlexTech Blog & Portfolio CMS Schema, RLS Policies, Storage Bucket & Seed Data
-- Run this script in your Supabase project's SQL Editor.

create extension if not exists pgcrypto;

-- 1. Blog Posts Table
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  category text not null check (category in ('IPTV & OTT', 'Plex & Unraid', 'NAS & DevOps')),
  cover_image_url text,
  meta_title text not null default '',
  meta_description text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_created_idx
  on public.blog_posts (published, created_at desc);

create or replace function public.set_blog_posts_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_blog_posts_updated_at on public.blog_posts;
create trigger trg_blog_posts_updated_at
  before update on public.blog_posts
  for each row
  execute function public.set_blog_posts_updated_at();

-- 2. Portfolio Items Table
create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('IPTV & OTT', 'Plex & Unraid', 'NAS & DevOps')),
  client_type text not null,
  summary text not null,
  tech_stack text[] not null default '{}',
  outcome_metric text not null,
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists portfolio_items_published_created_idx
  on public.portfolio_items (published, created_at desc);

-- 3. Row Level Security (RLS)
-- Matches the authorised admin UUID configured in src/components/AdminChatInbox.astro.
-- Anonymous chat visitors (signInAnonymously) are NOT granted write/draft access.
alter table public.blog_posts enable row level security;
alter table public.portfolio_items enable row level security;

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
  on public.blog_posts
  for select
  to anon, authenticated
  using (
    published = true
    or auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid
  );

drop policy if exists "Admin can insert blog posts" on public.blog_posts;
create policy "Admin can insert blog posts"
  on public.blog_posts
  for insert
  to authenticated
  with check (auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid);

drop policy if exists "Admin can update blog posts" on public.blog_posts;
create policy "Admin can update blog posts"
  on public.blog_posts
  for update
  to authenticated
  using (auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid)
  with check (auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid);

drop policy if exists "Admin can delete blog posts" on public.blog_posts;
create policy "Admin can delete blog posts"
  on public.blog_posts
  for delete
  to authenticated
  using (auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid);

drop policy if exists "Public can read published portfolio items" on public.portfolio_items;
create policy "Public can read published portfolio items"
  on public.portfolio_items
  for select
  to anon, authenticated
  using (
    published = true
    or auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid
  );

drop policy if exists "Admin can insert portfolio items" on public.portfolio_items;
create policy "Admin can insert portfolio items"
  on public.portfolio_items
  for insert
  to authenticated
  with check (auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid);

drop policy if exists "Admin can update portfolio items" on public.portfolio_items;
create policy "Admin can update portfolio items"
  on public.portfolio_items
  for update
  to authenticated
  using (auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid)
  with check (auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid);

drop policy if exists "Admin can delete portfolio items" on public.portfolio_items;
create policy "Admin can delete portfolio items"
  on public.portfolio_items
  for delete
  to authenticated
  using (auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid);

-- 4. Public Storage Bucket: plextech-media
insert into storage.buckets (id, name, public)
values ('plextech-media', 'plextech-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read access for plextech-media" on storage.objects;
create policy "Public read access for plextech-media"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'plextech-media');

drop policy if exists "Admin upload access for plextech-media" on storage.objects;
create policy "Admin upload access for plextech-media"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'plextech-media'
    and auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid
  );

drop policy if exists "Admin update access for plextech-media" on storage.objects;
create policy "Admin update access for plextech-media"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'plextech-media'
    and auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid
  );

drop policy if exists "Admin delete access for plextech-media" on storage.objects;
create policy "Admin delete access for plextech-media"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'plextech-media'
    and auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid
  );

-- 5. Initial Seed Data (only inserted when tables are empty)
insert into public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  cover_image_url,
  meta_title,
  meta_description,
  published
)
select
  'How to Fix IPTV Buffering & Stream Freezing',
  'how-to-fix-iptv-buffering-and-stream-freezing',
  'A practical engineering checklist to eliminate peak-hour HLS/MPEG-TS buffering using FFmpeg ABR ladders, Nginx micro-caching, CDN edge rules, and Linux TCP BBR.',
  E'## Why Peak-Hour IPTV Buffering Happens\n\nMost evening stream stalls trace back to one of three bottlenecks: **origin CPU/GPU saturation**, **TCP packet loss on congested ISP routes**, or **missing CDN edge caching** for HLS segments.\n\n### 1. Tune Your FFmpeg ABR Ladder & GOP Alignment\n\nKeep keyframe intervals consistent across every adaptive bitrate rendition so players switch smoothly without stalls:\n\n```bash\nffmpeg -i srt://ingest.example:9000 \\\n  -c:v h264_nvenc -preset p4 -g 50 -keyint_min 50 -sc_threshold 0 \\\n  -b:v:0 4500k -s:v:0 1920x1080 \\\n  -b:v:1 2200k -s:v:1 1280x720 \\\n  -f hls -hls_time 4 -hls_list_size 6 -hls_flags delete_segments index.m3u8\n```\n\n- Align `-g` (GOP) to `2x` framerate (e.g. `50` for 25fps, `60` for 30fps).\n- Offload transcoding from CPU to **Intel QuickSync** or **NVIDIA NVENC** workers.\n\n### 2. Enable Linux TCP BBR Congestion Control\n\nTraditional CUBIC drops throughput aggressively under minor jitter. Enabling **TCP BBR** improves long-haul delivery stability:\n\n```bash\nsysctl -w net.core.default_qdisc=fq\nsysctl -w net.ipv4.tcp_congestion_control=bbr\n```\n\n### 3. Add Nginx Micro-Caching & CDN Origin Shielding\n\nCache `.ts` / `.m4s` media segments briefly at the edge while keeping `.m3u8` playlists low-TTL (`1s–2s`) so viewers do not hammer your origin encoder.\n\n> Tip: Pair Prometheus + Grafana + Alertmanager with Telegram alerts to catch SRT ingest jitter before viewers notice buffering.',
  'IPTV & OTT',
  null,
  'How to Fix IPTV Buffering & Stream Freezing | PlexTech',
  'Eliminate peak-hour IPTV buffering and stream freezing with FFmpeg ABR GOP alignment, TCP BBR congestion control, and Nginx/CDN edge caching.',
  true
where not exists (select 1 from public.blog_posts);

insert into public.portfolio_items (
  title,
  category,
  client_type,
  summary,
  tech_stack,
  outcome_metric,
  image_url,
  published
)
select * from (
  values
    (
      'Peak-Hour HLS Origin & CDN Edge Overhaul',
      'IPTV & OTT',
      'Licensed Regional OTT Broadcaster',
      'Rebuilt multi-worker FFmpeg NVENC ABR pipelines, aligned GOP segments, added Nginx origin micro-caching behind Cloudflare edge rules, and enabled Linux TCP BBR across edge relays.',
      array['FFmpeg ABR', 'NVIDIA NVENC', 'Nginx Cache', 'Cloudflare CDN', 'TCP BBR'],
      '99.95% Peak Uptime',
      null,
      true
    ),
    (
      '40TB Synology to TrueNAS Scale Migration & Plex CGNAT Fix',
      'Plex & Unraid',
      'Private Media Server & SMB Storage',
      'Executed a zero-data-loss 40TB migration to ZFS RAIDZ2 with unified Docker UID/GID permissions, Intel QuickSync 4K HDR tone mapping, and a WireGuard VPS reverse proxy bypassing ISP CGNAT.',
      array['TrueNAS Scale', 'ZFS', 'Plex 4K QSV', 'WireGuard', 'VPS Reverse Proxy'],
      '6x 4K Streams / 0 Loss',
      null,
      true
    )
) as seed_data(title, category, client_type, summary, tech_stack, outcome_metric, image_url, published)
where not exists (select 1 from public.portfolio_items);
