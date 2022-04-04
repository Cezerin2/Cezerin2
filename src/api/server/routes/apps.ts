import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import AppSettingsService from "../services/apps/settings"

const router = Router()

const getSettings = (req: Request, res: Response, next: NextFunction) =>
  AppSettingsService.getSettings(req.params.key)
    .then(data => res.send(data))
    .catch(next)

const updateSettings = (req: Request, res: Response, next: NextFunction) =>
  AppSettingsService.updateSettings(req.params.key, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)

router
  .get(
    "/v1/apps/:key/settings",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getSettings
  )
  .put(
    "/v1/apps/:key/settings",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    updateSettings
  )

export default router
