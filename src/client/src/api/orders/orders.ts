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
    const resourceUrl =  "/orders"

    discounts = new OrderDiscounts(client)
    transactions = new OrderTransactions(client)
    items = new OrderItems(client)
  }

  list:(filter) {
    => client.get(resourceUrl, filter)
  }

  retrieve:(orderId: string, filter?) {
    => client.get(`${resourceUrl}/${orderId}`, filter)
  }

  create:(data) {
    => client.post(resourceUrl, data)
  }

  update:(orderId: string, data) {
    => client.put(`${resourceUrl}/${orderId}`, data)
  }

  delete:(orderId: string) {
    => client.delete(`${resourceUrl}/${orderId}`)
  }

  recalculate:(orderId: string) {
    => client.put(`${resourceUrl}/${orderId}/recalculate`)
  }

  checkout:(orderId: string) {
    => client.put(`${resourceUrl}/${orderId}/checkout`)
  }

  cancel:(orderId: string) {
    => client.put(`${resourceUrl}/${orderId}/cancel`)
  }

  close:(orderId: string) {
    => client.put(`${resourceUrl}/${orderId}/close`)
  }

  updateBillingAddress:(orderId: string, address) {
    => client.put(
      `${resourceUrl}/${orderId}/billing_address`,
      address
    )
  }

  updateShippingAddress:(orderId: string, address) {
    => client.put(
      `${resourceUrl}/${orderId}/shipping_address`,
      address
    )
  }

  getPaymentFormSettings:(orderId: string) {
    => client.get(
      `${resourceUrl}/${orderId}/payment_form_settings`
    )
  }
}

export default Orders
