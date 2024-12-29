---
title: 11ty and Nunjuck
createDate: 2023-11-18
published: true
tags:
  - Web-Dev
  - SSG
---
> [!warning]
> This is not a tutorial to create an 11ty website, this's a note! You can find some very new and useful techniques on this note alongside [the official documentation](https://www.11ty.dev/docs/).
## Installation
- First, install nodejs.
- Using [this starter template](https://github.com/11ty/eleventy-base-blog) or [Google's high performance statrer theme](https://github.com/google/eleventy-high-performance-blog) (recommended).
You should follow the installation steps given in the theme you choose
## Setting & Deploy with Netlify
Sometimes, 11ty takes to much time to build (especially on the task of optimizing images). You shouldn’t use branch `main` to build your site because every time you make a push to `main` branch, Netlify will rebuild & deploy it. You should create a new branch base on `main` branch. It so-called `netlify`
- **Idea 1 - manually build but should not use many times**
	On Netlify, go to **Site Settings → Build & Deploy**
    - **Build settings:**
        - Build command: `npm run build` (depends on your site)
        - Published directory: `_site` (depends on your site)
        - Builds: **Active builds**
    - **Deploys contexts:**
        - Production branch: **netlify** (the same as the your created branch)
        - Deploy preview: **Don’t deploy pull request**
        - Brand deploys: **Deploys only the production branch**
- **Idea 2 - Build locally and push `_site` only**
Remember that you have only 300 free minutes to build with Free Plan
## Templating
### SCSS to CSS
- If you use [node-sass](https://www.npmjs.com/package/node-sass) 

```bash
# folder structure
|- css
|  |- main.scss
|  |- components
|  |  |- ..
 ```

```scss title="main.scss"
@import '../components/navbar'
```

```json title="package.json"
{
    "scripts": {
       "css-build": "node-sass css/main.scss - o css",
    }
}
 ```  

```html title="index.html"
<head>
	...
	<link rel="stylesheet" href="css/main.css" />
	...
</head>
```

- If you use [rollup](https://rollupjs.org/guide/en/)

```
# folder structure
|- css
|  |- main.scss
|  |- components
|  |  |- ..
```

```sass title="main.scss"
@import "./components/font"; // without extension
```

```json title="package.json"
{
    "scripts": {
        "js-build": "rollup -c rollup.config.js",
    }
}
```  

```jsx title="rollup.config.js"
import scss from "rollup-plugin-scss";

export default [
	{
		// plugin 1
	},
	{
		input: "css/main_input.js", // where the input file containing import of main.scss
		output: {
		  file: "css/main.js", // intermediate file which can be translated to css/main.css
		  format: "esm", // still not know
		},
		plugins: [
		  scss(), // there are other configs
		],
	},
];
```

```html title="index.html"
<!-- in <head> -->
<link rel="stylesheet" href="css/main.css" />
```

### Using postcss

```bash
# Install it and its plugin first
npm install autoprefixer postcss postcss-cli
```

```bash
# Create postcss.config.js on the same folder as package.json
module.exports = {
  plugins: [require("autoprefixer")],
};
```

```json
// npm command in package.json
"css:prefix": "postcss src/css/main.css --use autoprefixer --replace true"
```

```bash
# Watch (cannot use with `--replace`)
postcss --watch main.css -o main_.css --use autoprefixer
```

### Nunjucks inside css

```html
<style>
  .bg {
    background-image: url({{ bg-image }});
  }
</style>

<!-- or -->
<div style="background-image: url({{ bg-image }});"></div>
```

### Bootstrap + 11ty

👉 [Bootstrap's homepage](https://getbootstrap.com/)

👉 [How to Isolate Bootstrap CSS to Avoid Conflicts (using LESS)](https://formden.com/blog/isolate-bootstrap)

### TailwindCSS
```bash

npm install -D tailwindcss postcss autoprefixer

# init tailwind config file
npx tailwindcss init

```

```jsx title="postcss.config.js"
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
};

```

```css title="css/tailwind.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```


```jsx title="tailwind.config.js" ins={1}
content: ["./src/**/*.{njk,md}", "./src/**/*.svg",]
```
```html title="index.html" ins={2}
<head>
	<link rel="stylesheet" href="{{ '/css/tailwind.css' | url }}">
</head
```
```json title="package.json"

"scripts": {
	"dev:css": "tailwindcss -i css/tailwind.css -o _site/css/tailwind.css --watch --postcss",
	"build:css": "tailwindcss -i css/tailwind.css -o _site/css/tailwind.css --postcss"
}
```
