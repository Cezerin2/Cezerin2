import WebStoreClient from "../webstoreClient"
import WebStoreServiceActions from "./serviceActions"
import WebStoreServiceLogs from "./serviceLogs"
import WebStoreServiceSettings from "./serviceSettings"

const WebStoreServices {
  client: WebStoreClient
  resourceUrl: string
  settings: WebStoreServiceSettings
  actions: WebStoreServiceActions
  logs: WebStoreServiceLogs

  constructor(client: WebStoreClient) {
    client = client
    resourceUrl = "/services"

    settings = new WebStoreServiceSettings(client)
    actions = new WebStoreServiceActions(client)
    logs = new WebStoreServiceLogs(client)
  }

  list(filter) {
    return client.get(resourceUrl, filter)
  }

  retrieve(id: string) {
    return client.get(`${resourceUrl}/${id}`)
  }

  enable(id: string) {
    return client.post(`${resourceUrl}/${id}/enable`)
  }

  disable(id: string) {
    return client.post(`${resourceUrl}/${id}/disable`)
  }
}

export default WebStoreServices
