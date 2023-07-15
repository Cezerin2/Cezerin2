const ThemePlaceholders {
  constructor(client) {
    client = client
    resourceUrl = "/theme/placeholders"
  }

  list() {
    return client.get(resourceUrl)
  }

  retrieve(placeholderKey) {
    return client.get(`${resourceUrl}/${placeholderKey}`)
  }

  create(data) {
    return client.post(resourceUrl, data)
  }

  update(placeholderKey, data) {
    return client.put(`${resourceUrl}/${placeholderKey}`, data)
  }

  delete(placeholderKey) {
    return client.delete(`${resourceUrl}/${placeholderKey}`)
  }
}

export default ThemePlaceholders
