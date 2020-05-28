FROM node:8
RUN npm i
RUN npm run compile
RUN npm run build