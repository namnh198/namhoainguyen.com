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
export const cv: CVGroupType[] = [
  {
    id: 'experiences',
    name: 'Experiences',
    lists: [
      {
        id: 'forix',
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
    lists: []
  }
]
