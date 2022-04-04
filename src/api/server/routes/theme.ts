import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import ThemeAssetsService from "../services/theme/assets"
import ThemePlaceholdersService from "../services/theme/placeholders"
import ThemeSettingsService from "../services/theme/settings"
import ThemeService from "../services/theme/theme"

const router = Router()

const exportTheme = (req: Request, res: Response) =>
  ThemeService.exportTheme(req, res)

const installTheme = (req: Request, res: Response) =>
  ThemeService.installTheme(req, res)

const getSettings = (req: Request, res: Response, next: NextFunction) =>
  ThemeSettingsService.getSettings()
    .then(data => res.send(data))
    .catch(next)

const updateSettings = (req: Request, res: Response, next: NextFunction) =>
  ThemeSettingsService.updateSettings(req.body)
    .then(() => res.end())
    .catch(next)

const getSettingsSchema = (req: Request, res: Response, next: NextFunction) =>
  ThemeSettingsService.getSettingsSchema()
    .then(data => res.send(data))
    .catch(next)

const uploadFile = (req: Request, res: Response, next: NextFunction) =>
  ThemeAssetsService.uploadFile(req, res, next)

const deleteFile = (req: Request, res: Response, next: NextFunction) =>
  ThemeAssetsService.deleteFile(req.params.file)
    .then(() => res.end())
    .catch(next)

const getPlaceholders = (req: Request, res: Response, next: NextFunction) =>
  ThemePlaceholdersService.getPlaceholders()
    .then(data => res.send(data))
    .catch(next)

const getSinglePlaceholder = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  ThemePlaceholdersService.getSinglePlaceholder(req.params.key)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const addPlaceholder = (req: Request, res: Response, next: NextFunction) =>
  ThemePlaceholdersService.addPlaceholder(req.body)
    .then(data => res.send(data))
    .catch(next)

const updatePlaceholder = (req: Request, res: Response, next: NextFunction) =>
  ThemePlaceholdersService.updatePlaceholder(req.params.key, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const deletePlaceholder = (req: Request, res: Response, next: NextFunction) =>
  ThemePlaceholdersService.deletePlaceholder(req.params.key)
    .then(data => res.status(data ? 200 : 404).end())
    .catch(next)

router
  .get(
    "/v1/theme/export",
    security.checkUserScope(security.scope.READ_THEME),
    exportTheme
  )
  .post(
    "/v1/theme/install",
    security.checkUserScope(security.scope.WRITE_THEME),
    installTheme
  )

  .get(
    "/v1/theme/settings",
    security.checkUserScope(security.scope.READ_THEME),
    getSettings
  )
  .put(
    "/v1/theme/settings",
    security.checkUserScope(security.scope.WRITE_THEME),
    updateSettings
  )
  .get(
    "/v1/theme/settings_schema",
    security.checkUserScope(security.scope.READ_THEME),
    getSettingsSchema
  )

  .post(
    "/v1/theme/assets",
    security.checkUserScope(security.scope.WRITE_THEME),
    uploadFile
  )
  .delete(
    "/v1/theme/assets/:file",
    security.checkUserScope(security.scope.WRITE_THEME),
    deleteFile
  )

  .get(
    "/v1/theme/placeholders",
    security.checkUserScope(security.scope.READ_THEME),
    getPlaceholders
  )
  .post(
    "/v1/theme/placeholders",
    security.checkUserScope(security.scope.WRITE_THEME),
    addPlaceholder
  )
  .get(
    "/v1/theme/placeholders/:key",
    security.checkUserScope(security.scope.READ_THEME),
    getSinglePlaceholder
  )
  .put(
    "/v1/theme/placeholders/:key",
    security.checkUserScope(security.scope.WRITE_THEME),
    updatePlaceholder
  )
  .delete(
    "/v1/theme/placeholders/:key",
    security.checkUserScope(security.scope.WRITE_THEME),
    deletePlaceholder
  )

export default router
