import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import PaymentGatewaysService from "../services/settings/paymentGateways"

const router = new Router()

const getGateway: Middleware = async ctx => {
  const data = await PaymentGatewaysService.getGateway(ctx.params.name)
  ctx.body = data
}

const updateGateway: Middleware = async ctx => {
  const data = await PaymentGatewaysService.updateGateway(
    ctx.params.name,
    ctx.request.body
  )
  ctx.body = data
}

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
