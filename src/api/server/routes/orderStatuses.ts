import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import OrderStatusesService from "../services/orders/orderStatuses"

const router = new Router()

const getStatuses: Middleware = async ctx => {
  const data = await OrderStatusesService.getStatuses(ctx.query)
  ctx.body = data
}

const getSingleStatus: Middleware = async ctx => {
  const data = await OrderStatusesService.getSingleStatus(ctx.params.id)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addStatus: Middleware = async ctx => {
  const data = await OrderStatusesService.addStatus(ctx.request.body)
  ctx.body = data
}

const updateStatus: Middleware = async ctx => {
  const data = await OrderStatusesService.updateStatus(
    ctx.params.id,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deleteStatus: Middleware = async ctx => {
  const data = await OrderStatusesService.deleteStatus(ctx.params.id)
  if (data) {
    ctx.status = 200
  } else ctx.status = 404
}

router
  .get(
    "/v1/order_statuses",
    security.checkUserScope(security.scope.READ_ORDER_STATUSES),
    getStatuses
  )
  .post(
    "/v1/order_statuses",
    security.checkUserScope(security.scope.WRITE_ORDER_STATUSES),
    addStatus
  )
  .get(
    "/v1/order_statuses/:id",
    security.checkUserScope(security.scope.READ_ORDER_STATUSES),
    getSingleStatus
  )
  .put(
    "/v1/order_statuses/:id",
    security.checkUserScope(security.scope.WRITE_ORDER_STATUSES),
    updateStatus
  )
  .delete(
    "/v1/order_statuses/:id",
    security.checkUserScope(security.scope.WRITE_ORDER_STATUSES),
    deleteStatus
  )

export default router
