import fse from "fs-extra"
import { resolve } from "path"
import winston from "winston"

const filePath = resolve(`${process.env.THEME_DIR}/index.html`)
export let indexHtml = null

try {
  indexHtml = fse.readFileSync(filePath, "utf8")
} catch (error) {
  winston.error("Fail to read file", filePath, error)
}
