import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import PaymentGateways from "../paymentGateways"
import OrderAddressService from "../services/orders/orderAddress"
import OrdertDiscountsService from "../services/orders/orderDiscounts"
import OrderItemsService from "../services/orders/orderItems"
import OrdersService from "../services/orders/orders"
import OrdertTansactionsService from "../services/orders/orderTransactions"

const router = Router()

const getOrders = (req: Request, res: Response, next: NextFunction) => {
  OrdersService.getOrders(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getSingleOrder = (req: Request, res: Response, next: NextFunction) => {
  OrdersService.getSingleOrder(req.params.id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const addOrder = (req: Request, res: Response, next: NextFunction) => {
  OrdersService.addOrder(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateOrder = (req: Request, res: Response, next: NextFunction) => {
  OrdersService.updateOrder(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const deleteOrder = (req: Request, res: Response, next: NextFunction) => {
  OrdersService.deleteOrder(req.params.id)
    .then(data => {
      res.status(data ? 200 : 404).end()
    })
    .catch(next)
}

const recalculateOrder = (req: Request, res: Response, next: NextFunction) => {
  OrderItemsService.calculateAndUpdateAllItems(req.params.id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const checkoutOrder = (req: Request, res: Response, next: NextFunction) => {
  OrdersService.checkoutOrder(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const cancelOrder = (req: Request, res: Response, next: NextFunction) => {
  OrdersService.cancelOrder(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const closeOrder = (req: Request, res: Response, next: NextFunction) => {
  OrdersService.closeOrder(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateBillingAddress = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  OrderAddressService.updateBillingAddress(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const updateShippingAddress = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  OrderAddressService.updateShippingAddress(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const addItem = (req: Request, res: Response, next: NextFunction) => {
  const order_id = req.params.id
  OrderItemsService.addItem(order_id, req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateItem = (req: Request, res: Response, next: NextFunction) => {
  const order_id = req.params.id
  const item_id = req.params.item_id
  OrderItemsService.updateItem(order_id, item_id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const deleteItem = (req: Request, res: Response, next: NextFunction) => {
  const order_id = req.params.id
  const item_id = req.params.item_id
  OrderItemsService.deleteItem(order_id, item_id)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const addTransaction = (req: Request, res: Response, next: NextFunction) => {
  const order_id = req.params.id
  OrdertTansactionsService.addTransaction(order_id, req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateTransaction = (req: Request, res: Response, next: NextFunction) => {
  const order_id = req.params.id
  const transaction_id = req.params.item_id
  OrdertTansactionsService.updateTransaction(order_id, transaction_id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const deleteTransaction = (req: Request, res: Response, next: NextFunction) => {
  const order_id = req.params.id
  const transaction_id = req.params.item_id
  OrdertTansactionsService.deleteTransaction(order_id, transaction_id)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const addDiscount = (req: Request, res: Response, next: NextFunction) => {
  const order_id = req.params.id
  OrdertDiscountsService.addDiscount(order_id, req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateDiscount = (req: Request, res: Response, next: NextFunction) => {
  const order_id = req.params.id
  const discount_id = req.params.item_id
  OrdertDiscountsService.updateDiscount(order_id, discount_id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const deleteDiscount = (req: Request, res: Response, next: NextFunction) => {
  const order_id = req.params.id
  const discount_id = req.params.item_id
  OrdertDiscountsService.deleteDiscount(order_id, discount_id)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getPaymentFormSettings = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = req.params.id
  PaymentGateways.getPaymentFormSettings(orderId)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const chargeOrder = async (req: Request, res: Response, next: NextFunction) => {
  const orderId = req.params.id
  try {
    const isSuccess = await OrdersService.chargeOrder(orderId)
    res.status(isSuccess ? 200 : 500).end()
  } catch (err) {
    next(err)
  }
}

router.get(
  "/v1/orders",
  security.checkUserScope(security.scope.READ_ORDERS),
  getOrders
)
router.post(
  "/v1/orders",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  addOrder
)
router.get(
  "/v1/orders/:id",
  security.checkUserScope(security.scope.READ_ORDERS),
  getSingleOrder
)
router.put(
  "/v1/orders/:id",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  updateOrder
)
router.delete(
  "/v1/orders/:id",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  deleteOrder
)

router.put(
  "/v1/orders/:id/recalculate",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  recalculateOrder
)
router.put(
  "/v1/orders/:id/checkout",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  checkoutOrder
)
router.put(
  "/v1/orders/:id/cancel",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  cancelOrder
)
router.put(
  "/v1/orders/:id/close",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  closeOrder
)

router.put(
  "/v1/orders/:id/billing_address",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  updateBillingAddress
)
router.put(
  "/v1/orders/:id/shipping_address",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  updateShippingAddress
)

router.post(
  "/v1/orders/:id/items",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  addItem
)
router.put(
  "/v1/orders/:id/items/:item_id",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  updateItem
)
router.delete(
  "/v1/orders/:id/items/:item_id",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  deleteItem
)

router.post(
  "/v1/orders/:id/transactions",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  addTransaction
)
router.put(
  "/v1/orders/:id/transactions/:transaction_id",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  updateTransaction
)
router.delete(
  "/v1/orders/:id/transactions/:transaction_id",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  deleteTransaction
)

router.post(
  "/v1/orders/:id/discounts",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  addDiscount
)
router.put(
  "/v1/orders/:id/discounts/:discount_id",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  updateDiscount
)
router.delete(
  "/v1/orders/:id/discounts/:discount_id",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  deleteDiscount
)

router.get(
  "/v1/orders/:id/payment_form_settings",
  security.checkUserScope(security.scope.READ_ORDERS),
  getPaymentFormSettings
)

router.post(
  "/v1/orders/:id/charge",
  security.checkUserScope(security.scope.WRITE_ORDERS),
  chargeOrder
)

export default router
