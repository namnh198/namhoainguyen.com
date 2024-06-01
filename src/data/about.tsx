import forixLogoImg from '@/public/images/cv/forix.svg'
import miraiSoftLogoImg from '@/public/images/cv/mirai.webp'
import opentechizLogoImg from '@/public/images/cv/opentechiz.webp'
import ptitLogoImg from '@/public/images/cv/ptit.png'
import selfLearningLogoImg from '@/public/images/cv/self-learning.webp'

export const ABOUT = {
  title: 'About me',
  description:
    'I’m a senior full-stack engineer, creative coder and self-proclaimed designer who specializes in web development. I make it my mission to translate user-focused designs into pixel-perfect websites or applications that run blazing fast.',
  cv: [
    {
      id: 'experiences',
      name: 'Experiences',
      lists: [
        {
          id: 'forix',
          url: 'https://forixcommerce.com/',
          logo: forixLogoImg,
          company: 'Forix Inc',
          job: 'Magento Developer',
          date: 'May 2023 - Present',
          activity: [
            "Developed custom modules and extensions to extend Magento's functionality.",
            'Worked with KnockoutJS to enhance the frontend user experience.'
          ]
        },
        {
          id: 'freelancer',
          logo: selfLearningLogoImg,
          company: 'Freelancer',
          job: 'Magento Developer',
          date: 'May 2022 - Present',
          activity: [
            'Implemented authentication and authorization mechanisms, ensuring secure access to the API endpoints.',
            'Designed and implemented the API architecture, adhering to industry best practices and standards for security, scalability, and performance.'
          ]
        },
        {
          id: 'opentechiz',
          url: 'https://www.opentechiz.com/',
          logo: opentechizLogoImg,
          company: 'Opentechiz',
          job: 'Magento Developer',
          date: 'Oct 2020 - Apr 2023',
          activity: [
            "Developed custom modules and extensions to extend Magento's functionality.",
            'Integrated third-party services to improve website functionality.'
          ]
        },
        {
          id: 'mirai-software',
          logo: miraiSoftLogoImg,
          url: 'https://miraisoft.com.vn/',
          company: 'Mirai Software',
          job: 'Software Engineer',
          date: 'Aug 2020 - Sep 2020',
          activity: [
            'Collaborated with clients and project managers to gather requirements and define project scope.',
            'Stayed up-to-date with the latest Magento trends, technologies, and best practices.'
          ]
        }
      ]
    },
    {
      id: 'educations',
      name: 'Educations',
      lists: [
        {
          id: 'devops',
          logo: selfLearningLogoImg,
          company: 'Self-Learning',
          job: 'DevOps',
          date: 'Oct 2022 - Present',
          activity: [
            "I've been learning myself DevOps (AWS, Google Cloud, Azure) using online courses (Coursera, Udemy) and real projects."
          ]
        },
        {
          id: 'web-development',
          logo: selfLearningLogoImg,
          company: 'Self-Learning',
          job: 'Web Development',
          date: 'Jan 2020 - Present',
          activity: ["I've been learning myself Web Development by making applications, websites and real projects."]
        },
        {
          id: 'ptit',
          logo: ptitLogoImg,
          url: 'https://portal.ptit.edu.vn/',
          company: 'PTIT',
          job: 'Bachelor Degree',
          date: 'Sep 2016 - Feb 2021',
          activity: [
            "Bachelor's Degree in Electrical and Computer Engineering",
            'I studied a lot in networking and electrical engineering.'
          ]
        }
      ]
    }
  ] as CVGroupType[],
  skills: [
    {
      id: 'frontend',
      name: 'Frontend',
      lists: [
        'html5',
        'eleventy',
        'astro',
        'js',
        'scss',
        'less',
        'vite',
        'bootstrap',
        'tailwindcss',
        'ts',
        'jquery',
        'react',
        'vue',
        'next.js',
        'knockoutjs'
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      lists: [
        'php',
        'node.js',
        'mysql',
        'postgresql',
        'redis',
        'firebase',
        'jestjs',
        'phpunit',
        'elasticsearch',
        'mongodb',
        'graphql'
      ]
    },
    {
      id: 'tools-services',
      name: 'Tools & Services',
      lists: ['bash', 'git', 'smartgit', 'linux', 'notion', 'vscode', 'phpstorm', 'docker', 'postman', 'figma', 'imgur']
    }
  ] as SkillType[]
}

export type CVItemType = {
  id: string
  company: string
  job: string
  date?: string
  logo?: any
  logoClass?: string
  url?: string
  activity?: string[]
  techs?: string[]
}

export type CVGroupType = {
  id: string
  name: string
  lists: CVItemType[]
}

export type SkillType = {
  id: string
  name: string
  lists: string[]
}

export const skills: SkillType[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    lists: [
      'html5',
      'eleventy',
      'astro',
      'js',
      'scss',
      'less',
      'vite',
      'bootstrap',
      'tailwindcss',
      'ts',
      'jquery',
      'react',
      'vue',
      'next.js',
      'knockoutjs'
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    lists: [
      'php',
      'node.js',
      'mysql',
      'postgresql',
      'redis',
      'firebase',
      'jestjs',
      'phpunit',
      'elasticsearch',
      'mongodb',
      'graphql'
    ]
  },
  {
    id: 'tools-services',
    name: 'Tools & Services',
    lists: ['bash', 'git', 'smartgit', 'linux', 'notion', 'vscode', 'phpstorm', 'docker', 'postman', 'figma', 'imgur']
  }
]
