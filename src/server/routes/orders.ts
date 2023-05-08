import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import PaymentGateways from "../paymentGateways"
import OrderAddressService from "../services/orders/orderAddress"
import OrdertDiscountsService from "../services/orders/orderDiscounts"
import OrderItemsService from "../services/orders/orderItems"
import OrdersService from "../services/orders/orders"
import OrdertTansactionsService from "../services/orders/orderTransactions"

const router = new Router()

const getOrders: Middleware = async ctx => {
  const data = await OrdersService.getOrders(ctx.query)
  ctx.body = data
}

const getSingleOrder: Middleware = async ctx => {
  const data = await OrdersService.getSingleOrder(ctx.params.id)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addOrder: Middleware = async ctx => {
  const data = await OrdersService.addOrder(ctx.request.body)
  ctx.body = data
}

const updateOrder: Middleware = async ctx => {
  const data = await OrdersService.updateOrder(ctx.params.id, ctx.request.body)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deleteOrder: Middleware = async ctx => {
  const data = await OrdersService.deleteOrder(ctx.params.id)
  ctx.status = data ? 200 : 404
}

const recalculateOrder: Middleware = async ctx => {
  const data = await OrderItemsService.calculateAndUpdateAllItems(ctx.params.id)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const checkoutOrder: Middleware = async ctx => {
  const data = await OrdersService.checkoutOrder(ctx.params.id)
  ctx.body = data
}

const cancelOrder: Middleware = async ctx => {
  const data = await OrdersService.cancelOrder(ctx.params.id)
  ctx.body = data
}

const closeOrder: Middleware = async ctx => {
  const data = await OrdersService.closeOrder(ctx.params.id)
  ctx.body = data
}

const updateBillingAddress: Middleware = async ctx => {
  const data = await OrderAddressService.updateBillingAddress(
    ctx.params.id,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const updateShippingAddress: Middleware = async ctx => {
  const data = await OrderAddressService.updateShippingAddress(
    ctx.params.id,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addItem: Middleware = async ctx => {
  const orderID = ctx.params.id
  const data = await OrderItemsService.addItem(orderID, ctx.request.body)
  ctx.body = data
}

const updateItem: Middleware = async ctx => {
  const orderID = ctx.params.id
  const itemID = ctx.params.item_id
  const data = await OrderItemsService.updateItem(
    orderID,
    itemID,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deleteItem: Middleware = async ctx => {
  const orderID = ctx.params.id
  const itemID = ctx.params.item_id
  const data = await OrderItemsService.deleteItem(orderID, itemID)
  ctx.body = data
}

const addTransaction: Middleware = async ctx => {
  const orderID = ctx.params.id
  const data = await OrdertTansactionsService.addTransaction(
    orderID,
    ctx.request.body
  )
  ctx.body = data
}

const updateTransaction: Middleware = async ctx => {
  const orderID = ctx.params.id
  const transactionID = ctx.params.item_id
  const data = await OrdertTansactionsService.updateTransaction(
    orderID,
    transactionID,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deleteTransaction: Middleware = async ctx => {
  const orderID = ctx.params.id
  const transactionID = ctx.params.item_id
  const data = await OrdertTansactionsService.deleteTransaction(
    orderID,
    transactionID
  )
  ctx.body = data
}

const addDiscount: Middleware = async ctx => {
  const orderID = ctx.params.id
  const data = await OrdertDiscountsService.addDiscount(
    orderID,
    ctx.request.body
  )
  ctx.body = data
}

const updateDiscount: Middleware = async ctx => {
  const orderID = ctx.params.id
  const discountID = ctx.params.item_id
  const data = await OrdertDiscountsService.updateDiscount(
    orderID,
    discountID,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deleteDiscount: Middleware = async ctx => {
  const orderID = ctx.params.id
  const discountID = ctx.params.item_id
  const data = await OrdertDiscountsService.deleteDiscount(orderID, discountID)
  ctx.body = data
}

const getPaymentFormSettings: Middleware = async ctx => {
  const orderId = ctx.params.id
  const data = await PaymentGateways.getPaymentFormSettings(orderId)
  ctx.body = data
}

const chargeOrder: Middleware = async ctx => {
  const orderId = ctx.params.id
  const isSuccess = await OrdersService.chargeOrder(orderId)
  ctx.status = isSuccess ? 200 : 500
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
