FROM node:14
COPY . .
RUN yarn
RUN yarn theme:build
RUN yarn add ./theme
RUN yarn build
CMD ["yarn", "start"]