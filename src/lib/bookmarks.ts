import type { Bookmark } from '@/types';

export const BOOKMARKS: Bookmark[] = [
  {
    name: 'True DevTool',
    type: 'web',
    url: 'https://truedevtools.com/',
    excerpt: 'It has 45+ tools for dev used',
    tag: ['dev'],
    isPaid: false,
    color: 'mauve'
  },
  {
    name: 'PHPStorm',
    type: 'app',
    url: 'https://www.jetbrains.com/phpstorm/',
    tag: ['dev'],
    isPaid: true,
    color: 'maroon'
  },
  {
    name: 'Postman',
    type: 'app',
    url: 'https://www.postman.com/',
    excerpt: 'Testing API',
    tag: ['dev'],
    color: 'peach'
  },
  {
    name: 'VSCode',
    type: 'app',
    url: '',
    tag: ['dev'],
    color: 'sky'
  },
  {
    name: 'ExcaliDraw',
    type: 'app',
    url: 'https://excalidraw.com/',
    color: 'maroon'
    // tag: ['macos', 'li']
  },
  {
    name: 'NeoVim',
    type: 'app',
    url: 'https://neovim.io/',
    color: 'green'
  },
  {
    name: 'DDEV',
    type: 'app',
    url: 'https://ddev.com/',
    color: 'blue'
  },
  {
    name: 'Orbstack',
    type: 'app',
    url: 'https://orbstack.dev/',
    color: 'lavender'
  }
];
