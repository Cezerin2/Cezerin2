FROM ubuntu

RUN apt install node

WORKDIR ../

RUN ls

COPY . /var/www/store1


RUN ls


WORKDIR /var/www/store1

RUN ls

RUN corepack enable
# RUN yarn workspaces focus --all src/server

# EXPOSE 3001

# CMD [ "npm","run","start:server" ]
