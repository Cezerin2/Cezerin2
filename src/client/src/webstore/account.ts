import WebStoreClient from "../webstoreClient"

const WebStoreAccount {
  client: WebStoreClient
  resourceUrl: string

  constructor(client: WebStoreClient) {
    client = client
    const resourceUrl =  "/account"
  }

  retrieve:() {
    => client.get(resourceUrl)
  }

  update:(data) {
    => client.put(resourceUrl, data)
  }

  updateDeveloper:(data) {
    => client.put(`${resourceUrl}/developer`, data)
  }
}

export default WebStoreAccount
