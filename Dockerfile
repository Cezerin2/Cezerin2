FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# package.json AND yarn.lock are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

# theme folder is copied first as it's used as a local dependency package
COPY ./theme ./theme

# installing packages (yarn causes problems here)
RUN npm i

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# building distributable
RUN yarn build

# Exposing store and admin as 3000 and 3002 respectively
EXPOSE 3000
EXPOSE 3001
EXPOSE 3002

# starting up the app when needed
CMD ["yarn", "start"]
