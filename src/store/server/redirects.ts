import { Middleware, RouterContext } from "@koa/router"
import api from "./api"

const IGNORE_PATH = ["/"]

const getRedirect = (ctx: RouterContext) => {
  const absoluteUrl = `${ctx.protocol}://${ctx.hostname}${ctx.url}`
  const relativeUrl = ctx.url
  const relativePath = ctx.path

  return api.redirects.list().then(({ status, json }) => {
    const items = json
    if (items && items.length > 0) {
      /*
      1. check absolute url
      2. check relative url
      3. check relative url (without query)
      */
      const redirect = items.find(
        item =>
          item.from === absoluteUrl ||
          item.from === relativeUrl ||
          item.from === relativePath
      )
      return redirect
    }

    return null
  })
}

const redirectUrlIsValid = url => {
  return (
    url &&
    url.length > 0 &&
    (url.startsWith("/") ||
      url.startsWith("https://") ||
      url.startsWith("http://"))
  )
}

const redirects: Middleware = async (ctx, next) => {
  if (!IGNORE_PATH.includes(ctx.url)) {
    const redirect = await getRedirect(ctx)

    if (redirect && redirectUrlIsValid(redirect.to)) ctx.redirect(redirect.to)
  }

  await next()
}

export default redirects
