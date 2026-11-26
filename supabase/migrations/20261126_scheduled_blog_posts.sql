-- Scheduled Blog Publishing Migration for PlexTech CMS
-- Run this in Supabase SQL Editor after 20261126_blog_portfolio_cms.sql.

-- 1. Add published_at column and backfill existing posts
alter table public.blog_posts
  add column if not exists published_at timestamptz;

update public.blog_posts
set published_at = coalesce(created_at, now())
where published_at is null;

alter table public.blog_posts
  alter column published_at set default now(),
  alter column published_at set not null;

-- 2. Index for scheduled + published queries ordered by published_at desc
create index if not exists blog_posts_published_at_idx
  on public.blog_posts (published, published_at desc);

-- 3. Update public SELECT RLS policy so scheduled future posts remain hidden
--    from anonymous/public visitors until published_at <= now(), while the
--    authorised admin UUID can still view all drafts and scheduled posts.
drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
  on public.blog_posts
  for select
  to anon, authenticated
  using (
    (published = true and published_at <= now())
    or auth.uid() = 'e4530c3c-0a73-4569-84e1-791a9b5b1160'::uuid
  );
