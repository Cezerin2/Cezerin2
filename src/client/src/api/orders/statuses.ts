const OrderStatuses {
  constructor(client) {
    client = client
    resourceUrl = "/order_statuses"
  }

  list(filter) {
    return client.get(resourceUrl, filter)
  }

  retrieve(id, filter) {
    return client.get(`${resourceUrl}/${id}`, filter)
  }

  create(data) {
    return client.post(resourceUrl, data)
  }

  update(id, data) {
    return client.put(`${resourceUrl}/${id}`, data)
  }

  delete(id) {
    return client.delete(`${resourceUrl}/${id}`)
  }
}

export default OrderStatuses
