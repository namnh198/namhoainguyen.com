// @ts-check
import type { AstroIntegration } from 'astro';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import partytown from '@astrojs/partytown';
import { remarkCallout } from '@r4ai/remark-callout';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import rehypeExternalLinks from 'rehype-external-links';
import compress from 'astro-compress';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { h } from 'hastscript';
import remarkObsidian from './src/remark-plugins/remark-obsidian.mjs';

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map(item => item()) : [items()]) : [];

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
    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] }
      })
    ),
    compress({
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false
        }
      },
      Image: false,
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
      },
      textMarkers: true,
      defaultProps: {
        showLineNumbers: false
      },
      plugins: [pluginLineNumbers()]
    })
  ],

  markdown: {
    remarkPlugins: [remarkObsidian, remarkMath, remarkCallout],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'before',
          group(node) {
            return h('.markdown-heading .heading-' + node.tagName.charAt(1) + '-group');
          }
        }
      ],
      rehypeKatex,
      [rehypeExternalLinks, { target: '_blank' }]
    ]
  },

  vite: {
    resolve: {
      preserveSymlinks: true
    },
    ssr: {
      noExternal: ['@docsearch/react']
    }
  }
});
