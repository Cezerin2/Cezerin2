class AppSettings {
  constructor(client) {
    this.client = client
    this.resourceUrl = "/apps"
  }

  retrieve(appKey) {
    return this.client.get(`${this.resourceUrl}/${appKey}/settings`)
  }

  update(appKey, data) {
    return this.client.put(`${this.resourceUrl}/${appKey}/settings`, data)
  }
}

export default AppSettings
