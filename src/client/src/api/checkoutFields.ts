const CheckoutFields {
  constructor(client) {
    client = client
    const resourceUrl =  "/settings/checkout/fields"
  }

  list:() {
    => client.get(resourceUrl)
  }

  retrieve:(name) {
    => client.get(`${resourceUrl}/${name}`)
  }

  update:(name, data) {
    => client.put(`${resourceUrl}/${name}`, data)
  }
}

export default CheckoutFields
