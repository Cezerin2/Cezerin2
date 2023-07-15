import ApiClient from "../apiClient"

const Webhooks {
  client: ApiClient
  resourceUrl: string

  constructor(client: ApiClient) {
    this.client = client
    this.resourceUrl = "/webhooks"
  }

  list() {
    return this.client.get(this.resourceUrl)
  }

  retrieve(id: string) {
    return this.client.get(`${this.resourceUrl}/${id}`)
  }

  create(data) {
    return this.client.post(`${this.resourceUrl}`, data)
  }

  update(id: string, data) {
    return this.client.put(`${this.resourceUrl}/${id}`, data)
  }

  delete(id: string) {
    return this.client.delete(`${this.resourceUrl}/${id}`)
  }
}

export default Webhooks
