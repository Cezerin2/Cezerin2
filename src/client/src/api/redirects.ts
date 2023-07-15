const Redirects {
  constructor(client) {
    client = client
    resourceUrl = "/redirects"
  }

  list() {
    return client.get(resourceUrl)
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

export default Redirects
