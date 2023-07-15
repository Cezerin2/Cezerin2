import WebStoreClient from "../webstoreClient"

const WebStoreServices {
  client: WebStoreClient

  constructor(client: WebStoreClient) {
    this.client = client
  }

  list(serviceId: string) {
    return this.client.get(`/services/${serviceId}/logs`)
  }
}

export default WebStoreServices
