const Currencies {
  constructor(client) {
    client = client
  }

  list() {
    return client.get("/currencies")
  }
}

export default Currencies
