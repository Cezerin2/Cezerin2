### Using Source code

### A) Cezerin Backend (API) Installation

- **Clone Git repository**

```shell
git clone https://github.com/Cezerin2/cezerin2
cd cezerin2
```

- **Change settings**

```shell
cd src
```

- **Open `config.ts` and change**

  - MongoDB Creditionals
  - SMTP Settings
  - JWT and Cookie Secret Key

  Save file and go back to root app direcotry

  ```shell
  cd ../
  ```

- **Install dependencies**

```shell
npm i
npm run compile
```

- **Setup database**

Prepare database at this setup our database is empty. To add default data, indexes and access token we need to run:

```shell
npm run setup <email> <domain>
```

- We don't have real domain, so we'll use our local domain:

  ```shell
  npm run setup admin@example.com http://localhost:3000
  ```

- This script will add token with email admin@example.com and my domain to http://localhost

- **Start application in the background**

```shell
pm2 start process.json
```

- or you can start app in your terminal (you will see debug information, that is useful for debug):

```shell
npm start
```

- At this setup, we have api running on port 3001 and available at **http://localhost:3001**

- For example, here is the default store settings: **http://localhost:3001/api/v1/settings**

```shell
info: API running at http://localhost:3001
info: MongoDB connected successfully
```

Youtube video: **Cezerin Installation Manual. Part 1 - Backend (API) Installation.**

[![Cezerin Installation Manual. Part 1 - Backend (API) Installation.
](https://img.youtube.com/vi/8qqpudkKIdo/0.jpg)](https://www.youtube.com/watch?v=8qqpudkKIdo)

### B) Cezerin Frontend (Store) Installation

- **Clone Git repository**

```shell
git clone https://github.com/cezerin2/cezerin2-store
```

- **Change settings**

```shell
cd cezerin2-store/src
```

- **Open `config.tsx` and change**

  - JWT and Cookie Secret Key

  Save file and go back to root app direcotry

  ```shell
  cd ../
  ```

- **Install dependencies**

```shell
npm i
```

- **Build project**

```shell
npm run build
```

- **Start cezerin store frontend application in the background**

```shell
pm2 start process.json
```

- or you can start app in your terminal (you will see debug information, that is useful for debug):

```shell
npm start
```

- At this setup your cezerin store is now connected to api and available in browser at **http://localhost:3000**
- **P.S. Your backend (api) must be online. Don't forget to start backend before you starting storefront app.**

```shell
info: Store running at http://localhost:3000
```

Youtube video: **Cezerin Installation Manual. Part 2 - Frontend (Store) Installation.**

[![Cezerin Installation Manual. Part 2 - Frontend (Store) Installation.
](https://img.youtube.com/vi/ldtyjIpiBrM/0.jpg)](https://www.youtube.com/watch?v=ldtyjIpiBrM)

### C) Cezerin Admin Dashboard Installation

- **Clone Git repository**

```shell
git clone https://github.com/cezerin2/cezerin2-admin
```

- **Go to cezerin2-admin app folder**

```shell
cd cezerin2-admin
```

- **Install dependencies**

```shell
npm i
```

- **Build project**

```shell
npm run compile
npm run build
```

- **Start cezerin store frontend application in the background**

```shell
pm2 start process.json
```

- or:

```shell
pm2 serve ./dist 3002
```

- At this setup your cezerin admin dashboard app is now connected to api and available in browser at **http://localhost:3002**
- **P.S. Your backend (api) must be online. Don't forget to start backend before you starting admin dashboard app.**

```shell
[PM2] Starting /usr/local/lib/node_modules/pm2/lib/API/Serve.js in fork_mode (1 instance)
[PM2] Done.
[PM2] Serving /home/work/cezerin/cezerin2-admin/dist on port 3002
┌─────────────────────────┬────┬───────┬────────┬────────┬─────┬────────┬───────────┐
│ Name                    │ id │ mode  │ status │ ↺      │ cpu │ memory │
├─────────────────────────┼────┼───────┼────────┼────────┼─────┼────────┼───────────┤
│ static-page-server-3002 │ 0  │ 3.2.9 │ fork   │ online │ 0   │ 0%     │ 29.3 MB   │
└─────────────────────────┴────┴───────┴────────┴────────┴─────┴────────┴───────────┘
Use `pm2 show <id|name>` to get more details about an app

```

Youtube video: **Cezerin Installation Manual. Part 3 - Admin Dashboard Installation.**

[![Cezerin Installation Manual. Part 3 - Admin Dashboard Installation.
](https://img.youtube.com/vi/dreihHE82Ds/0.jpg)](https://www.youtube.com/watch?v=dreihHE82Ds)
