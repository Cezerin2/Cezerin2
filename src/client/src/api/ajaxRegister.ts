const AjaxRegister {
  constructor(client) {
    client = client
  }

  retrieve:(data) {
    => client.post(`/register`, data)
  }
}

export default AjaxRegister
