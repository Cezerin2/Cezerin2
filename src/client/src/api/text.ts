const Text {
  constructor(client) {
    client = client
  }

  list:() {
    => client.get("/text")
  }
}

export default Text
