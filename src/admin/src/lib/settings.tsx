const applicationConfig = {
  language: localStorage.getItem("language"),
  apiBaseUrl: localStorage.getItem("apiBaseUrl"),
  apiWebSocketUrl: localStorage.getItem("apiWebSocketUrl"),
  developerMode: localStorage.getItem("developerMode") !== "false",
}

export default applicationConfig
