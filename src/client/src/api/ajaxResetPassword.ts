const AjaxResetPassword {
  constructor(client) {
    client = client
  }

  retrieve(data) {
    return client.post(`/reset-password`, data)
  }

  update(data) {
    return client.put(`/reset-password`, data)
  }
}

export default AjaxResetPassword
