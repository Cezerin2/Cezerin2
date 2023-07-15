const AjaxAccount {
  constructor(client) {
    client = client
  }

  retrieve(data) {
    return client.post(`/customer-account`, data)
  }

  update(data) {
    return client.put(`/customer-account`, data)
  }
}

export default AjaxAccount
