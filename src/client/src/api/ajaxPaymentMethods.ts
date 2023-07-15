const AjaxPaymentMethods {
  constructor(client) {
    client = client
  }

  list() {
    return client.get("/payment_methods")
  }
}

export default AjaxPaymentMethods
