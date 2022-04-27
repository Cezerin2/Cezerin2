import formidable from "formidable"
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

  uploadFile(req, res, next) {
    const uploadDir = path.resolve(settings.themeAssetsUploadPath)

    let form = new formidable.IncomingForm(),
      file_name = null,
      file_size = 0

    form.uploadDir = uploadDir

    form
      .on("fileBegin", (name, file) => {
        // Emitted whenever a field / value pair has been received.
        file.path = uploadDir + "/" + file.name
      })
      .on("file", function (field, file) {
        // every time a file has been uploaded successfully,
        file_name = file.name
        file_size = file.size
      })
      .on("error", error => {
        res.status(500).send(this.getErrorMessage(error))
      })
      .on("end", () => {
        //Emitted when the entire request has been received, and all contained files have finished flushing to disk.
        if (file_name) {
          res.send({ file: file_name, size: file_size })
        } else {
          res
            .status(400)
            .send(this.getErrorMessage("Required fields are missing"))
        }
      })

    form.parse(req)
  }

  getErrorMessage(error) {
    return { error: true, message: error.toString() }
  }
}

export default new ThemeAssetsService()
