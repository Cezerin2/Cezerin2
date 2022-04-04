import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import WebhooksService from "../services/webhooks"

const router = Router()

const getWebhooks = (req: Request, res: Response, next: NextFunction) =>
  WebhooksService.getWebhooks(req.query)
    .then(data => res.send(data))
    .catch(next)

const getSingleWebhook = (req: Request, res: Response, next: NextFunction) =>
  WebhooksService.getSingleWebhook(req.params.id)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const addWebhook = (req: Request, res: Response, next: NextFunction) =>
  WebhooksService.addWebhook(req.body)
    .then(data => res.send(data))
    .catch(next)

const updateWebhook = (req: Request, res: Response, next: NextFunction) =>
  WebhooksService.updateWebhook(req.params.id, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const deleteWebhook = (req: Request, res: Response, next: NextFunction) =>
  WebhooksService.deleteWebhook(req.params.id)
    .then(data => res.status(data ? 200 : 404).end())
    .catch(next)

router
  .get(
    "/v1/webhooks",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getWebhooks
  )
  .post(
    "/v1/webhooks",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    addWebhook
  )
  .get(
    "/v1/webhooks/:id",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getSingleWebhook
  )
  .put(
    "/v1/webhooks/:id",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    updateWebhook
  )
  .delete(
    "/v1/webhooks/:id",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    deleteWebhook
  )

export default router
