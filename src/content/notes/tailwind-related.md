---
title: Tailwind & Related Things
published: true
draft: true
createDate: 2024-03-23
tags:
  - Web-Dev
updateDate: 2025-04-13
---
## Best practices
- ([source](https://tailwindcss.com/docs/reusing-styles#avoiding-premature-abstraction)) Don't use `@apply` just to make things look "cleaner". Otherwise you are basically just writing CSS again and throwing away all of the workflow and maintainability advantages Tailwind gives you.
- [Play with tailwind](https://arc.net/l/quote/abkcocyk)
## Tailwind v4

- [Default theme variable reference](https://tailwindcss.com/docs/theme#default-theme-variable-reference)
- [All directives](https://tailwindcss.com/docs/functions-and-directives#directives) like `@theme`, `@source`, `@plugin`
- Define custom font weight

```typescript
// old in tailwind.config.ts
theme {
	extend: {
		fontWeight: {
			inherit: 'inherit'
		}
	}
}

// new in globals.css
@theme {
	--font-weight-inherit: 'inherit'
}
```

- Alternative to `content` in old config -> `@source`
- Imports plugins:

```typescript
@plugin 'tailwindcss-animate'; 
@plugin '@tailwindcss/typography';
```

- Use `@utilities` instead of `@layer utilities`

```ts
// old
@layer utilities {
	.custom-class {...}
	.another {
		@apply hover:custom-class; // <- error in v4, undefined custom-class
	}
}

// new v4
@utility custom-class {...}
.another {
	@apply hover:custom-class;
}

```
## `group-hover` with `prefix`

```html
<div class="tw-group">
	<div class="group-hover:tw-bg-slate-500"></div>
</div>
```
## `:not` in tailwind

Example: Don't apply `:hover` effect on the `:disabled` button

```css
[&:not(:disabled)]:hover:tw-bg-gray-500
```
## Color preview doesn't show in VSCode
If you have a custom color in tailwind config file that is CSS Variables, It will not show preview in VSCode (preview = a square containing the color before the class)

```js
{
	theme: {
		extend: {
			colors: {
				'custom': 'var(--custom-color)', // not show
				'hello': '#000', // show
			}
		}
	}
}
```
