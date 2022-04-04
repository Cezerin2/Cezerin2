import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import SecurityTokensService from "../services/security/tokens"

const router = Router()

const getTokens = (req: Request, res: Response, next: NextFunction) =>
  SecurityTokensService.getTokens(req.query)
    .then(data => res.send(data))
    .catch(next)

const getTokensBlacklist = (req: Request, res: Response, next: NextFunction) =>
  SecurityTokensService.getTokensBlacklist()
    .then(data => res.send(data))
    .catch(next)

const getSingleToken = (req: Request, res: Response, next: NextFunction) =>
  SecurityTokensService.getSingleToken(req.params.id)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const addToken = (req: Request, res: Response, next: NextFunction) =>
  SecurityTokensService.addToken(req.body)
    .then(data => res.send(data))
    .catch(next)

const updateToken = (req: Request, res: Response, next: NextFunction) =>
  SecurityTokensService.updateToken(req.params.id, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const deleteToken = (req: Request, res: Response, next: NextFunction) =>
  SecurityTokensService.deleteToken(req.params.id)
    .then(() => res.end())
    .catch(next)

const sendDashboardSigninUrl = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  SecurityTokensService.sendDashboardSigninUrl(req)
    .then(data => res.send(data))
    .catch(next)

router
  .get(
    "/v1/security/tokens",
    security.checkUserScope(security.scope.ADMIN),
    getTokens
  )
  .get(
    "/v1/security/tokens/blacklist",
    security.checkUserScope(security.scope.ADMIN),
    getTokensBlacklist
  )
  .post(
    "/v1/security/tokens",
    security.checkUserScope(security.scope.ADMIN),
    addToken
  )
  .get(
    "/v1/security/tokens/:id",
    security.checkUserScope(security.scope.ADMIN),
    getSingleToken
  )
  .put(
    "/v1/security/tokens/:id",
    security.checkUserScope(security.scope.ADMIN),
    updateToken
  )
  .delete(
    "/v1/security/tokens/:id",
    security.checkUserScope(security.scope.ADMIN),
    deleteToken
  )
  .post("/v1/authorize", sendDashboardSigninUrl)

export default router
