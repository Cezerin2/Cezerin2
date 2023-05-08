import https from "https"
import qs from "query-string"
import OrdersService from "../services/orders/orders"
import OrdertTansactionsService from "../services/orders/orderTransactions"

const SANDBOX_URL = "www.sandbox.paypal.com"
const REGULAR_URL = "www.paypal.com"

const getPaymentFormSettings = options => {
  const { gateway, gatewaySettings, order, amount, currency } = options

  const formSettings = {
    order_id: order.id,
    amount,
    currency,
    env: gatewaySettings.env,
    client: gatewaySettings.client,
    size: gatewaySettings.size,
    shape: gatewaySettings.shape,
    color: gatewaySettings.color,
    notify_url: gatewaySettings.notify_url,
  }

  return Promise.resolve(formSettings)
}

const paymentNotification = async options => {
  const { gateway, gatewaySettings, ctx } = options
  const settings = { allow_sandbox: true }
  const params = ctx.request.body
  const orderId = params.custom
  const paymentCompleted = params.payment_status === "Completed"

  ctx.status = 200

  await verify(params, settings)

  // TODO: Validate that the receiver's email address is registered to you.
  // TODO: Verify that the price, item description, and so on, match the transaction on your website.

  if (paymentCompleted) {
    await OrdersService.updateOrder(orderId, {
      paid: true,
      date_paid: new Date(),
    })

    OrdertTansactionsService.addTransaction(orderId, {
      transaction_id: params.txn_id,
      amount: params.mc_gross,
      currency: params.mc_currency,
      status: params.payment_status,
      details: `${params.first_name} ${params.last_name}, ${params.payer_email}`,
      success: true,
    })
  }
}

const verify = (params, settings) =>
  new Promise((resolve, reject) => {
    if (!settings)
      settings = {
        allow_sandbox: false,
      }

    if (!params || Object.keys(params).length === 0)
      return reject("Params is empty")

    params.cmd = "_notify-validate"
    const body = qs.stringify(params)

    // Set up the request to paypal
    let req_options = {
      host: params.test_ipn ? SANDBOX_URL : REGULAR_URL,
      method: "POST",
      path: "/cgi-bin/webscr",
      headers: { "Content-Length": body.length },
    }

    if (params.test_ipn && !settings.allow_sandbox)
      return reject(
        "Received request with test_ipn parameter while sandbox is disabled"
      )

    let req = https.request(req_options, res => {
      let data = []

      res.on("data", d => {
        data.push(d)
      })

      res.on("end", () => {
        const response = data.join("")

        // Check if IPN is valid
        if (response === "VERIFIED") return resolve(response)

        return reject("IPN Verification status: " + response)
      })
    })

    // Add the post parameters to the request body
    req.write(body)
    // Request error
    req.on("error", reject)
    req.end()
  })

export default {
  getPaymentFormSettings,
  paymentNotification,
}
