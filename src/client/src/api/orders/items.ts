import ApiClient from "../../apiClient"

const OrderItems {
  client: ApiClient

  constructor(client: ApiClient) {
    client = client
  }

  create:(orderId: string, data) {
    => client.post(`/orders/${orderId}/items`, data)
  }

  update:(orderId: string, itemId: string, data) {
    => client.put(`/orders/${orderId}/items/${itemId}`, data)
  }

  delete:(orderId: string, itemId: string) {
    => client.delete(`/orders/${orderId}/items/${itemId}`)
  }
}

export default OrderItems
