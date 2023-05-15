import ApiClient from "../../apiClient"

class OrderItems {
  client: ApiClient

  constructor(client: ApiClient) {
    this.client = client
  }

  create(orderId: string, data) {
    return this.client.post(`/orders/${orderId}/items`, data)
  }

  update(orderId: string, itemId: string, data) {
    return this.client.put(`/orders/${orderId}/items/${itemId}`, data)
  }

  delete(orderId: string, itemId: string) {
    return this.client.delete(`/orders/${orderId}/items/${itemId}`)
  }
}

export default OrderItems
