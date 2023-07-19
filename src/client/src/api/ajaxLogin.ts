const AjaxLogin {
  constructor(client) {
    client = client
  }

  retrieve:(data) {
    => client.post(`/login`, data)
  }
}

export default AjaxLogin
