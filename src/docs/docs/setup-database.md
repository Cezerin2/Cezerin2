# Database

- [Local Mongo](#1-local-mongo)
- [Docker Mongo](#2-docker-mongo)
- [Mongo Altas](#3-mongo-altas)

## 1. Local Mongo

### Setup

- follow mongo [instructions](https://docs.mongodb.com/manual/installation/) to install locally.
- run `mongod`

## 2. Docker Mongo

### Setup

     ```shell
     docker run -d \
     --name store-db \
     -v /storage-location-on-host:/data/db \
     mongo:latest
     ```

### Implementation

- **Docker**
  You are required to link to the database image and set it to the DB_HOST.

  ```shell
  --link store-db:db \
  -e DB_HOST=db \
  ```

  **Full Example**

  ```shell
  docker run -d \
  --name cezerin2 \
  --link store-db:db \
  -p 3001:80 \
  -e DB_HOST=db \
  -v /content-on-host:/var/www/cezerin2/public/content \
  cezerin2/cezerin2:latest
  ```

- **pm2**
  You will be required to expose the port in the docker command.

  ```shell
  -p 27017:27017
  ```

  Then you can Deloy normally with pm2. [here](https://cezerin.org/docs/#/using-source-code)

  ```shell
  pm2 start app.js
  ```

## 3. Mongo Atlas

### Setup

- I'll use [Mongo Altas](https://cloud.mongodb.com/) to deploy database.

  - Click **Build Cluster**

    - Choose an provider: `AWS`
    - Choose a region: `N. Virginia (us-east-1)`
    - Choose a tier region: `M0` (Sandbox Free)
    - Choose a cluster name: `Cezerin-db`

  - Create **User**

    - Click Customer Security
    - Click **Add New User Role**
    - Choose Username: `cezerin`
    - Choose Password: `cezerin`
    - Choose User Privileges: `Atlas Admin`

  - Add **WhiteList IP**

    - Click **IP Whitelist**
    - Click **Add IP ADDRESS**
    - Click **Add current IP Address**

  - Click **Connect**

    - Select: `Connect Your Application`
    - Select Driver: `nodejs`
    - Select Version: `3.0 or later`
    - Copy connection string: `mongodb+srv://cezerin:<password>@cezerin-db-0ga32.mongodb.net/test?retryWrites=true`

  - Update string url
    - change `<password>` to provided password
    - remove `?retryWrites=true` (doesn't support ?)
    - change `test` to database name `shop`
    - should be like `mongodb+srv://cezerin:cezerin@cezerin-db-0ga32.mongodb.net/shop`

### Implementation

- **Docker**
  You are required to referernce the database url in the docker configuration

  ```shell
  -e DB_URL=mongodb+srv://cezerin:cezerin@cezerin-db-0ga32.mongodb.net/shop
  ```

  **Full Example**

  ```shell
  docker run -d \
  --name cezerin2 \
  --link store-db:db \
  -p 3001:80 \
  -e DB_URL=mongodb+srv://cezerin:cezerin@cezerin-db-0ga32.mongodb.net/shop \
  -v /content-on-host:/var/www/cezerin2/public/content \
  cezerin2/cezerin2:latest
  ```

- **pm2**

  ```shell
  DB_URL=mongodb+srv://cezerin:cezerin@cezerin-db-0ga32.mongodb.net/shop \
  pm2 start process.json
  ```
