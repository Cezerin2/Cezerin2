import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import PaymentGateways from "../paymentGateways"
import OrderAddressService from "../services/orders/orderAddress"
import OrdertDiscountsService from "../services/orders/orderDiscounts"
import OrderItemsService from "../services/orders/orderItems"
import OrdersService from "../services/orders/orders"
import OrdertTansactionsService from "../services/orders/orderTransactions"

const router = Router()

const getOrders = (req: Request, res: Response, next: NextFunction) =>
  OrdersService.getOrders(req.query)
    .then(data => res.send(data))
    .catch(next)

const getSingleOrder = (req: Request, res: Response, next: NextFunction) =>
  OrdersService.getSingleOrder(req.params.id)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const addOrder = (req: Request, res: Response, next: NextFunction) =>
  OrdersService.addOrder(req.body)
    .then(data => res.send(data))
    .catch(next)

const updateOrder = (req: Request, res: Response, next: NextFunction) =>
  OrdersService.updateOrder(req.params.id, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const deleteOrder = (req: Request, res: Response, next: NextFunction) =>
  OrdersService.deleteOrder(req.params.id)
    .then(data => res.status(data ? 200 : 404).end())
    .catch(next)

const recalculateOrder = (req: Request, res: Response, next: NextFunction) =>
  OrderItemsService.calculateAndUpdateAllItems(req.params.id)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const checkoutOrder = (req: Request, res: Response, next: NextFunction) =>
  OrdersService.checkoutOrder(req.params.id)
    .then(data => res.send(data))
    .catch(next)

const cancelOrder = (req: Request, res: Response, next: NextFunction) =>
  OrdersService.cancelOrder(req.params.id)
    .then(data => res.send(data))
    .catch(next)

const closeOrder = (req: Request, res: Response, next: NextFunction) =>
  OrdersService.closeOrder(req.params.id)
    .then(data => res.send(data))
    .catch(next)

const updateBillingAddress = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  OrderAddressService.updateBillingAddress(req.params.id, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const updateShippingAddress = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  OrderAddressService.updateShippingAddress(req.params.id, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const addItem = (req: Request, res: Response, next: NextFunction) => {
  const orderID = req.params.id
  OrderItemsService.addItem(orderID, req.body)
    .then(data => res.send(data))
    .catch(next)
}

const updateItem = (req: Request, res: Response, next: NextFunction) => {
  const orderID = req.params.id
  const itemID = req.params.item_id
  OrderItemsService.updateItem(orderID, itemID, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)
}

const deleteItem = (req: Request, res: Response, next: NextFunction) => {
  const orderID = req.params.id
  const itemID = req.params.item_id
  OrderItemsService.deleteItem(orderID, itemID)
    .then(data => res.send(data))
    .catch(next)
}

const addTransaction = (req: Request, res: Response, next: NextFunction) => {
  const orderID = req.params.id
  OrdertTansactionsService.addTransaction(orderID, req.body)
    .then(data => res.send(data))
    .catch(next)
}

const updateTransaction = (req: Request, res: Response, next: NextFunction) => {
  const orderID = req.params.id
  const transactionID = req.params.item_id
  OrdertTansactionsService.updateTransaction(orderID, transactionID, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)
}

const deleteTransaction = (req: Request, res: Response, next: NextFunction) => {
  const orderID = req.params.id
  const transactionID = req.params.item_id
  OrdertTansactionsService.deleteTransaction(orderID, transactionID)
    .then(data => res.send(data))
    .catch(next)
}

const addDiscount = (req: Request, res: Response, next: NextFunction) => {
  const orderID = req.params.id
  OrdertDiscountsService.addDiscount(orderID, req.body)
    .then(data => res.send(data))
    .catch(next)
}

const updateDiscount = (req: Request, res: Response, next: NextFunction) => {
  const orderID = req.params.id
  const discountID = req.params.item_id
  OrdertDiscountsService.updateDiscount(orderID, discountID, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)
}

const deleteDiscount = (req: Request, res: Response, next: NextFunction) => {
  const orderID = req.params.id
  const discountID = req.params.item_id
  OrdertDiscountsService.deleteDiscount(orderID, discountID)
    .then(data => res.send(data))
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
  } catch (error) {
    next(error)
  }
}

router
  .get(
    "/v1/orders",
    security.checkUserScope(security.scope.READ_ORDERS),
    getOrders
  )
  .post(
    "/v1/orders",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    addOrder
  )
  .get(
    "/v1/orders/:id",
    security.checkUserScope(security.scope.READ_ORDERS),
    getSingleOrder
  )
  .put(
    "/v1/orders/:id",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    updateOrder
  )
  .delete(
    "/v1/orders/:id",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    deleteOrder
  )

  .put(
    "/v1/orders/:id/recalculate",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    recalculateOrder
  )
  .put(
    "/v1/orders/:id/checkout",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    checkoutOrder
  )
  .put(
    "/v1/orders/:id/cancel",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    cancelOrder
  )
  .put(
    "/v1/orders/:id/close",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    closeOrder
  )

  .put(
    "/v1/orders/:id/billing_address",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    updateBillingAddress
  )
  .put(
    "/v1/orders/:id/shipping_address",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    updateShippingAddress
  )

  .post(
    "/v1/orders/:id/items",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    addItem
  )
  .put(
    "/v1/orders/:id/items/:item_id",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    updateItem
  )
  .delete(
    "/v1/orders/:id/items/:item_id",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    deleteItem
  )

  .post(
    "/v1/orders/:id/transactions",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    addTransaction
  )
  .put(
    "/v1/orders/:id/transactions/:transaction_id",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    updateTransaction
  )
  .delete(
    "/v1/orders/:id/transactions/:transaction_id",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    deleteTransaction
  )

  .post(
    "/v1/orders/:id/discounts",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    addDiscount
  )
  .put(
    "/v1/orders/:id/discounts/:discount_id",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    updateDiscount
  )
  .delete(
    "/v1/orders/:id/discounts/:discount_id",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    deleteDiscount
  )

  .get(
    "/v1/orders/:id/payment_form_settings",
    security.checkUserScope(security.scope.READ_ORDERS),
    getPaymentFormSettings
  )

  .post(
    "/v1/orders/:id/charge",
    security.checkUserScope(security.scope.WRITE_ORDERS),
    chargeOrder
  )

export default router
