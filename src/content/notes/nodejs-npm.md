---
title: NodeJS + NPM
createDate: 2023-12-08
draft: true
published: true
tags:
  - Backend
  - Node-Js
  - Web-Dev
---

> [!tip] Node.js is not programing languages like JS, PHP. It’s just the runtime environment that allows running JS on
> whichever machine likes servers, desktops,…

## Install multiple versions

First, need to [install nvm](https://github.com/nvm-sh/nvm) to manage node version.

> [!warning]+ **For Mac M1 Chipset:** If you want to install Node.Js version ≤ 14, this’s not support the new chipset.
> To install, you must be install “Rosetta”

> [!warning] Below commands are using for mostly Linux/MacOS users

```bash
# Install LTS Version
nvm install --lts
```

```bash
# Install a specific version
nvm install 18
```

```bash
# Install lastest version
nvm install node
```

```bash
# switch between version
nvm use 18.17.0
```

## NPM (Node Package Manager)

```bash
# Check version
npm -v
```

```bash
# Clear cache
npm cache clean -f
```

### Shorthand CLI options

- `i`: `install`
- `D`:`—save-dev`
- `g`:`—global`
- `ls`: `list`

👉 [Official Documentation](https://docs.npmjs.com/)

## Install package

**package.json** is the most basic part to understand and work with **Node.js** , **npm** and also **javascript** . It’s
saved all library and framework that you use on your project define by 2 properties **dependencies** and
**devDependencies.**

Note that: with devDependencies only use for development. If the “NODE_ENV” is “production”, all package defined on
devDependencies will not be installed

```bash
npm i # Install all package define on package.json
npm i <package-name> # install & save to dependencies
npm i -D <package-name> # install package with dev dependencies
npm i -g <package-name> # install package in global scope
```

```bash
# from github repository
npm i git+https://github.com/abc/xyz.git
npm i git+https://<github repo>#<new_commit_hash>
```

## Update package

```bash
npm update <package-name> # use -g to update global
```

## Remove package

```bash
npm uninstall <package-name>
```

## Run script

```json title="package.json"
"scripts": {
 "serve": "eleventy --serve"
 "build:css": "tailwindcss -i src/assets/css/tailwind.css -o src/assets/css/main.css --postcss",
 "build:js": "rollup -c rollup.config.js --bundleConfigAsCjs"
},
```

```bash
npm run server # run serve
```

## Bun

Recently, I’m switching to Bun. Bun is a new Javascript runtime that speeds the installation & build. Bun is designed as
a drop-in replacement for Node.js. It natively implements hundreds of Node.js

```bash
# install bun
curl -fsSL https://bun.sh/install | bash
```

```bash

# check bun version
bun --version
```

```bash

# run a specific file
bun run index.js
```

```bash

# run a script
bun run start # run the `start` script
```

## Troubleshooting

> [!bug]- permission denied,….
>
> ```bash
> # Change the permision to "current user"
> sudo chown -R $USER ~/.ngrok
> ```

