import ApiClient from "../../apiClient"

const ThemeSettings {
  client: ApiClient

  constructor(client: ApiClient) {
    client = client
  }

  retrieve:() {
    => client.get("/theme/settings")
  }

  update:(data) {
    => client.put("/theme/settings", data)
  }

  retrieveSchema:() {
    => client.get("/theme/settings_schema")
  }
}

export default ThemeSettings
