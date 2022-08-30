import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import CheckoutFieldsService from "../services/settings/checkoutFields"
import CommerceSettingsService from "../services/settings/commerce"
import EmailSettingsService from "../services/settings/email"
import EmailTemplatesService from "../services/settings/emailTemplates"
import ImportSettingsService from "../services/settings/import"
import SettingsService from "../services/settings/settings"

const router = new Router()

const getSettings: Middleware = async ctx => {
  const data = await SettingsService.getSettings()
  ctx.body = data
}

const updateSettings: Middleware = async ctx => {
  const data = await SettingsService.updateSettings(ctx.request.body)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const getEmailSettings: Middleware = async ctx => {
  const data = await EmailSettingsService.getEmailSettings()
  ctx.body = data
}

const updateEmailSettings: Middleware = async ctx => {
  const data = await EmailSettingsService.updateEmailSettings(ctx.request.body)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const getImportSettings: Middleware = async ctx => {
  const data = await ImportSettingsService.getImportSettings()
  ctx.body = data
}

const updateImportSettings: Middleware = async ctx => {
  const data = await ImportSettingsService.updateImportSettings(
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const retrieveCommerceSettings: Middleware = async ctx => {
  const data = await CommerceSettingsService.retrieveCommerceSettings()
  ctx.body = data
}

const updateCommerceSettings: Middleware = async ctx => {
  const data = await CommerceSettingsService.updateCommerceSettings(
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const getEmailTemplate: Middleware = async ctx => {
  const data = await EmailTemplatesService.getEmailTemplate(ctx.params.name)
  ctx.body = data
}

const updateEmailTemplate: Middleware = async ctx => {
  const data = await EmailTemplatesService.updateEmailTemplate(
    ctx.params.name,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const getCheckoutFields: Middleware = async ctx => {
  const data = await CheckoutFieldsService.getCheckoutFields()
  ctx.body = data
}

const getCheckoutField: Middleware = async ctx => {
  const data = await CheckoutFieldsService.getCheckoutField(ctx.params.name)
  ctx.body = data
}

const updateCheckoutField: Middleware = async ctx => {
  const data = await CheckoutFieldsService.updateCheckoutField(
    ctx.params.name,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const { uploadLogo } = SettingsService

const deleteLogo: Middleware = () => SettingsService.deleteLogo()

router
  .get(
    "/v1/settings",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getSettings
  )
  .put(
    "/v1/settings",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    updateSettings
  )
  .get(
    "/v1/settings/email",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getEmailSettings
  )
  .put(
    "/v1/settings/email",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    updateEmailSettings
  )
  .get(
    "/v1/settings/import",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getImportSettings
  )
  .put(
    "/v1/settings/import",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    updateImportSettings
  )
  .get(
    "/v1/settings/commerceform",
    security.checkUserScope(security.scope.READ_SETTINGS),
    retrieveCommerceSettings
  )
  .put(
    "/v1/settings/commerceform",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    updateCommerceSettings
  )
  .get(
    "/v1/settings/email/templates/:name",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getEmailTemplate
  )
  .put(
    "/v1/settings/email/templates/:name",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    updateEmailTemplate
  )
  .get(
    "/v1/settings/checkout/fields",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getCheckoutFields
  )
  .get(
    "/v1/settings/checkout/fields/:name",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getCheckoutField
  )
  .put(
    "/v1/settings/checkout/fields/:name",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    updateCheckoutField
  )
  .post(
    "/v1/settings/logo",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    uploadLogo
  )
  .delete(
    "/v1/settings/logo",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    deleteLogo
  )

export default router
