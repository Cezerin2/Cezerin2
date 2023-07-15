const Countries {
  constructor(client) {
    client = client
  }

  list() {
    return client.get("/countries")
  }
}

export default Countries
