---
title: How to integrate Markdown in Remix.run
published: true
tags:
  - React-Js
  - Remix-Run
  - Git
  - SSG
  - Javascript
  - Node-Js
createDate: 2025-01-03
---
## MDX routes modules
The easiest way to integrating Markdown into Remix is probably to use [MDX route modules](https://remix.run/docs/en/main/guides/mdx) 

```mdx title=routes/markdown.mdx
---
title: Remix Markdown
---

# A routes module using MDX
```

If you're using `Vite`, we need to add [MDX Rollup plugin](https://mdxjs.com/packages/rollup). Please follow [guide here](https://remix.run/docs/en/main/guides/vite#add-mdx-plugin)

## Markdown from Remote Server (Github)
### Fetching markdown content

This way, we are able to review new blog posts without re-deploy

Github provides a solution to retrieve data through [REST API](https://docs.github.com/en/rest/repos/contents)

```typescript showLineNumbers title="github.server.ts"
export const fetchGithub = (path: string) => {
	const token = '<your_access_token>';
	const owner = '<your_github_owner>';
	const repo = '<your_repo>';
	
	const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path ?? ''}`
	
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Accept': 'application/vnd.github.v3.raw',
			'User-Agent': '<your_app_name>',
			'X-GitHub-Api-Version': '2022-11-28',
			'Authorization': `Bearer ${token}`
		}
	});
	
	if(!res.ok || !res.body) throw res;

	return res;
}

export const getMarkdown = (path: string) => {
	const res = await fetchGithub(path);
	const content = await res.text();
	return content;
}

/**
* Get all markdown file from your repository
*/
export const getFilesMarkdown = (path: string) => {
	const res = await fetchGithub(path);
	const files = await res.json();

	return await Promise.all(
		files
			.filter(file => file.path.endsWith('.md'))
			.map(async file => getMarkdown(file.path))
		
	)
}
```
### How to parse front-matter

Installation `front-matter`

```shell
npm i front-matter
```

```typescript title="github.server.ts" ins={7} del={6}
import fm from 'front-matter';

export const getMarkdown = (path: string) => {
	const res = await fetchGithub(path);
	const content = await res.text();
	return content;
	return { attributes, body } = fm(content);
}

```
### Transforming Markdown to HTML

```shell
npm i react-markdown
```

```tsx title=routes/blog.$slug.tsx
import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { getMarkdown } from '~/github.server';
import ReactMarkdown from 'react-markdown';

export const loader = ({ params }: LoaderFunctionArgs) => {
	const { slug } = params;
	if(!slug) throw new Error('Page not found.');
	const post = await getMarkdown(`${slug}.md`);
	if(!post) throw new Error('Page not found.');
	return post;
}

export default function BlogDetail() {
	const { attributes, body } = useLoaderData();
	
	return (
		<article>
			<h1>{attributes.title}</h1>
			<ReactMarkdown>{body}</ReactMarkdown>
		</article>
	)
}
```

### Custom React Markdown

Simply follow the [official guide](https://github.com/remarkjs/react-markdown) to custom React Markdown

```shell
npm i remark-gfm rehype-raw
```

```tsx title=routes/blog.$slug.tsx del={11} ins={1-2,12}
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

...
export default function BlogDetail() {
	const { attributes, body } = useLoaderData();

	return (
		<article>
			<h1>{attributes.title}</h1>
			<ReactMarkdown>{body}</ReactMarkdown>
			<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{body}</ReactMarkdown>
		</article>
	)
}
...
```

#### Syntax Highlighting

```shell
npm i shiki
```

```tsx title=routes/blog.$slug.tsx del={10} ins={1,11-17}
import CodeBlock from '~/components/code-block';

...
export default function BlogDetail() {
	const { attributes, body } = useLoaderData();

	return (
		<article>
			<h1>{attributes.title}</h1>
			<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{body}</ReactMarkdown>
			<ReactMarkdown 
				remarkPlugins={[remarkGfm]} 
				rehypePlugins={[rehypeRaw]}
				components={{
					pre: CodeBlock
				}}
			>{body}</ReactMarkdown>
		</article>
	)
}
...
```

```tsx showLineNumbers title=components/code-block.tsx
import { useEffect, useState, ReactElement } from 'react';
import { codeToHtml } from 'shiki';

export default function CodeBlock({ children, className }: { children?: any; className?: any }) {
	const childrenArray = Children.toArray(children);
	const codeElement = childrenArray[0] as ReactElement;
	const className = codeElement?.props?.className || '';
	const code = codeElement.props.children[0] || '';
	const lang = className?.replace(/language-/, '');
	const [highlightedCode, setHighlightedCode] = useState<string>();
	useEffect(() => {
		if (!code) return;
	
		codeToHtml(
			code, { 
				lang, 
				theme: 'catppuccin-mocha' 
			}
		).then(setHighlightedCode);
	}, [code, lang]);
	
	if (!code) return null;
	
	return (
		<pre className="bg-slate-800 text-slate-400 p-4 rounded overflow-x-auto">
			{highlightedCode 
				? (<code dangerouslySetInnerHTML={{ __html: highlightedCode }} />) 
				: (<code>{code}</code>)
			}
		</pre>
	);
}
```
## Shiki Highlighting + Cloudflare Worker bundle small
A Worker can be up to 10 MB in size _after compression_ on the Workers Paid plan, and up to 1 MB on the Workers Free plan

But if using Shiki the `build` folder size also increase from `~1MB` to `~10MB`, you could not deployed that current release to Worker if you're using Free Plan

> [!bug] ✘ [ERROR] Failed to publish your Function. Got error: Your Functions script is over the 1 MiB size limit (workers.api.error.script_too_large)

To resolve it, we should load the Shiki Script from `esm.sh`, which helps reduce the `build` folder size because of skipping Shiki.

```tsx showLineNumbers title="components/code-block.tsx" del={1, 8-13} ins={14-20}
import { codeToHtml } from 'shiki';

export default function CodeBlock({ code, lang = 'typescript' }: { code?: string, lang?: string }) {
	...
	useEffect(() => {
		if(!code) return;
		
		codeToHtml(
			code, {
				lang,
				theme: 'catppuccin-mocha'
			}
		).then(setHighlightedCode);
		// @ts-expect-error: load shiki from esm.sh to avoid large worker bundle
		import('https://esm.sh/shiki@1.23.1').then(async ({ codeToHtml }) => {
			setHighlightCode(await codeToHtml(code, { 
				lang, 
				theme: 'catppuccin-mocha', // theme shiki
			}))
		})
	}, [])
	...
}
```

### Fetching multiple Markdown Files

Usually, you want to display a list of all your content to users as well. GitHub offers [an API endpoint](https://docs.github.com/en/rest/repos/contents#if-the-content-is-a-directory) to get all files within a directory. From there, we can fetch each file content and parse the frontmatter. This should give us all the information required to render a list of contents.

```ts title=github.server.ts
/**
* Get all markdown file from your repository
*/
export const getFilesMarkdown = (path: string) => {
	const res = await fetchGithub(path);
	const files = await res.json();

	return await Promise.all(
		files
			.filter(file => file.path.endsWith('.md'))
			.map(async file => getMarkdown(file.path))
		
	)
}
```

### Caching Response Github
[GitHub throttles](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting) the number of requests you can make to their API. To avoid this, we can cache the responses from GitHub. If you're using Cloudflare Worker, you can use [[remix-run-cloudflare-worker|KV Namespaces]] to cache its