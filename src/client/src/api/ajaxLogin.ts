const AjaxLogin {
  constructor(client) {
    client = client
  }

  retrieve(data) {
    return client.post(`/login`, data)
  }
}

export default AjaxLogin
