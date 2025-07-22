---
title: Hyva Theme Magento
createDate: 2024-12-08
tags:
  - Web-Dev
  - Magento
published: true
draft: true
---

## Installation

You need to buy and generate a license key and add Private Packagist to `composer.json`

```shell
composer config --auth http-basic.hyva-themes.repo.packagist.com token yourLicenseAuthentificationKey
composer config repositories.private-packagist composer https://hyva-themes.repo.packagist.com/yourProjectName/
```

Then, install the theme package and its dependencies

```shell
# install hyva-theme
composer require hyva-themes/magento2-default-theme

# setup magento
bin/magento setup:upgrade
```

Switch current theme to `hyva/default` theme: `Content -> Design -> Configuration`

In `developer` mode, the static content will be automatically generate, but in `production` mode, running
`bin/magento setup:static-content:deploy` is required.

### Troubleshooting

> [!bug] Hyva theme does not support old Magento Catcha. Please disable the default Magento Catcha form to work:

```shell
bin/magento config:set customer/catpcha/enable 0
```

> [!bug] Hyva theme does not support buit-in minification and bundling

Because Hyva theme has another command to minfy `CSS` and `JS`. If you enabled buit-in minification and bundling `HTML`,
`CSS`, `JS` maybe cause unwanted effects

```shell
bin/magento config:set dev/template/minify_html 0
bin/magento config:set dev/js/merge_files 0
bin/magento config:set dev/js/enable_js_bundling 0
bin/magento config:set dev/js/minify_files 0
bin/magento config:set dev/js/move_script_to_bottom 0
bin/magento config:set dev/css/merge_css_files 0
bin/magento config:set dev/css/minify_files 0
```

> [!missing] Hyva theme makes use of the Magento GraphQL API. Ensure required GraphQL modules are enabled

By default all Magento GraphQL modules are enabled. However, often unused GraphQL modules are disabled in Magento Stores
using Luma theme.

## Building your theme

The first step is to create a child theme that will contain all your customization. Set the parent theme to
`Hyva/default`

```bash
app/design/frontend/YourCompany/
├── default/
│   ├── registration.php
│   ├── theme.xml
│   ├── composer.json
```

Next, copy the `web` directory will all files from the parent theme `vendor/hyva-themes/magento2-default-theme/web/` to
your own child theme `app/design/frontend/YourCompany/default/web/`

## TailwindCSS

```js title="web/tailwind/tailwind.config.js"
module.exports = {
  ...
  // keep the original settings from tailwind.config.js
  // only add the path below to the purge > content settings
  ...
  content: [
    // this theme's phtml and layout XML files
    '../../**/*.phtml',
    '../../*/layout/*.xml',
    '../../*/page_layout/override/base/*.xml',
    // parent theme in Vendor (if this is a child-theme)
    //'../../../../../../../vendor/hyva-themes/magento2-default-theme/**/*.phtml',
    //'../../../../../../../vendor/hyva-themes/magento2-default-theme/*/layout/*.xml',
    //'../../../../../../../vendor/hyva-themes/magento2-default-theme/*/page_layout/override/base/*.xml',
    // app/code phtml files (if need tailwind classes from app/code modules)
    //'../../../../../../../app/code/**/*.phtml',
  ]
}
...
```

Once you make a change to your theme, be aware that you have to regenerate your theme's `style.css` file.

```css title="style.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Generating CSS

```shell
cd /path/to/project/app/design/frontend/YourCompany/default/web/tailwind/

# for production
npm run build-prod

# for development
npm run watch
```

Please read [[tailwind-related]] to take more information TailwindCSS

### CSS Structure

The source CSS files are located in the directory `web/tailwind`

```bash
./web/tailwind
├── components
└── theme
    └── components
        └── style
```

- The `components` directory is for reusable elements such as `button`, `input`, `slides`
- The `theme/components` directory is intend for larger components or pages, such as categories page, products page,
  account pages, etc

