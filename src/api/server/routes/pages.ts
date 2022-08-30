import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import PagesService from "../services/pages/pages"

const router = new Router()

const getPages: Middleware = async ctx => {
  const data = await PagesService.getPages(ctx.query)
  ctx.body = data
}

const getSinglePage: Middleware = async ctx => {
  const data = await PagesService.getSinglePage(ctx.params.id)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addPage: Middleware = async ctx => {
  const data = await PagesService.addPage(ctx.request.body)
  ctx.body = data
}

const updatePage: Middleware = async ctx => {
  const data = await PagesService.updatePage(ctx.params.id, ctx.request.body)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deletePage: Middleware = async ctx => {
  const data = await PagesService.deletePage(ctx.params.id)
  ctx.status = data ? 200 : 404
}

router
  .get(
    "/v1/pages",
    security.checkUserScope(security.scope.READ_PAGES),
    getPages
  )
  .post(
    "/v1/pages",
    security.checkUserScope(security.scope.WRITE_PAGES),
    addPage
  )
  .get(
    "/v1/pages/:id",
    security.checkUserScope(security.scope.READ_PAGES),
    getSinglePage
  )
  .put(
    "/v1/pages/:id",
    security.checkUserScope(security.scope.WRITE_PAGES),
    updatePage
  )
  .delete(
    "/v1/pages/:id",
    security.checkUserScope(security.scope.WRITE_PAGES),
    deletePage
  )

export default router
