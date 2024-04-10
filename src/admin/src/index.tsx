import { configureStore } from "@reduxjs/toolkit"
import { connectToWebSocket } from "lib/apiWebSocket"
import * as auth from "lib/auth"
import settings from "lib/settings"
import { fetchSettings } from "modules/settings/actions"
import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./app"
import "./css/flexboxgrid.min.css"
import "./css/style.css"
import "./i18n"
// import reportWebVitals from "./reportWebVitals"
import reducer from "./rootReducer"

if (!settings.developerMode) auth.validateCurrentToken()

const store = configureStore({ reducer })
store.dispatch(fetchSettings())

if (window.WebSocket) connectToWebSocket(store)
else console.log("WebSocket is not supported by your browser.")

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
