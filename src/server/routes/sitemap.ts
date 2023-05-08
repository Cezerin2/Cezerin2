import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import SitemapService from "../services/sitemap"

const router = new Router()

const getPaths: Middleware = async ctx => {
  if (ctx.query.path) {
    const data = await SitemapService.getSinglePath(
      ctx.query.path,
      ctx.query.enabled === "true"
    )
    if (data) {
      ctx.body = data
    } else ctx.status = 404
  } else ctx.body = await SitemapService.getPaths(ctx.query.enabled)
}

router.get(
  "/v1/sitemap",
  security.checkUserScope(security.scope.READ_SITEMAP),
  getPaths
)

export default router
