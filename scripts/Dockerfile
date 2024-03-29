FROM ubuntu

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
RUN nvm install 20

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
