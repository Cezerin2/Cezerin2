const OrderStatuses {
  constructor(client) {
    client = client
    const resourceUrl =  "/order_statuses"
  }

  list:(filter) {
    => client.get(resourceUrl, filter)
  }

  retrieve:(id, filter) {
    => client.get(`${resourceUrl}/${id}`, filter)
  }

  create:(data) {
    => client.post(resourceUrl, data)
  }

  update:(id, data) {
    => client.put(`${resourceUrl}/${id}`, data)
  }

  delete:(id) {
    => client.delete(`${resourceUrl}/${id}`)
  }
}

export default OrderStatuses
