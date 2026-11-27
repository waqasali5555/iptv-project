import type { APIRoute } from 'astro';
import { buildSitemapXml, fetchPublishedBlogPosts } from '../lib/cms';

export const GET: APIRoute = async () => {
  const { posts } = await fetchPublishedBlogPosts();
  const xml = buildSitemapXml(posts);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
