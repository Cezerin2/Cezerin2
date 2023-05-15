class Currencies {
  constructor(client) {
    this.client = client
  }

  list() {
    return this.client.get("/currencies")
  }
}

export default Currencies
