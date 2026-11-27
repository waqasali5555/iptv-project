import { supabase } from './supabase';

export type CmsCategory = 'IPTV & OTT' | 'Plex & Unraid' | 'NAS & DevOps';

export const CMS_CATEGORIES: readonly CmsCategory[] = [
  'IPTV & OTT',
  'Plex & Unraid',
  'NAS & DevOps',
] as const;

export const MEDIA_BUCKET = 'plextech-media';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: CmsCategory;
  cover_image_url: string | null;
  meta_title: string;
  meta_description: string;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: CmsCategory;
  client_type: string;
  summary: string;
  tech_stack: string[];
  outcome_metric: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
}

export const SEED_BLOG_POSTS: BlogPost[] = [
  {
    id: 'seed-iptv-buffering-guide',
    title: 'How to Fix IPTV Buffering & Stream Freezing',
    slug: 'how-to-fix-iptv-buffering-and-stream-freezing',
    excerpt:
      'A practical engineering checklist to eliminate peak-hour HLS/MPEG-TS buffering using FFmpeg ABR ladders, Nginx micro-caching, CDN edge rules, and Linux TCP BBR.',
    content: [
      '## Why Peak-Hour IPTV Buffering Happens',
      '',
      'Most evening stream stalls trace back to one of three bottlenecks: **origin CPU/GPU saturation**, **TCP packet loss on congested ISP routes**, or **missing CDN edge caching** for HLS segments.',
      '',
      '### 1. Tune Your FFmpeg ABR Ladder & GOP Alignment',
      '',
      'Keep keyframe intervals consistent across every adaptive bitrate rendition so players switch smoothly without stalls:',
      '',
      '```bash',
      'ffmpeg -i srt://ingest.example:9000 \\',
      '  -c:v h264_nvenc -preset p4 -g 50 -keyint_min 50 -sc_threshold 0 \\',
      '  -b:v:0 4500k -s:v:0 1920x1080 \\',
      '  -b:v:1 2200k -s:v:1 1280x720 \\',
      '  -f hls -hls_time 4 -hls_list_size 6 -hls_flags delete_segments index.m3u8',
      '```',
      '',
      '- Align `-g` (GOP) to `2x` framerate (e.g. `50` for 25fps, `60` for 30fps).',
      '- Offload transcoding from CPU to **Intel QuickSync** or **NVIDIA NVENC** workers.',
      '',
      '### 2. Enable Linux TCP BBR Congestion Control',
      '',
      'Traditional CUBIC drops throughput aggressively under minor jitter. Enabling **TCP BBR** improves long-haul delivery stability:',
      '',
      '```bash',
      'sysctl -w net.core.default_qdisc=fq',
      'sysctl -w net.ipv4.tcp_congestion_control=bbr',
      '```',
      '',
      '### 3. Add Nginx Micro-Caching & CDN Origin Shielding',
      '',
      'Cache `.ts` / `.m4s` media segments briefly at the edge while keeping `.m3u8` playlists low-TTL (`1s–2s`) so viewers do not hammer your origin encoder.',
      '',
      '> Tip: Pair Prometheus + Grafana + Alertmanager with Telegram alerts to catch SRT ingest jitter before viewers notice buffering.',
    ].join('\n'),
    category: 'IPTV & OTT',
    cover_image_url: null,
    meta_title: 'How to Fix IPTV Buffering & Stream Freezing | PlexTech',
    meta_description:
      'Eliminate peak-hour IPTV buffering and stream freezing with FFmpeg ABR GOP alignment, TCP BBR congestion control, and Nginx/CDN edge caching.',
    published: true,
    published_at: '2026-11-26T08:00:00.000Z',
    created_at: '2026-11-26T08:00:00.000Z',
    updated_at: '2026-11-26T08:00:00.000Z',
  },
];

export const SEED_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'seed-hls-cdn-overhaul',
    title: 'Peak-Hour HLS Origin & CDN Edge Overhaul',
    category: 'IPTV & OTT',
    client_type: 'Licensed Regional OTT Broadcaster',
    summary:
      'Rebuilt multi-worker FFmpeg NVENC ABR pipelines, aligned GOP segments, added Nginx origin micro-caching behind Cloudflare edge rules, and enabled Linux TCP BBR across edge relays.',
    tech_stack: ['FFmpeg ABR', 'NVIDIA NVENC', 'Nginx Cache', 'Cloudflare CDN', 'TCP BBR'],
    outcome_metric: '99.95% Peak Uptime',
    image_url: null,
    published: true,
    created_at: '2026-11-26T08:00:00.000Z',
  },
  {
    id: 'seed-synology-truenas-plex',
    title: '40TB Synology to TrueNAS Scale Migration & Plex CGNAT Fix',
    category: 'Plex & Unraid',
    client_type: 'Private Media Server & SMB Storage',
    summary:
      'Executed a zero-data-loss 40TB migration to ZFS RAIDZ2 with unified Docker UID/GID permissions, Intel QuickSync 4K HDR tone mapping, and a WireGuard VPS reverse proxy bypassing ISP CGNAT.',
    tech_stack: ['TrueNAS Scale', 'ZFS', 'Plex 4K QSV', 'WireGuard', 'VPS Reverse Proxy'],
    outcome_metric: '6x 4K Streams / 0 Loss',
    image_url: null,
    published: true,
    created_at: '2026-11-25T12:00:00.000Z',
  },
];

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const formatDisplayDate = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const formatDisplayDateTime = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};

export const isPostDue = (post: Pick<BlogPost, 'published' | 'published_at' | 'created_at'>): boolean => {
  if (!post.published) return false;
  const ts = new Date(post.published_at || post.created_at).getTime();
  return !Number.isNaN(ts) && ts <= Date.now();
};

/**
 * Fetches published blog posts whose published_at <= now from Supabase, falling
 * back to seeded starter posts when Supabase is unreachable or unseeded.
 */
export async function fetchPublishedBlogPosts(): Promise<{
  posts: BlogPost[];
  fromSupabase: boolean;
}> {
  try {
    const nowIso = new Date().toISOString();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .lte('published_at', nowIso)
      .order('published_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      return { posts: data as BlogPost[], fromSupabase: true };
    }
  } catch {
    // Offline/uninitialized build fallback handled below.
  }

  return { posts: SEED_BLOG_POSTS.filter(isPostDue), fromSupabase: false };
}

/**
 * Fetches a single published blog post by slug where published_at <= now.
 */
export async function fetchPublishedBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const nowIso = new Date().toISOString();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .lte('published_at', nowIso)
      .maybeSingle();

    if (!error && data) {
      return data as BlogPost;
    }
  } catch {
    // Fallback to seed below.
  }

  return SEED_BLOG_POSTS.find((post) => post.slug === slug && isPostDue(post)) ?? null;
}

/**
 * Fetches published portfolio items from Supabase, falling back to seeded
 * items when Supabase is unreachable or empty.
 */
export async function fetchPublishedPortfolioItems(): Promise<{
  items: PortfolioItem[];
  fromSupabase: boolean;
}> {
  try {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      return { items: data as PortfolioItem[], fromSupabase: true };
    }
  } catch {
    // Offline/uninitialized build fallback handled below.
  }

  return { items: SEED_PORTFOLIO_ITEMS, fromSupabase: false };
}

export const STATIC_SITEMAP_ROUTES = [
  '/',
  '/services/',
  '/infrastructure/',
  '/streaming-solutions/',
  '/troubleshooting/',
  '/security-monitoring/',
  '/server-maintenance/',
  '/portfolio/',
  '/blog/',
  '/technologies/',
  '/about/',
  '/contact/',
] as const;

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export function buildSitemapXml(
  posts: Pick<BlogPost, 'slug' | 'updated_at' | 'published_at' | 'created_at'>[],
  siteUrl = 'https://www.plextech.online',
): string {
  const today = new Date().toISOString().split('T')[0] ?? '2026-11-27';

  const staticEntries = STATIC_SITEMAP_ROUTES.map((route) => ({
    loc: `${siteUrl}${route}`,
    lastmod: today,
    changefreq: route === '/' || route === '/blog/' || route === '/portfolio/' ? 'weekly' : 'monthly',
    priority: route === '/' ? '1.0' : route === '/blog/' || route === '/portfolio/' ? '0.9' : '0.8',
  }));

  const blogEntries = posts.map((post) => ({
    loc: `${siteUrl}/blog/${encodeURIComponent(post.slug)}/`,
    lastmod: (post.updated_at || post.published_at || post.created_at || today).split('T')[0] ?? today,
    changefreq: 'weekly',
    priority: '0.85',
  }));

  const urls = [...staticEntries, ...blogEntries]
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
