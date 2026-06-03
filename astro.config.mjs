// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://jaisonpalacio.dev',
  integrations: [sitemap(), react()],

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Space Grotesk',
      cssVariable: '--ff-display',
      weights: [400, 500, 600, 700],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--ff-sans',
      weights: [300, 400, 500, 600, 700],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--ff-mono',
      weights: [400, 500, 600],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
