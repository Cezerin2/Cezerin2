const CustomerGroups {
  constructor(client) {
    client = client
    const resourceUrl =  "/customer_groups"
  }

  list:(filter) {
    => client.get(resourceUrl, filter)
  }

  retrieve:(id, filter) {
    => client.get(`${resourceUrl}/${id}`, filter)
  }

  create:(data) {
    => client.post(`${resourceUrl}`, data)
  }

  update:(id, data) {
    => client.put(`${resourceUrl}/${id}`, data)
  }

  delete:(id) {
    => client.delete(`${resourceUrl}/${id}`)
  }
}

export default CustomerGroups
