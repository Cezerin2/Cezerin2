# Single Instance cezerin2 dockerfile and docker-entrypoint.sh

- [dockerfile](#dockerfile)
- [docker-entrypoint.sh](#docker-entrypoint.sh)

## dockerfile

```docker-compose
version: '3'

services:
  api:
    build:
      context: ./cezerin2
    env_file: .env
    environment:
      - DB_HOST=db
      - STORE_URL=http://www.exampe.com
      - API_BASE_URL=http://api.example.com/api/v1
      - AJAX_BASE_URL=http://api.example.com/ajax
      - ASSETS_BASE_URL=http://asset.example.com
      - ADMIN_BASE_URL=http://admin.example.com
    ports:
      - 3001:80
    volumes:
      - ./cezerin2/public/content:/var/www/cezerin2/public/content
    depends_on:
      - db
    restart: always

  store:
    build:
      context: ./cezerin2-store
    environment:
      - API_BASE_URL=http://api.example.com/api/v1
      - AJAX_BASE_URL=http://api.example.com/ajax
    ports:
      - 3000:80
    depends_on:
      - db
      - api
    restart: always

  admin:
    build:
      context: ./cezerin2-admin
    environment:
      - API_BASE_URL=http://api.example.com/api/v1
      - API_WEB_SOCKET_URL=ws://api.example.com
    ports:
      - 3002:80
    depends_on:
      - db
      - api
    restart: always

  proxy:
    build:
      context: ./proxy
    environment:
      - DOMAIN=example.com
      - STORE_HOST=store
      - ADMIN_HOST=admin
      - API_HOST=api
    ports:
      - 80:80
    depends_on:
      - db
      - api
      - admin
    restart: always

  db:
    image: mongo:3.4
    ports:
      - 27017:27017
    volumes:
      - ./db:/data/db
    restart: always

```
