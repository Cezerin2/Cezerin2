FROM node:20-alpine

WORKDIR ../

COPY . /var/www/store1

WORKDIR /var/www/store1

RUN corepack enable
RUN yarn workspaces focus --all src/server

EXPOSE 3001

CMD [ "npm","run","start:server" ]
