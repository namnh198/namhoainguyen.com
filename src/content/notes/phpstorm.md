---
title: PHPStorm
createDate: 2022-11-14
published: true
tags:
  - Skills
  - Tools
---
## Installation
 
> [!tip] Check official guide to install: [https://www.jetbrains.com/phpstorm/](https://www.jetbrains.com/phpstorm/)
## Settings
### Fonts
- Font ligatures: **Setting** -> **Editor** -> **Font** -> **Enabled ligatures**
### Debuging
1. Install Xdebug
2. Settings -> PHP -> Debug
3. Settings -> PHP -> Server
4. Enabled Debug Mode
**P/S:** If you're using Docker. You need to setup mapping path firstly.
## Keyboards Shortcut

> [!tips]
> List keyboard shortcut that I usually use. If you want more please check on official guide: [https://www.jetbrains.com/help/phpstorm/mastering-keyboard-shortcuts.html](https://www.jetbrains.com/help/phpstorm/mastering-keyboard-shortcuts.html)

## Live Templates

Use **Live Templates** to create a custom snippets such as loops, conditions, print statements,...
1. Go to `Settings -> Editors -> Live Templates`
2. Click `+` button to add a new live template
3. Give your template a name and a description
 
```php

// Print array
echo '<pre>';
print_r($END$);
die;
```

## Plugins
- **Codeium:** Autocomplete code from AI
- **GitToolBox:** Extends Git Integration with additional features
- **Rainbow Brackets:** Highlight various types bracket (round, squiggly, square, angle)
- **Magento PhpStorm:** A better plugins help developer work with Magento 2
## Indexing Options
### Limit CPU Usage
By default, PHPStorm allows full CPU usage (100%). Therefore the CPU is overloaded
- For indexing only
Go to: Help -> Edit Custom Properties

```shell frame="none"
caches.indexerThreadsCount=4 
caches.scanningThreadsCount=4
```

- For all (Include Search Files,...)
Go to: Help → Edit Custom VM Options

```shell frame="none"
-XX:ActiveProcessorCount=4
```
### Directories Exclude and Ignore Files
To improve performance, please exclude and ignore some directories and files that don’t use to scan & index (Such as log file, symlink,…)
- **Directories exclude:** File → Setting → Directories → Select unused folder to exclude
- **Ignore files:** File → setting → Editor → File Types → Ignore Files and Folder → Add a new record
**P/S**: If you have multiple project with the same platform. You can use shared indexes for these one
**Go to:** File → Setting → Tools → Shared Indexes → Enable “Wait for shared indexes” (Updated: From Version PhpStorm 2023.3.1 it has been changed PHP Composer Packaged → Download Automatically)