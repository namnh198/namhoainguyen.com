import Image from 'next/image'
import { techs, type TechItemType } from '@/data/techs'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export default function Tech({ techId, showTitle = false }: { techId: string; showTitle?: boolean }) {
  const tech = techs.find((t) => t.id === techId) as TechItemType

  if (!tech || !tech.icon) return null

  return (
    <Button
      href={tech.url}
      className={cn('font-normal text-xs', [tech.imgClass], { tooltip: !showTitle })}
      target='_blank'
      data-tooltip={tech.name}
      rel='noreferrer nofollow'
    >
      <Image src={tech.icon} alt={tech.name} width={20} height={20} />
      {showTitle && <span className='inline-block ml-2'>{tech.name}</span>}
    </Button>
  )
}
