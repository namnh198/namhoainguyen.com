---
title: Using Github as a Comment system for your site
tags:
  - Web-Dev
  - SSG
published: true
createDate: 2024-07-15
updateDate: 2024-12-14
---
> [!todo] In this note, we will explore both [utterances](https://github.com/utterance/utterances) and [giscus](https://github.com/giscus/giscus). However, I prefer **giscus**.
## Why choose giscus over utterances?
- giscus is actively maintained while utterances is not.
- giscus utilizes discussions, whereas utterances uses issues.
- giscus supports "reply" in comments, but utterances doesn't.
- giscus provides wrappers for popular frameworks, unlike utterances, which only uses js (requiring manual implementation, though not overly complicated).
## How to use giscus
If you are using plain JS, simply follow the [official guide](https://giscus.app/).

> [!tip]+ change theme by click toggle theme
> ```js showLineNumbers title="main.js"
> // change theme to dark when click toggle-theme
> const toggleTheme = document.querySelector('[toggle-theme]');
> toggleTheme.addEventListener('click', () => {
> 	function sendMessage(message) {
> 		// check giscus is initial
> 		const iframe = document.querySelector('iframe.giscus-frame');
> 		if (! iframe) return;
> 		// put message to giscus
> 		iframe.contentWindow.postMessage({ giscus: message}, 'https://giscus.app');
> 	}
> 	sendMessage({
> 		setConfig: {
> 			theme: theme === 'dark' ? 'light' : 'dark'; // Change theme to light if current theme is dark
> 		}
> 	})
> })
> ```
> 
> Checkout [my component](https://github.com/namnh198/namhoainguyen.com/blob/main/src/components/common/basic-scripts.astro#L61)

For those wanting to use it with Web Frameworks like React or Vue, refer to this [giscus-component](https://github.com/giscus/giscus-component).
### Migrating from utterances
To integrate **giscus** into your website, follow the instructions provided in the [official guide](https://giscus.app/).

You can convert each issue to the corresponding discussion. Make sure what you choose in the config of Mapping between posts and discussions (giscus) or issues (utterances) is consistent. In my case, I choose "page title".

> [!tip] 
> Before migrating, consider creating a new discussion with the exact name you will use for the comments. Then add some comments to that discussion. After reloading your page, you should see the comments. Remember to remove this test before migrating to avoid any conflicts. 

In each issue, an option "Convert to discussion" is available at the bottom right.

If you wish to convert multiple issues at once:
1. Ensure the issues are open.
2. Create a new label (in the label overview page — `github.com/username/your-repo/labels`), for example, "comments".
3. Return to the issues page, select all the pages you want, and then add the label "comments" to them.
4. Navigate back to the label overview page, where you will see a button "Convert to discussions" next to the label "comments".
## Using utterances
Simply follow the [official guide](https://utteranc.es/).

For integration in **Next.js** or in any React site, follow these steps:
1. Create a hook 
   
```tsx showLineNumbers
import { useEffect, useState } from 'react'

const useScript = (params: any) => {
	const { url, theme, issueTerm, repo, ref } = params
	const [status, setStatus] = useState(url ? 'loading' : 'idle')
	
	useEffect(() => {
		if (!url) {
			setStatus('idle')
			return
		}
	
		const script = document.createElement('script')
		script.src = url
		script.async = true
		script.crossOrigin = 'anonymous'
		script.setAttribute('theme', theme)
		script.setAttribute('issue-term', issueTerm)
		script.setAttribute('repo', repo)
		
		// Check if the script is already in the document?
		const existingScript = !!document.getElementsByClassName('utterances')[0] || ref?.current?.firstChild
		if (existingScript) {
			setStatus('ready')
		} else {
			ref.current?.appendChild(script)
		}
	
		const setAttributeStatus = (event: any) => {
			setStatus(event.type === 'load' ? 'ready' : 'error')
		}
	
		script.addEventListener('load', setAttributeStatus)
		script.addEventListener('error', setAttributeStatus)
	
		return () => {
			if (script) {
				script.removeEventListener('load', setAttributeStatus)
				script.removeEventListener('error', setAttributeStatus)
			}
		}
	}, [url])

	return status

}

export default useScript
```

2. Use this hook in **a client component** (`'use client'`)
   
```js showLineNumbers
'use client' 
// imports 
const Comments = () => { 
	const comment = useRef(null) 
	const status = useScript({ 
		url: 'https://utteranc.es/client.js', 
		theme: 'github-light', 
		issueTerm: 'title', 
		repo: 'namnh198/namhoainguyen.com', 
		ref: comment 
	}) 
	return ( 
		<div className={cn(className, containerNormal, 'mt-8')}> 
			{status === 'loading' && ( <div>Loading comments...</div> )} 
			<div ref={comment}></div> 
		</div> 
	) 
} 

export default Comments
```