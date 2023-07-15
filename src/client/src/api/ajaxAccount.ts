const AjaxAccount {
  constructor(client) {
    this.client = client
  }

  retrieve(data) {
    return this.client.post(`/customer-account`, data)
  }

  update(data) {
    return this.client.put(`/customer-account`, data)
  }
}

export default AjaxAccount
