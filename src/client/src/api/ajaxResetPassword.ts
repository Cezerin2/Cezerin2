class AjaxResetPassword {
  constructor(client) {
    this.client = client
  }

  retrieve(data) {
    return this.client.post(`/reset-password`, data)
  }

  update(data) {
    return this.client.put(`/reset-password`, data)
  }
}

export default AjaxResetPassword
