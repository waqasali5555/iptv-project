import type { APIRoute } from 'astro';

const SITE_URL = 'https://www.plextech.online';

const publicRoutes = [
  '/',
  '/services/',
  '/infrastructure/',
  '/streaming-solutions/',
  '/troubleshooting/',
  '/security-monitoring/',
  '/server-maintenance/',
  '/technologies/',
  '/about/',
  '/contact/',
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split('T')[0];
  const urls = publicRoutes
    .map(
      (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
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
