import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import AppSettingsService from "../services/apps/settings"

const router = new Router()

const getSettings: Middleware = async ctx => {
  const data = await AppSettingsService.getSettings(ctx.params.key)
  ctx.body = data
}

const updateSettings: Middleware = async ctx => {
  const data = await AppSettingsService.updateSettings(
    ctx.params.key,
    ctx.request.body
  )

  if (data) {
    ctx.body = data
  }
  ctx.status = 404
}

router
  .get(
    "/v1/apps/:key/settings",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getSettings
  )
  .put(
    "/v1/apps/:key/settings",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    updateSettings
  )

export default router
