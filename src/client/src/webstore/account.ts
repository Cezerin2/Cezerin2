import WebStoreClient from "../webstoreClient"

const WebStoreAccount {
  client: WebStoreClient
  resourceUrl: string

  constructor(client: WebStoreClient) {
    this.client = client
    this.resourceUrl = "/account"
  }

  retrieve() {
    return this.client.get(this.resourceUrl)
  }

  update(data) {
    return this.client.put(this.resourceUrl, data)
  }

  updateDeveloper(data) {
    return this.client.put(`${this.resourceUrl}/developer`, data)
  }
}

export default WebStoreAccount
