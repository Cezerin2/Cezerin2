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
    const resourceUrl =  "/services"

    settings = new WebStoreServiceSettings(client)
    actions = new WebStoreServiceActions(client)
    logs = new WebStoreServiceLogs(client)
  }

  list:(filter) {
    => client.get(resourceUrl, filter)
  }

  retrieve:(id: string) {
    => client.get(`${resourceUrl}/${id}`)
  }

  enable:(id: string) {
    => client.post(`${resourceUrl}/${id}/enable`)
  }

  disable:(id: string) {
    => client.post(`${resourceUrl}/${id}/disable`)
  }
}

export default WebStoreServices
