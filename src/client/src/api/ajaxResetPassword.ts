const AjaxResetPassword {
  constructor(client) {
    client = client
  }

  retrieve:(data) {
    => client.post(`/reset-password`, data)
  }

  update:(data) {
    => client.put(`/reset-password`, data)
  }
}

export default AjaxResetPassword
