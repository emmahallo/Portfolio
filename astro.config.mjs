import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolioemmaeichin.vercel.app',
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) =>
        !page.includes('cursor-optionen') &&
        !page.includes('portrait-optionen') &&
        !page.includes('querformat-optionen') &&
        !page.includes('kompetenzen-optionen') &&
        !page.includes('kutter-ergebnisse-optionen') &&
        !page.includes('/404'),
    }),
  ],
});
