const Countries {
  constructor(client) {
    client = client
  }

  list:() {
    => client.get("/countries")
  }
}

export default Countries
