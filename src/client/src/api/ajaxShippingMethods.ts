const AjaxShippingMethods {
  constructor(client) {
    client = client
  }

  list:() {
    => client.get("/shipping_methods")
  }
}

export default AjaxShippingMethods
