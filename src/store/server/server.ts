import cors from "@koa/cors"
import Router from "@koa/router"
import { ensureDir, mkdtempSync, pathExists } from "fs-extra"
import Koa from "koa"
import koaBody from "koa-body"
import compress from "koa-compress"
import mount from "koa-mount"
import send from "koa-send"
import serve from "koa-static"
import { tmpdir } from "node:os"
import { basename, extname, join } from "node:path"
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
const tmpDir = mkdtempSync(join(tmpdir(), "Cezerin-"))

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
    const { entity, id, filename, size } = ctx.params

    const filePath = `${publicDir}/content/images/${entity}/${id}/${filename}`
    const fileName = `${basename(filename, extname(filename))}.${size}.webp`
    const tempFile = `${tmpDir}/${fileName}`

    await ensureDir(tmpDir)

    if (!(await pathExists(tempFile)))
      await sharp(filePath).resize(Number(size)).toFile(tempFile)

    await send(ctx, fileName, { root: tmpDir, ...staticOptions })
  })
  .use("/sw.js", ctx =>
    send(ctx, `${publicDir}/../build/public/assets/sw.js`, staticOptions)
  )
  .use("/admin", ctx =>
    send(ctx, "index.html", { root: `${publicDir}/admin`, ...staticOptions })
  )
  .use("/admin/(.*)", ctx =>
    send(ctx, "index.html", { root: `${publicDir}/admin`, ...staticOptions })
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
