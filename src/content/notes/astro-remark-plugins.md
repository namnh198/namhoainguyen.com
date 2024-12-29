---
title: Astro Remark Plugins
tags:
  - Web-Dev
  - SSG
createDate: 2024-08-15
published: true
---
> [!warning]+
> This is not a tutorial to create an Astro website, this is only a note! You can find some every new and useful techniques on this note alongside the official documentation.

## Installation
- First install nodejs
- Create a astro projects

```shell
npm create astro@latest
```

You should follow the installation steps given in the theme you choose.
## Setup & Deploy
## Templating
### Using `sass`

Installing `sass` module to compile

```shell
npm install sass
```

Write stylesheet

```astro title="src/components/MyComponent.astro"
<!-- css for inline -->
<style lang="sass">
	// write code here
</style>

<!-- css for global -->
<style is:global lang="sass">
	// write code here
</style>
```
### Using `tailwindcss`
#### Installing

```shell
npx astro add tailwind
```
#### Configuration

- ConfigFile: Default the config of tailwind is `tailwind.config.ts` 

```js title="astro.config.mjs" ins={8}
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // ...
  integrations: [
    tailwind({
      configFile: './custom-config.mjs',
    }),
  ],
});
```

- ApplyBaseStyles: By default, the integrations imports a basic `base.css` file on every page of your project. To disable this behavior, set `applyBaseStyles` to `false`.

```js title="astro.config.mjs" ins={8}
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // ...
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
```
## Content Collections
### Define Collections

```ts title="src/content/config.ts"
import { defineCollection } from 'astro:content';

const blogCollection = defineCollection({ /* ... */ });

// this key should match your collection directory name in "src/content"
export const collections = {
	'blog': blogCollection,
};
```
### Define collection schema

```ts title="src/content/config.ts"
import { defineCollection } from 'astro:content';
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({ /* ... */ });

const blogCollection = defineCollection({
	type: 'content', // content or data
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()).optional(),
		// ... more schema
	})
});

// this key should match your collection directory name in "src/content"
export const collections = {
	'blog': blogCollection,
};
```
### Using content in Astro

```astro title="src/pages/index.astro"
---
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
---
<ul>
	{posts.map(post => (
		<li>
			<a href={post.slug}/>{ post.data.title }</a>
		</li>
	))}
</ul>
```
### Render content to HTML

```astro title="src/pages/index.astro"
---
import { getEntry } from 'astro:content';
const post = await getEntry('blog', 'post-1'); // post-1 is slug markdown
const { Content } = await post.render();
---

<Content/>
```
## Framework Components
Astro supports a variety of popular frameworks including `react`, `preact`, `svelte`, `vue`, `solidjs`, `alpinejs`, `lit` with official integrations. To install it, please follow [this official guide](https://docs.astro.build/en/guides/framework-components/)
### Using frameworks

```astro title="src/pages/index.astro"
---
import MyReactComponent from '../components/react/my-react-component.jsx';
---
<html>
	<body>
		<h1>Use React Component</h1>
		<MyReactComponent />
	</body>
</html>
```
### Hydrating interactive Components

```astro title="src/pages/index.astro"
---
// Example: hydrating framework components in the browser.
import InteractiveButton from '../components/InteractiveButton.jsx';
import InteractiveCounter from '../components/InteractiveCounter.jsx';
import InteractiveModal from '../components/InteractiveModal.svelte';
---
<!-- This component's JS will begin importing when the page loads -->
<InteractiveButton client:load />

<!-- This component's JS will not be sent to the client until
the user scrolls down and the component is visible on the page -->
<InteractiveCounter client:visible />

<!-- This component won't render on the server, but will render on the client when the page loads -->
<InteractiveModal client:only="svelte" />
```

## Remark and Rehype
- Remark parses Markdown and MDX files and convert theme to HTML.
- Rehype parses and transforms HTML and exports HTML
  
> [!note] Astro supports adding third-party remark and rehype plugins for Markdown and MDX.

Plugins for both Remark and Rehype may be registered in the Markdown or MDX integrations in `astro.config.mjs`. Below, we is and example remark plugins of the markdown
### Create a Remark Plugins
Somewhere in a root project, create a `.mjs` file with the name you like, such as `remark-post-status.mjs`

```js title="remark-post-status.mjs"
export function remarkPostStatus () {
	return function (tree, file) {
		const currentDate = new Date();
		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(currentDate.getDate() -  7);
		
		const createdDate = new Date(
			file.data.astro.frontendmatter.createDate || currentDate
		); // get create date of post via frontendmatter
		
		if (createdDate >= sevenDaysAgo) {
			file.data.astro.frontendmatter.isNew = true;
		}
	}
}
```

This code will be applied to every markdown file in your project, one at a time. This checks the post is a new post or not if this file was created within 7 days ago and parses to `frontendmatter` of this file.

In order to register this remark plugin with Astro and make it applies to your markdown page, you need to reference its in your `astro.config.mjs` like this:

```js title="astro.config.mjs" ins={2,8}
import { defineConfig } from "astro/config";
import { remarkPostStatus } from "remark-plugins/remark-post-status.mjs"

// https://astro.build/config
export default defineConfig({
  integrations: [
    markdown({
      remarkPlugins: [remarkPostStatus]
    })
  ]
});
```

### List example `remark-plugin`
- `remark-toc`
- `remark-reading-time`
