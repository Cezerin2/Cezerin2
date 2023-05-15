import WebStoreClient from "../webstoreClient"

class WebStoreServices {
  client: WebStoreClient

  constructor(client: WebStoreClient) {
    this.client = client
  }

  call(serviceId: string, actionId: string) {
    return this.client.post(`/services/${serviceId}/actions/${actionId}`)
  }
}

export default WebStoreServices
