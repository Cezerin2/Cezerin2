export interface Server {
  dbHost: string
  dbPort: string
  dbName: string
  dbUser: string
  dbPass: string

  dbUrl: string

  apiBaseUrl: string

  ajaxBaseUrl: string

  storeBaseUrl: string

  serverBaseUrl: string

  adminLoginUrl: string

  apiListenPort: number
  storeListenPort: number

  smtpServer: {
    host: string
    port: number
    secure: boolean
    user: string
    pass: string
    fromName: string
    fromAddress: string
  }

  jwtSecretKey: string

  cookieSecretKey: string[]

  categoriesUploadPath: string
  productsUploadPath: string
  filesUploadPath: string
  themeAssetsUploadPath: string

  categoriesUploadUrl: string
  productsUploadUrl: string
  filesUploadUrl: string
  themeAssetsUploadUrl: string

  language: string

  orderStartNumber: number

  saltRounds: number

  developerMode: boolean
}
