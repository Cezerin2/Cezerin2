const Tokens {
  constructor(client) {
    client = client
    resourceUrl = "/security/tokens"
  }

  list(filter) {
    return client.get(resourceUrl, filter)
  }

  retrieve(id) {
    return client.get(`${resourceUrl}/${id}`)
  }

  create(data) {
    return client.post(resourceUrl, data)
  }

  update(id, data) {
    return client.put(`${resourceUrl}/${id}`, data)
  }

  delete(id) {
    return client.delete(`${resourceUrl}/${id}`)
  }
}

export default Tokens
