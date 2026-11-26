import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.plextech.online',
  integrations: [
    sitemap({
      filter: (page) => !page.startsWith('https://www.plextech.online/admin/'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  build: { format: 'directory' },
});
