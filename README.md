# iptv-project

Fast, static Astro website for IPTV & OTT infrastructure, DevOps, cloud, and streaming support services.

## Local development

```bash
npm install
npm run dev
```

## Build and preview

```bash
npm run build
npm run preview
```

The static production site is generated in `dist/`.

## Deployment

- **Cloudflare Pages:** connect the repository, set build command to `npm run build` and output directory to `dist`.
- **Netlify:** build command `npm run build`; publish directory `dist`.
- **Vercel:** use the Astro preset; build output is `dist`.
- Any static host can publish the generated `dist/` directory.

## Configuration

The canonical public domain is configured in `astro.config.mjs`. Update `site` before deploying to a different domain so canonical URLs and sitemap entries are correct. This static site has no required environment variables and contains no API keys.
