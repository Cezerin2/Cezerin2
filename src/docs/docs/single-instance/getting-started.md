# Getting Started with Single Instance

- [Setup](#setup)
- [Run Cezerin2](#run-cezerin2)
- [Run Cezerin2 Admin](#run-cezerin2-admin)
- [Run Cezerin2 Store](#run-cezerin2-store)
- [Run Cezerin2 Proxy](#run-cezerin2-proxy)
- [Docker Compose](#docker-compose)

## Setup

from the root directory execute

    git clone https://github.com/Cezerin2/cezerin2-admin.git

## Run MongoDB

```shell
docker run --name store-db -v /var/www/store-db:/data/db -d mongo:latest
```

## Run cezerin2

1. Clone Cezerin2

```shell
git clone https://github.com/Cezerin2/cezerin2.git
```

2. Build Cezerin2

```shell
docker build \
-t cezerin2 \
.
```

3. Run Cezerin2

```shell
docker run -d \
--name cezerin2 \
--link store-db:db \
-p 3001:80 \
-e DB_HOST=db \
-e DB_PORT=27017 \
-e DB_NAME=shop \
-e DB_USER=user \
-e DB_PASS=password \
-e STORE_URL=http://www.exampe.com \
-e API_BASE_URL=http://api.example.com/api/v1 \
-e AJAX_BASE_URL=http://api.example.com/ajax \
-e ASSETS_BASE_URL=http://api.example.com \
-e ADMIN_BASE_URL=http://admin.example.com \
-v /Users/LBus/development/Cezerin2/cezerin2/public/content:/var/www/cezerin2/public/content \
cezerin2
```

For local use change

- www.exampe.com to localhost:3000
- api.example.com to localhost:3001
- admin.example.com to localhost:3002

## Run cezerin2 Admin

1. Clone Cezerin2 Admin

```shell
git clone https://github.com/Cezerin2/cezerin2-admin.git
```

2. Build Cezerin2 Admin

```shell
docker build \
-t cezerin2-admin \
.
```

3. Run Cezerin2 Admin

```shell
docker run -d \
--name cezerin2-admin \
--link cezerin2:cezerin2 \
-p 3002:80 \
-e API_BASE_URL=http://api.example.com/api/v1
-e API_WEB_SOCKET_URL=ws://api.example.com
cezerin2-admin
```

## Run Cezerin2 Store

1. Clone Cezerin2 Store

```shell
git clone https://github.com/Cezerin2/cezerin2-store.git
```

2. Build cezerin2 Store

```shell
docker build \
-t cezerin2-store \
.
```

3. Run Cezerin2 Store

```shell
docker run -d \
--name cezerin2-store \
--link cezerin2:cezerin2 \
-p 3002:80 \
-e API_BASE_URL=http://api.example.com/api/v1 \
-e AJAX_BASE_URL=http://api.example.com/ajax \
cezerin2-store
```

For local use change

- api.example.com to cezerin2

## Build Run Cezerin2 Proxy

1. Create follow folder structure

   cezerin2-admin # clone cezerin2-admin repo
   ├── nginx # nginx cezerin2-admin config
   | ├── nginx.conf # nginx cezerin2-admin config
   │ └── default.conf # cezerin2-admin dockerfile
   └── dockerfile # cezerin2-admin dockerfile

[cezerin2-proxy dockerfile & docker-entrypoint](./cezerin2-proxy-dockerfile.md)

[cezerin2-proxy nginx](./cezerin2-proxy-nginx.md)

2. Build Cezerin2 Proxy

```shell
docker build \
-t cezerin2-proxy \
.
```

3. Run Cezerin2 Proxy

```shell
docker run -d \
--name cezerin2-proxy \
--link cezerin2:cezerin2 \
--link cezerin2-admin:cezerin2-admin \
--link cezerin2-store:cezerin2-store \
-p 80:80 \
-e DOMAIN=example.com \
-e STORE_HOST=cezerin2-store \
-e ADMIN_HOST=cezerin2-admin \
-e API_HOST=cezerin2 \
cezerin2-proxy
```

## Docker Compose

setup project as:
.
├── cezerin2 # clone cererin2 repo
│ ├── dockerfile # cezerin2 dockerfile
│ └── docker-entrypoint.sh # cezerin2 docker-entrypoint.sh
├── cezerin2-admin # clone cezerin2-admin repo
│ ├── nginx # nginx cezerin2-admin config
│ | ├── nginx.conf # nginx cezerin2-admin config
│ │ └── default.conf # cezerin2-admin dockerfile
│ └── dockerfile # cezerin2-admin dockerfile
├── cezerin2-store # clone cezerin2-store repo
│ ├── dockerfile # cezerin2-store dockerfile
│ └── docker-entrypoint.sh # cezerin2-store docker-entrypoint.sh
├── proxy # New folder for proxy
│ └── dockerfile # proxy dockerfile
└── docker-compose.yml # Tools and utilities

[cezerin2 docker-compose](./cezerin2-docker-compose.md)
