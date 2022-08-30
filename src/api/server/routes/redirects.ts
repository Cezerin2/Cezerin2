import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import RedirectsService from "../services/redirects"

const router = new Router()

const getRedirects: Middleware = async ctx => {
  const data = await RedirectsService.getRedirects(ctx.query)
  ctx.body = data
}

const getSingleRedirect: Middleware = async ctx => {
  const data = await RedirectsService.getSingleRedirect(ctx.params.id)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addRedirect: Middleware = async ctx => {
  const data = await RedirectsService.addRedirect(ctx.request.body)
  ctx.body = data
}

const updateRedirect: Middleware = async ctx => {
  const data = await RedirectsService.updateRedirect(
    ctx.params.id,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deleteRedirect: Middleware = async ctx => {
  const data = await RedirectsService.deleteRedirect(ctx.params.id)
  ctx.status = data ? 200 : 404
}

router
  .get(
    "/v1/redirects",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getRedirects
  )
  .post(
    "/v1/redirects",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    addRedirect
  )
  .get(
    "/v1/redirects/:id",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getSingleRedirect
  )
  .put(
    "/v1/redirects/:id",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    updateRedirect
  )
  .delete(
    "/v1/redirects/:id",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    deleteRedirect
  )

export default router
