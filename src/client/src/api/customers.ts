class Customers {
  constructor(client) {
    this.client = client
    this.resourceUrl = "/customers"
  }

  list(filter?) {
    return this.client.get(this.resourceUrl, filter)
  }

  retrieve(id, filter?) {
    return this.client.get(`${this.resourceUrl}/${id}`, filter)
  }

  create(data) {
    return this.client.post(this.resourceUrl, data)
  }

  update(id, data) {
    return this.client.put(`${this.resourceUrl}/${id}`, data)
  }

  delete(id) {
    return this.client.delete(`${this.resourceUrl}/${id}`)
  }

  createAddress(customerId, data) {
    return this.client.post(`${this.resourceUrl}/${customerId}`, data)
  }

  updateAddress(customerId, addressId, data) {
    return this.client.put(
      `${this.resourceUrl}/${customerId}/addresses/${addressId}`,
      data
    )
  }

  deleteAddress(customerId, addressId) {
    return this.client.delete(
      `${this.resourceUrl}/${customerId}/addresses/${addressId}`
    )
  }

  setDefaultBillingAddress(customerId, addressId) {
    return this.client.post(
      `${this.resourceUrl}/${customerId}/addresses/${addressId}/default_billing`
    )
  }

  setDefaultShippingAddress(customerId, addressId) {
    return this.client.post(
      `${this.resourceUrl}/${customerId}/addresses/${addressId}/default_shipping`
    )
  }
}

export default Customers
