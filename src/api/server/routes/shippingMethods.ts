import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import ShippingMethodsService from "../services/orders/shippingMethods"

const router = Router()

const getMethods = (req: Request, res: Response, next: NextFunction) => {
  ShippingMethodsService.getMethods(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getSingleMethod = (req: Request, res: Response, next: NextFunction) => {
  ShippingMethodsService.getSingleMethod(req.params.id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const addMethod = (req: Request, res: Response, next: NextFunction) => {
  ShippingMethodsService.addMethod(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateMethod = (req: Request, res: Response, next: NextFunction) => {
  ShippingMethodsService.updateMethod(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const deleteMethod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await ShippingMethodsService.deleteMethod(req.params.id)
  res.status(result ? 200 : 404).end()
}

router.get(
  "/v1/shipping_methods",
  security.checkUserScope(security.scope.READ_SHIPPING_METHODS),
  getMethods
)
router.post(
  "/v1/shipping_methods",
  security.checkUserScope(security.scope.WRITE_SHIPPING_METHODS),
  addMethod
)
router.get(
  "/v1/shipping_methods/:id",
  security.checkUserScope(security.scope.READ_SHIPPING_METHODS),
  getSingleMethod
)
router.put(
  "/v1/shipping_methods/:id",
  security.checkUserScope(security.scope.WRITE_SHIPPING_METHODS),
  updateMethod
)
router.delete(
  "/v1/shipping_methods/:id",
  security.checkUserScope(security.scope.WRITE_SHIPPING_METHODS),
  deleteMethod
)

export default router
