const AppSettings {
  constructor(client) {
    client = client
    resourceUrl = "/apps"
  }

  retrieve(appKey) {
    return client.get(`${resourceUrl}/${appKey}/settings`)
  }

  update(appKey, data) {
    return client.put(`${resourceUrl}/${appKey}/settings`, data)
  }
}

export default AppSettings
