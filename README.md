# namhoainguyen.com

AstroJs 🤝 Tailwind CSS 🤝 Obsidian as CMS.

A website for me to take notes what I learn

> The source code on this page is for reference only.  I'm working on writing a guide ASAP

## Development

🚨 You have to install **globally** [NodeJs >= 20.18](https://nodejs.org/)

### Installation

```bash
npm install

# create symlink for obsidian vault (when installing only)
ln -svf $OBSIDIAN_VAULT $PWD/src/content/notes
```

### Dev
```bash
# dev
bun run dev # port 4321

# build
bun run build

# serve (need to build first)
bun run start # port 4321

# eslint
bun run lint
```

### Deploy to vercel,

```bash
vercel dev # like bun run dev

vercel build

# preview only
vercel deploy

# production
vercel --prod
```