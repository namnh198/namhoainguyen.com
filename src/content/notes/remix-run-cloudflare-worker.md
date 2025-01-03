---
title: Remix.run + Cloudflare Worker
published: true
tags:
  - React-Js
  - Tools
  - Web-Dev
createDate: 2025-01-03
---
## References
- [Cloudflare Worker](https://developers.cloudflare.com/workers/)
- [Remix.Run](https://remix.run/docs/en/main)
- [Cloudflare Worker - Remix](https://developers.cloudflare.com/workers/frameworks/framework-guides/remix/)
## Create Project Cloudflare Worker + Remix.run

```shell
npm create cloudflare@latest your-project -- --framework=remix --experimental
```

## Wrangler.toml

```toml title="wrangler.toml"
name = "your-project"
compatibility_date = "2024-12-18" compatibility_flags = ["nodejs_compat_v2"]
main = "./server.ts"
assets = { directory = "./build/client" } 

# enabled log
[observability] 
enabled = true

# defined variables  [vars]
GITHUB_REPO = "namnh198/SecondBrain" CACHE_EXPIRED = 14400 DOMAIN = "namhoainguyen.com" ```

**P/S:** With Secret Environments, you should defined on `.dev.vars`

## KV Namespace

### Create KV Namespace

```shell
npx wrangler kv namespace create cache
```

### Defined KV on `wrangler.toml`

```toml title=wrangler.toml
[[kv_namespaces]]
binding = "cache"
id = "kv_namespace_id"
```

### How to use

```tsx showLineNumbers title=routes/_index.tsx
import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const cacheKey = 'test-cached';

	// get cached by cacheKey
	const cache = await context.cf.env.cache.get(cacheKey);
	if(cache) return JSON.parse(cache); // if cache exists return JSON cache
	const data = {"name": "Nam Hoai Nguyen", "text": "Hello World" }
	await context.cf.env.cache.put(cacheKey, JSON.stringify(data), {expirationTtl: 86400 }); // expired cached
	return data;
}

export default function Index () {
	const data = useLoaderData<typeof loader>();
	return (
		<ul>
			<li>{data.name}</li>
			<li>{data.text}</li>
		</ul>
	)
}
```
## LazyImages

### Install `@unpic/react`

```shell
npm install @unpic/react
```

### Create LazyImage Components

```tsx showLineNumbers title=components/lazy-image.tsx
import { useState, useEffect } from 'react';
import { type ImageProps as UnpicImageProps, Image as UnpicImage } from '@unpic/react';

export type ImageProps = UnpicImageProps & {
  isLoader?: boolean
};

export default function LazyImage(props: ImageProps) {
	const [loaded, setLoaded] = useState<boolean>(false);
	
	useEffect(() => {
		if(!props.isLoader) return;
		
		if (props.src) {
			const img = new Image();
			img.src = props.src;
			img.onload = () => {
				setLoaded(true);
			};
		}
	}, [props.src]);
	
	if (!loaded) {
		return (
			<span 
				className={cn('inline-flex items-center justify-center animate-spin', props.className)} 
				style={{ width: props.width || 'auto', height: props.height || 'auto' }}>						
				<span>Loading...</span>
			</span>
		);
	}

  return <UnpicImage {...props} />;
}
```