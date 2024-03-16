import eleventyImg from '@/public/images/techs/11ty.svg'
import astroImg from '@/public/images/techs/astro.svg'
import bashImg from '@/public/images/techs/bash.svg'
import bootstrapImg from '@/public/images/techs/bootstrap.svg'
import cssImg from '@/public/images/techs/css.svg'
import dockerImg from '@/public/images/techs/docker.svg'
import firebaseImg from '@/public/images/techs/firebase.svg'
import gatsbyImg from '@/public/images/techs/gatsby.svg'
import gitImg from '@/public/images/techs/git.svg'
import graphQLImg from '@/public/images/techs/graphql.svg'
import htmlImg from '@/public/images/techs/html.svg'
import jsImg from '@/public/images/techs/js.svg'
import knockoutImg from '@/public/images/techs/knockoutjs.svg'
import lessImg from '@/public/images/techs/less.svg'
import linuxImg from '@/public/images/techs/linux.svg'
import mongodbImg from '@/public/images/techs/mongodb.svg'
import mysqlImg from '@/public/images/techs/mysql.svg'
import nextjsImg from '@/public/images/techs/nextjs.svg'
import nodeImg from '@/public/images/techs/node.svg'
import phpImg from '@/public/images/techs/php.svg'
import postgresqlImg from '@/public/images/techs/postgresql.svg'
import reactImg from '@/public/images/techs/react.svg'
// import redisImg from '@/public/images/techs/redis.svg'
import sassImg from '@/public/images/techs/sass.svg'
import tailwindcssImg from '@/public/images/techs/tailwindcss.svg'
import tsImg from '@/public/images/techs/ts.svg'
import vscodeImg from '@/public/images/techs/vscode.svg'
// import vueImg from '@/public/images/techs/vue.svg'
import wordpressImg from '@/public/images/techs/wordpress.svg'

import { StaticImageData } from 'next/image'

export type TechItem = {
  id: string
  name: string
  icon: StaticImageData
  url: string
  imgClass?: string
}

export const techs: TechItem[] = [
  {
    id: '11ty',
    name: '11ty',
    icon: eleventyImg,
    url: 'https://11ty.dev/'
  },
  {
    id: 'react',
    name: 'React.js',
    icon: reactImg,
    url: 'https://reactjs.org/'
  },
  {
    id: 'tailwindcss',
    name: 'TailwindCSS',
    icon: tailwindcssImg,
    url: 'https://tailwindcss.com/'
  },
  {
    id: 'wordpress',
    name: 'Wordpress',
    icon: wordpressImg,
    url: 'https://wordpress.org/'
  },
  {
    id: 'vscode',
    name: 'VSCode',
    icon: vscodeImg,
    url: 'https://code.visualstudio.com/'
  },
  {
    id: 'ts',
    name: 'Typescript',
    icon: tsImg,
    url: 'https://www.typescriptlang.org/'
  },
  {
    id: 'scss',
    name: 'SCSS',
    icon: sassImg,
    url: 'https://sass-lang.com/'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: nextjsImg,
    url: 'https://nextjs.org/'
  },
  {
    id: 'php',
    name: 'PHP',
    icon: phpImg,
    url: 'https://www.php.net/'
  },
  {
    id: 'postgresql',
    name: 'PostGreSQL',
    icon: postgresqlImg,
    url: 'https://www.postgresql.org/'
  },
  {
    id: 'nodejs',
    name: 'NodeJS',
    icon: nodeImg,
    url: 'https://nodejs.org/'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: mysqlImg,
    url: 'https://www.mysql.com/'
  },
  {
    id: 'js',
    name: 'Javascript',
    icon: jsImg,
    url: 'https://www.javascript.com/'
  },
  {
    id: 'knockoutjs',
    name: 'Knockout.js',
    icon: knockoutImg,
    url: 'https://knockoutjs.com/'
  },
  {
    id: 'less',
    name: 'Less',
    icon: lessImg,
    url: 'https://lesscss.org/'
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: linuxImg,
    url: 'https://www.linux.org/'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: mongodbImg,
    url: 'https://www.mongodb.com/'
  },
  {
    id: 'astro',
    name: 'Astro.js',
    icon: astroImg,
    url: 'https://astro.build/'
  },
  {
    id: 'bash',
    name: 'Bash',
    icon: bashImg,
    url: 'https://www.bash.org/'
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    icon: bootstrapImg,
    url: 'https://getbootstrap.com/'
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: dockerImg,
    url: 'https://www.docker.com/'
  },
  {
    id: 'gatsby',
    name: 'Gatsby',
    icon: gatsbyImg,
    url: 'https://www.gatsbyjs.com/'
  },
  {
    id: 'css',
    name: 'CSS',
    icon: cssImg,
    url: 'https://www.w3.org/Style/CSS/Overview.en.html'
  },
  {
    id: 'firebase',
    name: 'Firebase',
    icon: firebaseImg,
    url: 'https://firebase.google.com/'
  },
  {
    id: 'html',
    name: 'HTML',
    icon: htmlImg,
    url: 'https://www.docker.com/'
  },
  {
    id: 'git',
    name: 'Git',
    icon: gitImg,
    url: 'https://git-scm.com/'
  },
  {
    id: 'graphql',
    name: 'GrapQL',
    icon: graphQLImg,
    url: 'https://git-scm.com/'
  }
]

export default techs
