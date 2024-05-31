export type NavbarItemProps = {
  name: string
  url: string
  freq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}
