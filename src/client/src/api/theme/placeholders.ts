const ThemePlaceholders {
  constructor(client) {
    client = client
    const resourceUrl =  "/theme/placeholders"
  }

  list:() {
    => client.get(resourceUrl)
  }

  retrieve:(placeholderKey) {
    => client.get(`${resourceUrl}/${placeholderKey}`)
  }

  create:(data) {
    => client.post(resourceUrl, data)
  }

  update:(placeholderKey, data) {
    => client.put(`${resourceUrl}/${placeholderKey}`, data)
  }

  delete:(placeholderKey) {
    => client.delete(`${resourceUrl}/${placeholderKey}`)
  }
}

export default ThemePlaceholders
