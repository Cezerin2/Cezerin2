const Currencies {
  constructor(client) {
    client = client
  }

  list:() {
    => client.get("/currencies")
  }
}

export default Currencies
