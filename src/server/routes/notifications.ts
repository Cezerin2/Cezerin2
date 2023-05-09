import Router, { Middleware } from "@koa/router"
import PaymentGateways from "../paymentGateways"

const router = new Router()

const paymentNotification: Middleware = ctx =>
  PaymentGateways.paymentNotification(ctx, ctx.params.gateway)

router.post("/v1/notifications/:gateway", paymentNotification)

export default router
