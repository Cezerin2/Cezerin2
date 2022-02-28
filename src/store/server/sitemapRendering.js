import { SitemapStream, streamToPromise } from "sitemap"
import { Readable } from "stream"
import winston from "winston"
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

const sitemapRendering = (req, res) => {
  Promise.all([
    api.sitemap.list({ enabled: true }),
    api.settings.retrieve(),
  ]).then(([sitemapResponse, settingsResponse]) => {
    const sitemapArray = sitemapResponse.json
    const settings = settingsResponse.json
    const hostname =
      settings.domain && settings.domain.length > 0
        ? settings.domain
        : `${req.protocol}://${req.hostname}`

    const links = sitemapArray
      .filter(
        item =>
          item.type !== "reserved" &&
          item.type !== "search" &&
          !SITEMAP_EXCLUDE_PATH.includes(item.path)
      )
      .map(item => item.path)

    const stream = new SitemapStream({ hostname })

    const sitemap = streamToPromise(Readable.from(links).pipe(stream)).then(
      data => data.toString()
    )

    sitemap
      .then(xml => {
        res.header("Content-Type", "application/xml")
        res.send(xml)
      })
      .catch(error => {
        winston.error(error.message ? error.message : error)
        res.status(500).end()
      })
  })
}

export default sitemapRendering
