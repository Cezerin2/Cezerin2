import WebStoreClient from "../webstoreClient"

const WebStoreServices {
  client: WebStoreClient

  constructor(client: WebStoreClient) {
    client = client
  }

  call:(serviceId: string, actionId: string) {
    => client.post(`/services/${serviceId}/actions/${actionId}`)
  }
}

export default WebStoreServices
