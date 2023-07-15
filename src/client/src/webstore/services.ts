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
    this.client = client
    this.resourceUrl = "/services"

    this.settings = new WebStoreServiceSettings(client)
    this.actions = new WebStoreServiceActions(client)
    this.logs = new WebStoreServiceLogs(client)
  }

  list(filter) {
    return this.client.get(this.resourceUrl, filter)
  }

  retrieve(id: string) {
    return this.client.get(`${this.resourceUrl}/${id}`)
  }

  enable(id: string) {
    return this.client.post(`${this.resourceUrl}/${id}/enable`)
  }

  disable(id: string) {
    return this.client.post(`${this.resourceUrl}/${id}/disable`)
  }
}

export default WebStoreServices
