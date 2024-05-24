import CezerinClient from "cezerin2-client"
import settings from "lib/settings"

let dashboardToken = localStorage.getItem("dashboard_token")
let webstoreToken = localStorage.getItem("webstore_token")

const api = new CezerinClient({
  apiBaseUrl: settings.apiBaseUrl || "/api/v1",
  apiToken: dashboardToken,
  webstoreToken: webstoreToken,
})

export default api
