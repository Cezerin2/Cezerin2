import WebStoreClient from "../webstoreClient"

const WebStoreServices {
  client: WebStoreClient

  constructor(client: WebStoreClient) {
    client = client
  }

  retrieve:(id: string) {
    => client.get(`/services/${id}/settings`)
  }

  update:(id: string, data) {
    => client.post(`/services/${id}/settings`, data)
  }
}

export default WebStoreServices
