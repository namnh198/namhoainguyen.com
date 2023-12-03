import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/icons/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/assets/styles/**/*.{js,ts,jsx,tsx,mdx}',
    './notion-x/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          '2xl': '128px'
        }
      },
      fontSize: {
        kb: ['0.875rem', '0.875rem']
      },
      colors: {
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      animation: {
        wave: 'wave 2s linear infinite',
        skeleton: 'skeleton 1.5s ease-in-out infinite'
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' }
        },
        skeleton: {
          '100%': { transform: 'translateX(100%)' }
        }
      }
    }
  },
  corePlugins: {
    aspectRatio: false
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')]
}
export default config
