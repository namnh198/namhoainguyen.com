import type { Bookmark } from '@/types';

export const BOOKMARKS: Bookmark[] = [
  {
    title: 'AI Tools',
    list: [
      {
        name: 'Chat GPT',
        url: 'https://chatgpt.com/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/v1731755551/nhn.com-tools/chatgpt_odcxwa.svg',
        excerpt: 'AI system for engaging conversations.',
        invertDark: true,
        pinned: true
      },
      {
        name: 'Github Copilot',
        url: 'https://marketplace.visualstudio.com/items?itemName=GitHub.copilot',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/v1731755768/nhn.com-tools/github-copilot_u6zdra.png',
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
        url: 'https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/v1701887052/nhn.com-tools/translate_ymrdqg.png',
        excerpt: 'Quickly translate selected text online.'
      },
      {
        name: 'Wappalyzer',
        url: 'https://www.wappalyzer.com/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/v1701888057/nhn.com-tools/wappalyzer_s7itik.png',
        excerpt: 'Identify website technologies effortlessly.'
      }
    ]
  },
  {
    title: 'Design',
    list: [
      {
        name: 'Figma',
        url: 'https://www.figma.com/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/v1701888057/nhn.com-tools/wappalyzer_s7itik.png',
        excerpt: 'UI/Ux Design',
        pinned: true
      },
      {
        name: 'Capcut',
        url: 'https://www.capcut.com/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/v1731763005/nhn.com-tools/capcut_arbjzw.svg',
        excerpt: 'UI/Ux Design',
        invertDark: true
      }
    ]
  },
  {
    title: 'Dev',
    list: [
      {
        name: 'NeoVim',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/v1701630764/nhn.com-tools/vim_j7rfxs.png',
        url: 'https://neovim.io/',
        excerpt: 'Quickly open any file.'
      },
      {
        name: 'Orbstack',
        url: 'https://orbstack.dev/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/v1716654956/nhn.com-tools/orbstack_ovk5yl.png',
        excerpt: 'Fast and lightweight Docker alternative.',
        pinned: true
      },
      {
        name: 'PHPStorm',
        url: 'https://www.jetbrains.com/phpstorm/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/v1701888699/nhn.com-tools/phpstorm_zx1mfv.svg',
        excerpt: 'My PHP IDE for developing.',
        pinned: true
      },
      {
        name: 'VSCode',
        url: 'https://code.visualstudio.com/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/v1701888018/nhn.com-tools/vscode_nydric.svg',
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
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/v1701888807/nhn.com-tools/excalidraw_zctfkf.svg',
        excerpt: 'Wireframe & Showcase IDEA workflow.'
      },
      {
        name: 'True DevTool',
        url: 'https://truedevtools.com/',
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/v1716653711/nhn.com-tools/true-devtool_mrdehw.png',
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
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/v1701888992/nhn.com-tools/postman_y4hm2i.svg',
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
        image: 'https://res.cloudinary.com/doo2twtbu/image/upload/v1716654273/nhn.com-tools/ddev_qd0x2y.svg',
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
