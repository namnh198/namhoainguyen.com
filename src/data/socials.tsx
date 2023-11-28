import { TbBrandFacebook, TbBrandGithub, TbBrandGmail, TbBrandLinkedin } from 'react-icons/tb'

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
    icon: <TbBrandGmail size={20} />,
    color: 'red',
    url: 'mailto:namnhn98@gmail.com'
  },
  {
    id: 'facebook',
    title: 'Facebook',
    icon: <TbBrandFacebook size={20} />,
    color: 'sky',
    url: 'https://fb.me/namnh198'
  },
  {
    id: 'github',
    title: 'Github',
    icon: <TbBrandGithub size={20} />,
    color: 'teal',
    url: 'https://github.com/namnh198'
  },
  {
    id: 'linkedin',
    title: 'Linkedin',
    icon: <TbBrandLinkedin size={20} />,
    color: 'blue',
    url: 'https://www.linkedin.com/in/namnh198/'
  }
]
