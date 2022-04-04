import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import RedirectsService from "../services/redirects"

const router = Router()

const getRedirects = (req: Request, res: Response, next: NextFunction) =>
  RedirectsService.getRedirects(req.query)
    .then(data => res.send(data))
    .catch(next)

const getSingleRedirect = (req: Request, res: Response, next: NextFunction) =>
  RedirectsService.getSingleRedirect(req.params.id)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const addRedirect = (req: Request, res: Response, next: NextFunction) =>
  RedirectsService.addRedirect(req.body)
    .then(data => res.send(data))
    .catch(next)

const updateRedirect = (req: Request, res: Response, next: NextFunction) =>
  RedirectsService.updateRedirect(req.params.id, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const deleteRedirect = (req: Request, res: Response, next: NextFunction) =>
  RedirectsService.deleteRedirect(req.params.id)
    .then(data => res.status(data ? 200 : 404).end())
    .catch(next)

router
  .get(
    "/v1/redirects",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getRedirects
  )
  .post(
    "/v1/redirects",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    addRedirect
  )
  .get(
    "/v1/redirects/:id",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getSingleRedirect
  )
  .put(
    "/v1/redirects/:id",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    updateRedirect
  )
  .delete(
    "/v1/redirects/:id",
    security.checkUserScope(security.scope.WRITE_SETTINGS),
    deleteRedirect
  )

export default router
