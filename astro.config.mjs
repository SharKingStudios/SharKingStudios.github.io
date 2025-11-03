// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';
import rehypeMermaid from 'rehype-mermaid';

export default defineConfig({
  output: 'static',
  site: 'https://sharkingstudios.github.io/MyWebsite/',
  base: '/MyWebsite/',
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [[rehypeMermaid, { strategy: process.env.NODE_ENV === 'production' ? 'pre-mermaid' : 'inline-svg' }]],
      syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
      fallbackType: 'rewrite',
    },
  },
});