import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import SecurityTokensService from "../services/security/tokens"

const router = new Router()

const getTokens: Middleware = async ctx => {
  const data = await SecurityTokensService.getTokens(ctx.query)
  ctx.body = data
}

const getTokensBlacklist: Middleware = async ctx => {
  const data = await SecurityTokensService.getTokensBlacklist()
  ctx.body = data
}

const getSingleToken: Middleware = async ctx => {
  const data = await SecurityTokensService.getSingleToken(ctx.params.id)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addToken: Middleware = async ctx => {
  const data = await SecurityTokensService.addToken(ctx.request.body)
  ctx.body = data
}

const updateToken: Middleware = async ctx => {
  const data = await SecurityTokensService.updateToken(
    ctx.params.id,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deleteToken: Middleware = ctx =>
  SecurityTokensService.deleteToken(ctx.params.id)

const sendDashboardSigninUrl: Middleware = async ctx => {
  const data = await SecurityTokensService.sendDashboardSigninUrl(ctx)
  ctx.body = data
}

router
  .get(
    "/v1/security/tokens",
    security.checkUserScope(security.scope.ADMIN),
    getTokens
  )
  .get(
    "/v1/security/tokens/blacklist",
    security.checkUserScope(security.scope.ADMIN),
    getTokensBlacklist
  )
  .post(
    "/v1/security/tokens",
    security.checkUserScope(security.scope.ADMIN),
    addToken
  )
  .get(
    "/v1/security/tokens/:id",
    security.checkUserScope(security.scope.ADMIN),
    getSingleToken
  )
  .put(
    "/v1/security/tokens/:id",
    security.checkUserScope(security.scope.ADMIN),
    updateToken
  )
  .delete(
    "/v1/security/tokens/:id",
    security.checkUserScope(security.scope.ADMIN),
    deleteToken
  )
  .post("/v1/authorize", sendDashboardSigninUrl)

export default router
