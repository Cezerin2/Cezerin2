import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import WebhooksService from "../services/webhooks"

const router = new Router()

const getWebhooks: Middleware = async ctx => {
  const data = await WebhooksService.getWebhooks(ctx.query)
  ctx.body = data
}

const getSingleWebhook: Middleware = async ctx => {
  const data = await WebhooksService.getSingleWebhook(ctx.params.id)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addWebhook: Middleware = async ctx => {
  const data = await WebhooksService.addWebhook(ctx.request.body)
  ctx.body = data
}

const updateWebhook: Middleware = async ctx => {
  const data = await WebhooksService.updateWebhook(
    ctx.params.id,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deleteWebhook: Middleware = async ctx => {
  const data = await WebhooksService.deleteWebhook(ctx.params.id)
  ctx.status = data ? 200 : 404
}

router
  .get(
    "/v1/webhooks",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getWebhooks
  )
  .post(
    "/v1/webhooks",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    addWebhook
  )
  .get(
    "/v1/webhooks/:id",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getSingleWebhook
  )
  .put(
    "/v1/webhooks/:id",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    updateWebhook
  )
  .delete(
    "/v1/webhooks/:id",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    deleteWebhook
  )

export default router
