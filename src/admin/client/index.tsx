import { configureStore } from "@reduxjs/toolkit"
import { connectToWebSocket } from "lib/apiWebSocket"
import * as auth from "lib/auth"
import settings from "lib/settings"
import { fetchSettings } from "modules/settings/actions"
import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import "../../../public/admin-assets/css/flexboxgrid.min.css"
import "../../../public/admin-assets/css/style.css"
import App from "./app"
import reducers from "./rootReducer"

if (!settings.developerMode) auth.validateCurrentToken()

const store = configureStore({ reducer: reducers })
store.dispatch(fetchSettings())

if (window.WebSocket) {
  connectToWebSocket(store)
} else {
  console.log("WebSocket is not supported by your browser.")
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
