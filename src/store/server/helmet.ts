import crypto from "crypto"
import { Middleware } from "koa"
import helmet from "koa-helmet"
import { isBuffer } from "lodash"
import "./logger"
import settings from "./settings"

export const helmetMiddleware: Middleware = async (ctx, next) => {
  await next()
  let buffer = false

  const nonce = crypto.randomBytes(256).toString("hex")

  if (isBuffer(ctx.body)) {
    ctx.body = ctx.body?.toString()
    buffer = true
  }
  if (typeof ctx.body === "string" && ctx.body.includes("<!DOCTYPE html>"))
    ctx.body = ctx.body.replace(/<script/g, `<script nonce="${nonce}"`)
  if (buffer) ctx.body = Buffer.from(ctx.body)

  const join = (array: string[]) => [
    "'self'",
    process.env.NODE_ENV === "development" && "*",
    ...array,
  ]

  const stripeURL = "https://checkout.stripe.com"

  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: join([]),
        scriptSrc: join([stripeURL, `'nonce-${nonce}'`]),
        imgSrc: join(["data:", "https://*.stripe.com"]),
        connectSrc: join([
          stripeURL,
          settings.serverBaseUrl || "*",
          "ws:",
          "wss:",
        ]),
        frameSrc: join([stripeURL]),
        "require-trusted-types-for": buffer ? "'script'" : "",
      },
    },
  })(ctx, () => undefined)
}
