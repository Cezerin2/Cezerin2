import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import OrderStatusesService from "../services/orders/orderStatuses"

const router = Router()

const getStatuses = (req: Request, res: Response, next: NextFunction) => {
  OrderStatusesService.getStatuses(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getSingleStatus = (req: Request, res: Response, next: NextFunction) => {
  OrderStatusesService.getSingleStatus(req.params.id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const addStatus = (req: Request, res: Response, next: NextFunction) => {
  OrderStatusesService.addStatus(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateStatus = (req: Request, res: Response, next: NextFunction) => {
  OrderStatusesService.updateStatus(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const deleteStatus = (req: Request, res: Response, next: NextFunction) => {
  OrderStatusesService.deleteStatus(req.params.id)
    .then(data => {
      res.status(data ? 200 : 404).end()
    })
    .catch(next)
}

router.get(
  "/v1/order_statuses",
  security.checkUserScope(security.scope.READ_ORDER_STATUSES),
  getStatuses
)
router.post(
  "/v1/order_statuses",
  security.checkUserScope(security.scope.WRITE_ORDER_STATUSES),
  addStatus
)
router.get(
  "/v1/order_statuses/:id",
  security.checkUserScope(security.scope.READ_ORDER_STATUSES),
  getSingleStatus
)
router.put(
  "/v1/order_statuses/:id",
  security.checkUserScope(security.scope.WRITE_ORDER_STATUSES),
  updateStatus
)
router.delete(
  "/v1/order_statuses/:id",
  security.checkUserScope(security.scope.WRITE_ORDER_STATUSES),
  deleteStatus
)

export default router
