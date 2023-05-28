import { RouterContext } from "@koa/router"
import formidable, { File } from "formidable"
import fse from "fs-extra"
import path from "path"
import settings from "../../lib/settings"

class ThemeAssetsService {
  deleteFile(fileName) {
    return new Promise<void>((resolve, reject) => {
      const filePath = path.resolve(
        settings.themeAssetsUploadPath + "/" + fileName
      )
      if (fse.existsSync(filePath)) {
        fse.unlink(filePath, error => {
          resolve()
        })
      } else {
        reject("File not found")
      }
    })
  }

  async uploadFile(ctx: RouterContext) {
    const uploadDir = path.resolve(settings.themeAssetsUploadPath)

    const form = new formidable.IncomingForm()

    form.uploadDir = uploadDir
    form.keepExtensions = true

    form.on("fileBegin", (_formName, file) => {
      // eslint-disable-next-line no-param-reassign
      file.path = `${uploadDir}/${file.name}`
    })

    const file = await new Promise<File>((resolve, reject) => {
      form.parse(ctx.req, (error, _fields, files) => {
        if (error) reject(this.getErrorMessage(error))

        resolve(files.file)
      })
    })

    if (file.name) ctx.body = { file: file.name, size: file.size }
    else {
      ctx.body = this.getErrorMessage("Required fields are missing")
      ctx.status = 400
    }
  }

  getErrorMessage(error) {
    return { error: true, message: error.toString() }
  }
}

export default new ThemeAssetsService()
