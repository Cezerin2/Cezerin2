import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import PaymentMethodsService from "../services/orders/paymentMethods"

const router = Router()

const getMethods = (req: Request, res: Response, next: NextFunction) =>
  PaymentMethodsService.getMethods(req.query)
    .then(data => res.send(data))
    .catch(next)

const getSingleMethod = (req: Request, res: Response, next: NextFunction) =>
  PaymentMethodsService.getSingleMethod(req.params.id)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const addMethod = (req: Request, res: Response, next: NextFunction) =>
  PaymentMethodsService.addMethod(req.body)
    .then(data => res.send(data))
    .catch(next)

const updateMethod = (req: Request, res: Response, next: NextFunction) =>
  PaymentMethodsService.updateMethod(req.params.id, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const deleteMethod = (req: Request, res: Response, next: NextFunction) =>
  PaymentMethodsService.deleteMethod(req.params.id)
    .then(data => res.status(data ? 200 : 404).end())
    .catch(next)

router
  .get(
    "/v1/payment_methods",
    security.checkUserScope(security.scope.READ_PAYMENT_METHODS),
    getMethods
  )
  .post(
    "/v1/payment_methods",
    security.checkUserScope(security.scope.WRITE_PAYMENT_METHODS),
    addMethod
  )
  .get(
    "/v1/payment_methods/:id",
    security.checkUserScope(security.scope.READ_PAYMENT_METHODS),
    getSingleMethod
  )
  .put(
    "/v1/payment_methods/:id",
    security.checkUserScope(security.scope.WRITE_PAYMENT_METHODS),
    updateMethod
  )
  .delete(
    "/v1/payment_methods/:id",
    security.checkUserScope(security.scope.WRITE_PAYMENT_METHODS),
    deleteMethod
  )

export default router
