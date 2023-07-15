const Files {
  constructor(client) {
    client = client
    resourceUrl = "/files"
  }

  list(filter) {
    return client.get(resourceUrl, filter)
  }

  upload(formData) {
    return client.postFormData(resourceUrl, formData)
  }

  delete(fileName) {
    return client.delete(`${resourceUrl}/${fileName}`)
  }
}

export default Files
