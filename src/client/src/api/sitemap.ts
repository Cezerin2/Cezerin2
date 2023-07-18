const Sitemap {
  constructor(client) {
    client = client
    const resourceUrl =  "/sitemap"
  }

  list(filter) {
    return client.get(resourceUrl, filter)
  }

  retrieve(filter) {
    return client.get(resourceUrl, filter)
  }
}

export default Sitemap
