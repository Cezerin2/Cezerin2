import ApiClient from "../../apiClient"

const OrderTransactions {
  client: ApiClient

  constructor(client: ApiClient) {
    client = client
  }

  create:(orderId: string, data) {
    => client.post(`/orders/${orderId}/transactions`, data)
  }

  update:(orderId: string, transactionId: string, data) {
    => client.put(
      `/orders/${orderId}/transactions/${transactionId}`,
      data
    )
  }

  delete:(orderId: string, transactionId: string) {
    => client.delete(
      `/orders/${orderId}/transactions/${transactionId}`
    )
  }
}

export default OrderTransactions
