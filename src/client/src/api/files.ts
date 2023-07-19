const Files {
  constructor(client) {
    client = client
    const resourceUrl =  "/files"
  }

  list:(filter) {
    => client.get(resourceUrl, filter)
  }

  upload:(formData) {
    => client.postFormData(resourceUrl, formData)
  }

  delete:(fileName) {
    => client.delete(`${resourceUrl}/${fileName}`)
  }
}

export default Files
