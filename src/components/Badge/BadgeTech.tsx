import techs, { TechItem } from '@/data/techs'
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
      className="flex items-center justify-center bg-neutral-100 dark:bg-slate-700 hover:bg-neutral-200 dark:hover:bg-slate-600 p-1.5 rounded-md space-x-1 text-xs"
    >
      <Image src={tech.icon} alt={tech.name} width={20} height={20} />
      {showTitle && <span className="inline-block ml-2">{tech.name}</span>}
    </Component>
  )
}
