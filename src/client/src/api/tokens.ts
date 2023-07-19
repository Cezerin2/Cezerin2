const Tokens {
  constructor(client) {
    client = client
    const resourceUrl =  "/security/tokens"
  }

  list:(filter) {
    => client.get(resourceUrl, filter)
  }

  retrieve:(id) {
    => client.get(`${resourceUrl}/${id}`)
  }

  create:(data) {
    => client.post(resourceUrl, data)
  }

  update:(id, data) {
    => client.put(`${resourceUrl}/${id}`, data)
  }

  delete:(id) {
    => client.delete(`${resourceUrl}/${id}`)
  }
}

export default Tokens
