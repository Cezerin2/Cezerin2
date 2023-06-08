import { RouterContext } from "@koa/router"
import fse from "fs-extra"
import path from "path"
import settings from "../lib/settings"
import { saveFile } from "../lib/utils"

const contentPath = path.resolve(settings.filesUploadPath)

class FilesService {
  getFileData(fileName: string) {
    const filePath = `${contentPath}/${fileName}`
    const stats = fse.statSync(filePath)
    if (stats.isFile())
      return {
        file: fileName,
        size: stats.size,
        modified: stats.mtime,
      }

    return null
  }

  getFilesData(files) {
    return files
      .map(fileName => this.getFileData(fileName))
      .filter(fileData => fileData !== null)
      .sort((a, b) => a.modified - b.modified)
  }

  getFiles() {
    return new Promise((resolve, reject) => {
      fse.readdir(contentPath, (error, files) => {
        if (error) {
          reject(error)
        } else {
          const filesData = this.getFilesData(files)
          resolve(filesData)
        }
      })
    })
  }

  deleteFile(fileName: string) {
    return new Promise<void>((resolve, reject) => {
      const filePath = contentPath + "/" + fileName
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
    const { newFilename, size } = await saveFile(
      ctx,
      settings.filesUploadPath,
      false
    )

    ctx.body = { file: newFilename, size }
  }

  getErrorMessage(error: string) {
    return { error: true, message: error.toString() }
  }
}

export default new FilesService()
