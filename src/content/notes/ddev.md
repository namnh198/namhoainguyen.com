---
title: DDEV & Related Things
published: true
draft: true
createDate: 2024-05-25
tags:
  - Web-Dev
  - Tools
---

> [!info] 
> Quick references DDEV to launch web development environments. View the [official docs](https://ddev.readthedocs.io/en/stable/) for more information.

## Why I used

- I loved DDEV because it simplifies the process of setting up local development environments. No need for manual installation and configurations of Webservers, databases and other dependencies.
- DDEV support various web frameworks and CMS such as Laravel, Magento, Wordpress,... Check [this link](https://ddev.readthedocs.io/en/stable/users/quickstart/) to view more.
- I can config workflow tailored to my specific projects need with extension and custom command.
## Some commands I usually use
> [!multi-column]

```bash
# intialize ddev
ddev config 

# delete project
ddev ddev --omit-snapshot <project_id>

# list all projects
ddev list

# start ddev into project
ddev start

# stop ddev into project
ddev stop

# restart into project
ddev restart

# logs container
ddev log <services>

# list out ddev services per-project
ddev describe

# download add-on
ddev get <add_on>

# db gui
ddev sequeplace # launch Seq


```
## Configurations
- Overriding the default configurations `nginx` please removing `#ddev-generated` on file `.ddev/nginx/nginx_full/nginx-site.conf`. If not when running `ddev restart` it will revert to default DDEV configurations.
- `web_extra_daemon`: add extra daemons to startup automatically inside web container.
  
```yaml
web_extra_daemons: 
	- name: 'http-1' 
	- command: 'PORT=3000 npm run dev' 
	- directory: /var/www/html
```

- `omit_containers`: List some containers should not be loaded automatically for one or more projects

```yaml
omit_containers: [db]
```
## NextJS Nginx Configurations

```html title=".ddev/nginx_full/nginx-site.conf"
server {
	listen 80;
	listen 443 ssl; 
	ssl_certificate /etc/ssl/certs/master.crt; 
	ssl_certificate_key /etc/ssl/certs/master.key;

	location / { 
		proxy_pass http://localhost:3000; 
		proxy_http_version 1.1; 
		proxy_set_header Upgrade $http_upgrade; 
		proxy_set_header Connection 'upgrade'; 
		proxy_set_header Host $host; 
		proxy_cache_bypass $http_upgrade; 
	} 
	
	 
	include /etc/nginx/monitoring.conf;
	error_log /dev/stdout info; 
	access_log /var/log/nginx/access.log; 
	include /etc/nginx/common.d/*.conf; 
	include /mnt/ddev_config/nginx/*.conf; 
}
```
## Performance Mode

- Mutagen
  
```bash
ddev mutagen reset # reset data
ddev config --global --performance-mode=none # disable for all projects 
ddev config --performance-mode=none # disable for per-project
```
## PHPSTORM
- For easy setup PHPStorm, You can install `DDEV Integration` from [homepage](https://plugins.jetbrains.com/plugin/18813-ddev-integration) or by searching the in-app marketplace (Preferences -> Plugins -> Marketplace) for "DDEV"

- On version PHPStorm 2024.1.1, this plugins could not install from marketplace because their dev has not published its yet. To use it, we can install preview version with follow guide
	- Download [the zip file](https://github.com/php-perfect/ddev-intellij-plugin/actions/runs/8693039236/artifacts/1415228444)
	- Uncompress the zip. (DO NOT use default unzip applications MacOS. Need to use CLI or another tool example [The Unarchiver](https://theunarchiver.com/))
	- Install Plugins by steps Install from disk -> choose file `ddev-intellij-plugin-0.0.1-dev.zip`