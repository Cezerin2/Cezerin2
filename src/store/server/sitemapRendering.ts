import { Middleware } from "@koa/router"
import { SitemapStream, streamToPromise } from "sitemap"
import { Readable } from "stream"
import api from "./api"

const SITEMAP_EXCLUDE_PATH = [
  "/",
  "/checkout",
  "/checkout-success",
  "/account",
  "/cart",
  "/login",
  "/logout",
  "/register",
  "/customer-account",
]

const sitemapRendering: Middleware = async ctx => {
  const sitemapResponse = await api.sitemap.list({ enabled: true })
  const settingsResponse = await api.settings.retrieve()

  const sitemapArray = sitemapResponse.json
  const settings = settingsResponse.json
  const hostname =
    settings.domain && settings.domain.length > 0
      ? settings.domain
      : `${ctx.protocol}://${ctx.hostname}`

  const links = sitemapArray
    .filter(
      item =>
        item.type !== "reserved" &&
        item.type !== "search" &&
        !SITEMAP_EXCLUDE_PATH.includes(item.path)
    )
    .map(item => item.path)

  const stream = new SitemapStream({ hostname })

  ctx.body = await streamToPromise(Readable.from(links).pipe(stream))
  ctx.set("Content-Type", "application/xml")
}

export default sitemapRendering
