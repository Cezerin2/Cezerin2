const Text {
  constructor(client) {
    this.client = client
  }

  list() {
    return this.client.get("/text")
  }
}

export default Text
