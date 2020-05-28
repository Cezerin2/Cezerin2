FROM node:14
COPY . .
RUN yarn
RUN yarn build
CMD ["yarn", "start"]