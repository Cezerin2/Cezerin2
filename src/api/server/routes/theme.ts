import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import ThemeAssetsService from "../services/theme/assets"
import ThemePlaceholdersService from "../services/theme/placeholders"
import ThemeSettingsService from "../services/theme/settings"
import ThemeService from "../services/theme/theme"

const router = new Router()

const { exportTheme, installTheme } = ThemeService

const getSettings: Middleware = async ctx => {
  const data = await ThemeSettingsService.getSettings()
  ctx.body = data
}

const updateSettings: Middleware = ctx =>
  ThemeSettingsService.updateSettings(ctx.request.body)

const getSettingsSchema: Middleware = async ctx => {
  const data = await ThemeSettingsService.getSettingsSchema()
  ctx.body = data
}

const { uploadFile } = ThemeAssetsService

const deleteFile: Middleware = ctx =>
  ThemeAssetsService.deleteFile(ctx.params.file)

const getPlaceholders: Middleware = async ctx => {
  const data = await ThemePlaceholdersService.getPlaceholders()
  ctx.body = data
}

const getSinglePlaceholder: Middleware = async ctx => {
  const data = await ThemePlaceholdersService.getSinglePlaceholder(
    ctx.params.key
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addPlaceholder: Middleware = async ctx => {
  const data = await ThemePlaceholdersService.addPlaceholder(ctx.request.body)
  ctx.body = data
}

const updatePlaceholder: Middleware = async ctx => {
  const data = await ThemePlaceholdersService.updatePlaceholder(
    ctx.params.key,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deletePlaceholder: Middleware = async ctx => {
  const data = await ThemePlaceholdersService.deletePlaceholder(ctx.params.key)
  if (data) {
    ctx.status = 200
  } else ctx.status = 404
}

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
