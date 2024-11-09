// @ts-check
import type { AstroIntegration } from 'astro';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import partytown from '@astrojs/partytown';
import remarkCallout from '@r4ai/remark-callout';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import expressiveCode from 'astro-expressive-code';

import remarkCustomFrontmatter from './src/remark-plugins/remark-frontendmatter.mjs';
import remarkObsidian from './src/remark-plugins/remark-obsidian.mjs';

const hasExternalScripts = true;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map(item => item()) : [items()]) : [];

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.namhoainguyen.com',
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
    partytown({
      config: { forward: ['dataLayer.push'] }
    }),

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
