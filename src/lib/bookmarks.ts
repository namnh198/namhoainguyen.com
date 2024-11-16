import type { Bookmark } from '@/types';

export const BOOKMARKS: Bookmark[] = [
  {
    title: 'AI Tools',
    list: [
      {
        name: 'Chat GPT',
        url: 'https://chatgpt.com/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/f_auto,q_auto/v1/nhn.com-tools/chatgpt_odcxwa',
        excerpt: 'AI system for engaging conversations.',
        invertDark: true,
        pinned: true
      },
      {
        name: 'Github Copilot',
        url: 'https://chatgpt.com/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/f_auto,q_auto/v1/nhn.com-tools/github-copilot_u6zdra',
        excerpt: 'AI-powered coding assistant for developers.',
        pinned: true
      }
    ]
  },
  {
    title: 'Browser Extensions',
    list: [
      {
        name: 'Google Translate',
        url: 'https://chatgpt.com/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/f_auto,q_auto/v1/nhn.com-tools/translate_ymrdqg',
        excerpt: 'Quickly translate selected text online.'
      },
      {
        name: 'Wappalyzer',
        url: 'https://chatgpt.com/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/f_auto,q_auto/v1/nhn.com-tools/wappalyzer_s7itik',
        excerpt: 'Identify website technologies effortlessly.'
      }
    ]
  },
  {
    title: 'Design',
    list: [
      {
        name: 'Figma',
        url: '',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/f_auto,q_auto/v1/nhn.com-tools/figma_tkaf61',
        excerpt: 'UI/Ux Design',
        pinned: true
      },
      {
        name: 'Capcut',
        url: '',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/f_auto,q_auto/v1/nhn.com-tools/capcut_arbjzw',
        excerpt: 'UI/Ux Design'
      }
    ]
  },
  {
    title: 'Dev',
    list: [
      {
        name: 'NeoVim',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/f_auto,q_auto/v1/nhn.com-tools/vim_j7rfxs',
        url: 'https://neovim.io/',
        excerpt: 'Quickly open any file.'
      },
      {
        name: 'Orbstack',
        url: 'https://orbstack.dev/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/f_auto,q_auto/v1/nhn.com-tools/orbstack_ovk5yl',
        excerpt: 'Fast and lightweight Docker alternative.',
        pinned: true
      },
      {
        name: 'PHPStorm',
        url: 'https://www.jetbrains.com/phpstorm/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/f_auto,q_auto/v1/nhn.com-tools/phpstorm_zx1mfv',
        excerpt: 'My PHP IDE for developing.',
        pinned: true
      },
      {
        name: 'VSCode',
        url: '',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/f_auto,q_auto/v1/nhn.com-tools/vscode_nydric',
        excerpt: 'My Frontend IDE for developing.',
        pinned: true
      }
    ]
  },
  // {
  //   title: 'MacOS',
  //   list: []
  // },
  {
    title: 'Online Tools',
    list: [
      {
        name: 'ExcaliDraw',
        url: 'https://excalidraw.com/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/f_auto,q_auto/v1/nhn.com-tools/excalidraw_zctfkf',
        excerpt: 'Wireframe & Showcase IDEA workflow.'
      },
      {
        name: 'True DevTool',
        url: 'https://truedevtools.com/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/f_auto,q_auto/v1/nhn.com-tools/true-devtool_mrdehw',
        excerpt: 'It has 45+ tools for dev used',
        pinned: true
      }
    ]
  },
  {
    title: 'Playground',
    list: [
      {
        name: 'Postman',
        url: 'https://www.postman.com/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/f_auto,q_auto/v1/nhn.com-tools/postman_y4hm2i',
        excerpt: 'Quickly test APIs with Postman.',
        pinned: true
      }
    ]
  },
  // {
  //   title: 'Relax',
  //   list: []
  // },
  {
    title: 'Services',
    list: [
      {
        name: 'DDEV',
        url: 'https://ddev.com/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/f_auto,q_auto/v1/nhn.com-tools/ddev_qd0x2y',
        excerpt: 'Local docker web development template.'
      }
    ]
  }
  // {
  //   title: 'Security',
  //   list: []
  // },
  // {
  //   title: 'Social',
  //   list: []
  // },
  // {
  //   title: 'Taking Notes',
  //   list: []
  // },
  // {
  //   title: 'Terminal',
  //   list: []
  // },
  // {
  //   title: 'Utilities',
  //   list: []
  // },
  // {
  //   title: 'VSCode Extensions',
  //   list: []
  // }
];
