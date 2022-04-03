import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import ThemeAssetsService from "../services/theme/assets"
import ThemePlaceholdersService from "../services/theme/placeholders"
import ThemeSettingsService from "../services/theme/settings"
import ThemeService from "../services/theme/theme"

const router = Router()

const exportTheme = (req: Request, res: Response, next: NextFunction) => {
  ThemeService.exportTheme(req, res)
}

const installTheme = (req: Request, res: Response, next: NextFunction) => {
  ThemeService.installTheme(req, res)
}

const getSettings = (req: Request, res: Response, next: NextFunction) => {
  ThemeSettingsService.getSettings()
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateSettings = (req: Request, res: Response, next: NextFunction) => {
  ThemeSettingsService.updateSettings(req.body)
    .then(() => {
      res.end()
    })
    .catch(next)
}

const getSettingsSchema = (req: Request, res: Response, next: NextFunction) => {
  ThemeSettingsService.getSettingsSchema()
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  ThemeAssetsService.uploadFile(req, res, next)
}

const deleteFile = (req: Request, res: Response, next: NextFunction) => {
  ThemeAssetsService.deleteFile(req.params.file)
    .then(() => {
      res.end()
    })
    .catch(next)
}

const getPlaceholders = (req: Request, res: Response, next: NextFunction) => {
  ThemePlaceholdersService.getPlaceholders()
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getSinglePlaceholder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  ThemePlaceholdersService.getSinglePlaceholder(req.params.key)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const addPlaceholder = (req: Request, res: Response, next: NextFunction) => {
  ThemePlaceholdersService.addPlaceholder(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updatePlaceholder = (req: Request, res: Response, next: NextFunction) => {
  ThemePlaceholdersService.updatePlaceholder(req.params.key, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const deletePlaceholder = (req: Request, res: Response, next: NextFunction) => {
  ThemePlaceholdersService.deletePlaceholder(req.params.key)
    .then(data => {
      res.status(data ? 200 : 404).end()
    })
    .catch(next)
}

router.get(
  "/v1/theme/export",
  security.checkUserScope(security.scope.READ_THEME),
  exportTheme
)
router.post(
  "/v1/theme/install",
  security.checkUserScope(security.scope.WRITE_THEME),
  installTheme
)

router.get(
  "/v1/theme/settings",
  security.checkUserScope(security.scope.READ_THEME),
  getSettings
)
router.put(
  "/v1/theme/settings",
  security.checkUserScope(security.scope.WRITE_THEME),
  updateSettings
)
router.get(
  "/v1/theme/settings_schema",
  security.checkUserScope(security.scope.READ_THEME),
  getSettingsSchema
)

router.post(
  "/v1/theme/assets",
  security.checkUserScope(security.scope.WRITE_THEME),
  uploadFile
)
router.delete(
  "/v1/theme/assets/:file",
  security.checkUserScope(security.scope.WRITE_THEME),
  deleteFile
)

router.get(
  "/v1/theme/placeholders",
  security.checkUserScope(security.scope.READ_THEME),
  getPlaceholders
)
router.post(
  "/v1/theme/placeholders",
  security.checkUserScope(security.scope.WRITE_THEME),
  addPlaceholder
)
router.get(
  "/v1/theme/placeholders/:key",
  security.checkUserScope(security.scope.READ_THEME),
  getSinglePlaceholder
)
router.put(
  "/v1/theme/placeholders/:key",
  security.checkUserScope(security.scope.WRITE_THEME),
  updatePlaceholder
)
router.delete(
  "/v1/theme/placeholders/:key",
  security.checkUserScope(security.scope.WRITE_THEME),
  deletePlaceholder
)

export default router
