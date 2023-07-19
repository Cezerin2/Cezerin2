const Pages {
  constructor(client) {
    client = client
    const resourceUrl =  "/pages"
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

export default Pages
