import { TechItem, techs } from '@/data/techs'
import Image from 'next/image'
import Link from 'next/link'

export default function BadgeTech({
  techId,
  showTitle = false
}: {
  techId: string
  showTitle?: boolean
}) {
  const tech = techs.find(t => t.id === techId) as TechItem
  if (!tech || !tech.icon) return null

  const Component = tech.url.startsWith('/') ? Link : 'a'
  return (
    <Component
      href={tech.url}
      target="_blank"
      className="flex items-center justify-center dark:hover:bg-neutral-700 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 p-1.5 rounded-md space-x-1 text-xs"
    >
      <Image src={tech.icon} alt={tech.name} width={20} height={20} />
      {showTitle && <span className="inline-block ml-2">{tech.name}</span>}
    </Component>
  )
}
