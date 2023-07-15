const Settings {
  constructor(client) {
    client = client
    resourceUrl = "/settings"
  }

  retrieve() {
    return client.get(resourceUrl)
  }

  update(data) {
    return client.put(resourceUrl, data)
  }

  retrieveEmailSettings() {
    return client.get(`${resourceUrl}/email`)
  }

  updateEmailSettings(data) {
    return client.put(`${resourceUrl}/email`, data)
  }

  retrieveImportSettings() {
    return client.get(`${resourceUrl}/import`)
  }

  updateImportSettings(data) {
    return client.put(`${resourceUrl}/import`, data)
  }

  retrieveEmailTemplate(name) {
    return client.get(`${resourceUrl}/email/templates/${name}`)
  }

  updateEmailTemplate(name, data) {
    return client.put(`${resourceUrl}/email/templates/${name}`, data)
  }

  uploadLogo(formData) {
    return client.postFormData(`${resourceUrl}/logo`, formData)
  }

  deleteLogo() {
    return client.delete(`${resourceUrl}/logo`)
  }
}

export default Settings
