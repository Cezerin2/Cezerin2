const AjaxCookieBanner {
  constructor(client) {
    client = client
  }

  retrieve:(data) {
    => client.post(`/`, data)
  }
}

export default AjaxCookieBanner
