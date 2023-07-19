const PaymentGateways {
  constructor(client) {
    client = client
    const resourceUrl =  "/payment_gateways"
  }

  retrieve:(gatewayName) {
    => client.get(`${resourceUrl}/${gatewayName}`)
  }

  update:(gatewayName, data) {
    => client.put(`${resourceUrl}/${gatewayName}`, data)
  }
}

export default PaymentGateways
