import { Middleware } from "@koa/router"
import fse from "fs-extra"
import path from "path"
import api from "./api"

const ROBOTS_TEMPLATE_PATH = "public/robots.template"

const robotsRendering: Middleware = async ctx => {
  const settingsResponse = await api.settings.retrieve()

  const template = await fse.readFile(
    path.resolve(ROBOTS_TEMPLATE_PATH),
    "utf8"
  )

  const robots = template.replace(/{domain}/g, settingsResponse.json.domain)

  ctx.body = robots
  ctx.set("Content-Type", "text/plain")
}

export default robotsRendering
