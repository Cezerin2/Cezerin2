import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import SecurityTokensService from "../services/security/tokens"

const router = Router()

const getTokens = (req: Request, res: Response, next: NextFunction) => {
  SecurityTokensService.getTokens(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getTokensBlacklist = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SecurityTokensService.getTokensBlacklist()
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getSingleToken = (req: Request, res: Response, next: NextFunction) => {
  SecurityTokensService.getSingleToken(req.params.id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const addToken = (req: Request, res: Response, next: NextFunction) => {
  SecurityTokensService.addToken(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateToken = (req: Request, res: Response, next: NextFunction) => {
  SecurityTokensService.updateToken(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const deleteToken = (req: Request, res: Response, next: NextFunction) => {
  SecurityTokensService.deleteToken(req.params.id)
    .then(data => {
      res.end()
    })
    .catch(next)
}

const sendDashboardSigninUrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SecurityTokensService.sendDashboardSigninUrl(req)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

router.get(
  "/v1/security/tokens",
  security.checkUserScope(security.scope.ADMIN),
  getTokens
)
router.get(
  "/v1/security/tokens/blacklist",
  security.checkUserScope(security.scope.ADMIN),
  getTokensBlacklist
)
router.post(
  "/v1/security/tokens",
  security.checkUserScope(security.scope.ADMIN),
  addToken
)
router.get(
  "/v1/security/tokens/:id",
  security.checkUserScope(security.scope.ADMIN),
  getSingleToken
)
router.put(
  "/v1/security/tokens/:id",
  security.checkUserScope(security.scope.ADMIN),
  updateToken
)
router.delete(
  "/v1/security/tokens/:id",
  security.checkUserScope(security.scope.ADMIN),
  deleteToken
)
router.post("/v1/authorize", sendDashboardSigninUrl)

export default router
