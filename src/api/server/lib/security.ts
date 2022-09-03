import { Middleware } from "@koa/router"
import jwt from "jsonwebtoken"
import { Context } from "koa"
import koaJWT from "koa-jwt"
import SecurityTokensService from "../services/security/tokens"
import settings from "./settings"

const DEVELOPER_MODE = settings.developerMode === true
const SET_TOKEN_AS_REVOKEN_ON_EXCEPTION = true

const PATHS_WITH_OPEN_ACCESS = [
  "/api/v1/authorize",
  /\/api\/v1\/notifications/i,
  /\/ajax\//i,
]

const scope = {
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  READ_PRODUCTS: "read:products",
  WRITE_PRODUCTS: "write:products",
  READ_PRODUCT_CATEGORIES: "read:product_categories",
  WRITE_PRODUCT_CATEGORIES: "write:product_categories",
  READ_ORDERS: "read:orders",
  WRITE_ORDERS: "write:orders",
  READ_CUSTOMERS: "read:customers",
  WRITE_CUSTOMERS: "write:customers",
  READ_CUSTOMER_GROUPS: "read:customer_groups",
  WRITE_CUSTOMER_GROUPS: "write:customer_groups",
  READ_PAGES: "read:pages",
  WRITE_PAGES: "write:pages",
  READ_ORDER_STATUSES: "read:order_statuses",
  WRITE_ORDER_STATUSES: "write:order_statuses",
  READ_THEME: "read:theme",
  WRITE_THEME: "write:theme",
  READ_SITEMAP: "read:sitemap",
  READ_SHIPPING_METHODS: "read:shipping_methods",
  WRITE_SHIPPING_METHODS: "write:shipping_methods",
  READ_PAYMENT_METHODS: "read:payment_methods",
  WRITE_PAYMENT_METHODS: "write:payment_methods",
  READ_SETTINGS: "read:settings",
  WRITE_SETTINGS: "write:settings",
  READ_FILES: "read:files",
  WRITE_FILES: "write:files",
}

const checkUserScope =
  (requiredScope: string): Middleware =>
  // TODO: Remove & { user }
  async (ctx, next) => {
    const isDeveloperMode = DEVELOPER_MODE === true
    const checkScopes =
      ctx?.user?.scopes?.length > 0 &&
      (ctx.user.scopes.includes(scope.ADMIN) ||
        ctx.user.scopes.includes(requiredScope))

    ctx.assert.strictEqual(
      isDeveloperMode || checkScopes,
      true,
      403,
      "Forbidden"
    )

    await next()
  }

const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, settings.jwtSecretKey, (error, decoded) => {
      if (error) {
        reject(error)
      } else {
        // check on blacklist
        resolve(decoded)
      }
    })
  })

const checkTokenInBlacklistCallback = async (ctx: Context, decodedToken) => {
  try {
    const jti = decodedToken?.jti
    const blacklist = await SecurityTokensService.getTokensBlacklist()
    const tokenIsRevoked = blacklist.includes(jti)
    return tokenIsRevoked
  } catch (e) {
    ctx.throw(SET_TOKEN_AS_REVOKEN_ON_EXCEPTION, e)
  }
}

const applyMiddleware = app => {
  if (DEVELOPER_MODE === false) {
    app.use(
      koaJWT({
        secret: settings.jwtSecretKey,
        isRevoked: checkTokenInBlacklistCallback,
      }).unless({ path: PATHS_WITH_OPEN_ACCESS })
    )
  }
}

const getAccessControlAllowOrigin = () => settings.storeBaseUrl || "*"

export default {
  checkUserScope,
  scope,
  verifyToken,
  applyMiddleware,
  getAccessControlAllowOrigin,
  DEVELOPER_MODE,
}
