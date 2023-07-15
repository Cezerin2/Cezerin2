const Files {
  constructor(client) {
    this.client = client
    this.resourceUrl = "/files"
  }

  list(filter) {
    return this.client.get(this.resourceUrl, filter)
  }

  upload(formData) {
    return this.client.postFormData(this.resourceUrl, formData)
  }

  delete(fileName) {
    return this.client.delete(`${this.resourceUrl}/${fileName}`)
  }
}

export default Files
