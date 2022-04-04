import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import CheckoutFieldsService from "../services/settings/checkoutFields"
import CommerceSettingsService from "../services/settings/commerce"
import EmailSettingsService from "../services/settings/email"
import EmailTemplatesService from "../services/settings/emailTemplates"
import ImportSettingsService from "../services/settings/import"
import SettingsService from "../services/settings/settings"

const router = Router()

const getSettings = (req: Request, res: Response, next: NextFunction) =>
  SettingsService.getSettings()
    .then(data => res.send(data))
    .catch(next)

const updateSettings = (req: Request, res: Response, next: NextFunction) =>
  SettingsService.updateSettings(req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const getEmailSettings = (req: Request, res: Response, next: NextFunction) =>
  EmailSettingsService.getEmailSettings()
    .then(data => res.send(data))
    .catch(next)

const updateEmailSettings = (req: Request, res: Response, next: NextFunction) =>
  EmailSettingsService.updateEmailSettings(req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const getImportSettings = (req: Request, res: Response, next: NextFunction) =>
  ImportSettingsService.getImportSettings()
    .then(data => res.send(data))
    .catch(next)

const updateImportSettings = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  ImportSettingsService.updateImportSettings(req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const retrieveCommerceSettings = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  CommerceSettingsService.retrieveCommerceSettings()
    .then(data => res.send(data))
    .catch(next)

const updateCommerceSettings = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  CommerceSettingsService.updateCommerceSettings(req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const getEmailTemplate = (req: Request, res: Response, next: NextFunction) =>
  EmailTemplatesService.getEmailTemplate(req.params.name)
    .then(data => res.send(data))
    .catch(next)

const updateEmailTemplate = (req: Request, res: Response, next: NextFunction) =>
  EmailTemplatesService.updateEmailTemplate(req.params.name, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const getCheckoutFields = (req: Request, res: Response, next: NextFunction) =>
  CheckoutFieldsService.getCheckoutFields()
    .then(data => res.send(data))
    .catch(next)

const getCheckoutField = (req: Request, res: Response, next: NextFunction) =>
  CheckoutFieldsService.getCheckoutField(req.params.name)
    .then(data => res.send(data))
    .catch(next)

const updateCheckoutField = (req: Request, res: Response, next: NextFunction) =>
  CheckoutFieldsService.updateCheckoutField(req.params.name, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const uploadLogo = (req: Request, res: Response, next: NextFunction) =>
  SettingsService.uploadLogo(req, res, next)

const deleteLogo = (req: Request, res: Response) =>
  SettingsService.deleteLogo().then(() => res.end())

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
