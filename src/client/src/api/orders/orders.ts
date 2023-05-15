import ApiClient from "../../apiClient"
import OrderDiscounts from "./discounts"
import OrderItems from "./items"
import OrderTransactions from "./transactions"

class Orders {
  client: ApiClient
  resourceUrl: string
  discounts: OrderDiscounts
  transactions: OrderTransactions
  items: OrderItems

  constructor(client: ApiClient) {
    this.client = client
    this.resourceUrl = "/orders"

    this.discounts = new OrderDiscounts(client)
    this.transactions = new OrderTransactions(client)
    this.items = new OrderItems(client)
  }

  list(filter) {
    return this.client.get(this.resourceUrl, filter)
  }

  retrieve(orderId: string, filter) {
    return this.client.get(`${this.resourceUrl}/${orderId}`, filter)
  }

  create(data) {
    return this.client.post(this.resourceUrl, data)
  }

  update(orderId: string, data) {
    return this.client.put(`${this.resourceUrl}/${orderId}`, data)
  }

  delete(orderId: string) {
    return this.client.delete(`${this.resourceUrl}/${orderId}`)
  }

  recalculate(orderId: string) {
    return this.client.put(`${this.resourceUrl}/${orderId}/recalculate`)
  }

  checkout(orderId: string) {
    return this.client.put(`${this.resourceUrl}/${orderId}/checkout`)
  }

  cancel(orderId: string) {
    return this.client.put(`${this.resourceUrl}/${orderId}/cancel`)
  }

  close(orderId: string) {
    return this.client.put(`${this.resourceUrl}/${orderId}/close`)
  }

  updateBillingAddress(orderId: string, address) {
    return this.client.put(
      `${this.resourceUrl}/${orderId}/billing_address`,
      address
    )
  }

  updateShippingAddress(orderId: string, address) {
    return this.client.put(
      `${this.resourceUrl}/${orderId}/shipping_address`,
      address
    )
  }

  getPaymentFormSettings(orderId: string) {
    return this.client.get(
      `${this.resourceUrl}/${orderId}/payment_form_settings`
    )
  }
}

export default Orders
