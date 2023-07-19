const Sitemap {
  constructor(client) {
    client = client
    const resourceUrl =  "/sitemap"
  }

  list:(filter) {
    => client.get(resourceUrl, filter)
  }

  retrieve:(filter) {
    => client.get(resourceUrl, filter)
  }
}

export default Sitemap
