import TbBrandFacebook from '@notion-x/icons/TbBrandFacebook'
import TbBrandGithub from '@notion-x/icons/TbBrandGithub'
import TbBrandGmail from '@notion-x/icons/TbBrandGmail'
import TbBrandLinkedin from '@notion-x/icons/TbBrandLinkedin'

export type SocialBadge = {
  id: string
  title: string
  icon: any
  color?: string
  url: string
}

export const socials = [
  {
    id: 'gmail',
    title: 'Gmail',
    icon: <TbBrandGmail className="w-5 h-5" />,
    color: 'red',
    url: 'mailto:namnhn98@gmail.com'
  },
  {
    id: 'facebook',
    title: 'Facebook',
    icon: <TbBrandFacebook className="w-5 h-5" />,
    color: 'sky',
    url: 'https://fb.me/namnh198'
  },
  {
    id: 'github',
    title: 'Github',
    icon: <TbBrandGithub className="w-5 h-5" />,
    color: 'teal',
    url: 'https://github.com/namnh198'
  },
  {
    id: 'linkedin',
    title: 'Linkedin',
    icon: <TbBrandLinkedin className="w-5 h-5" />,
    color: 'blue',
    url: 'https://www.linkedin.com/in/namnh198/'
  }
]
