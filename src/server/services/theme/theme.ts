import { RouterContext } from "@koa/router"
import { exec } from "child_process"
import formidable from "formidable"
import path from "path"
import winston from "winston"
import dashboardWebSocket from "../../lib/dashboardWebSocket"
import settings from "../../lib/settings"

class ThemesService {
  exportTheme(ctx: RouterContext) {
    const randomFileName = Math.floor(Math.random() * 10000)
    exec(
      `npm --silent run theme:export -- ${randomFileName}.zip`,
      (error, stdout, stderr) => {
        if (error) {
          winston.error("Exporting theme failed")
          ctx.throw(this.getErrorMessage(error))
        } else {
          winston.info(`Theme successfully exported to ${randomFileName}.zip`)
          if (stdout.includes("success")) {
            ctx.body = { file: `/${randomFileName}.zip` }
          } else {
            ctx.body = this.getErrorMessage("Something went wrong in scripts")
            ctx.status = 500
          }
        }
      }
    )
  }

  installTheme(ctx: RouterContext) {
    this.saveThemeFile(ctx, (error, fileName) => {
      if (error) {
        ctx.throw(this.getErrorMessage(error))
      } else {
        // run async NPM script
        winston.info("Installing theme...")
        exec(`npm run theme:install ${fileName}`, (error, stdout, stderr) => {
          dashboardWebSocket.send({
            event: dashboardWebSocket.events.THEME_INSTALLED,
            payload: fileName,
          })

          if (error) {
            winston.error("Installing theme failed")
          } else {
            winston.info("Theme successfully installed")
          }
        })
        // close request and don't wait result from NPM script
        ctx.status = 200
      }
    })
  }

  saveThemeFile(ctx: RouterContext, callback) {
    const uploadDir = path.resolve(settings.filesUploadPath)

    let form = new formidable.IncomingForm(),
      file_name = null,
      file_size = 0

    form.multiples = false

    form
      .on("fileBegin", (name, file) => {
        // Emitted whenever a field / value pair has been received.
        if (file.name.endsWith(".zip")) {
          file.path = uploadDir + "/" + file.name
        }
        // else - will save to /tmp
      })
      .on("file", function (field, file) {
        // every time a file has been uploaded successfully,
        if (file.name.endsWith(".zip")) {
          file_name = file.name
          file_size = file.size
        }
      })
      .on("error", error => {
        callback(error)
      })
      .on("end", () => {
        //Emitted when the entire request has been received, and all contained files have finished flushing to disk.
        if (file_name) {
          callback(null, file_name)
        } else {
          callback("Cant upload file")
        }
      })

    form.parse(ctx.req)
  }

  getErrorMessage(error) {
    return { error: true, message: error.toString() }
  }
}

export default new ThemesService()
