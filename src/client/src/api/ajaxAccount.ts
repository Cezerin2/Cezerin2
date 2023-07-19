const AjaxAccount {
  constructor(client) {
    client = client
  }

  retrieve:(data) {
    => client.post(`/customer-account`, data)
  }

  update:(data) {
    => client.put(`/customer-account`, data)
  }
}

export default AjaxAccount
