import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import FilesService from "../services/files"

const router = new Router()

const getFiles: Middleware = async ctx => {
  const data = await FilesService.getFiles()
  ctx.body = data
}

const { uploadFile } = FilesService

const deleteFile: Middleware = ctx => FilesService.deleteFile(ctx.params.file)

router
  .get(
    "/v1/files",
    security.checkUserScope(security.scope.READ_FILES),
    getFiles
  )
  .post(
    "/v1/files",
    security.checkUserScope(security.scope.WRITE_FILES),
    uploadFile
  )
  .delete(
    "/v1/files/:file",
    security.checkUserScope(security.scope.WRITE_FILES),
    deleteFile
  )

export default router
