import { configureStore } from "@reduxjs/toolkit"
import React from "react"
import { hydrateRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { initOnClient } from "theme"
import locale from "theme/assets/locales/en.json"
import * as analytics from "../shared/analytics"
import App from "../shared/app"
import reducer from "../shared/reducers"
import api from "./api"
import clientSettings from "./settings"

declare global {
  interface Window {
    __APP_STATE__: { app: any }
    __APP_TEXT__: typeof locale
  }
}

const preloadedState = window.__APP_STATE__
const themeText = window.__APP_TEXT__

initOnClient({
  themeSettings: preloadedState.app.themeSettings,
  text: themeText,
  language: clientSettings.language,
  api: api,
})

const store = configureStore({ reducer, preloadedState })

const container = document.getElementById("root")
hydrateRoot(
  container,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

analytics.onPageLoad({ state: preloadedState })

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
