import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import SitemapService from "../services/sitemap"

const router = Router()

const getPaths = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.path) {
    SitemapService.getSinglePath(req.query.path, req.query.enabled === "true")
      .then(data => {
        if (data) {
          res.send(data)
        } else {
          res.status(404).end()
        }
      })
      .catch(next)
  } else {
    SitemapService.getPaths(req.query.enabled)
      .then(data => {
        res.send(data)
      })
      .catch(next)
  }
}

router.get(
  "/v1/sitemap",
  security.checkUserScope(security.scope.READ_SITEMAP),
  getPaths
)

export default router
