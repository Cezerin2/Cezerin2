FROM node:20-alpine

WORKDIR ../

RUN corepack enable 
RUN yarn workspaces focus src/server

EXPOSE 3001

CMD [ "npm","run","start" ]
