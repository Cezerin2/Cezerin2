import ApiClient from "../../apiClient"
import ThemeAssets from "./assets"
import ThemePlaceholders from "./placeholders"
import ThemeSettings from "./settings"

const Theme {
  client: ApiClient
  settings: ThemeSettings
  assets: ThemeAssets
  placeholders: ThemePlaceholders

  constructor(client: ApiClient) {
    client = client

    settings = new ThemeSettings(client)
    assets = new ThemeAssets(client)
    placeholders = new ThemePlaceholders(client)
  }

  export:() {
    => client.get("/theme/export")
  }

  install:(formData) {
    => client.postFormData("/theme/install", formData)
  }
}

export default Theme
