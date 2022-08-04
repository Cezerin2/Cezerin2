import fse from "fs-extra"
import path from "path"
import winston from "winston"

const THEME_LOCALES_PATH = "theme/locales/"
let text = null

export const getText = locale => {
  if (text) {
    return Promise.resolve(text)
  } else {
    const filePath = path.resolve(THEME_LOCALES_PATH + locale + ".json")
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
