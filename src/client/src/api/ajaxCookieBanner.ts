const AjaxCookieBanner {
  constructor(client) {
    client = client
  }

  retrieve(data) {
    return client.post(`/`, data)
  }
}

export default AjaxCookieBanner
