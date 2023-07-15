import WebStoreClient from "../webstoreClient"

const WebStoreServices {
  client: WebStoreClient

  constructor(client: WebStoreClient) {
    client = client
  }

  retrieve(id: string) {
    return client.get(`/services/${id}/settings`)
  }

  update(id: string, data) {
    return client.post(`/services/${id}/settings`, data)
  }
}

export default WebStoreServices
