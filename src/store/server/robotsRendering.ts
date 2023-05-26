import { Middleware } from "@koa/router"
import fse from "fs-extra"
import { resolve } from "path"
import api from "./api"

const robotsRendering: Middleware = async ctx => {
  const settingsResponse = await api.settings.retrieve()

  const template = await fse.readFile(
    resolve(process.env.PUBLIC_DIR, "/robots.template"),
    "utf8"
  )

  const robots = template.replace(/{domain}/g, settingsResponse.json.domain)

  ctx.body = robots
  ctx.set("Content-Type", "text/plain")
}

export default robotsRendering
