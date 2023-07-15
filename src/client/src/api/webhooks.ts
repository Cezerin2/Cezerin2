import ApiClient from "../apiClient"

const Webhooks {
  client: ApiClient
  resourceUrl: string

  constructor(client: ApiClient) {
    client = client
    resourceUrl = "/webhooks"
  }

  list() {
    return client.get(resourceUrl)
  }

  retrieve(id: string) {
    return client.get(`${resourceUrl}/${id}`)
  }

  create(data) {
    return client.post(`${resourceUrl}`, data)
  }

  update(id: string, data) {
    return client.put(`${resourceUrl}/${id}`, data)
  }

  delete(id: string) {
    return client.delete(`${resourceUrl}/${id}`)
  }
}

export default Webhooks
