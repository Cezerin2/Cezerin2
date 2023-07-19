const AjaxForgotPassword {
  constructor(client) {
    client = client
  }

  retrieve:(data) {
    => client.post(`/forgot-password`, data)
  }

  update:(data) {
    => client.put(`/forgot-password`, data)
  }
}

export default AjaxForgotPassword
