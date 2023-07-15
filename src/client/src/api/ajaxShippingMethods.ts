const AjaxShippingMethods {
  constructor(client) {
    client = client
  }

  list() {
    return client.get("/shipping_methods")
  }
}

export default AjaxShippingMethods
