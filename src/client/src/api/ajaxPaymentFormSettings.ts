const AjaxPaymentFormSettings {
  constructor(client) {
    client = client
  }

  retrieve:() {
    => client.get("/payment_form_settings")
  }
}

export default AjaxPaymentFormSettings
