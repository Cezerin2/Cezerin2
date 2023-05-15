class Sitemap {
  constructor(client) {
    this.client = client
    this.resourceUrl = "/sitemap"
  }

  list(filter) {
    return this.client.get(this.resourceUrl, filter)
  }

  retrieve(filter) {
    return this.client.get(this.resourceUrl, filter)
  }
}

export default Sitemap
