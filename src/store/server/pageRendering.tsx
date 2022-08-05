import { Middleware, RouterContext } from "@koa/router"
import CezerinClient from "cezerin2-client"
import { SetOption } from "cookies"
import React, { StrictMode } from "react"
import { renderToString } from "react-dom/server"
import Helmet from "react-helmet"
import { Provider } from "react-redux"
import { StaticRouter } from "react-router-dom"
import { applyMiddleware, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import { initOnServer } from "theme"
import winston from "winston"
import App from "../shared/app"
import reducers from "../shared/reducers"
import { loadState } from "./loadState"
import { indexHtml } from "./readIndexHtml"
import serverSettings from "./settings"

initOnServer({
  language: serverSettings.language,
  api: new CezerinClient({
    ajaxBaseUrl: serverSettings.ajaxBaseUrl,
  }),
})

const getHead = () => {
  const helmet = Helmet.rewind()
  return {
    title: helmet.title.toString(),
    meta: helmet.meta.toString(),
    link: helmet.link.toString(),
    script: helmet.script.toString(),
    style: helmet.style.toString(),
    htmlAttributes: helmet.htmlAttributes.toString(),
    base: helmet.base.toString(),
    noscript: helmet.noscript.toString(),
  }
}

const getReferrerCookieOptions = (isHttps): SetOption => ({
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
  signed: true,
  secure: isHttps,
  sameSite: "strict",
})

const renderError = (ctx: RouterContext, error) => {
  winston.error(
    `Error on page rendering\n\tpath: ${ctx.url}\n\terror: ${error.toString()}`
  )
  if (error.stack) {
    winston.error(error.stack)
  }
  ctx.throw(error.message ? error.message : error)
}

const getAppHtml = (store, location, context = {}) => {
  const html = renderToString(
    <StrictMode>
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </StrictMode>
  )

  return html
}

const getPlaceholder = placeholders => {
  let placeholder = {
    head_start: "",
    head_end: "",
    body_start: "",
    body_end: "",
  }

  if (placeholders && placeholders.length > 0) {
    placeholder.head_start = placeholders
      .filter(p => p.place === "head_start")
      .map(p => p.value)
      .join("\n")
    placeholder.head_end = placeholders
      .filter(p => p.place === "head_end")
      .map(p => p.value)
      .join("\n")
    placeholder.body_start = placeholders
      .filter(p => p.place === "body_start")
      .map(p => p.value)
      .join("\n")
    placeholder.body_end = placeholders
      .filter(p => p.place === "body_end")
      .map(p => p.value)
      .join("\n")
  }

  return placeholder
}

const renderPage = (ctx: RouterContext, store, themeText, placeholders) => {
  const appHtml = getAppHtml(store, ctx.url)
  const state = store.getState()
  const head = getHead()
  const placeholder = getPlaceholder(placeholders)

  const html = indexHtml
    .replace("{placeholder_head_start}", placeholder.head_start)
    .replace("{placeholder_head_end}", placeholder.head_end)
    .replace("{placeholder_body_start}", placeholder.body_start)
    .replace("{placeholder_body_end}", placeholder.body_end)
    .replace("{language}", serverSettings.language)
    .replace("{title}", head.title)
    .replace("{meta}", head.meta)
    .replace("{link}", head.link)
    .replace("{script}", head.script)
    .replace("{app_text}", JSON.stringify(themeText))
    .replace("{app_state}", JSON.stringify(state))
    .replace("{root}", appHtml)

  const isHttps = ctx.protocol === "https"
  const full_url = `${ctx.protocol}://${ctx.hostname}${ctx.url}`
  const referrer_url =
    ctx.get("referrer") === undefined ? "" : ctx.get("referrer")
  const REFERRER_COOKIE_OPTIONS = getReferrerCookieOptions(isHttps)

  if (!ctx.cookies.get("referrer_url")) {
    ctx.cookies.set("referrer_url", referrer_url, REFERRER_COOKIE_OPTIONS)
  }

  if (!ctx.cookies.get("landing_url")) {
    ctx.cookies.set("landing_url", full_url, REFERRER_COOKIE_OPTIONS)
  }

  const httpStatusCode = state.app.currentPage.type === 404 ? 404 : 200

  ctx.body = html
  ctx.status = httpStatusCode
}

const pageRendering: Middleware = async ctx => {
  try {
    const { state, themeText, placeholders } = await loadState(
      ctx,
      serverSettings.language
    )
    initOnServer({
      themeSettings: state.app.themeSettings,
      text: themeText,
    })

    const store = createStore(reducers, state, applyMiddleware(thunkMiddleware))

    renderPage(ctx, store, themeText, placeholders)
  } catch (error) {
    renderError(ctx, error)
  }
}

export default pageRendering
