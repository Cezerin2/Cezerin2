FROM node:14
COPY . .
RUN yarn
RUN yarn docker
CMD ["yarn", "start"]
