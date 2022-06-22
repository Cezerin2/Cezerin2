FROM node:16

USER node

WORKDIR /app
COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node theme ./theme
RUN yarn
COPY --chown=node:node . .

ARG DB_HOST
ARG DB_PORT
ARG DB_NAME
ARG DB_USER
ARG DB_PASS
ENV DB_HOST ${DB_HOST:-db}
ENV DB_PORT ${DB_PORT:-27017}
ENV DB_NAME ${DB_NAME:-shop}
ENV DB_USER="${DB_USER}"
ENV DB_PASS="${DB_PASS}"

RUN yarn theme:compile
RUN yarn add ./theme
RUN yarn build

CMD [ "yarn", "start" ]