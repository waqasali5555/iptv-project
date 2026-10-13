import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://iptv-project-kappa.vercel.app',
  integrations: [sitemap({ filter: (page) => !page.startsWith('https://iptv-project-kappa.vercel.app/admin/') })],
  vite: { plugins: [tailwindcss()] },
  build: { format: 'directory' }
});
