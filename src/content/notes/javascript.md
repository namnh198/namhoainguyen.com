---
title: Javascript
createDate: 2024-11-16
published: true
tags:
  - Javascript
---
## Miscellaneous
- Using `//` for 1 line comment, `/* */` for multi-line comments
- JS can be execute without `;` but it's minified need to be `;`
- Variable and function name are case sensitive
- Variables/functions should be names with format camel case (`nameOfVariable`)
	- Name a constant: `const FAV_PET = 'Cat'`
	- `UpperCamelCase` should be used by conversion for ES6 class names.
- Using `\` for special characters, for example `\"` for `"` inside double quote
## Practice directly on the browser
Open the browser (I use `Brave`), press `F12` to open *Inspect* window, then choose tab `Console`. Now you can practice on this console window, for example, try with `console.log("Hello World")` end press `Enter`
## ES6
- "ES" = "**E**CM**S**cript" ~ "Javascript"
- Most of browser use ES6 but not all
- ES6 = ES2015
- New feature: `Arrow Function`, `Classes`, `Modules`, `Promise`, `Generator`, `let` and `const`
- Read more about ES on w3schools.
### Concise things

```js title="main.js"
// Concise Object Literal Declaration
const getMousePosition = (x, y) => ({ x, y});
```

```js title="main.js"
// Concise Declarative Functions
const persons = {
	name: "Nam Nguyen",
	sayHello() {
		return `Hello. My name is ${this.name}`; // Hello. My Name is Nam Nguyen
	}
}
```

### Getters and setters

```js title="main.js"
class Book {
	constructor(author) {
		this._author = author;
	}

	// getter
	get author() {
		return this._author;
	}

	// setter
	set author(author) {
		this._author = author;
	}
}

const book = new Book('anonymous');
console.log(book.author); // anonymous
```

## Export/Import to share code blocks

```js title="calculator.js"
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;

export { add, subtract};

export default function (x, y) {
	return x + y;
}
```

```js title="main.js"
import { add, subtract } from './calculator.js' // only add, subtract
import * as everthing from './calculator.js'; // everything
import anything from './calculator.js' // import default
```

## Declare variables & scope

```js title="main.js"
var name; // global scope
let age; // ES6, block scope (inside {} or function,...)
const PI = 3.14; // ES6 can't be changed
```

```js title="main.js"
function funcName() {
	let nameInFuc = 'anonymous'; 
}


console.log(nameInFuc); // undefined

```

Difference between `var`, `let`, `const`

> [!multi-column]
> 
>> [!example] var scope
>> ```js
>> var a = 1;
>> var a = 2; // ok a = 2 now
>> a = 5; // ok a = 5 now
>>```
>
>> [!example] let scope
>> ```js
>> let c = 1;
>> let c = 2; // error, this variable is declared
>> c = 3; // ok, c = 3 now
>> ```

> [!multi-column]
> 
>> [!example] const scope
>> ```js
>> const b = 1;
>> const b = 2; // error
>> b = 2; // error
>>```
>
>> [!example] const scope
>> ```js
>> const s = [1,2,3];
>> s = [1,2,3,4]; // error
>> s[1] = 3; // OK
>> ```

## Output

```js
// print output
console.log('Hello World');

// print error message
console.error('Simple Error');

// print warning message
console.warn('Simple Warning');

// print a table
console.table({'a': 1, 'b': 2});

// group content in a separate block
console.group('simple');
console.log('Output here');
console.error('Error here');
console.groupEnd();
```
## Special operators
### `||` vs `??`
- `||` check `false` values
- `??` check `null` or `undefined`

```js
const a = 0 || 1; // output 1
const b = 0 ?? 1; // output 0
const c = false || 1; // output 1
const d = false ?? 1; // output false
const e = null || 1; // output 1
const f = null || 1; // output 1
```
## `async`, `await`, `promise`

You don't need use `try/catch` in every async/await. You only **need** to do it at the top level
### Sync vs Async
#### Sync
In synchronous programming, operations are performed one after the other, in sequence. Each line of code needs to wait for the previous one to finish before proceeding to the next.
  
```js
console.log('Hi');
console.log('Nam');
console.log('How are you?');

// output
// Hi
// Nam
// How are you?
```
#### Async 
Asynchronous programming, on the other hand, allow multiple tasks to run independently of each other. A task can be initiated and while waiting for it to complete, other tasks can proceed.

```js
console.log('Hi');
setTimeout(() => console.log('Nam'), 3000);
console.log('How are you?');

// output
// Hi
// How are you?
// Nam
```
### Time difference `Promise all` && `async...await`

```js
const data = await Promise.all([timeout(3000), timeout(2000), timeout(1000)]);
//                              delay 1       delay 2         delay 3
// ms ------ 1s ------ 2s ------- 3s
// ============================== 0 delay 1
// =================== 0 delay 2
// ========= 0 delay 3
// ============================== Promise all (executed in 3s)
```
```js
await timeout(3000); await timeout(2000); await timeout(1000);
// -- delay 1 ------------ delay 2 ------------ delay 3
// ms -- 1s ---- 2s ---- 3s ---- 4s ---- 5s ---- 6s
// ===================== 0 delay 1
// ===================================== 0 delay 2
// ============================================= 0 delay 3
// ============================================= async...await executed 6s
```

**Note:** If there is no data dependency you should use `Promise.all`
