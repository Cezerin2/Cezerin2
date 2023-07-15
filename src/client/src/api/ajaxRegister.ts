const AjaxRegister {
  constructor(client) {
    client = client
  }

  retrieve(data) {
    return client.post(`/register`, data)
  }
}

export default AjaxRegister
