import defaultTheme from 'tailwindcss/defaultTheme';
import catppuccinPlugin from '@catppuccin/tailwindcss';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md,mdx,ts,tsx}'],
  darkMode: ['selector', '[class~="mocha"]'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1.5rem'
      },
      colors: {
        background: 'rgb(var(--ctp-base))',
        foreground: 'rgb(var(--ctp-text))'
      },
      fontFamily: {
        sans: ['Inter Tight', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono]
      },
      transitionProperty: {
        fade: 'opacity,transform'
      },
      transitionTimingFunction: {
        'in-out': 'ease-in-out'
      },
      screens: {
        xs: '492px'
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.text.DEFAULT'),
            '--tw-prose-headings': theme('colors.lavender.DEFAULT'),
            '--tw-prose-lead': theme('colors.text.DEFAULT'),
            '--tw-prose-links': theme(`colors.green.DEFAULT`),
            '--tw-prose-bold': theme(`colors.sapphire.DEFAULT`),
            '--tw-prose-counters': theme(`colors.sapphire.DEFAULT`),
            '--tw-prose-bullets': theme(`colors.text.DEFAULT`),
            '--tw-prose-hr': theme(`colors.surface0.DEFAULT`),
            '--tw-prose-quotes': theme(`colors.yellow.DEFAULT`),
            '--tw-prose-quote-borders': theme(`colors.lavender.DEFAULT`),
            '--tw-prose-captions': theme(`colors.text.DEFAULT`),
            '--tw-prose-code': theme(`colors.text.DEFAULT`),
            '--tw-prose-pre-code': theme(`colors.text.DEFAULT`),
            '--tw-prose-pre-bg': theme(`colors.base.DEFAULT`),
            '--tw-prose-th-borders': theme(`colors.surface0.DEFAULT`),
            '--tw-prose-td-borders': theme(`colors.surface0.DEFAULT`)
          }
        }
      })
    }
  },
  safelist: [
    {
      pattern: /^bg-(rosewater|flamingo|pink|mauve|red|maroon|peach|yellow|green|teal|sky|sapphire|blue)/
    },
    {
      pattern: /^text-(rosewater|flamingo|pink|mauve|red|maroon|peach|yellow|green|teal|sky|sapphire|blue)/
    },
    {
      pattern: /^from-(rosewater|flamingo|pink|mauve|red|maroon|peach|yellow|green|teal|sky|sapphire|blue)/
    },
    {
      pattern: /^to-(rosewater|flamingo|pink|mauve|red|maroon|peach|yellow|green|teal|sky|sapphire|blue)/
    }
  ],
  plugins: [catppuccinPlugin({ defaultFlavour: 'latte' }), typographyPlugin]
};
