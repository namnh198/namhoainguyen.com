import NavItem from '@/components/Navbar/NavItem'
import { type NavbarItemProps } from '@/data/navigation'
import NavAvatar from './NavAvatar'

export default function NavMenu({ navbar }: { navbar: NavbarItemProps[] }) {
  return (
    <div className="flex flex-1 items-center space-x-2.5 md:space-x-6">
      <NavAvatar />
      <ul className="lg:flex hidden items-center sm:space-x-2">
        {navbar.map(nav => (
          <NavItem key={nav.name} nav={nav} />
        ))}
      </ul>
    </div>
  )
}
