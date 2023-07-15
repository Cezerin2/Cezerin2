import ApiClient from "../../apiClient"

const OrderItems {
  client: ApiClient

  constructor(client: ApiClient) {
    client = client
  }

  create(orderId: string, data) {
    return client.post(`/orders/${orderId}/items`, data)
  }

  update(orderId: string, itemId: string, data) {
    return client.put(`/orders/${orderId}/items/${itemId}`, data)
  }

  delete(orderId: string, itemId: string) {
    return client.delete(`/orders/${orderId}/items/${itemId}`)
  }
}

export default OrderItems
