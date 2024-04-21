import cors from "@koa/cors"
import Router from "@koa/router"
import Koa from "koa"
import koaBody from "koa-body"
import winston from "winston"
import ajaxRouter from "./ajaxRouter"
import apiRouter from "./apiRouter"
import dashboardWebSocket from "./lib/dashboardWebSocket"
import "./lib/logger"
import security from "./lib/security"
import settings from "./lib/settings"

const app = new Koa()
const router = new Router()

security.applyMiddleware(app)

app.keys = settings.cookieSecretKey

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

  .use(
    cors({
      origin: "*",
      allowHeaders:
        "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization",
      credentials: true,
    })
  ) // cors
  .use(koaBody()) // body parser
  .use(router.routes()) // router
  .use(router.allowedMethods()) // router

router
  .use("/ajax", ajaxRouter.routes(), ajaxRouter.allowedMethods())
  .use("/api", apiRouter.routes(), apiRouter.allowedMethods())
// .use(sendResponse)

const server = app.listen(settings.apiListenPort, () => {
  winston.info(`API running at http://localhost:${settings.apiListenPort}`)
})

dashboardWebSocket.listen(server)
