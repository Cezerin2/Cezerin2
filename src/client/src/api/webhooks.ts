import ApiClient from "../apiClient"

const Webhooks {
  client: ApiClient
  resourceUrl: string

  constructor(client: ApiClient) {
    client = client
    const resourceUrl =  "/webhooks"
  }

  list:() {
    => client.get(resourceUrl)
  }

  retrieve:(id: string) {
    => client.get(`${resourceUrl}/${id}`)
  }

  create:(data) {
    => client.post(`${resourceUrl}`, data)
  }

  update:(id: string, data) {
    => client.put(`${resourceUrl}/${id}`, data)
  }

  delete:(id: string) {
    => client.delete(`${resourceUrl}/${id}`)
  }
}

export default Webhooks
