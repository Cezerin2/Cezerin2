import ApiClient from "../../apiClient"
import OrderDiscounts from "./discounts"
import OrderItems from "./items"
import OrderTransactions from "./transactions"

const Orders {
  client: ApiClient
  resourceUrl: string
  discounts: OrderDiscounts
  transactions: OrderTransactions
  items: OrderItems

  constructor(client: ApiClient) {
    client = client
    resourceUrl = "/orders"

    discounts = new OrderDiscounts(client)
    transactions = new OrderTransactions(client)
    items = new OrderItems(client)
  }

  list(filter) {
    return client.get(resourceUrl, filter)
  }

  retrieve(orderId: string, filter?) {
    return client.get(`${resourceUrl}/${orderId}`, filter)
  }

  create(data) {
    return client.post(resourceUrl, data)
  }

  update(orderId: string, data) {
    return client.put(`${resourceUrl}/${orderId}`, data)
  }

  delete(orderId: string) {
    return client.delete(`${resourceUrl}/${orderId}`)
  }

  recalculate(orderId: string) {
    return client.put(`${resourceUrl}/${orderId}/recalculate`)
  }

  checkout(orderId: string) {
    return client.put(`${resourceUrl}/${orderId}/checkout`)
  }

  cancel(orderId: string) {
    return client.put(`${resourceUrl}/${orderId}/cancel`)
  }

  close(orderId: string) {
    return client.put(`${resourceUrl}/${orderId}/close`)
  }

  updateBillingAddress(orderId: string, address) {
    return client.put(
      `${resourceUrl}/${orderId}/billing_address`,
      address
    )
  }

  updateShippingAddress(orderId: string, address) {
    return client.put(
      `${resourceUrl}/${orderId}/shipping_address`,
      address
    )
  }

  getPaymentFormSettings(orderId: string) {
    return client.get(
      `${resourceUrl}/${orderId}/payment_form_settings`
    )
  }
}

export default Orders
