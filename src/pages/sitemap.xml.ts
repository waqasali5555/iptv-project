import type { APIRoute } from 'astro';
import { fetchPublishedBlogPosts } from '../lib/cms';

const SITE_URL = 'https://www.plextech.online';

const staticRoutes = [
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
];

export const GET: APIRoute = async () => {
  const { posts } = await fetchPublishedBlogPosts();
  const today = new Date().toISOString().split('T')[0];

  const staticEntries = staticRoutes.map((route) => ({
    loc: `${SITE_URL}${route}`,
    lastmod: today,
    changefreq: route === '/' || route === '/blog/' || route === '/portfolio/' ? 'weekly' : 'monthly',
    priority: route === '/' ? '1.0' : route === '/blog/' || route === '/portfolio/' ? '0.9' : '0.8',
  }));

  const blogEntries = posts.map((post) => ({
    loc: `${SITE_URL}/blog/${post.slug}/`,
    lastmod: (post.updated_at || post.published_at || post.created_at || today).split('T')[0],
    changefreq: 'weekly',
    priority: '0.85',
  }));

  const allEntries = [...staticEntries, ...blogEntries];

  const urls = allEntries
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
