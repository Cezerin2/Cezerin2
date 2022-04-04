import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import PaymentGatewaysService from "../services/settings/paymentGateways"

const router = Router()

const getGateway = (req: Request, res: Response, next: NextFunction) =>
  PaymentGatewaysService.getGateway(req.params.name)
    .then(data => res.send(data))
    .catch(next)

const updateGateway = (req: Request, res: Response, next: NextFunction) =>
  PaymentGatewaysService.updateGateway(req.params.name, req.body)
    .then(data => res.send(data))
    .catch(next)

router
  .get(
    "/v1/payment_gateways/:name",
    security.checkUserScope(security.scope.READ_PAYMENT_METHODS),
    getGateway
  )
  .put(
    "/v1/payment_gateways/:name",
    security.checkUserScope(security.scope.WRITE_PAYMENT_METHODS),
    updateGateway
  )

export default router
