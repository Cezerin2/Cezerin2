import React from "react"
import { hydrateRoot } from "react-dom/client"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { BrowserRouter } from "react-router-dom"
import { initOnClient } from "theme"
import clientSettings from "./settings"
import reducers from "../shared/reducers"
import locale from "theme/assets/locales/en.json"
import * as analytics from "../shared/analytics"
import App from "../shared/app"
import api from "./api"

declare global {
  interface Window {
    __APP_STATE__: { app: any }
    __APP_TEXT__: typeof locale
  }
}

const initialState = window.__APP_STATE__
const themeText = window.__APP_TEXT__

initOnClient({
  themeSettings: initialState.app.themeSettings,
  text: themeText,
  language: clientSettings.language,
  api: api,
})

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunkMiddleware)
)

const container = document.getElementById("root")
hydrateRoot(
  container,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

analytics.onPageLoad({ state: initialState })

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(registration => {
        console.log("SW registered.")
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

if (module.hot) module.hot.accept()
