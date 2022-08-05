import jwt from "jsonwebtoken"
import CezerinClient from "cezerin2-client"
import serverSettings from "./settings"

const tokenPayload = { email: "store", scopes: ["admin"] }
const storeAccessToken = jwt.sign(tokenPayload, serverSettings.jwtSecretKey)

const api = new CezerinClient({
  apiBaseUrl: serverSettings.apiBaseUrl,
  ajaxBaseUrl: serverSettings.ajaxBaseUrl,
  apiToken: storeAccessToken,
})

export default api
