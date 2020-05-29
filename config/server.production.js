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

export const apiBaseUrl = `http://localhost:3001/api/v1`
export const ajaxBaseUrl = `http://localhost:3001/ajax`
export const storeBaseUrl = "*"
export const adminLoginUrl = "/admin/login"
export const apiListenPort = 3001
export const storeListenPort = 3000
export const mongodbServerUrl = dbUrl
export const smtpServer = {
  host: "",
  port: 0,
  secure: true,
  user: "",
  pass: "",
  fromName: "",
  fromAddress: ""
}
export const jwtSecretKey = "SP69kXFR3znRi7kL8Max2GTB24wOtEQj"
export const cookieSecretKey = "8669X9P5yI1DAEthy1chc3M9EncyS7SM"
export const categoriesUploadPath = "public/content/images/categories"
export const productsUploadPath = "public/content/images/products"
export const filesUploadPath = "public/content"
export const themeAssetsUploadPath = "theme/assets/images"
export const categoriesUploadUrl = "/images/categories"
export const productsUploadUrl = "/images/products"
export const filesUploadUrl = ""
export const themeAssetsUploadUrl = "/assets/images"
export const language = "en"
export const orderStartNumber = 1000
