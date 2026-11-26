# PlexTech Supabase CMS Setup

1. Open your Supabase Dashboard (`https://supabase.com/dashboard`) and select your project.
2. Go to **SQL Editor** → **New query**.
3. Paste and run `supabase/migrations/20261126_blog_portfolio_cms.sql`, followed by `supabase/migrations/20261126_scheduled_blog_posts.sql`.
4. Verify:
   - Tables `public.blog_posts` and `public.portfolio_items` exist with RLS enabled.
   - Public storage bucket `plextech-media` exists under **Storage → Buckets**.
   - Initial seed blog post (`How to Fix IPTV Buffering & Stream Freezing`) and 2 portfolio items were created.
5. Sign in to `/admin/chat/` with your admin account to manage **Chat Inbox**, **Manage Blog**, and **Manage Portfolio** tabs.
