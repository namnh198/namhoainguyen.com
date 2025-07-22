---
title: ENV in Node.Js
tags:
  - Backend
  - Web-Dev
  - Node-Js
published: true
draft: true
createDate: 2023-11-10
---

DotEnv has been an amazing library that I’ve used for years. Node.js `v20.6.0` is finally release and include
support `.env` files

We now have built-in support for the `.env` file. This mean that you can finally stop using the `dotenv` package to load
environment variables from `.env` file. The authors of `dotenv` package is archived his Github repository.

## Setting up

Suppose you have a simple Express application

```javascript showLineNumbers title="app.js"
import express from 'express';

const app = express();

app.get('/', async (req, res) => {
  res.send(`Hello! My name is Nam Hoai Nguyen.`);
});

app.listen(PORT, async () => {
  console.log(`App listening on port 3000`);
});
```

Now, create a file that had been named `.env` at the root of the application next to `app.js` file to store the
environment variables.

```bash title=".env"
NAME="Nam Hoai Nguyen"
PORT=3000
```

By default, the Node.Js will be used file `.env` to store environment variables. We can change the file name for our
application by using the argument `env-file` in start command. Example:

```bash
node --env-file=.env.local app.js
```

Need to change `app.js` to check `.env` is working correctly

```js showLineNumbers title="app.js" del={6,11} ins={7,12}
import express from 'express';

const app = express();

app.get('/', async (req, res) => {
  res.send(`Hello! My name is Nam Hoai Nguyen.`);
  res.send(`Hello! My name is ${process.env.NAME}.`);
});

app.listen(PORT, async () => {
  console.log(`App listening on port 3000`);
  console.log(`App listening on port ${process.env.PORT}`);
});
```

Then now if you visit `http://localhost:3000` you should see the text : “Hello, My name is Nam Hoai Nguyen”

> [!warning] It does not seem to support unescaped multi-line values though, which `dotenv` v15 support
