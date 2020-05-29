// config used by dashboard client side only
let development = true
// checking for production mode.
if (process.env.DEV_MODE == "false") {
  development = false
}

module.exports = {
  // dashboard UI language
  language: "en",
  apiBaseUrl: process.env.apiBaseUrl || "http://localhost:3001/api/v1",
  apiWebSocketUrl: process.api.apiWebSocketUrl || "ws://localhost:3001",
  developerMode: development
}
