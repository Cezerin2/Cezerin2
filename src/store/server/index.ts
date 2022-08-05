import express from "express"
import helmet from "helmet"
import responseTime from "response-time"
import path from "path"
import cookieParser from "cookie-parser"
import winston from "winston"
import settings from "./settings"
import robotsRendering from "./robotsRendering"
import sitemapRendering from "./sitemapRendering"
import redirects from "./redirects"
import pageRendering from "./pageRendering"
import "./logger"

const app = express()

const adminIndexPath = path.resolve("public/admin/index.html")
const staticOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 365, // One year
}

app.set("trust proxy", 1)
app.use(helmet({ contentSecurityPolicy: false }))
app.get("/images/:entity/:id/:size/:filename", (req, res, next) => {
  // A stub of image resizing (can be done with Nginx)
  const newUrl = `/images/${req.params.entity}/${req.params.id}/${req.params.filename}`
  req.url = newUrl
  next()
})
app.use(express.static("public/content", staticOptions))
app.use("/assets", express.static("theme/assets", staticOptions))
app.use("/admin-assets", express.static("public/admin-assets", staticOptions))
app.use("/sw.js", express.static("theme/assets/sw.js"))
app.use("/admin", (req, res) => {
  res.sendFile(adminIndexPath)
})
app.get(
  /^.+\.(jpg|jpeg|gif|png|bmp|ico|webp|svg|css|js|zip|rar|flv|swf|xls)$/,
  (req, res) => {
    res.status(404).end()
  }
)
app.get("/robots.txt", robotsRendering)
app.get("/sitemap.xml", sitemapRendering)
app.get("*", redirects)
app.use(responseTime())
app.use(cookieParser(settings.cookieSecretKey))
app.get("*", pageRendering)

const server = app.listen(settings.storeListenPort, () => {
  const serverAddress = server.address()
  winston.info(`Store running at http://localhost:${serverAddress.port}`)
})
