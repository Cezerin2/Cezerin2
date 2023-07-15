const AjaxPaymentFormSettings {
  constructor(client) {
    client = client
  }

  retrieve() {
    return client.get("/payment_form_settings")
  }
}

export default AjaxPaymentFormSettings
