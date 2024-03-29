FROM ubuntu

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
RUN export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
RUN [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

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
