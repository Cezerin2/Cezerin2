import fse from "fs-extra"
import { resolve } from "path"
import winston from "winston"

let text = null

export const getText = locale => {
  if (text) {
    return Promise.resolve(text)
  } else {
    const filePath = resolve(
      `${process.env.THEME_DIR}/assets/locales/` + locale + ".json"
    )
    return new Promise((resolve, reject) => {
      fse.readFile(filePath, "utf8", (error, data) => {
        if (error) {
          winston.error("Fail to read theme locale", filePath, error)
          reject(error)
        } else {
          text = JSON.parse(data)
          resolve(text)
        }
      })
    })
  }
}
