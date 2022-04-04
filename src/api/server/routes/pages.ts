import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import PagesService from "../services/pages/pages"

const router = Router()

const getPages = (req: Request, res: Response, next: NextFunction) =>
  PagesService.getPages(req.query)
    .then(data => res.send(data))
    .catch(next)

const getSinglePage = (req: Request, res: Response, next: NextFunction) =>
  PagesService.getSinglePage(req.params.id)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const addPage = (req: Request, res: Response, next: NextFunction) => {
  PagesService.addPage(req.body)
    .then(data => res.send(data))
    .catch(next)
}

const updatePage = (req: Request, res: Response, next: NextFunction) => {
  PagesService.updatePage(req.params.id, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)
}

const deletePage = (req: Request, res: Response, next: NextFunction) =>
  PagesService.deletePage(req.params.id)
    .then(data => res.status(data ? 200 : 404).end())
    .catch(next)

router
  .get(
    "/v1/pages",
    security.checkUserScope(security.scope.READ_PAGES),
    getPages
  )
  .post(
    "/v1/pages",
    security.checkUserScope(security.scope.WRITE_PAGES),
    addPage
  )
  .get(
    "/v1/pages/:id",
    security.checkUserScope(security.scope.READ_PAGES),
    getSinglePage
  )
  .put(
    "/v1/pages/:id",
    security.checkUserScope(security.scope.WRITE_PAGES),
    updatePage
  )
  .delete(
    "/v1/pages/:id",
    security.checkUserScope(security.scope.WRITE_PAGES),
    deletePage
  )

export default router
