import ApiClient from "../../apiClient"

const OrderTransactions {
  client: ApiClient

  constructor(client: ApiClient) {
    client = client
  }

  create(orderId: string, data) {
    return client.post(`/orders/${orderId}/transactions`, data)
  }

  update(orderId: string, transactionId: string, data) {
    return client.put(
      `/orders/${orderId}/transactions/${transactionId}`,
      data
    )
  }

  delete(orderId: string, transactionId: string) {
    return client.delete(
      `/orders/${orderId}/transactions/${transactionId}`
    )
  }
}

export default OrderTransactions
