FROM node:14
COPY . .
RUN yarn
RUN yarn theme
RUN yarn remove theme
RUN yarn add ./theme
RUN yarn build
CMD ["yarn", "start"]