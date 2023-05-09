import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import ShippingMethodsService from "../services/orders/shippingMethods"

const router = new Router()

const getMethods: Middleware = async ctx => {
  const data = await ShippingMethodsService.getMethods(ctx.query)
  ctx.body = data
}

const getSingleMethod: Middleware = async ctx => {
  const data = await ShippingMethodsService.getSingleMethod(ctx.params.id)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addMethod: Middleware = async ctx => {
  const data = await ShippingMethodsService.addMethod(ctx.request.body)
  ctx.body = data
}

const updateMethod: Middleware = async ctx => {
  const data = await ShippingMethodsService.updateMethod(
    ctx.params.id,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deleteMethod: Middleware = async ctx => {
  const result = await ShippingMethodsService.deleteMethod(ctx.params.id)
  ctx.status = result ? 200 : 404
}

router
  .get(
    "/v1/shipping_methods",
    security.checkUserScope(security.scope.READ_SHIPPING_METHODS),
    getMethods
  )
  .post(
    "/v1/shipping_methods",
    security.checkUserScope(security.scope.WRITE_SHIPPING_METHODS),
    addMethod
  )
  .get(
    "/v1/shipping_methods/:id",
    security.checkUserScope(security.scope.READ_SHIPPING_METHODS),
    getSingleMethod
  )
  .put(
    "/v1/shipping_methods/:id",
    security.checkUserScope(security.scope.WRITE_SHIPPING_METHODS),
    updateMethod
  )
  .delete(
    "/v1/shipping_methods/:id",
    security.checkUserScope(security.scope.WRITE_SHIPPING_METHODS),
    deleteMethod
  )

export default router
