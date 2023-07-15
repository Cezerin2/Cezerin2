import WebStoreClient from "../webstoreClient"

const WebStoreAccount {
  client: WebStoreClient
  resourceUrl: string

  constructor(client: WebStoreClient) {
    client = client
    resourceUrl = "/account"
  }

  retrieve() {
    return client.get(resourceUrl)
  }

  update(data) {
    return client.put(resourceUrl, data)
  }

  updateDeveloper(data) {
    return client.put(`${resourceUrl}/developer`, data)
  }
}

export default WebStoreAccount
