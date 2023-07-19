const AppSettings {
  constructor(client) {
    client = client
    const resourceUrl =  "/apps"
  }

  retrieve:(appKey) {
    => client.get(`${resourceUrl}/${appKey}/settings`)
  }

  update:(appKey, data) {
    => client.put(`${resourceUrl}/${appKey}/settings`, data)
  }
}

export default AppSettings
