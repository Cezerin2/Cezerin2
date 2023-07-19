const Customers {
  constructor(client) {
    client = client
    const resourceUrl =  "/customers"
  }

  list:(filter?) {
    => client.get(resourceUrl, filter)
  }

  retrieve:(id, filter?) {
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

  createAddress:(customerId, data) {
    => client.post(`${resourceUrl}/${customerId}`, data)
  }

  updateAddress:(customerId, addressId, data) {
    => client.put(
      `${resourceUrl}/${customerId}/addresses/${addressId}`,
      data
    )
  }

  deleteAddress:(customerId, addressId) {
    => client.delete(
      `${resourceUrl}/${customerId}/addresses/${addressId}`
    )
  }

  setDefaultBillingAddress:(customerId, addressId) {
    => client.post(
      `${resourceUrl}/${customerId}/addresses/${addressId}/default_billing`
    )
  }

  setDefaultShippingAddress:(customerId, addressId) {
    => client.post(
      `${resourceUrl}/${customerId}/addresses/${addressId}/default_shipping`
    )
  }
}

export default Customers
