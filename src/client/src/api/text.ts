const Text {
  constructor(client) {
    client = client
  }

  list() {
    return client.get("/text")
  }
}

export default Text
