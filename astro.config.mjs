export const prerender = true;

// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import remarkCallout from '@r4ai/remark-callout';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import expressiveCode from 'astro-expressive-code';

import remarkCustomFrontmatter from './src/remark-plugins/remark-frontendmatter.mjs';
import remarkObsidian from './src/remark-plugins/remark-obsidian.mjs';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),

  compressHTML: true,
  prefetch: true,

  build: {
    inlineStylesheets: 'never'
  },

  vite: {
    resolve: {
      preserveSymlinks: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern"
        }
      }
    }
  },

  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    react(),
    icon(),
    expressiveCode({
      themes: ['catppuccin-mocha', 'catppuccin-latte'],
      themeCssSelector: theme => `[class~='${theme.name.replace('catppuccin-', '')}']`,
      styleOverrides: {
        uiFontFamily: 'Inter, sans-serif',
        frames: {
          frameBoxShadowCssValue: 'none',
          editorTabBarBorderColor: 'rgb(var(--ctp-mantle))',
          editorActiveTabBackground: 'rgb(var(--ctp-mantle))',
          editorBackground: 'rgb(var(--ctp-mantle))',
          terminalBackground: 'rgb(var(--ctp-mantle))'
        },
        borderRadius: '.5em'
      }
    })
  ],

  markdown: {
    remarkPlugins: [remarkCustomFrontmatter, remarkObsidian, remarkMath, remarkCallout],
    rehypePlugins: [rehypeKatex]
  }
});
