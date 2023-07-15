const ThemePlaceholders {
  constructor(client) {
    this.client = client
    this.resourceUrl = "/theme/placeholders"
  }

  list() {
    return this.client.get(this.resourceUrl)
  }

  retrieve(placeholderKey) {
    return this.client.get(`${this.resourceUrl}/${placeholderKey}`)
  }

  create(data) {
    return this.client.post(this.resourceUrl, data)
  }

  update(placeholderKey, data) {
    return this.client.put(`${this.resourceUrl}/${placeholderKey}`, data)
  }

  delete(placeholderKey) {
    return this.client.delete(`${this.resourceUrl}/${placeholderKey}`)
  }
}

export default ThemePlaceholders
