const CheckoutFields {
  constructor(client) {
    this.client = client
    this.resourceUrl = "/settings/checkout/fields"
  }

  list() {
    return this.client.get(this.resourceUrl)
  }

  retrieve(name) {
    return this.client.get(`${this.resourceUrl}/${name}`)
  }

  update(name, data) {
    return this.client.put(`${this.resourceUrl}/${name}`, data)
  }
}

export default CheckoutFields
