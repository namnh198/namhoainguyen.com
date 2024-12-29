---
title: Install LEMP on MacOS
createDate: 2023-10-29
published: true
tags:
  - MacOS
  - Web-Dev
updateDate: 2024-11-10
---
- [x] Setup LEMP (Nginx, MySQL, multiple PHP) on MacOS. In the end, you'll have a robust, clean and fast local web development environment on Mac's M chip or Intel

> [!note] Verified It's working on MacOS Soloma
## Software needs to install:
- Xcode, Homebrew (required)
- Multiple PHP version (required)
- Xdebug (Optional - But highly recommend)
- Nginx & SSL (Required)
- MySQL (Optional)
- Elasticsearch (Optional - But required for Magento 2)
- Mailhog (Optional)
- DNSMASQ (Optional)
## Setup
### Xcode, Homebrew
Before starting you need a few tools installed to take the stress out of the setup process
You will be using the terminal a lot of coming up (I like WezTerm)

```bash
# install xcode
xcode-select-install

# install homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
### Multiple PHP Version
Some PHP version deprecated on the default homebrew. Use tab [shivammathur/php](https://github.com/shivammathur/homebrew-php)

```bash
brew tap shivammathur/php 

# Install PHP Version 
brew install shivammathur/php/php@7.4 
brew install shivammathur/php/php@8.1 
brew install shivammathur/php/php@8.2
```

By default, all PHP version are using port `9000`. We need to change the port for each PHP version to avoid conflict. Path file: `{bash} $(brew --prefix)/etc/<php_version>/php-fpm.d/www.conf`

```bash title="www.conf" del={1,4,7} ins={2,5,8}
user = _www
user = <username>

group = _www
group = staff

listen = 127.0.0.1:9000
listen = 127.0.0.1:9074 # ex: for php7.4
```

If you want to change configure php from path `{bash} $(brew --prefix)/etc/<php_version>/php.ini`{bash} `

```bash
# backup php.ini

cp "$(brew --prefix)/etc/php/7.4/php.ini" "$(brew --prefix)/etc/php/7.4/php.ini.bak"
```
```bash title="php.ini" del={1,4} ins={2,5}
upload_max_file_size = 2M
upload_max_file_size = 10M

post_max_file_size = 2M
post_max_file_size = 10M
```

**P/S:** After you adjust configure PHP, You must restart `php-fpm`
Once you are ready, starting up `php-fpm` for each version

```bash
brew services start php@7.4
brew services start php@8.1
brew services start php@8.2
```

Check that you have a configuration correctly

```bash
sudo lsof -i -n -P|grep php-fpm
```

![[PHP-FPM.png]]
#### Alias multiple PHP Version

```zsh title=".zshrc"
alias php74 = "$(brew --prefix)/opt/php@7.4/bin/php"
alias php81 = "$(brew --prefix)/opt/php@8.1/bin/php"
alias php82 = "$(brew --prefix)/opt/php@8.2/bin/php"
```
#### Switch between multiple PHP Version

```zsh title=".zshrc"
function phpv() { 
	brew unlink php 
	brew link --overwrite --force "php@$1" 
	php -v 
}
```
## Xdebug

```bash
brew link --overwrite --force php@8.2 # Switch to PHP 8.2
pecl install xdebug
```

**P/s:** PHP 7.4 only support xdebug <= 3.1.6. You can check it on [xdebug](https://xdebug.org/docs/compat#versions). To install, you must install specifically xdebug version

```bash
pecl install xdebug-3.1.6
```

**Note:** `pecl no valiable`: The root was caused by SSL certificates is invalid.. To install, we need to download & install package offline. View on [StackOverflow](https://stackoverflow.com/questions/76507083/pecl-install-no-releases-available)

```bash
# Install xdebug v3.3.0 
curl -k -O https://pecl.php.net/get/xdebug-3.3.0.tgz
pecl install --offline ./xdebug-3.3.0.tgz 
```
### Setup Xdebug for PHP

```shell title="php.ini"
xdebug.mode=debug 
xdebug.client_port=9003 # port xdebug by default is 9003 
xdebug.discover_client_host = 1 
xdebug.start_with_request=trigger 
xdebug.idekey=PHPSTORM xdebug.remote_connect_back=1 
xdebug.max_nesting_level=-1
```
## Nginx

```bash
# Install nginx 
brew install nginx 

# Start nginx 
sudo nginx 

# check nginx is working (default nginx port is 8080)
curl http://localhost:8080
```

```shell title="nginx.conf" del={1} ins={2}
#user nobody; 
user <your-username> staff; 
# NEXT, ADD THE FOLLOWING TO THE http {} block 
http { 
	... 
	server_names_hash_bucket_size 512; 
} 

# UPDATE INSIDE server {} block 
server { 
	...
	root <absolute_path>
	listen 80 default_server; # change port to 80
	server_name _; 
} 

# ADD FastCGI gateway to PHP-FPM 
location ~ \.php$ { 
	try_files $uri =404; 
	fastcgi_pass 127.0.0.1:9082; # use PHP 8.2
	fastcgi_param SCRIPT_FILENAME 
	$document_root$fastcgi_script_name; 
	include fastcgi_params; 
} 

# ADD Some Basic Security Header 

add_header X-Frame-Options "SAMEORIGIN"; 
add_header X-XSS-Protection "1; mode=block"; 
add_header X-Content-Type-Options "nosniff"; 

# SET Charset UTF-8 
charset utf-8; 

# ALLOW LARGE FILE UPLOAD 
http { 
	... 
	client_max_body_size 100M; 
}
```

Reload nginx to apply the new config

```bash
sudo nginx -s reload
```

Go to `http://localhost` to see the result (if the port is different 80, it must be `http://localhost:port`)
Check the PHP code can work on nginx

```php title="index.php"
<?php echo phpinfo(); ?>
```
### SSL
Install `mkcert`

```bash
brew install mkcert 
brew install nss # if you use Firefox 
mkdir "$(brew --prefix)/etc/nginx/ssl" 
cd "$(brew --prefix)/etc/nginx/ssl" 
mkcert -install 
mkcert localhost
```

```shell title="nginx.conf" ins={2-7}
server { 
	http2 on; 
	listen 443 ssl; 
	listen [::]:443 ssl; 
	ssl_certificate /opt/homebrew/etc/nginx/ssl/localhost.pem; 
	ssl_certificate_key /opt/homebrew/etc/nginx/ssl/localhost-key.pem; 
	ssl_ciphers HIGH:!aNULL:!MD5; 
}
```

Auto redirect HTTPS

```shell title="nginx.conf" ins={2}
server {
	return 301 https://$host$request_uri; 
}
```
## MySQL

```bash
brew install mysql 
brew services start mysql 

# mysql secure installation 
mysql_secure_installation
```

```shell title="my.cnf"
# Default Homebrew MySQL server config 
[mysqld] 

# Only allow connections from localhost 
bind-address = 127.0.0.1
mysqlx-bind-address = 127.0.0.1 
innodb_buffer_pool_instances=8 
innodb_buffer_pool_size=4G 
innodb_buffer_pool_chunk_size=512M 
max_allowed_packet=1024M 
sort_buffer_size=256M 
max_connections=1024 
default_authentication_plugin=mysql_native_password 
innodb_ft_min_token_size=2 

# Add mode only if needed 
sql_mode = "ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION"

# Set Default Charset 
character-set-server=utf8
collation-server=utf8_general_ci
```
### PHPMyadmin

```bash
brew install phpmyadmin
```
```shell title="nginx.conf"
location /phpmyadmin { 
	alias /opt/homebrew/share/phpmyadmin; 
	index index.php index.html index.htm; 
	location ~ \.php$ { 
		fastcgi_split_path_info ^(.+\.php)(/.+)$; 
		fastcgi_read_timeout 300; 
		fastcgi_pass 127.0.0.1:9082; 
		fastcgi_param SCRIPT_FILENAME 
		$request_filename; include fastcgi_params; 
	} 
}
```

Go to `https://localhost/phpmyadmin`
Or you can use another DB GUI such as Table Plus, DBeaver, Sequel Ace
## Mailhog

```bash
brew install mailhog 
brew services start mailhog 

# start with 
mailhog
```

Now, you can access MailHog at `http://localhost:8025`.
Send a test email and check MailHog

```shell
echo "Test email from Postfix" | mail -s "Test Email" hi@example.com
```
Next, update each `php.ini` file with the following, if you have multiple versions of PHP, and then restart `php-fpm`. Note, `test@localhost` should be used but will be overridden by any PHP scripts that run

```shell title="php.ini"
sendmail_path = /opt/homebrew/opt/mailhog/bin/MailHog sendmail test@localhost
```
## ElasticSearch (Need to install Magento 2)
From Magento Version ≥ 2.4, It has changed MySQL search to Elasticsearch.
### Install Elasticsearch & OpenJDK

```shell
brew tap elastic/tap 
brew install elastic/tap/elasticsearch-full 
brew install openjdk@17
```

**Symlink OpenJDK** so the system Java wrappers can find it. This information is also displayed as a Homebrew “caveat” after installing **OpenJDK**.

```shell
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
```

```zsh title=".zshrc"
export ES_JAVA_HOME=/opt/homebrew/Cellar/openjdk@17/<openjdk-version>/libexec/openjdk.jdk/Contents/Home
```

```yaml title="homebrew.mxcl.elasticsearch-full.plist"
<key>EnvironmentVariables</key>
<dict> 
	<key>ES_JAVA_HOME</key> 
	<string>/opt/homebrew/Cellar/openjdk@17/<openjdk-version>/libexec/openjdk.jdk/Contents/Home</string>
</dict>
```
******************Run & Test Elasticsearch******************
```shell
elasticsearch # option -d to run detach

curl -s http://localhost:9200
```

> [!bug]- Troubleshooting
> - `unable to install elasitcsearch`: Change “plist_options :manual => "elasticsearch” to “@plist_manual = "elasticsearch” on /opt/homebrew/Library/Taps/elastic/homebrew-tap/Formula/elasticsearch-full.rb:68
> - `elasticsearch fails to start`: add `**xpack.ml.enabled: false**` to `/opt/homebrew/etc/elasticsearch/elasticsearch.yml`
## DNSMASQ
To save yourself the fuss of editing your `hosts` file constantly you can use `dnsmasq`

```bash
brew install dnsmasq

echo 'address=/.test/127.0.0.1' > /opt/homebrew/etc/dnsmasq.conf  # add domain *.test to dnsmasq
sudo mkdir -v /etc/resolver 
sudo bash -c 'echo "nameserver 127.0.0.1" > /etc/resolver/test'
```

Start or restart “dnsmasq” (Need to sudo)

```bash
sudo brew services start dnsmasq
```

Confirm “dnsmasq” is working with a ping TLDs, one at a time

```bash
ping -c 1 test.test
```