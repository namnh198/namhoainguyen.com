import { TbBrandGmail, TbBrandFacebook, TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb'
import meImg from '@/public/images/me.png'

export const me = {
  name: 'Nam Hoai Nguyen',
  avatar: meImg,
  email: 'me@namhoainguyen.com',
  website: 'https://namhoainguyen.com',
  quote: 'Make it work, make it right, make it fast.',
  shortIntro:
    "I'm a senior full-stack engineer based in Ho Chi Minh City, Viet Nam with a focus on Web Design and Cloud Services. On this site, You can find the notes that I made when I discovered something.",
  longIntro:
    "I'm a senior full-stack engineer, creative coder and self-proclaimed designer who specializes in web development. I make it my mission to translate user-focused designs into pixel-perfect websites or applications that run blazing fast.",
  socials: [
    {
      label: 'Email',
      url: 'mailto:me@namhoainguyen.com',
      icon: TbBrandGmail,
      variant: 'red'
    },
    {
      label: 'Facebook',
      url: 'https://fb.me/namnh198',
      icon: TbBrandFacebook,
      variant: 'sky'
    },
    {
      label: 'Github',
      url: 'https://github.com/namnh198',
      icon: TbBrandGithub,
      variant: 'teal'
    },
    {
      label: 'Linkedin',
      url: 'https://www.linkedin.com/in/namnh198/',
      icon: TbBrandLinkedin,
      variant: 'blue'
    }
  ],
  intro: {
    short: '',
    long: ''
  },
  openToWork: false,
  location: 'Ho Chi Minh, Viet Nam'
}

export default me
