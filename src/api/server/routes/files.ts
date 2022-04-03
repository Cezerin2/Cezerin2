import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import FilesService from "../services/files"

const router = Router()

const getFiles = (req: Request, res: Response, next: NextFunction) => {
  FilesService.getFiles()
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  FilesService.uploadFile(req, res, next)
}

const deleteFile = (req: Request, res: Response, next: NextFunction) => {
  FilesService.deleteFile(req.params.file)
    .then(() => {
      res.end()
    })
    .catch(next)
}

router.get(
  "/v1/files",
  security.checkUserScope(security.scope.READ_FILES),
  getFiles
)
router.post(
  "/v1/files",
  security.checkUserScope(security.scope.WRITE_FILES),
  uploadFile
)
router.delete(
  "/v1/files/:file",
  security.checkUserScope(security.scope.WRITE_FILES),
  deleteFile
)

export default router
