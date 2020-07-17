### Using Source code

- **Clone Git repository**

```shell
git clone https://github.com/cezerin2/cezerin2
cd cezerin2
```

- **Change settings**

- This step is optional. You can skip this step, all works fine with default settings.

```shell
cd config
```

- **Open `config/server.js` and change**

  - MongoDB Credentials
  - SMTP Settings
  - JWT and Cookie Secret Key

  Save file and go back to root app direcotry

  ```shell
  cd ../
  ```

- **Install dependencies**

```shell
npm i
```

- **Setup database**

Prepare database. At this step our database is empty. To add default data (categories, products, pages), indexes and access token we need to run:

```shell
npm run setup <email> <domain>
```

We don't have real domain, so we'll use our local domain:

```shell
npm run setup admin@example.com http://localhost:3000
```

You can change this email and domain anytime at Dashboard - Settings - General - Domain and Settings - Personal Access Tokens.

- **Build project**

```shell
npm run build
```

- **Start application in the background**

```shell
pm2 start process.json
```

- or you can start app in your terminal (you will see debug information, that is useful for debug):

```shell
npm start
```

- API running on port 3001 and available at **http://localhost:3001**
- Storefront running on port 3000 and available at **http://localhost:3000**
- Dashboard running on port 3000 and available at **http://localhost:3000/admin**

-For example, here is the api method for store settings: **http://localhost:3001/api/v1/settings**
-and dashboard settings page: **http://localhost:3000/admin/settings**


```shell
[start-api] info: API running at http://localhost:3001
[start-api] info: MongoDB connected successfully
[start-store] info: Store running at http://localhost:3000
```