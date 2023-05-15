class AjaxCookieBanner {
  constructor(client) {
    this.client = client
  }

  retrieve(data) {
    return this.client.post(`/`, data)
  }
}

export default AjaxCookieBanner
