# PlexTech Supabase CMS, Security & SEO Setup

1. Open your Supabase Dashboard (`https://supabase.com/dashboard`) and select your project.
2. Go to **SQL Editor** → **New query**.
3. Run the migrations in order:
   - `supabase/migrations/20261126_blog_portfolio_cms.sql`
   - `supabase/migrations/20261126_scheduled_blog_posts.sql`
   - `supabase/migrations/20261127_security_and_seo.sql`
4. Verify:
   - Tables `public.blog_posts`, `public.portfolio_items`, `public.blocked_ips`, `public.security_events`, and `public.site_settings` exist with RLS enabled.
   - Public storage bucket `plextech-media` exists under **Storage → Buckets**.
   - Initial seed blog post (`How to Fix IPTV Buffering & Stream Freezing`) and 2 portfolio items were created.
5. Sign in to `/admin/chat/` with your admin account to manage **Chat Inbox**, **Manage Blog**, **Manage Portfolio**, **SEO & Google Console**, and **Security & Firewall**.
