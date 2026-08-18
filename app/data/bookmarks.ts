export type BookmarkItem = {
  name: string;
  url: string;
  image?: string;
  excerpt?: string;
  pinned?: boolean;
};

export type Bookmark = {
  title: string;
  list: BookmarkItem[];
};

export const BOOKMARKS: Bookmark[] = [
  {
    title: "AI Tools",
    list: [
      {
        name: "Chat GPT",
        url: "https://chatgpt.com/",
        excerpt: "AI system for engaging conversations.",
        pinned: true,
      },
      {
        name: "Github Copilot",
        url: "https://marketplace.visualstudio.com/items?itemName=GitHub.copilot",
        excerpt: "AI-powered coding assistant for developers.",
        pinned: true,
      },
    ],
  },
  {
    title: "Browser Extensions",
    list: [
      {
        name: "Google Translate",
        url: "https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb",
        excerpt: "Quickly translate selected text online.",
      },
      {
        name: "Wappalyzer",
        url: "https://www.wappalyzer.com/",
        excerpt: "Identify website technologies effortlessly.",
      },
    ],
  },
  {
    title: "Design",
    list: [
      {
        name: "Figma",
        url: "https://www.figma.com/",
        excerpt: "UI/Ux Design",
        pinned: true,
      },
      {
        name: "Capcut",
        url: "https://www.capcut.com/",
        excerpt: "UI/Ux Design",
      },
    ],
  },
  {
    title: "Dev",
    list: [
      {
        name: "NeoVim",
        url: "https://neovim.io/",
        excerpt: "Quickly open any file.",
      },
      {
        name: "Orbstack",
        url: "https://orbstack.dev/",
        excerpt: "Fast and lightweight Docker alternative.",
        pinned: true,
      },
      {
        name: "PHPStorm",
        url: "https://www.jetbrains.com/phpstorm/",
        excerpt: "My PHP IDE for developing.",
        pinned: true,
      },
      {
        name: "VSCode",
        url: "https://code.visualstudio.com/",
        excerpt: "My Frontend IDE for developing.",
        pinned: true,
      },
    ],
  },
  // {
  //   title: 'MacOS',
  //   list: []
  // },
  {
    title: "Online Tools",
    list: [
      {
        name: "ExcaliDraw",
        url: "https://excalidraw.com/",
        excerpt: "Wireframe & Showcase IDEA workflow.",
      },
      {
        name: "True DevTool",
        url: "https://truedevtools.com/",
        excerpt: "It has 45+ tools for dev used",
        pinned: true,
      },
    ],
  },
  {
    title: "Playground",
    list: [
      {
        name: "Postman",
        url: "https://www.postman.com/",
        excerpt: "Quickly test APIs with Postman.",
        pinned: true,
      },
    ],
  },
  // {
  //   title: 'Relax',
  //   list: []
  // },
  {
    title: "Services",
    list: [
      {
        name: "DDEV",
        url: "https://ddev.com/",
        excerpt: "Local docker web development template.",
      },
    ],
  },
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
