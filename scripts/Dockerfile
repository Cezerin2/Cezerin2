FROM ubuntu as clone

RUN apt update && apt upgrade -y && apt install git -y
RUN git clone https://github.com/Cezerin2/Cezerin2

FROM node:20-alpine

COPY --from=clone Cezerin2 /var/www/store1

WORKDIR /var/www/store1

# RUN yarn workspaces focus --all src/server

# EXPOSE 3001

# CMD [ "npm","run","start:server" ]
