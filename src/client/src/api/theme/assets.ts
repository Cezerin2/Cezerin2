class ThemeAssets {
  constructor(client) {
    this.client = client
    this.resourceUrl = "/theme/assets"
  }

  uploadFile(formData) {
    return this.client.postFormData(this.resourceUrl, formData)
  }

  deleteFile(fileName) {
    return this.client.delete(`${this.resourceUrl}/${fileName}`)
  }
}

export default ThemeAssets
