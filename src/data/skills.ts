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
    lists: [
      'bash',
      'git',
      'smartgit',
      'linux',
      'notion',
      'vscode',
      'phpstorm',
      'docker',
      'postman',
      'figma',
      'imgur'
    ]
  }
]
