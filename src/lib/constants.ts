import type { FooterProps, NavMenuProps } from '@/types';

export const NAVIGATION: NavMenuProps[] = [
  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'About',
    href: 'https://cv.namhoainguyen.com/',
    external: true
  },
  {
    title: 'Notes',
    href: '/notes'
  },
  {
    title: 'Topics',
    href: '/tags'
  },
  {
    title: 'Bookmarks',
    href: '/bookmarks'
  }
];

export const FOOTER: FooterProps[] = [
  {
    title: 'Navigation',
    menu: [
      {
        title: 'Home',
        href: '/'
      },
      {
        title: 'About',
        href: 'https://cv.namhoainguyen.com/',
        external: true
      },
      {
        title: 'Notes',
        href: '/notes'
      },
      {
        title: 'Bookmarks',
        href: '/bookmarks'
      }
    ]
  },
  {
    title: 'Contact',
    menu: [
      {
        title: 'me@namhoainguyen.com',
        href: 'mailto:me@namhoainguyen.com',
        external: true,
        iconColor: 'red',
        icon: 'lucide:mail'
      },
      {
        title: 'Github',
        href: 'https://github.com/namnh198',
        external: true,
        iconColor: 'text',
        icon: 'lucide:github'
      },
      {
        title: 'Twitter',
        href: 'https://twitter.com/namnh198',
        external: true,
        iconColor: 'sky',
        icon: 'lucide:twitter'
      },
      {
        title: 'Linkedin',
        href: 'https://www.linkedin.com/in/namnh198/',
        external: true,
        iconColor: 'blue',
        icon: 'lucide:linkedin'
      }
    ]
  },
  {
    title: 'Other',
    menu: [
      {
        title: 'Privacy',
        href: '/privacy'
      },
      {
        title: 'Support Me',
        href: '/support-me'
      }
    ]
  }
];
