FROM ubuntu as clone

RUN apt update && apt upgrade -y && apt install git -y

WORKDIR /var/www/store1

RUN git clone https://github.com/Cezerin2/Cezerin2

WORKDIR /var/www/store1/Cezerin2


RUN git checkout docker

FROM node:20

COPY --from=clone /var/www/store1 /var/www/store1

WORKDIR /var/www/store1/Cezerin2

RUN yarn -v

RUN yarn workspaces focus --all src/server

EXPOSE 3001

CMD [ "npm","run","start:server" ]
