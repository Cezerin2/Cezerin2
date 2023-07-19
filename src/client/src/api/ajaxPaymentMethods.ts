const AjaxPaymentMethods {
  constructor(client) {
    client = client
  }

  list:() {
    => client.get("/payment_methods")
  }
}

export default AjaxPaymentMethods
