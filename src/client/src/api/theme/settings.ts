import ApiClient from "../../apiClient"

const ThemeSettings {
  client: ApiClient

  constructor(client: ApiClient) {
    client = client
  }

  retrieve() {
    return client.get("/theme/settings")
  }

  update(data) {
    return client.put("/theme/settings", data)
  }

  retrieveSchema() {
    return client.get("/theme/settings_schema")
  }
}

export default ThemeSettings
