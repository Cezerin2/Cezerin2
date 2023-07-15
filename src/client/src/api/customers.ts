const Customers {
  constructor(client) {
    client = client
    resourceUrl = "/customers"
  }

  list(filter?) {
    return client.get(resourceUrl, filter)
  }

  retrieve(id, filter?) {
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

  createAddress(customerId, data) {
    return client.post(`${resourceUrl}/${customerId}`, data)
  }

  updateAddress(customerId, addressId, data) {
    return client.put(
      `${resourceUrl}/${customerId}/addresses/${addressId}`,
      data
    )
  }

  deleteAddress(customerId, addressId) {
    return client.delete(
      `${resourceUrl}/${customerId}/addresses/${addressId}`
    )
  }

  setDefaultBillingAddress(customerId, addressId) {
    return client.post(
      `${resourceUrl}/${customerId}/addresses/${addressId}/default_billing`
    )
  }

  setDefaultShippingAddress(customerId, addressId) {
    return client.post(
      `${resourceUrl}/${customerId}/addresses/${addressId}/default_shipping`
    )
  }
}

export default Customers
