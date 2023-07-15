const AjaxForgotPassword {
  constructor(client) {
    this.client = client
  }

  retrieve(data) {
    return this.client.post(`/forgot-password`, data)
  }

  update(data) {
    return this.client.put(`/forgot-password`, data)
  }
}

export default AjaxForgotPassword
