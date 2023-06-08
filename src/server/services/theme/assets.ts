import { RouterContext } from "@koa/router"
import fse from "fs-extra"
import path from "path"
import settings from "../../lib/settings"
import { saveFile } from "../../lib/utils"

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
    const { newFilename, size } = await saveFile(ctx, uploadDir, false)

    ctx.body = { file: newFilename, size }
  }

  getErrorMessage(error) {
    return { error: true, message: error.toString() }
  }
}

export default new ThemeAssetsService()
