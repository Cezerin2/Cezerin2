FROM node
COPY . .
RUN yarn
RUN yarn build
CMD ["yarn", "start"]