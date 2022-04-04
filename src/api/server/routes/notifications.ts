import { Request, Response, Router } from "express"
import PaymentGateways from "../paymentGateways"

const router = Router()

const paymentNotification = (req: Request, res: Response) =>
  PaymentGateways.paymentNotification(req, res, req.params.gateway)

router.post("/v1/notifications/:gateway", paymentNotification)

export default router
