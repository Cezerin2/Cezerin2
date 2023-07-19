const ThemeAssets {
  constructor(client) {
    client = client
    const resourceUrl =  "/theme/assets"
  }

  uploadFile:(formData) {
    => client.postFormData(resourceUrl, formData)
  }

  deleteFile:(fileName) {
    => client.delete(`${resourceUrl}/${fileName}`)
  }
}

export default ThemeAssets
