const AjaxForgotPassword {
  constructor(client) {
    client = client
  }

  retrieve(data) {
    return client.post(`/forgot-password`, data)
  }

  update(data) {
    return client.put(`/forgot-password`, data)
  }
}

export default AjaxForgotPassword
