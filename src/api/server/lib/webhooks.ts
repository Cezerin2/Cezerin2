import axios from "axios"
import crypto from "crypto"
import WebhooksService from "../services/webhooks"

const trigger = async ({ event, payload }) => {
  const webhooks = await WebhooksService.getWebhooks()
  for (const webhook of webhooks) {
    if (webhook.events.includes(event)) {
      send({ event, payload, webhook })
    }
  }
}

const send = ({ event, payload, webhook }) => {
  if (
    webhook &&
    webhook.enabled === true &&
    webhook.url &&
    webhook.url.length > 0
  ) {
    const data = JSON.stringify(payload)
    const signature = sign({ data: data, secret: webhook.secret })

    axios.post(webhook.url, data, {
      headers: {
        "Content-Type": "application/json",
        "X-Hook-Event": event,
        "X-Hook-Signature": signature,
      },
    })
  }
}

const sign = ({ data, secret }) => {
  if (secret && secret.length > 0) {
    const hmac = crypto.createHmac("sha256", secret)
    hmac.update(data)
    const signature = hmac.digest("hex")
    return signature
  } else {
    return ""
  }
}

const events = {
  ORDER_CREATED: "order.created",
  ORDER_UPDATED: "order.updated",
  ORDER_DELETED: "order.deleted",
  TRANSACTION_CREATED: "transaction.created",
  TRANSACTION_UPDATED: "transaction.updated",
  TRANSACTION_DELETED: "transaction.deleted",
  CUSTOMER_CREATED: "customer.created",
  CUSTOMER_UPDATED: "customer.updated",
  CUSTOMER_DELETED: "customer.deleted",
}

export default {
  trigger: trigger,
  events: events,
}
