# namhoainguyen.com

Next.js 14+ 🤝 Tailwind CSS 🤝 Notion as CMS 🤝 [notion-x](https://github.com/namnh198/notion-x).

A website for me to take notes what I learn

> The source code on this page is for reference only.  I'm working on writing a guide ASAP

## Dev

🚨 You have to install **globally** [Bun >=1.0.13](https://bun.sh/) 

```bash
# install bun
curl -fsSL https://bun.sh/install | bash
```

```bash
bun install

# clone submodule notion-x (when installing only)
git submodule update --init --recursive

# update notion-x
git submodule update --recursive --remote

# dev
bun run dev # port 3000

# build
bun run build

# serve (need to build first)
bun run start # port 3000

# prettier
bun run prettier

# eslint
bun run lint

# clear bun cache (helpful sometimes)
bun pm cache rm
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
