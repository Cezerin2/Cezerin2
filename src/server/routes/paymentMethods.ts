import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import PaymentMethodsService from "../services/orders/paymentMethods"

const router = new Router()

const getMethods: Middleware = async ctx => {
  const data = await PaymentMethodsService.getMethods(ctx.query)
  ctx.body = data
}

const getSingleMethod: Middleware = async ctx => {
  const data = await PaymentMethodsService.getSingleMethod(ctx.params.id)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addMethod: Middleware = async ctx => {
  const data = await PaymentMethodsService.addMethod(ctx.request.body)
  ctx.body = data
}

const updateMethod: Middleware = async ctx => {
  const data = await PaymentMethodsService.updateMethod(
    ctx.params.id,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deleteMethod: Middleware = async ctx => {
  const data = await PaymentMethodsService.deleteMethod(ctx.params.id)
  ctx.status = data ? 200 : 404
}

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
