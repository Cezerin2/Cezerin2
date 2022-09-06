import cors from "@koa/cors"
import Router from "@koa/router"
import Koa from "koa"
import koaBody from "koa-body"
import compress from "koa-compress"
import helmet from "koa-helmet"
import mount from "koa-mount"
import send from "koa-send"
import serve from "koa-static"
import winston from "winston"
import "./logger"
import pageRendering from "./pageRendering"
import redirects from "./redirects"
import robotsRendering from "./robotsRendering"
import settings from "./settings"
import sitemapRendering from "./sitemapRendering"

const app = new Koa()
const router = new Router()

const staticOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 365, // One year
}

app.keys = settings.cookieSecretKey
app.maxIpsCount = 1

app
  .use(cors()) // cors
  .use(helmet({ contentSecurityPolicy: false })) // helmet
  .use(koaBody()) // body parser
  .use(compress({ threshold: 0 })) // compressor
  .use(serve("public/content", staticOptions))
  .use(mount("/assets", serve("theme/assets", staticOptions)))
  .use(mount("/admin-assets", serve("public/admin-assets", staticOptions)))
  .use(router.routes()) // router
  .use(router.allowedMethods()) // router

// logger
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get("X-Response-Time")
  winston.info(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set("X-Response-Time", `${ms}ms`)
})

router
  .get("/", pageRendering)
  .get("/images/:entity/:id/:size/:filename", async ctx => {
    // A stub of image resizing (can be done with Nginx)
    const newUrl = `/images/${ctx.params.entity}/${ctx.params.id}/${ctx.params.filename}`
    ctx.redirect(newUrl)
  })
  .use("/sw.js", ctx => send(ctx, "theme/assets/sw.js"))
  .use("/admin", ctx => send(ctx, "public/admin/index.html"))
  .get(
    /^.+\.(jpg|jpeg|gif|png|bmp|ico|webp|svg|css|js|zip|rar|flv|swf|xls)$/,
    ctx => {
      ctx.status = 404
    }
  )
  .get("/robots.txt", robotsRendering)
  .get("/sitemap.xml", sitemapRendering)
  .get("(.*)", redirects)
  .get("(.*)", pageRendering)

app.listen(settings.storeListenPort, () => {
  winston.info(`Store running at http://localhost:${settings.storeListenPort}`)
})
