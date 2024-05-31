import avatarImg from '@/public/images/avatar.webp'
import Image from 'next/image'
import Link from 'next/link'

export default function Avatar() {
  return (
    <Link href='/' className='inline-flex items-center shrink-0 outline-none'>
      <Image src={avatarImg} alt='Avatar' width={40} height={40} priority />
    </Link>
  )
}
