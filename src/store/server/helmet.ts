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
  if (typeof ctx.body === "string" && ctx.body.includes("<!doctype html>"))
    ctx.body = ctx.body.replace(/<script/g, `<script nonce="${nonce}"`)
  if (buffer) ctx.body = Buffer.from(ctx.body)

  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'", "*.stripe.com"],
        scriptSrc: ["'self'", "*.stripe.com", () => `'nonce-${nonce}'`],
        connectSrc: ["'self'", settings.serverBaseUrl || "*", "ws:", "wss:"],
        "require-trusted-types-for": buffer ? "'script'" : "",
      },
    },
  })(ctx, () => undefined)
}
