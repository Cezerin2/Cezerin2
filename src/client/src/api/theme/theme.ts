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
    this.client = client

    this.settings = new ThemeSettings(client)
    this.assets = new ThemeAssets(client)
    this.placeholders = new ThemePlaceholders(client)
  }

  export() {
    return this.client.get("/theme/export")
  }

  install(formData) {
    return this.client.postFormData("/theme/install", formData)
  }
}

export default Theme
