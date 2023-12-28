export type NavbarItemProps = {
  name: string
  permalink: string
  external?: boolean
  icon?: React.ReactNode
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

export default NAVIGATION
