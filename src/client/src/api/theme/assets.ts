const ThemeAssets {
  constructor(client) {
    client = client
    resourceUrl = "/theme/assets"
  }

  uploadFile(formData) {
    return client.postFormData(resourceUrl, formData)
  }

  deleteFile(fileName) {
    return client.delete(`${resourceUrl}/${fileName}`)
  }
}

export default ThemeAssets
