const CheckoutFields {
  constructor(client) {
    client = client
    resourceUrl = "/settings/checkout/fields"
  }

  list() {
    return client.get(resourceUrl)
  }

  retrieve(name) {
    return client.get(`${resourceUrl}/${name}`)
  }

  update(name, data) {
    return client.put(`${resourceUrl}/${name}`, data)
  }
}

export default CheckoutFields
