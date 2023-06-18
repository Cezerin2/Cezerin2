import Stripe from "stripe"
import OrdertTansactionsService from "../services/orders/orderTransactions"
import OrdersService from "../services/orders/orders"

const getPaymentFormSettings = options => {
  const { gateway, gatewaySettings, order, amount, currency } = options
  const formSettings = {
    order_id: order.id,
    amount,
    currency,
    email: order.email,
    public_key: gatewaySettings.public_key,
  }
  return Promise.resolve(formSettings)
}

const processOrderPayment = async ({ order, gatewaySettings, settings }) => {
  const stripe = new Stripe(gatewaySettings.secret_key, {
    apiVersion: "2022-11-15",
  })

  const intent = await stripe.paymentIntents.create({
    amount: order.grand_total * 100,
    currency: settings.currency_code,
    automatic_payment_methods: { enabled: true },
    confirm: true,
    description: `Order #${order.number}`,
    metadata: { order_id: order.id },
    payment_method: order.payment_token,
    return_url: `${settings.domain}/checkout`,
    statement_descriptor: `Order #${order.number}`,
  })

  const paymentSucceeded = intent.status === "succeeded"

  if (paymentSucceeded)
    await OrdersService.updateOrder(order.id, {
      paid: true,
      date_paid: new Date(),
    })

  await OrdertTansactionsService.addTransaction(order.id, {
    transaction_id: intent.id,
    amount: intent.amount / 100,
    currency: intent.currency,
    status: intent.status,
    details: intent.status, // TODO: Unnecessary
    success: paymentSucceeded,
  })

  return paymentSucceeded
}

export default {
  getPaymentFormSettings,
  processOrderPayment,
}
