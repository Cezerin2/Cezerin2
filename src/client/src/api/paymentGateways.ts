const PaymentGateways {
  constructor(client) {
    client = client
    resourceUrl = "/payment_gateways"
  }

  retrieve(gatewayName) {
    return client.get(`${resourceUrl}/${gatewayName}`)
  }

  update(gatewayName, data) {
    return client.put(`${resourceUrl}/${gatewayName}`, data)
  }
}

export default PaymentGateways
