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
export const storeBaseUrl = `http://localhost:3000`
export const adminLoginUrl = "/admin/login"
export const apiListenPort = 3001
export const storeListenPort = 3000
export const mongodbServerUrl = dbUrl
export const smtpServer = {
  host: "",
  port: 465,
  secure: true,
  user: "",
  pass: "",
  fromName: "Cezerin",
  fromAddress: "vam@test.com"
}
export const cookieSecretKey = "-"
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
export const saltRounds = 18
export const developerMode = true
export const jwtSecretKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsiYWRtaW4iLCJkYXNoYm9hcmQiLCJyZWFkOmN1c3RvbWVyX2dyb3VwcyIsInJlYWQ6Y3VzdG9tZXJzIiwicmVhZDpmaWxlcyIsInJlYWQ6b3JkZXJfc3RhdHVzZXMiLCJyZWFkOm9yZGVycyIsInJlYWQ6cGFnZXMiLCJyZWFkOnBheW1lbnRfbWV0aG9kcyIsInJlYWQ6cHJvZHVjdF9jYXRlZ29yaWVzIiwicmVhZDpwcm9kdWN0cyIsInJlYWQ6c2V0dGluZ3MiLCJyZWFkOnNoaXBwaW5nX21ldGhvZHMiLCJyZWFkOnNpdGVtYXAiLCJyZWFkOnRoZW1lIiwid3JpdGU6Y3VzdG9tZXJfZ3JvdXBzIiwid3JpdGU6Y3VzdG9tZXJzIiwid3JpdGU6ZmlsZXMiLCJ3cml0ZTpvcmRlcl9zdGF0dXNlcyIsIndyaXRlOm9yZGVycyIsIndyaXRlOnBhZ2VzIiwid3JpdGU6cGF5bWVudF9tZXRob2RzIiwid3JpdGU6cHJvZHVjdF9jYXRlZ29yaWVzIiwid3JpdGU6cHJvZHVjdHMiLCJ3cml0ZTpzZXR0aW5ncyIsIndyaXRlOnNoaXBwaW5nX21ldGhvZHMiLCJ3cml0ZTp0aGVtZSJdLCJqdGkiOiI1ZWJmM2ExZDFiMDVjYTJmNTQwY2RmODgiLCJlbWFpbCI6ImxvcnRzY2hpQGdtYWlsLmNvbSIsImlhdCI6MTU4OTU5MDU1NywiZXhwIjozLjU5OTk5OTk5OTk5OTk5OTVlKzQyfQ.hekPU57Y2AJHc9fqF4lLtEkIMGrNkMDaEErucDAFwos"
