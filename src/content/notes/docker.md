---
title: Docker
published: true
tags:
  - Linux
  - Docker
verified: true
createDate: 2023-10-02
---

## What and Why?

- Docker is an open source virtualization technology that makes it easy to build, test and deploy applications.
- You can ship your applications in a container environment that houses everything your application need to run
  (configuration, code,...)

### Abbreviate

- `ps` = process status: check running containers (with `a` for all)
- `i` = interactive: used in `docker exec` or `docker run`
- `t` = terminal: used in `docker exec` or `docker run`
- `m` = memory
- `v` or `-volume`: mount volume in/out containers
- `-rm` = remove: create temprarily a container (removed after exit)

### Installation

> [!info] For all platform, please check the [official guide](https://docs.docker.com/get-docker/)

**P/S:** On **MacOS** I recommend using [Orbstack](https://docs.orbstack.dev/) that is native MacOS and free for
Personally uses. It's really light, fast and simple way to use Linux Machines.

### Troubleshooting

- **`Got permission denied while trying to connect to the Docker daemon socket`**
  - Create the docker group: `sudo groupadd docker`
  - Create the docker group: `sudo usermod -aG docker ${USER}`
  - Logout and login again
    Source:<https://www.digitalocean.com/community/questions/how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket>
- **`Another application changed your Desktop configurations`**
  - Create symlink for docker-credential-ecr-login: `sudo ln -sf
    /Applications/Docker.app/Contents/Resources/bin/docker-credential-ecr-login
    /usr/local/bin/docker-credential-ecr-login Source:
    [https://github.com/docker/for-mac/issues/7109](https://github.com/docker/for-mac/issues/7109 'https://github.com/docker/for-mac/issues/7109')

## Some usually commands

> [!multi-column]
>
> > [!note]+ Images
> >
> > ```bash frame="none"
> > # list images on the host
> > docker images
> > # check image's info
> > docker inspect <image_id>
> > # where are images stored?
> > docker info
> > # normally: /var/lib/docker
> > ```
>
> > [!warning]+ Container
> >
> > ```bash frame="none"
> > # list running container
> > docker ps
> > docker ps -a # all (include stopped)
> > # check log
> > docker container logs <container_id>
> > # get ip address
> > docker inspect <container_id> | grep IPAddress
> > ```

### Others

```bash
# ram & cpu usages
docker stats
docker stats <container_name|container_id>

# get ip address
docker inspect <container_name|container_id> | grep IPAddress
```

#### Attach/Start/Stop

We can use sometimes interchangeable between `<container_id>` and `<container_name>`.

```bash
# start container
docker start <container_name|container_id>
# start and enter the container
docker start -d <container>
```

```bash
# stop container
docker stop <container_name|container_id>

# stop all container
docker stop ${docker ps -a -q}
```

```bash
# entering the running container (no attach)
docker exec -it <container_name|container_id> /bin/bash
```
