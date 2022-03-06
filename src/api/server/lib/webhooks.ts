import axios from "axios"
import crypto from "crypto"
import WebhooksService from "../services/webhooks"

const sign = ({ data, secret }) => {
  if (secret && secret.length > 0) {
    const hmac = crypto.createHmac("sha512", secret)
    hmac.update(data)
    const signature = hmac.digest("hex")
    return signature
  }

  return ""
}

const send = ({ event, payload, webhook }) => {
  if (
    webhook &&
    webhook.enabled === true &&
    webhook.url &&
    webhook.url.length > 0
  ) {
    const data = JSON.stringify(payload)
    const signature = sign({ data, secret: webhook.secret })

    axios.post(webhook.url, data, {
      headers: {
        "Content-Type": "application/json",
        "X-Hook-Event": event,
        "X-Hook-Signature": signature,
      },
    })
  }
}

export const trigger = async ({ event, payload }) => {
  const webhooks = await WebhooksService.getWebhooks()
  for (const webhook of webhooks) {
    if (webhook.events.includes(event)) send({ event, payload, webhook })
  }
}

export const events = {
  orderCreated: "order.created",
  orderUpdated: "order.updated",
  orderDeleted: "order.deleted",
  transactionCreated: "transaction.created",
  transactionUpdated: "transaction.updated",
  transactionDeleted: "transaction.deleted",
  customerCreated: "customer.created",
  customerUpdated: "customer.updated",
  customerDeleted: "customer.deleted",
}
