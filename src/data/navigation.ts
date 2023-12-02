import { me } from './me'

export type NavbarItemProps = {
  name: string
  permalink: string
  external?: boolean
  icon?: string
}

export const NAVIGATION: NavbarItemProps[] = [
  {
    name: 'Home',
    permalink: '/'
  },
  {
    name: 'About',
    permalink: '/about/'
  },
  {
    name: 'Notes',
    permalink: '/notes/'
  },
  {
    name: 'Topics',
    permalink: '/tags/'
  },
  {
    name: 'Projects',
    permalink: '/projects/'
  },
  {
    name: 'Tools',
    permalink: '/tools/'
  }
]

export const FOOTER_NAVIGATION: NavbarItemProps[] = [
  {
    name: 'Contact',
    permalink: `mailto:${me.email}`,
    external: true
  },
  {
    name: 'About',
    permalink: '/about'
  },
  {
    name: 'Support me',
    permalink: '/support-me'
  }
]
