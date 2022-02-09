// config used by server side only
const dbHost = process.env.DB_HOST || "127.0.0.1"
const dbPort = process.env.DB_PORT || 27017
const dbName = process.env.DB_NAME || "shop"
const dbUser = process.env.DB_USER || ""
const dbPass = process.env.DB_PASS || ""
const dbCred =
  dbUser.length > 0 || dbPass.length > 0 ? `${dbUser}:${dbPass}@` : ""

const dbUrl =
  process.env.DB_URL || `mongodb://${dbCred}${dbHost}:${dbPort}/${dbName}`

const config = {
  // used by Store (server side)
  apiBaseUrl: `http://localhost:3001/api/v1`,

  // used by Store (server and client side)
  ajaxBaseUrl: `http://localhost:3001/ajax`,

  // Access-Control-Allow-Origin
  storeBaseUrl: `http://localhost:3000`,

  // used by API
  adminLoginUrl: "/admin/login",

  apiListenPort: 3001,
  storeListenPort: 3000,

  // used by API
  mongodbServerUrl: dbUrl,

  // your shop smtp settings
  smtpServer: {
    host: "",
    port: 465,
    secure: true,
    user: "",
    pass: "",
    fromName: "Cezerin",
    fromAddress: "vam@test.com",
  },
  // key to sign tokens
  // Need to be changed at theme\src\components\auth-header.js too!
  jwtSecretKey: "-",

  // key to sign store cookies
  cookieSecretKey: "-",

  // path to uploads
  categoriesUploadPath: "public/content/images/categories",
  productsUploadPath: "public/content/images/products",
  filesUploadPath: "public/content",
  themeAssetsUploadPath: "theme/assets/images",

  // url to uploads
  categoriesUploadUrl: "/images/categories",
  productsUploadUrl: "/images/products",
  filesUploadUrl: "",
  themeAssetsUploadUrl: "/assets/images",

  // store UI language
  language: "en",

  // used by API
  orderStartNumber: 1000,

  // cost factor, controls how much time is needed to calculate a single BCrypt hash
  // for production: recommended salRounds > 12
  saltRounds: process.env.SALT_ROUNDS || 12,

  developerMode: true,
}

export default config
