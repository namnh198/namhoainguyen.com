---
title: Alpine.Js
createDate: 2024-12-14
published: true
draft: true
tags:
  - Javascript
---

## References

- [Official Docs](https://alpinejs.dev/start-here)

## What's Alpine?

- A modern lightweight Javascript framework - A jQuery replacement
- Despite being lightweight, it manages to encapsulate almost all the functionalities

## Installation

### Use CDN

```html showLineNumbers title="index.html" ins={3,6}
<html>
  <head>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  </head>
  <body>
    <h1 x-data="{ message: 'Hello Worlds' }" x-text="message"></h1>
  </body>
</html>
```

### Import

```shell
npm install alpinejs
```

```js showLineNumbers title="main.js"
import Alpine from 'alpinejs';
window.Alpine = Alpine;
Alpine.start();
```

## How to use

### `x-data`

`x-data` defines a chunk of HTML as an Alpine component and provides the reactive data for that component to reference.

Everything in **Alpine** always starts with the `x-data` directive

```html title="index.html"
<div x-data="{ message: 'Hello World' }">
  <div x-text="message"><!-- output: "Hello world" --></div>
</div>
```

Because `x-data` is evaluated as a normal Javascript object, you can store object, method for it

```html title="index.html"
<div x-data="{ opened: false, toggle() { this.opened = !this.opened } }">
  <button @click="toggle()">Toggle Content</button>
  <div x-show="opened">Content...</div>
</div>
```

```html title="index.html"
<div x-data="{ count: 0 }">
  <button x-on:click="count++">Increment</button>
  <span x-text="count"></span>
</div>
```

Parsing **Alpine** data from external `JS`

```html title="index.html"
<div x-data="dropdown">
  <button @click="toggle()">Toggle Content</button>
  <div x-show="opened">Content...</div>
</div>
```

```js title="main.js"
document.addEventListener('alpine:init', () => {
  Alpine.data('dropdown', () => ({
    opened: false,
    toggle() {
      this.opened = !this.opened;
    }
  }));
});
```

### `x-on`

Allowing you easily run code on dispatched DOM events

```html
<button x-on:click="alert('Hello World')">Click to alert</button>

<!-- Shorten -->
<button @click="alert('Hello World')">Click to alert</button
```

List events support:

- `@keyup`
- `@keydown`
- `@click`
- ...

### `x-bind`

`x-bind` allows you to set HTML attributes on elements based on the result of JS expressions

```html
<div x-data="{ placeholder: 'Type here...' }">
  <input type="text" x-bind:placeholder="placeholder" />
</div>

<!-- Shorten -->
<div x-data="{ placeholder: 'Type here...' }">
  <input type="text" :placeholder="placeholder" />
</div>
```

### `x-text` & `x-html`

2 attributes set the content of an element to the result.

- `x-text` will be set text content (HTML in content will be escaped)
- `x-html` will be set the `innerHTML`

## Use Plugin

```html showLineNumbers title="index.html" ins={5, 9-14}
<html>
  <head>
    <!-- .... -->
    <!-- import collapse script -->
    <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>
  </head>
  <body>
    <!-- .... -->
    <div x-data="{ expanded: false }">
      <button @click="expanded = !expanded">Toggle Content</button>
      <p id="foo" x-show="collapse" x-collapse>Lorem ipsum....</p>
    </div>
  </body>
</html>
```

## Alpine in Astro

### Installation

```shell
npx astro add alpinejs
```

The `@astrojs/alpine` integrations adds `Alpine` to the global window object. For IDE autocompletion, add the following to your `src/env.d.ts`

```ts title="src/env.d.ts"
interface Window {
  Alpine: import('alpinejs').Alpine;
}
```

### Configuration Options

You can extend Alpine by setting the `endpoint` option to root-relative

```js title=astro.config.mjs ins={5}
import { defineConfig } from 'astro/config';
import alpine from '@astrojs/alpinejs';
export default defineConfig({
  // ...
  integrations: [alpine({ entrypoint: '/src/entrypoint' })]
});
```

```ts title="src/entrypoint.ts"
import type { Alpine } from 'alpinejs';
import intersect from 'alpinejs/intersect';

export default (Alpine: Alpine) => {
  Alpine.plugin(intersect);
};
```
