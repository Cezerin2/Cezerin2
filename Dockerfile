FROM node:8
COPY . .
RUN npm i
RUN npm run compile
RUN npm run build