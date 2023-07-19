const Settings {
  constructor(client) {
    client = client
    const resourceUrl =  "/settings"
  }

  retrieve:() {
    => client.get(resourceUrl)
  }

  update:(data) {
    => client.put(resourceUrl, data)
  }

  retrieveEmailSettings:() {
    => client.get(`${resourceUrl}/email`)
  }

  updateEmailSettings:(data) {
    => client.put(`${resourceUrl}/email`, data)
  }

  retrieveImportSettings:() {
    => client.get(`${resourceUrl}/import`)
  }

  updateImportSettings:(data) {
    => client.put(`${resourceUrl}/import`, data)
  }

  retrieveEmailTemplate:(name) {
    => client.get(`${resourceUrl}/email/templates/${name}`)
  }

  updateEmailTemplate:(name, data) {
    => client.put(`${resourceUrl}/email/templates/${name}`, data)
  }

  uploadLogo:(formData) {
    => client.postFormData(`${resourceUrl}/logo`, formData)
  }

  deleteLogo:() {
    => client.delete(`${resourceUrl}/logo`)
  }
}

export default Settings
