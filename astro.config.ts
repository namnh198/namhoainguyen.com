// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import partytown from '@astrojs/partytown';
import remarkCallout from '@r4ai/remark-callout';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import expressiveCode from 'astro-expressive-code';
import rehypeExternalLinks from 'rehype-external-links';

import remarkCustomFrontmatter from './src/remark-plugins/remark-frontendmatter.mjs';
import remarkObsidian from './src/remark-plugins/remark-obsidian.mjs';

import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.namhoainguyen.com',
  prefetch: true,

  integrations: [
    tailwind({
      applyBaseStyles: false,
      nesting: true
    }),
    react(),
    partytown({
      config: { forward: ['dataLayer.push'] }
    }),
    compress({
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false
        }
      },
      CSS: true,
      JavaScript: true,
      SVG: false,
      Logger: true
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
    rehypePlugins: [rehypeKatex, [rehypeExternalLinks, { target: '_blank' }]]
  },

  vite: {
    resolve: {
      preserveSymlinks: true
    }
  }
});
