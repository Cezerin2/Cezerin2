import WebStoreClient from "../webstoreClient"

const WebStoreServices {
  client: WebStoreClient

  constructor(client: WebStoreClient) {
    this.client = client
  }

  retrieve(id: string) {
    return this.client.get(`/services/${id}/settings`)
  }

  update(id: string, data) {
    return this.client.post(`/services/${id}/settings`, data)
  }
}

export default WebStoreServices
