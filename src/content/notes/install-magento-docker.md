---
title: Installing Magento via Docker
published: true
createDate: 2023-10-30T00:00:00
tags:
  - Web-Dev
  - Magento
---

## What's Magento

1. Open-Source PHP eCommerce
2. Large community
3. Full-featured eCommerce Platform (Products, Checkout, Order, Customer,...)
4. Incredibly flexible & highly structured
5. Very steep learning curve due to complexity
6. Enterprise edition & cloud edition available

## Prerequisites

In this note, we will install Magento version 2.4.6-p2. It's required some equipments. If you install another version,
please check system requirements firstly.

1. PHP >= 8.1 (should use PHP 8.2)
2. Composer >= 2.2
3. MySQL >= 8.0 (MariaDB >= 10.6)
4. Opensearch >= 2.5 (Elasticsearch 7.17)
5. Redis >= 7.0 (Optional - Handle cache and session if not, can use file)
6. RabbitMQ >= 3.11 (Optional)
7. Varnish >= 6 (Optional - Handle full page-cache)

## Docker

If you do not understand Docker. You can read note firstly: [[docker]]

### Folder structured

```bash
/ # root folder
├─ .docker/
│  ├─ nginx
│  │  ├─ nginx.conf
│  │  ├─ vhost.conf
│  ├─ mysql
│  │  ├─my.cnf
│  ├─ php
│  │  ├─ php.ini
│  │  ├─ php-fpm.conf
│  ├─ .env
│  ├─ docker-compose.yml
├─ html/
│  ├─ # Source code Magento
```

### List services

```yml title="docker-compose.yml"
version: '3.5'
services:
  # nginx:
  # generic:
  # fpm:
  # fpm-debug:
  # mysql:
  # elasticsearch:
```

Explain container:

- `generic`: include global configuration for PHP-FPM
- `fpm & fpm-debug`: PHP-FPM
- `nginx`, `mysql`, `elasticsearch`: create & configuration for nginx, mysql, elasticsearch

### Environment Variables

```shell title=".env"
MAIN_DOMAIN=!LOCAL_DOMAIN! # REPLACE TO YOUR DOMAIN
#NGINX_VER=1.23.2
#DOCKER_VER_TAG=1.3.6
#PHP_VER=8.2 # DEFAULT USE PHP 8.2
#DOCUMENT_ROOT=/app/pub
#SOURCE_PATH= # CHANGE IF MAGENTO DOCUMENT ROOT NOT IN HTML FOLDER
#MAGENTO_RUN_MODE=developer
#ENABLE_SENDMAIL=true
#PHP_MEMORY_LIMIT=4G
#EXT_PHP_EXTENSION=sodium
#UPLOAD_MAX_FILESIZE=128M
```

### Nginx

```yml title="docker-compose.yml" del={3} ins={4-18}
version: "3.5"
services:
  #nginx:
  nginx:
    restart: always
    image: 'nginx:${NGINX_VER:-1.23.2}-alpine'
    ports:
      - '80:80'
    volumes:
      - '${SOURCE_PATH:-../html}:/app:ro'
      - './nginx/nginx.conf:/etc/nginx/nginx.conf:ro'
      - './nginx/vhost.conf:/etc/nginx/templates/default.conf.template:ro'
    environment:
      - VIRTUAL_HOST=${MAIN_DOMAIN},${MULTIPLE_DOMAINS}
      - VIRTUAL_PORT=80
      - MAGENTO_ROOT=${MAGENTO_ROOT:-/app}
      - DOCUMENT_ROOT=${DOCUMENT_ROOT:-/app/pub}
      - UPLOAD_MAX_FILESIZE=${UPLOAD_MAX_FILESIZE:-128M}
  ...
```

### PHP-FPM

You can switch PHP version from Magento Docker Hub. The tag image has format: **<php_version>-fpm-\<docker-ver-tag>**

Example: image `8.2-fpm-1.3.6`

```yml title="docker-compose.yml" del={4,20,26} ins={5-19,21-25,27-33}
version: "3.5"
services:
  ...
  # generic:
  generic:
    image: alpine
    extra_hosts:
      - 'xdebug mailhog ${SHARED_SERVICES:-mysql redis elasticsearch mysql8}:${HOST_IP:-172.17.0.1}'
    environment:
      - DOCUMENT_ROOT=${DOCUMENT_ROOT:-/app/pub}
      - MAGENTO_RUN_MODE=${MAGENTO_RUN_MODE:-developer}
      - ENABLE_SENDMAIL=${ENABLE_SENDMAIL:-true}
      - UPLOAD_MAX_FILESIZE=${UPLOAD_MAX_FILESIZE:-128M}
      - PHP_MEMORY_LIMIT=${PHP_MEMORY_LIMIT:-4G}
      - "PHP_EXTENSIONS=bcmath bz2 calendar exif gd gettext intl mysqli pcntl pdo_mysql soap sockets sysvmsg sysvsem sysvshm opcache zip redis xsl ${EXT_PHP_EXTENSION:-}"
    volumes:
      - '${SOURCE_PATH:-../html}:/app'
      - './php/php.ini:/usr/local/etc/php/conf.d/zzz-magento.ini'
      - './php/php-fpm.conf:/usr/local/etc/php-fpm.d/zzz-magento.conf'
  # fpm:
  fpm:
    restart: always
    image: 'magento/magento-cloud-docker-php:${PHP_VER:-8.2}-fpm-${DOCKER_VER_TAG:-1.3.6}'
    extends: generic
  # fpm-debug:
  fpm_xdebug:
    restart: always
    image: 'magento/magento-cloud-docker-php:${PHP_VER:-8.2}-fpm-${DOCKER_VER_TAG:-1.3.6}'
    extends: generic
    environment:
      - "PHP_EXTENSIONS=bcmath bz2 calendar exif gd gettext intl mysqli pcntl pdo_mysql soap sockets sysvmsg sysvsem sysvshm opcache zip redis xsl xdebug ${EXT_PHP_EXTENSION:-}"
      - "PHP_IDE_CONFIG=serverName=${MAIN_DOMAIN}"
      - "XDEBUG_CONFIG=remote_host=xdebug"
  ...
```

### MySQL & PHPMyadmin

```yml title="docker-compose.yml" del={5} ins={6-26}
version: "3.5"
services:
  ...
  # mysql:
  mysql8:
    container_name: mysql8
    restart: always
    image: 'mysql:8.0.22'
    ports:
      - '3306:3306'
    volumes:
      - ./mysql8:/var/lib/mysql
      - ./mysql8.cnf:/etc/mysql/conf.d/custom.cnf:ro
      - ./dump:/dump:ro
    environment:
      - MYSQL_ROOT_PASSWORD=mysql
  phpmyadmin:
    container_name: phpmyadmin
    restart: always
    image: 'phpmyadmin/phpmyadmin:latest'
    environment:
      - MYSQL_ROOT_PASSWORD=mysql
      - PMA_HOST=mysql
      - VIRTUAL_HOST=phpmyadmin.local
      - CERT_NAME=localhost
  ...
```

### Elasticsearch

```yml title="docker-compose.yml"  del={4} ins={5-17}
version: "3.5"
services:
 ...
 # elasticsearch:
 elasticsearch:
  container_name: ddev-${DDEV_SITENAME}-elasticsearch
  hostname: ${DDEV_SITENAME}-elasticsearch
  image: elasticsearch:7.17.14
  ports:
  - '9200:9200'
 environment:
  - cluster.name=docker-cluster
  - discovery.type=single-node
  - bootstrap.memory_lock=true
  - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
  volumes:
  - ./elasticsearch:/usr/share/elasticsearch/data
```

