import cors from "@koa/cors"
import Router from "@koa/router"
import { ensureDir, pathExists } from "fs-extra"
import Koa from "koa"
import koaBody from "koa-body"
import compress from "koa-compress"
import mount from "koa-mount"
import send from "koa-send"
import serve from "koa-static"
import sharp from "sharp"
import winston from "winston"
import { helmetMiddleware } from "./helmet"
import pageRendering from "./pageRendering"
import redirects from "./redirects"
import robotsRendering from "./robotsRendering"
import settings from "./settings"
import sitemapRendering from "./sitemapRendering"

const app = new Koa()
const router = new Router()

const publicDir = process.env.PUBLIC_DIR
const themeDir = process.env.THEME_DIR
const staticOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 365, // One year
}

app.keys = settings.cookieSecretKey
app.maxIpsCount = 1

app
  // logger
  .use(async (ctx, next) => {
    await next()
    const rt = ctx.response.get("X-Response-Time")
    winston.info(`${ctx.method} ${ctx.url} - ${rt}`)
  })

  // x-response-time
  .use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set("X-Response-Time", `${ms}ms`)
  })

  .use(cors()) // cors
  .use(koaBody()) // body parser
  .use(compress({ threshold: 0 })) // compressor
  .use(helmetMiddleware) // helmet
  .use(serve(`${publicDir}/content`, staticOptions))
  .use(serve(process.env.RAZZLE_PUBLIC_DIR, staticOptions))
  .use(mount("/assets", serve(`${themeDir}/assets`, staticOptions)))
  .use(
    mount("/admin-assets", serve(`${publicDir}/admin-assets`, staticOptions))
  )
  .use(router.routes()) // router
  .use(router.allowedMethods()) // router

router
  .get("/", pageRendering)
  .get("/images/:entity/:id/:size/:filename", async ctx => {
    const filePath = `${publicDir}/content/images/${ctx.params.entity}/${ctx.params.id}`
    const tempPath = `${filePath}/temp/${ctx.params.size}`
    const tempFile = `${tempPath}/${ctx.params.filename}.webp`

    await ensureDir(tempPath)

    if (!(await pathExists(tempFile)))
      await sharp(`${filePath}/${ctx.params.filename}`)
        .resize(Number(ctx.params.size))
        .toFile(tempFile)

    await send(ctx, ctx.params.filename, { root: filePath })
  })
  .use("/sw.js", ctx => send(ctx, `${publicDir}/../build/public/assets/sw.js`))
  .use("/admin", ctx => send(ctx, "index.html", { root: `${publicDir}/admin` }))
  .use("/admin/(.*)", ctx =>
    send(ctx, "index.html", { root: `${publicDir}/admin` })
  )
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

export default app
