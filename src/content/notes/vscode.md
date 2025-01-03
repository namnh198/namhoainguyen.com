---
title: VSCode
tags:
  - Skills
  - Tools
  - MacOS
  - Linux
published: true
createDate: 2023-01-01
updateDate: 2025-01-03
---

> [!example]+ File to exclude list
> 
> ```json title="settings.json"
> "files.excludes": {
>	"**/.git": true,
>	"**/.svn": true,
>	"**/node_modules": true,
>	"**/.next": true,
>	"**/dist": true,
>	"**/.astro": true,
>	"**/.obsidian": true,
>	"**/build": true
> }
> ```

> [!example]+ Enable font ligatures
> For example, you type `>` + `=` => `>=`
> 1. Download Font
> 2. Extract and install the font
> 3. Configuration VSCode
>   
> ```json title="settings.json"
> {
> 	"editor.fontFamily": "JetBrains Mono",
> 	"terminal.integrated.fontFamily": "JetBrains Mono", // Change font terminal
> 	"chat.editor.fontFamily": "JetBrains Mono", // Change font chat 
> 	"editor.fontLigatures": true, // enabled font ligatures
> }
> ```

> [!example]+ Search Results VScode
> - Keyboard shortcut: Globals: `cmd + 3`, Editor: `cmd + R`
> - Exclude file or folders on search result: 
> ```json title="settings.json"
> {
> 	"search.exclude": {
> 		"**/node_modules": true,
> 		"**/bower_components": true,
> 		"**/*.code-search": true,
> 		"**/_site": true,
> 		"**/.next": true,
> 		"**/var/log": true
> 	}
> }
> ```

> [!example]+ List extensions
> I'm using [these extensions](https://www.namhoainguyen.com/bookmarks/#vscode-extension)
> 
> ```shell
> # list installed extensions
> code --list-extensions | xargs -L 1 echo code --install-extension
> ```

> [!example]+ Add extra path to auto complete (Laragon)
> 
> ```json title="settings.json"
> {
> 	"php.validate.executablePath": "C:\\laragon\\bin\\php\\php.exe",
> 	"terminal.integrated.shell.windows": "C:\\laragon\\bin\\cmder\\cmder.bat"
> }
> ```